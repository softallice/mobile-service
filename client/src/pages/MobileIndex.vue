<template>
  <q-page v-if="!!weather" padding>
    <WeatherCondition :weather="weather" />
    <div class="row q-my-md">
      <div
        v-for="(day, index) in weather.forecast.forecastday"
        :key="index"
        :class="{
          'separator': index < (weather.forecast.forecastday.length - 1)
        }"
        class="forecast-col col-12 col-md-4"
      >
        <WeatherConditionForecast :day="day" />
      </div>
    </div>
  </q-page>
</template>

<script>
import WeatherCondition from 'components/weather/WeatherCondition'
import WeatherConditionForecast from 'components/weather/WeatherConditionForecast'

export default {
  name: 'IndexPage',
  components: {
    WeatherCondition,
    WeatherConditionForecast
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  beforeMount () {
    if (!!(this.content && this.content.location.name)) {
      this.getLocationWeather()
    }
  },
  data: () => ({
    weather: null
  }),
  methods: {
    getLocationWeather () {
      this.$root.$emit('onAPILoadingStart')
      const AXIOS_PARAMS = {
        key: '45129826589045a4a67172834201512',
        q: this.content.location.name,
        days: 3
      }
      this.$axios
        .get('https://api.weatherapi.com/v1/forecast.json', {
          params: AXIOS_PARAMS
        })
        .then(response => {
          this.weather = response.data
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
        this.getLocationWeather()
      }
    }
  }
}
</script>

<style lang="scss">
.forecast-col {
  padding: 0 24px;
  @media (max-width: $breakpoint-sm-max) {
    padding: 24px 0;
  }
}

.separator {
  border-right: 1px solid rgba(158, 158, 158, 0.2);
  @media (max-width: $breakpoint-sm-max) {
    border-right: 0;
    border-bottom: 1px solid rgba(158, 158, 158, 0.2);
  }
}
</style>
