<template>
  <q-header
   :class="transparent.transparent"
   class="header"
  >
    <q-toolbar>
      <q-btn
          v-if="$store.state.auth.user && $route.matched.some(({ name }) => name === 'Home' || name === 'Dashboard' || name === 'Setting'  )"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="$root.$emit('ToggleDrawer')"
        />
      <div v-if="$route.matched.some(({ name }) => name === 'Home' || name === 'Dashboard' || name === 'Setting')">
        <q-toolbar-title>
          <h6 class="q-ma-none">송아리 다이어트</h6>
        </q-toolbar-title>
      </div>
      <div v-else>           
          <q-toolbar-title class="row no-wrap justify-start items-center ">
            <q-btn flat icon="arrow_back" @click="backButton" />
            <h6 class="q-ma-none">{{$route.name}}</h6>
          </q-toolbar-title>
      </div>
      
      <q-space/>
        <div class="q-pa-md q-gutter-sm row items-center no-wrap">
          <q-btn v-if="$store.state.auth.user" round dense flat color="white" icon="notifications" @click="showNotif">
            <q-badge v-if="$store.state.notifications.newNotification" color="red" text-color="white" floating :label="$store.state.notifications.newNotification" >
              <!-- {{ $store.state.notifications.newNotification }} -->
            </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>

          <q-btn v-if="$store.state.auth.user" round dense flat >
              <q-avatar size="28px">
                <img src="https://cdn.quasar.dev/app-icons/icon-128x128.png" />
                <!-- <img :src="$store.state.auth.avatar ? $store.state.auth.avatar : ''"> -->
              </q-avatar>
              <q-tooltip>회원정보</q-tooltip>
              <q-menu auto-close :offset="[110, 0]">
              <q-list style="min-width: 150px">
                <q-item clickable v-close-popup @click="profile">
                  <q-item-section avatar>
                    <q-avatar icon="perm_identity" color="primary" text-color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>회원정보</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="logout">
                  <q-item-section avatar>
                    <q-avatar icon="logout" color="secondary" text-color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>로그아웃</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn v-else dense flat 
            icon="login"
            label="로그인"
            to='/login'>
             
          </q-btn>
        </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: 'AppHeader',
  data: () => ({
    showAutocomplete: false,
    isLoadingSuggestedLocations: false,
    location: '',
    suggestedLocations: [],
    isSuggestedLocationClicked: false,
    message: 'asdasdsadasdasd'
  }),
  props: {
    transparent: {
      type: Object,
      required: true
    }
  },
  watch: {
    message: function (data) {
      const newData = {readNotification : 'new'}
      this.$store.dispatch('notifications/setNotificationRead', newData)
    }
  },
  /** 알람과 키를 바인딩 할수 있는 리스트를 만들거나 notify 처리 */
  // computed: mapState(["notification"]),
  mounted () {
    this.$feathersClient.service('notifications')
      .on('created', message => this.message = message);
  },
  methods: {
    logout() {
      this.$router.push("/login")
      this.$store.dispatch("auth/logout")
      // window.localStorage.removeItem('pushToken');
      
    },
    profile() {
      this.$router.push("/account")
    },
    backButton () {
      if (this.$route.name === "Reader") {
        this.$router.go('/dashboard')
      } else {
        this.$router.go(-1)
      }
    },
    showNotif () {
      if (this.$store.state.notifications.newNotification === 'new') {
        this.$q.notify({
          message: this.message.title,
          color: 'primary',
          multiLine: true,
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          actions: [
            { label: '열기', color: 'yellow', handler: () => { this.$router.push('/notification-list')} }
          ]
        })

        this.$store.dispatch('notifications/setNotificationRead', '')
      } else {
        this.$router.push('/notification-list')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.autocomplete-enter-active,
.autocomplete-leave-active {
  transition: all 0.2s ease;
  opacity: 1;
  max-height: 130px;
}

.autocomplete-enter,
.autocomplete-leave-to {
  opacity: 0;
  max-height: 0;
}

.autocomplete-list {
  height: 120px;
  border-radius: 0 0 4px 4px;
  background: rgba(255, 255, 255, 0.07);

  &.zero-results {
    height: 30px;
  }

  span:hover {
    color: #50afe6;
  }
}

.header {
  transition: background-color 1000ms linear;
}
</style>
