<template>
  <div class="q-pa-md" style="width: 90%">
    <q-list bordered padding>
      <q-item-label header>보안</q-item-label>
      
      <q-item clickable v-ripple>
        <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" round icon="password" />
        </q-item-section> 
        <q-item-section>
          <q-item-label>인증 비밀번호 재설정</q-item-label>
          <q-item-label caption>
            초기 설정된 인증번호를 재설정합니다.
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced inset="item" />
     
      <q-item tag="label" v-ripple>
        <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" round icon="screen_lock_portrait" />
        </q-item-section> 
        <q-item-section>
          <q-item-label>앱 잠금 설정</q-item-label>
        </q-item-section>
        <q-item-section side >
          <q-toggle color="blue" v-model="notif1" val="lock" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset="item" />

      <q-item tag="label" v-ripple>
        <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" round icon="fingerprint" />
        </q-item-section> 
        <q-item-section>
          <q-item-label>생체 정보 인증 설정</q-item-label>
          <q-item-label caption>지문등 인증</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-toggle color="green" v-model="notif2" val="bio" />
        </q-item-section>
      </q-item>

      <q-separator spaced />


      <q-item-label header>알림</q-item-label>

      <q-item tag="label" v-ripple > 
        <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" round icon="notifications" />
        </q-item-section> 
        <q-item-section>
          <q-item-label>알림</q-item-label>
          <q-item-label caption>앱에서 보내는 알림을 받을수 있습니다.</q-item-label>
        </q-item-section>
        <q-item-section side >
          <q-toggle color="blue" v-model="notifications" val="push" />
        </q-item-section>
      </q-item>

      <q-item-label header>배경</q-item-label>

      <q-item tag="label" v-ripple > 
        <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" round icon="palette" />
        </q-item-section> 
        <q-item-section>
          <q-item-label>다크테마</q-item-label>
          <q-item-label caption>배경을 다크로 변경.</q-item-label>
        </q-item-section>
        <q-item-section side >
          <q-toggle color="blue" v-model="palette" val="dark" />
        </q-item-section>
      </q-item>

    </q-list>
  </div>
</template>
<script>

export default {
  data () {
    return {

      notif1: true,
      notif2: true,
      notifications: this.$store.state.notifications.pushToken !== null,
      palette: false
    }
  },
  mounted () {
  },
  watch: {
    notifications (val) {
      if (val) {
        this.$store.dispatch('notifications/enableNotifications').finally(() => this.$store.state.notifications.pushToken !== null)
      } else {
        this.$store.dispatch('notifications/disableNotifications').finally(() => this.$store.state.notifications.pushToken !== null)
      }
    },
    palette (val) {
      if (val) {
        this.$q.dark.set(true)
        localStorage.setItem('dark', true)
      } else {
        this.$q.dark.set(false)
        localStorage.setItem('dark', false)
      }
    }
  },
  methods: {
    togglePush () {
      console.log('togglePush' )

      if (this.notifications) {
        console.log('togglePush false')
        this.notifications = false
      } else {
        console.log('togglePush true' )
        this.notifications = true
      }
    },
  }
}
</script>