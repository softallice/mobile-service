<template>
  <q-header>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="$root.$emit('ToggleDrawer')"
      />
      <q-toolbar-title>
        <h4 class="q-ma-none">Mobile Service App</h4>
      </q-toolbar-title>
    </q-toolbar>
    <div class="q-pt-lg q-pb-md">
      <q-input
        v-model="location"
        color="white"
        label="Search location"
        debounce="750"
        dark
        filled
        dense
        class="q-px-md"
      >
        <template v-slot:prepend>
          <q-icon name="place" />
        </template>
        <template v-slot:append v-if="!!location">
          <q-icon
            name="cancel"
            @click.stop="clearSearchBar"
            class="cursor-pointer"
          />
        </template>
      </q-input>
      <div class="autocomplete q-px-md">
        <transition name="autocomplete" mode="out-in">
          <div
            v-if="showAutocomplete"
            :class="{ 'zero-results': !suggestedLocations.length }"
            class="autocomplete-list"
          >
            <div v-if="suggestedLocations.length">
              <p
                v-for="(location, index) in suggestedLocations"
                :key="index"
                class="q-ma-none q-pa-sm q-px-md ellipsis"
              >
                <span
                  @click="onSuggestedLocationClick(location.name)"
                  class="pointer"
                >
                  {{ location.name }}
                </span>
              </p>
            </div>
            <div v-else>
              <p class="q-ma-none q-pa-sm q-px-md">Location not found, search another one.</p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </q-header>
</template>

<script>

export default {
  name: 'AppHeader',
  data: () => ({
    showAutocomplete: false,
    isLoadingSuggestedLocations: false,
    location: '',
    suggestedLocations: [],
    isSuggestedLocationClicked: false
  }),
  methods: {
    searchLocation (location) {
      this.isLoadingSuggestedLocations = true
      const AXIOS_PARAMS = {
        key: '45129826589045a4a67172834201512',
        q: location
      }
      this.$axios
        .get('https://api.weatherapi.com/v1/search.json', {
          params: AXIOS_PARAMS
        })
        .then(response => {
          this.suggestedLocations = response.data.slice(0, 4)
          this.showAutocomplete = true
        })
        .catch(error => {
          // console.log('Go to location error page')
        })
        .finally(() => {
          this.isLoadingSuggestedLocations = false
        })
    },
    onSuggestedLocationClick (location) {
      this.location = location
      this.showAutocomplete = false
      this.isSuggestedLocationClicked = true
      this.$root.$emit('onPlaceSearch', location)
    },
    clearSearchBar () {
      if (this.location) {
        this.location = null
      }
    }
  },
  watch: {
    location: function (search) {
      if (!!(!this.isSuggestedLocationClicked && search && search.length > 3)) {
        this.searchLocation(search)
      } else {
        this.isSuggestedLocationClicked = false
        this.showAutocomplete = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.autocomplete-enter-active,
.autocomplete-leave-active {
  transition: all 0.2s ease;
  opacity: 1;
  max-height: 130px;
}

.autocomplete-enter,
.autocomplete-leave-to {
  opacity: 0;
  max-height: 0;
}

.autocomplete-list {
  height: 120px;
  border-radius: 0 0 4px 4px;
  background: rgba(255, 255, 255, 0.07);

  &.zero-results {
    height: 30px;
  }

  span:hover {
    color: #50afe6;
  }
}
</style>
