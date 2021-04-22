<template>
  <q-footer>
    <q-tabs>
      <q-route-tab
        v-for="route in tabRoutes"
        :key="route.name"
        :to="{ name: route.name }"
        :name="route.name"
        :icon="route.icon"
        :label="$q.screen.sm || $q.screen.md || $q.screen.lg || $q.screen.xl ? route.name : null"
        exact
        replace
      />
    </q-tabs>
  </q-footer>
</template>

<script>
export default {
  name: 'AppFooter',
  computed: {
    tabRoutes () {
      return this.$router.options.routes[0].children.filter(
        route => route.name !== 'Register' 
              && route.name !== 'Consent'
              && route.name !== 'Login' 
              && route.name !== 'Verify'
              && route.name !== 'Account' 
              && route.name !== 'ForgotPassword'
              && route.name !== 'MobileHome' 
              && route.name !== 'ResetPassword' 
              && route.name !== 'DeviceSetting'
              && route.name !== 'SendNotification'
              && route.name !== 'NotificationList' 
              && route.name !== 'About' 
              && route.name !== 'Dashboard' 
              && route.name !== 'Reader' 
              && route.name !== 'QrAuthList' 
              && route.name !== 'Calendar' 
              && route.name !== 'blog' 
              && route.name !== 'UserDietInfo' 
              && route.name !== 'Blog' 
              && route.name !== 'WriteMeal' 
              && route.name !== 'ExerciseHistory' 
              && route.name !== 'MealHistory' 
              && route.name !== 'WeightHistory' 
        )
    }
  }
}
</script>

<style>

</style>
