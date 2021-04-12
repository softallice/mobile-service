<template>
  <q-drawer
    v-model="drawer"
    :width="250"
    :breakpoint="600"
    bordered
    overlay
    content-class="column justify-between"
  >
    <div>
      <DrawerRoutesList />
      <DrawerAppSettings />
    </div>
  </q-drawer>
</template>

<script>
import DrawerAppSettings from 'components/partials/DrawerAppSettings'
import DrawerRoutesList from 'components/partials/DrawerRoutesList'

export default {
  name: 'AppDrawer',
  components: {
    DrawerAppSettings,
    DrawerRoutesList
  },
  beforeMount () {
    this.$root.$on('ToggleDrawer', this.toggleDrawer)
  },
  data: () => ({
    drawer: false
  }),
  methods: {
    toggleDrawer () {
      this.drawer = !this.drawer
    }
  }
}
</script>

<style>
</style>
