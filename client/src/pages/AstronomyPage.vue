<template>
  <q-page v-if="!!astronomy" padding>
    <Astronomy :data="astronomy" />
  </q-page>
</template>

<script>
import Astronomy from 'components/weather/Astronomy'

export default {
  name: 'IndexPage',
  components: {
    Astronomy
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  beforeMount () {
    if (!!(this.content && this.content.location.name)) {
      this.getLocationAstronomy()
    }
  },
  data: () => ({
    astronomy: null
  }),
  methods: {
    getLocationAstronomy () {
      this.$root.$emit('onAPILoadingStart')
      const AXIOS_PARAMS = {
        key: '45129826589045a4a67172834201512',
        q: this.content.location.name
      }
      this.$axios
        .get('https://api.weatherapi.com/v1/astronomy.json', {
          params: AXIOS_PARAMS
        })
        .then(response => {
          this.astronomy = response.data
        })
        .catch(error => {
          // console.log('Go to location error page')
        })
        .finally(() => {
          this.$root.$emit('onAPILoadingEnd')
        })
    }
  },
  watch: {
    content: function (value) {
      if (!!value) {
        this.getLocationAstronomy()
      }
    }
  }
}
</script>
