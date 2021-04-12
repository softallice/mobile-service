<template>
  <q-page class="flex flex-center">
    <div>
      <div class="q-gutter-md q-mt-sm row justify-start items-start">
        <div class="col-12">
        <!-- <a :href="apiUrl" class="google-signup">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><title>Google</title><g fill="none" fill-rule="evenodd"><path fill="#4285F4" d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"></path><path fill="#34A853" d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z"></path><path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V4.9582H.9573A8.9965 8.9965 0 0 0 0 9c0 1.4523.3477 2.8268.9573 4.0418L3.964 10.71z"></path><path fill="#EA4335" d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z"></path></g></svg>
              Google 계정으로 계속하기
        </a> -->
        <q-btn
          block
          flat
          type="a" 
          :href="apiUrlGoogle" 
          target="_self"
        >
          <img src="../../assets/images/login/login.google.png">
        </q-btn>
        <q-space />
        <q-btn
          block
          flat
          type="a" 
          :href="apiUrlNaver" 
          target="_self"
        >
          <img src="../../assets/images/login/login.naver.png">
        </q-btn>
        <q-space />

        <q-btn
          block
          flat
          type="a" 
          :href="apiUrlKakao" 
          target="_self"
        >
          <img src="../../assets/images/login/login.kakao.png">
        </q-btn>
        <q-space />

        <!-- <q-btn
          outline color="primary" 
          label="Google 계정으로 계속하기(client)" 
          @click="googlelogin"
        /> -->
        <q-space />
      </div>

        <q-separator />
    </div>
      <q-form @submit="onSubmit" class="q-gutter-md q-mt-sm">
        <div class="row justify-start items-start">
          <div class="col-12">
            <q-input
              outlined
              v-model="$v.formData.email.$model"
              label-color="accent"
              label="Email"
              type="email"
              lazy-rules
              dense
              class="q-ma-sm"
              :error="$v.formData.email.$invalid && $v.formData.email.$dirty"
            >
              <template v-slot:prepend>
                <q-icon color="accent" name="fas fa-envelope" size="xs" />
              </template>
              <template v-slot:error>
                <div v-if="!$v.formData.email.required">
                  This field is required.
                </div>
                <div v-if="!$v.formData.email.email">
                  Please provide a valid email address
                </div>
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <q-input
              outlined
              v-model="$v.formData.password.$model"
              label-color="accent"
              label="Password"
              type="password"
              lazy-rules
              dense
              class="q-ma-sm"
              :error="
                $v.formData.password.$invalid && $v.formData.password.$dirty
              "
              error-message=""
            >
              <template v-slot:prepend>
                <q-icon color="accent" name="fas fa-lock" size="xs" />
              </template>
              <template v-slot:error>
                <div v-if="!$v.formData.password.required">
                  This field is required.
                </div>
                <div v-if="!$v.formData.password.minLength">
                  Password must be at least 8 characters.
                </div>
              </template>
            </q-input>
          </div>
        </div>

        <div class="row justify-between">
          <router-link to="/forgot-password">Forgot Password?</router-link>
          <q-space />
          <q-btn
            :disable="disableSubmit"
            :loading="submitting"
            label="Login"
            type="submit"
            color="positive"
          >
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </div>
      </q-form>
    </div>
    <div>
      <q-btn color="primary" label="RN test" @click="rnWebView"/>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { required, minLength, email } from "vuelidate/lib/validators";
import { Notify, openURL } from "quasar";
import apiUrl from "./apiUrl"

export default {
  data() {
    return {
      valid: false,
      formData: {
        email: "",
        password: ""
      },
      apiUrlGoogle: apiUrl + '/oauth/google',
      apiUrlNaver: apiUrl + '/oauth/naver',
      apiUrlKakao: apiUrl + '/oauth/kakao'
    };
  },
  validations: {
    formData: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      }
    }
  },
  computed: {
    ...mapState({
      submitting: state => state.auth.showLoading
    }),
    disableSubmit() {
      return this.$v.formData.$invalid;
    }
  },
  mounted () {
    // this.createVc();
    // document.addEventListener("message", function (event) {
    //     window.postMessage(event.data);
    //   });
    // alert("mounted")
    //android
    if (window.ReactNativeWebView) {
      document.addEventListener("message", function (event) {
        window.postMessage(event.data);
        alert(event.data)
      });
      //ios
      // window.addEventListener("message", function (event) {
      //   window.postMessage(event.data);
      //   alert(event.data)
      // });
    }
  },
  methods: {
    async googlelogin() {
      // const accessToken = await this.$feathersClient.reAuthenticate()
      // const accessToken = await this.$feathersClient.authentication.getAccessToken()
      // console.log('accessToken', accessToken)
      this.$store.dispatch('auth/authenticate', {
          strategy: 'google'
          })
    },
    rnWebView() {
      if (window.ReactNativeWebView) {
        // 모바일이라면 모바일의 카메라 권한을 물어보는 액션을 전달합니다.
        window.ReactNativeWebView.postMessage(
          // JSON.stringify({ type: "REQ_CAMERA_PERMISSION" })
          'webview to react native'
        );
      } else {
        // 모바일이 아니라면 모바일 아님을 alert로 띄웁니다.
        alert('not mobile!!!!');
      }
    },
    onSubmit() {
      //this.$store.dispatch("auth/loginUser", { formData: this.formData });
      this.$store
        .dispatch("auth/authenticate", {
          strategy: "local",
          email: this.formData.email,
          password: this.formData.password
        })
        // Just use the returned error instead of mapping it from the store.
        .catch(err => {
          // Convert the error to a plain object and add a message.
          let type = err.className;
          err = Object.assign({}, err);
          err.message =
            type === "not-authenticated"
              ? "Incorrect email or password."
              : "An error prevented login.";
          this.error = err;
          Notify.create({
            message: "Incorrect username/password combination.",
            color: "negative"
          });
        });
    },
  }
};
</script>
<style lang="scss">
a {
  &:hover {
    font-weight: bold;
  }
  text-decoration: none;
}
</style>
