<template>
  <div class="q-px-sm">
    <div class="text-h5 text-center text-uppercase text-grey q-mb-lg">
      {{ day.date_epoch | dayName }}
    </div>
    <div
      v-for="(hour, index) in dayHours"
      :key="index"
      class="flex items-center justify-between q-my-sm"
    >
      <span class="text-primary">{{ hour.time_epoch | dayHour }}</span>
      <span class="text-secondary">
        {{ Math.round(hour.temp_c) }}°
      </span>
      <span class="text-info">{{ hour.humidity }}%</span>
      <ConditionIcon
        :code="hour.condition.code"
        :isDay="hour.is_day"
        :width="35"
        :height="35"
      />
    </div>
  </div>
</template>

<script>
import { date } from 'quasar'
import ConditionIcon from 'components/partials/ConditionIcon'

export default {
  name: 'WeatherConditionForecast',
  components: {
    ConditionIcon
  },
  props: {
    day: {
      type: Object,
      required: true
    }
  },
  computed: {
    dayHours () {
      return this.day.hour.filter((h, i) => i % 4 === 0 ? h : '')
    }
  },
  filters: {
    dayName (timeStamp) {
      return date.formatDate((timeStamp * 1000), 'dddd')
    },
    dayHour (timeStamp) {
      return date.formatDate((timeStamp * 1000), 'HH:mm')
    }
  }
}
</script>
