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
          <q-toggle color="blue" v-model="notif1" val="battery" />
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
          <q-toggle color="green" v-model="notif2" val="friend" />
        </q-item-section>
      </q-item>

      <q-separator spaced />


      <q-item-label header>알림</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" round icon="notifications" />
        </q-item-section> 
        <q-item-section>
          <q-item-label>알림</q-item-label>
          <q-item-label caption>앱에서 보내는 알림을 받을수 있습니다.</q-item-label>
        </q-item-section>
        <q-item-section side >
          <q-toggle color="blue" v-model="notif1" val="battery" />
        </q-item-section>
      </q-item>

    </q-list>
  </div>
</template>
<script>
export default {
  data () {
    return {
      check1: true,
      check2: false,
      check3: false,

      notif1: true,
      notif2: true,
      notif3: false,

      volume: 6,
      brightness: 3,
      mic: 8
    }
  }
}
</script>