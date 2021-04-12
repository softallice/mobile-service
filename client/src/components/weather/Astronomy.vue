<template>
  <div class="astronomy-weather-container row items-center">
    <div class="col-12 col-md-4 offset-md-1">
      <div class="flex items-center justify-center no-wrap">
        <q-img
          :src="MoonSvg"
          :style="{ filter: `brightness(${data.astronomy.astro.moon_illumination}%)` }"
          width="85px"
          height="85px"
          no-default-spinner
          class="q-mr-md"
        />
        <div>
          <div class="text-caption text-secondary">
            {{ data.location.region }}, {{ data.location.country }}
          </div>
          <div class="text-h4 text-primary">
            {{ data.location.name }}
          </div>
          <div class="text-subtitle1 text-info">
            {{ data.location.localtime_epoch | formatDate }}
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-4 offset-md-1">
      <div class="text-h6 text-center text-uppercase q-mb-md">
        {{ data.astronomy.astro.moon_phase }} - {{ data.astronomy.astro.moon_illumination }}%
      </div>
      <div class="flex items-center justify-around text-center q-py-lg">
        <div>
          <div class="text-subtitle1 text-uppercase text-secondary">Sunrine</div>
          <div>
            {{ data.astronomy.astro.sunrise }}
          </div>
        </div>
        <div>
          <div class="text-subtitle1 text-uppercase text-secondary">Sunset</div>
          <div>
            {{ data.astronomy.astro.sunset }}
          </div>
        </div>
      </div>
      <div class="flex items-center justify-around text-center">
        <div>
          <div class="text-subtitle1 text-uppercase text-secondary">Moonrise</div>
          <div>
            {{ data.astronomy.astro.moonrise }}
          </div>
        </div>
        <div>
          <div class="text-subtitle1 text-uppercase text-secondary">Moonset</div>
          <div>
            {{ data.astronomy.astro.moonset }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { date } from 'quasar'
import MoonSvg from '../../assets/conditions_icons/1000-night.svg'

export default {
  name: 'Astronomy',
  props: {
    data: {
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
    MoonSvg
  }),
  mounted () {
    console.log(this.data);
  }
}
</script>

<style lang="scss" scoped>
.astronomy-weather-container {
  height: calc(100vh - 234px);
  @media (max-width: $breakpoint-xs-max) {
    height: calc(100vh - 196px);
  }
}
</style>
