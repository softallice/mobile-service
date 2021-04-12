<template>
  <q-list>
    <q-item-label header>Settings</q-item-label>
    <q-item
      @click="showAvailableThemes = !showAvailableThemes"
      clickable
      v-ripple
    >
      <q-item-section top avatar>
        <q-avatar
          :icon="showAvailableThemes ? 'close' : 'palette'"
          color="white"
          text-color="primary"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>App Theme</q-item-label>
        <q-item-label caption lines="2">Change theme color</q-item-label>
      </q-item-section>
    </q-item>
    <div v-show="showAvailableThemes" class="flex column items-start q-ml-md">
      <q-avatar
        v-for="(theme, key, index) in themes"
        :key="`key-${key}`"
        :style="{ color: theme.primary, '--i': index }"
        @click="changeCurrentTheme(key, theme)"
        color="white"
        class="pointer q-my-sm block"
        icon="palette"
        size="40px"
      />
    </div>
  </q-list>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'DrawerAppSettings',
  data: () => ({
    showAvailableThemes: false
  }),
  computed: {
    ...mapGetters('theme', ['themes'])
  },
  methods: {
    ...mapActions('theme', ['changeTheme']),
    changeCurrentTheme (k, t) {
      this.changeTheme({ key: k, updates: { isActive: !t.isActive } })
      this.showAvailableThemes = !this.showAvailableThemes
    }
  }
}
</script>

<style>
</style>
