<template>
  <div class="current-day-weather-container row items-center">
    <div class="col-12 col-md-4 offset-md-1">
      <div class="flex items-center justify-center no-wrap">
        <ConditionIcon
          :code="weather.current.condition.code"
          :isDay="weather.current.is_day"
          :width="85"
          :height="85"
          class="q-mr-md"
        />
        <div>
          <div class="text-caption text-secondary">
            {{ weather.location.region }}, {{ weather.location.country }}
          </div>
          <div class="text-h4 text-primary">
            {{ weather.location.name }}
          </div>
          <div class="text-subtitle1 text-info">
            {{ weather.current.condition.text }}
          </div>
        </div>
      </div>
      <div class="text-grey text-center q-mt-md">
        <span class="text-caption">
          Last update: {{ weather.current.last_updated_epoch | formatDate }}
        </span>
      </div>
    </div>
    <div class="col-12 col-md-4 offset-md-1">
      <div class="flex items-center">
        <q-img
          :src="ThermometerSvg"
          no-default-spinner
          width="50px"
          height="50px"
          class="q-mr-md"
        />
        <div>
          <div class="text-h6 text-uppercase text-secondary">Temperature</div>
          <div>
            Min {{ Math.round(weather.forecast.forecastday[0].day.mintemp_c ) }}° -
            Max {{ Math.round(weather.forecast.forecastday[0].day.maxtemp_c ) }}°
          </div>
        </div>
      </div>
      <div class="flex items-center q-my-xl">
        <q-img
          :src="HumiditySvg"
          no-default-spinner
          width="50px"
          height="50px"
          class="q-mr-md"
        />
        <div>
          <div class="text-h6 text-uppercase text-secondary">Humidity</div>
          <div>
            Now {{ Math.round(weather.current.humidity) }}% -
            Avg {{ Math.round(weather.forecast.forecastday[0].day.avghumidity) }}%
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <q-img
          :src="WindSvg"
          no-default-spinner
          width="50px"
          height="50px"
          class="q-mr-md"
        />
        <div>
          <div class="text-h6 text-uppercase text-secondary">Wind</div>
          <div>
            Max {{ weather.forecast.forecastday[0].day.maxwind_kph }} kph -
            {{ weather.current.wind_dir }}
            <q-icon
              :style="{ transform: `rotate(${weather.current.wind_degree}deg)` }"
              size="16px"
              name="north"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { date } from 'quasar'
import ConditionIcon from 'components/partials/ConditionIcon'
import ThermometerSvg from '../../assets/conditions_icons/thermometer.svg'
import HumiditySvg from '../../assets/conditions_icons/humidity.svg'
import WindSvg from '../../assets/conditions_icons/wind.svg'

export default {
  name: 'WeatherCondition',
  components: {
    ConditionIcon
  },
  props: {
    weather: {
      type: Object,
      required: true
    }
  },
  filters: {
    formatDate (timeStamp) {
      return date.formatDate((timeStamp * 1000), 'YYYY-MM-DD hh:mm A')
    }
  },
  data: () => ({
    ThermometerSvg,
    HumiditySvg,
    WindSvg,
    isRefreshing: false
  })
}
</script>

<style lang="scss">
.current-day-weather-container {
  height: calc(100vh - 234px);
  @media (max-width: $breakpoint-xs-max) {
    height: calc(100vh - 196px);
  }
}

.rotating {
  animation: rotating 1s cubic-bezier(0.8, 0.22, 0.08, 0.9);
  @keyframes rotating {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
