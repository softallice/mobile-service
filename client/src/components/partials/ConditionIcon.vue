<template>
  <q-img
    :src="iconPath"
    :width="iconWidth"
    :height="iconHeight"
    no-default-spinner
    transition="fade-transition"
  />
</template>

<script>
export default {
  name: 'ConditionIcon',
  props: {
    code: {
      type: Number,
      required: true
    },
    isDay: {
      type: Number,
      required: false
    },
    width: {
      type: Number,
      required: false
    },
    height: {
      type: Number,
      required: false
    }
  },
  computed: {
    iconPath () {
      if (this.code === 1000) {
        let isDay = this.isDay === 1 ? 'day' : 'night'
        return require(`../../assets/conditions_icons/${this.code}-${isDay}.svg`)
      } else {
        return require(`../../assets/conditions_icons/${this.code}.svg`)
      }
    },
    iconWidth () {
      return this.$props.width
        ? this.$props.width + 'px'
        : 100 + 'px'
    },
    iconHeight () {
      return this.$props.height
        ? this.$props.height + 'px'
        : 100 + 'px'
    }
  }
}
</script>

<style>
</style>
