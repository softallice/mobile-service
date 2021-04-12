<template>
  <div
    :class="`${activeTheme.name}-loading-overlay`"
    class="fixed-full fit text-center rounded-borders"
  >
    <div class="absolute-center">
      <ConditionIcon
        :code="code"
        :isDay="1"
      />
      <p class="text-primary text-subtitle1 text-uppercase">Loading</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ConditionIcon from 'components/partials/ConditionIcon'

export default {
  name: 'AppLoadingScreen',
  components: {
    ConditionIcon
  },
  data: () => ({
    theme: 'sky',
    iconsCodes: [1000, 1003, 1006, 1009, 1030, 1063,1066, 1069, 1072, 1087, 1114, 1117, 1135, 1147, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1225, 1237, 1240, 1243, 1246, 1249, 1252, 1255, 1258, 1261, 1264, 1273, 1276, 1279, 1282],
    code: 1006
  }),
  mounted () {
    const MIN = 0, MAX = (this.iconsCodes.length - 1)
    this.code = this.iconsCodes[Math.floor(Math.random() * (MAX - MIN + 1)) + MIN]
  },
  computed: {
    ...mapGetters('theme', ['activeTheme'])
  }
}
</script>

<style lang="scss">
.sky-loading-overlay {
  background-color: rgba(46, 84, 134, 0.2);
}
.moon-loading-overlay {
  background-color: rgba(192, 77, 104, 0.2);
}
.nature-loading-overlay {
  background-color: rgba(69, 189, 109, 0.2);
}
</style>
