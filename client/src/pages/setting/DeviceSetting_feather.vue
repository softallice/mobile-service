
<template>
<!-- web-push 기반의 push 메지시  -->
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

      <q-item tag="label" v-ripple @click='togglePush'>
        <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" round icon="notifications" />
        </q-item-section> 
        <q-item-section>
          <q-item-label>알림</q-item-label>
          <q-item-label caption>앱에서 보내는 알림을 받을수 있습니다.</q-item-label>
        </q-item-section>
        <q-item-section side >
          <q-toggle color="blue" v-model="isPushEnabled" val="battery" />
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

      isPushEnabled: false,
      pushButtonDisabled: true,

      volume: 6,
      brightness: 3,
      mic: 8
    }
  },
  mounted () {
    this.registerServiceWorker()
  },
  watch: {
    
  },
  methods: {
    /**
     * Register the service worker.
     */
    registerServiceWorker () {
      if (!('serviceWorker' in navigator)) {
        console.log('Service workers aren\'t supported in this browser.')
        return
      }
      navigator.serviceWorker.register('/feathers-messaging-sw.js')
        .then(() => this.initialiseServiceWorker())
    },
    initialiseServiceWorker () {
      if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
        console.log('Notifications aren\'t supported.')
        return
      }
      if (Notification.permission === 'denied') {
        console.log('The user has blocked notifications.')
        return
      }
      if (!('PushManager' in window)) {
        console.log('Push messaging isn\'t supported.')
        return
      }
      navigator.serviceWorker.ready.then(registration => {
        registration.pushManager.getSubscription()
          .then(subscription => {
            this.pushButtonDisabled = false
            if (!subscription) {
              return
            }
            this.updateSubscription(subscription)
            this.isPushEnabled = true
          })
          .catch(e => {
            console.log('Error during getSubscription()', e)
          })
      })
    },
    /**
     * Subscribe for push notifications.
     */
    subscribe () {
      console.log('subscribe start')
      navigator.serviceWorker.ready.then(registration => {
        const options = { userVisibleOnly: true }
        const vapidPublicKey = 'BE6re2kLElVUj251p0xVTt3_sWoYCGlwxXx6zVcIFU6cFpflEqzg3AUoZ4EGfOmLFqTD_aUSQy4wVgvG7GccI54' 
        if (vapidPublicKey) {
          options.applicationServerKey = this.urlBase64ToUint8Array(vapidPublicKey)
        }
        registration.pushManager.subscribe(options)
          .then(subscription => {
            this.isPushEnabled = true
            this.updateSubscription(subscription)
          })
          .catch(e => {
            if (Notification.permission === 'denied') {
              console.log('Permission for Notifications was denied')
            } else {
              console.log('Unable to subscribe to push.', e)
            }
          })
      })
    },
    /**
     * Unsubscribe from push notifications.
     */
    unsubscribe () {
      navigator.serviceWorker.ready.then(registration => {
        registration.pushManager.getSubscription().then(subscription => {
          if (!subscription) {
            this.isPushEnabled = false
            return
          }
          subscription.unsubscribe().then(() => {
            this.deleteSubscription(subscription)
            this.isPushEnabled = false
          }).catch(e => {
            console.log('Unsubscription error: ', e)
          })
        }).catch(e => {
          console.log('Error thrown while unsubscribing.', e)
        })
      })
    },
    /**
     * Toggle push notifications subscription.
     */
    togglePush () {
      console.log('togglePush' ) //, this.isPushEnabled)

      if (this.isPushEnabled) {
        console.log('togglePush false')
        this.unsubscribe()
      } else {
        console.log('togglePush true' )
        this.subscribe()
      }
    },
    /**
     * Send a request to the server to update user's subscription.
     *
     * @param {PushSubscription} subscription
     */
    updateSubscription (subscription) {
      const key = subscription.getKey('p256dh')
      const token = subscription.getKey('auth')
      const contentEncoding = (PushManager.supportedContentEncodings || ['aesgcm'])[0]
      const data = {
        endpoint: subscription.endpoint,
        expirationTime: subscription.expirationTime,
        keys: {
          p256dh: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : null,
          auth: token ? btoa(String.fromCharCode.apply(null, new Uint8Array(token))) : null
        },
        // publicKey: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : null,
        // authToken: token ? btoa(String.fromCharCode.apply(null, new Uint8Array(token))) : null,
        contentEncoding
      }

      console.log('data', data)

      this.loading = true
      this.$feathersClient.service('subscription').create(data)
      // axios.post('/subscriptions', data)
        .then(() => { this.loading = false })
    },
    /**
     * Send a requst to the server to delete user's subscription.
     *
     * @param {PushSubscription} subscription
     */
    async deleteSubscription (subscription) {
      this.loading = true
      const resFind = await this.$feathersClient.service('subscription').find({
        query: {
          endpoint: subscription.endpoint
        }
      })

      await this.$feathersClient.service('subscription').remove(resFind.data[0]._id, {
        query: {
          endpoint: subscription.endpoint
        }
      })
      .then(() => { this.loading = false })
    },
    /**
     * Send a request to the server for a push notification.
     */
    sendNotification () {
      this.loading = true
      axios.post('/notifications')
        .catch(error => console.log(error))
        .then(() => { this.loading = false })
    },
    /**
     * https://github.com/Minishlink/physbook/blob/02a0d5d7ca0d5d2cc6d308a3a9b81244c63b3f14/app/Resources/public/js/app.js#L177
     *
     * @param  {String} base64String
     * @return {Uint8Array}
     */
    urlBase64ToUint8Array (base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4)
      const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/')
      const rawData = window.atob(base64)
      const outputArray = new Uint8Array(rawData.length)
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
      }
      return outputArray
    }
  }
}
</script>