<template>
  <q-page>
    <div class="row">
      <span class="text-subtitle2 text-red-9">
          {{ devcomment }}
      </span>
      <div
        v-if="!showCamera"
        class="col-12 text-center q-pt-md"
      >
          <img
          alt="Framework logo"
          src="../../assets/images/qrcode/qrcode-sample.png"
          style="width: 340px"
        >
      </div>
      
    </div>
    <div class="row justify-center q-pt-lg">
       <div class="col-12 text-center" style="max-width: 450px">
        <span class="text-subtitle2 text-grey-9">
          {{ textInfo }}
        </span>
        <div class="col-10 q-pt-lg">
          <q-btn color="blue-grey-10" rounded icon="camera_alt" label="Read QRCode"
            class="full-width" size="lg" @click="turnCameraOn()"
            v-show="!showCamera"/>
        </div>
          <p class="text-subtitle1" v-if="result">최근 인증 : <b>{{ result }}</b></p>
          <div v-if="showCamera" class="fullscreen">
            <qrcode-stream :camera="camera" :key="_uid" :track="paintBoundingBox" @decode="onDecode">
              {{this.result}}
              <q-card class="my-card absolute-bottom">
                <q-card-section>
                  <q-btn color="blue-grey-10" rounded icon="camera_alt" label="닫기"
                    class="full-width" size="lg" @click="turnCameraOff()"
                    v-show="showCamera"/>
                </q-card-section>
              </q-card>
            </qrcode-stream>
            <!-- <qrcode-drop-zone></qrcode-drop-zone> -->
            <!-- <qrcode-capture></qrcode-capture> -->
          </div>
        <div class="col-10 q-pt-lg">
          <q-btn color="blue-grey-10" rounded icon="camera_alt" label="Cancel"
            class="full-width" size="lg" @click="turnCameraOff()"
            v-show="showCamera"/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
export default {
  name: 'PageIndex',
  components: { QrcodeStream },
  data () {
    return {
      isValid: undefined,
      camera: 'auto',
      result: null,
      showCamera: true,
      devcomment: 'chrome://flags/#unsafely-treat-insecure-origin-as-secure 기능 활성화 및 테스트 url(포트 포함) 넣기 , 크롬에서 기기(카메라 등)의 제어가 가능, 테스트 용도로만 사용하고 실 환경에서는 https 구성하여 사용해야함'
    }
  },
  computed: {
    textInfo () {
      return this.showCamera ? 'position the qrcode on the camera' : 'Press the button and scan a qrcode.'
    }
  },
  watch: {
    result: function (data) {
      console.log(data)
      this.showNotif(data)
      this.regQrCheck(this.$store.state.auth.user.email,data, data + ' 인증 ')
    }
  },
  methods: {
    async onDecode (content) {
      this.result = content
      // this.turnCameraOff()
      
    },
    turnCameraOn () {
      this.camera = 'auto'
      this.showCamera = true
    },
    turnCameraOff () {
      this.camera = 'off'
      this.showCamera = false
      this.$router.go('/dashboard')
    },
    paintBoundingBox (detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const { boundingBox: { x, y, width, height } } = detectedCode

        ctx.lineWidth = 2
        ctx.strokeStyle = '#007bff'
        ctx.strokeRect(x, y, width, height)
      }
    },
    showNotif (data) {
      this.$q.notify({
          message: data + '인증되었습니다.',
          color: 'primary',
          position: 'center',
          multiLine: true,
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          // actions: [
          //   { label: '열기', color: 'yellow', handler: () => { this.$router.push('/notification-list')} }
          // ]
        })
    },
    async regQrCheck (verifier, holder, text ) {
      try {
          const push = await this.$feathersClient.service('qrauth').create(
            {
              verifier : verifier,
              holder: holder,
              text: text
            }               
          )
      } catch (err) {
          console.log('regQrCheck create error', err)
      }
    }
  }
}
</script>

<style scoped>
.fullscreen {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: black;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
}
.my-card {
  width: 100%;
  height: 20%;
}
/* .validation-success,
.validation-failure,
.validation-pending {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, .8);
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  padding: 10px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.validation-success {
  color: green;
}
.validation-failure {
  color: red;
} */
</style>