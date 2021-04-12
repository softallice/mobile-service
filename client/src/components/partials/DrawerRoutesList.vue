<template>
  <q-list>
    <q-item-label header>Pages</q-item-label>
    <template v-for="(route, index) in appRoutes">
      <q-item
        :key="index"
        :to="{ name: route.name }"
        :name="route.name"
        :icon="route.icon"
        exact
        exact-active-class="text-white"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar
            :icon="route.icon"
            color="white"
            text-color="primary"
          />
        </q-item-section>
        <q-item-section>
          {{ route.name }}
        </q-item-section>
      </q-item>
    </template>
  </q-list>
</template>

<script>
export default {
  name: 'DrawerRoutesList',
  computed: {
    appRoutes () {
      return this.$router.options.routes[0].children.filter(route => route.name !== 'Home' && route.name !== 'Astronomy' && route.name !== 'Sports')
    }
  }
}
</script>

<style>

</style>
