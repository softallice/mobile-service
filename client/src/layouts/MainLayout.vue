<template>
  <q-layout view="hHh Lpr fFf"
    @scroll="updateHeaderColor"
    >
    <AppHeader 
      v-if="$route.name !== 'Login' && $route.name !== 'Register' && $route.name !== 'Consent' && $route.name !== 'Reader'"
      :transparent="transparent"
      class="header"
      />
    <AppDrawer />
    <AppFooter v-if="$route.name !== 'Login' && $route.name !== 'Register' && $route.name !== 'Consent' && $route.name !== 'Reader' && $store.state.auth.user" />
    <q-page-container class="app-page-container">
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
      >
        <Loading v-if="isLoading" />
      </transition>
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
      >
        <keep-alive>
          <!-- <router-view v-if="!!(content && !isLoading)" :content="content" /> -->
          <router-view :key="$route.fullPath"/>
        </keep-alive>
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import AppHeader from 'components/layout/AppHeader.vue'
import AppDrawer from 'components/layout/AppDrawer'
import AppFooter from 'components/layout/AppFooter.vue'
import Loading from 'components/layout/AppLoadingScreen'

export default {
  name: 'MainLayout',
  components: {
    AppHeader,
    AppDrawer,
    AppFooter,
    Loading
  },
  // props: {
  //   content: {
  //     type: Object,
  //     required: true
  //   }
  // },
  data: () => ({
    isLoading: false,
    transparentHeader: true,
    transparent: { transparent: ''}
  }),
  mounted () {
    this.$root.$on('onAPILoadingStart', () => { this.isLoading = true })
    this.$root.$on('onAPILoadingEnd', () => { this.isLoading = false })
  },
  methods: {
    updateHeaderColor (details) {
      // Only run if the page has set the header transparency
      // 상단 메뉴 투명도 조절 40 이상일 경우
      if (details.position <= 40) {
        this.transparentHeader = false
        this.transparency ()
      } else if (details.position > 40) {
        this.transparentHeader = true
        this.transparency ()
      }
    },
    transparency () {
      if (this.transparentHeader) {
        this.transparent = { transparent: 'transparent'}
      } else {
        this.transparent =  { transparent: ''}
      }
    }
  },
}
</script>

<style lang="scss">
.app-page-container {
  width: 100%;
  max-width: 1280px;
  margin: auto;
}
</style>
