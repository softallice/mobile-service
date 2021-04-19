<template>
  <div id="q-app">
    <q-img
      :placeholder-src="activeTheme.bgImage"
      :src="activeTheme.bgImage"
      :ratio="16/9"
      no-default-spinner
      img-class="filter"
      class="fixed-full bg-image"
    />
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in"
    >
      <!-- <router-view v-if="!!position" :content="position" /> -->
      <router-view/>
    </transition>
  </div>
</template>

<script>
import { onMounted, watch } from "@vue/composition-api";
import { mapGetters } from 'vuex'

export default {
  name: "App",
  watch: {
    currentUser(newUser, oldUser) {
      if (newUser === null) {
        this.$router.push("/");
      } else {
        if (this.$route.path === "/login") {
          // this.$router.push("/account");
          this.$router.push("/");
        }
      }
    }
  },
  setup(props, context) {
    const { $store } = context.root;
    // Attempt jwt auth when the app mounts.
    onMounted(() => {
      $store.dispatch("auth/authenticate").catch(error => {
        if (!error.message.includes("Could not find stored JWT")) {
          console.error(error);
        }
      });
    });
    return {};
  },
  created () {
    if (localStorage.getItem('dark') === true) {
      this.$q.dark.set(true)
    } else {
      this.$q.dark.set(false)
    }
    
  },
  beforeMount () {
  },
  mounted () {
    // this.checkAccessDevicePosition()
  },
  data: () => ({
    position: null
  }),
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    ...mapGetters('theme', ['activeTheme'])
  },
  methods: {
    // checkAccessDevicePosition () {
    //   if (!this.position) {
    //     if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(this.onAccessAllowed, this.onAccessDenied)
    //     }
    //   }
    // }
    // ,
    // onAccessAllowed (location) {
    //   // console.log(`Location access allowed! Current location:\nLat [${location.coords.latitude}] Lon [${location.coords.longitude}]`)
    //   this.getCurrentLocationName(location.coords.latitude, location.coords.longitude)
    // },
    // onAccessDenied (data) {
    //   // console.log('Location access denied, set default location.', data)
    //   this.getCurrentLocationName(null, null, 'Barrafranca')
    // },
    // getCurrentLocationName (lat, lon, place) {
    //   const AXIOS_PARAMS = {
    //     key: '45129826589045a4a67172834201512',
    //     q: place ? place : `${lat},${lon}`
    //   }

    //   this.$axios
    //     .get('https://api.weatherapi.com/v1/current.json', {
    //       params: AXIOS_PARAMS
    //     })
    //     .then(response => {
    //       this.position = response.data
    //     })
    //     .catch(error => {
    //       // console.log('Go to location error page')
    //     })
    // },
    // onLocationSearch (place) {
    //   if (!!place) {
    //     this.getCurrentLocationName(null, null, place)
    //   }
    // }
  }
};
</script>

