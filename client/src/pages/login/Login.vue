
<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'50%'}">
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h8 ellipsis">
                어플에 로그인 하시면 <br>
                서비스를 모두 이용 하실 수 있습니다.                
              </div>
            </div>
          </q-card-section>
          <q-card-section>
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
                        필수 입력 항목입니다.
                        </div>
                        <div v-if="!$v.formData.email.email">
                        검증된 이메일을 등록해 주세요.
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
                        필수 입력 항목입니다.
                        </div>
                        <div v-if="!$v.formData.password.minLength">
                        Password는 8자리 이상입니다.
                        </div>
                    </template>
                    </q-input>
                </div>
                </div>

                <div class="row justify-between">
                <router-link to="/forgot-password">비밀번호 찾기?</router-link>
                <q-space />
                <q-btn
                    label="회원가입"
                    color="primary"
                    to="/consent"
                >
                    <template v-slot:loading>
                    <q-spinner-facebook />
                    </template>
                </q-btn>
                <!-- <q-btn
                    label="회원가입"
                    color="positive"
                    to="/register"
                >
                    <template v-slot:loading>
                    <q-spinner-facebook />
                    </template>
                </q-btn> -->
                <q-space />
                <q-btn
                    :disable="disableSubmit"
                    :loading="submitting"
                    label="로그인"
                    type="submit"
                    color="primary"
                >
                    <template v-slot:loading>
                    <q-spinner-facebook />
                    </template>
                </q-btn>
                </div>
            </q-form>
          </q-card-section>
          <q-card-section>
            <q-list bordered>
              <q-item clickable v-ripple @click="login('google')">
                <q-item-section avatar>
                  <q-avatar rounded size="sm">
                    <img src="../../assets/images/login/google.png">
                  </q-avatar>
                </q-item-section>
                <q-item-section>Google로 로그인</q-item-section>
              </q-item>
              
              <q-separator />

              <q-item clickable v-ripple @click="login('naver')">
                <q-item-section avatar>
                  <q-avatar rounded size="sm">
                    <img src="../../assets/images/login/naver.png">
                  </q-avatar>
                </q-item-section>
                <q-item-section>Naver로 로그인</q-item-section>
              </q-item>
              <q-separator />

              <q-item clickable v-ripple @click="login('kakao')">
                <q-item-section avatar >
                  <q-avatar rounded size="sm">
                    <img src="../../assets/images/login/kakao.png">
                  </q-avatar>
                </q-item-section>
                <q-item-section>Kakao로 로그인</q-item-section>
              </q-item>

              <q-separator />
              
              <q-item clickable v-ripple @click="login('apple')">
                <q-item-section avatar>
                  <q-avatar rounded size="sm">
                    <img src="../../assets/images/login/apple.png">
                  </q-avatar>
                </q-item-section>
                <q-item-section>Apple로 로그인</q-item-section>
              </q-item>

            </q-list>
            
            <!-- <q-form
              class="q-gutter-md q-gutter-sm"
            >
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

                         
            </q-form> -->
          </q-card-section>
        </q-card>
        
        
        <!-- <q-btn class="full-width absolute-bottom" label="회원가입" to="/consent" type="button" color="primary"/>             -->
      </q-page>
    </q-page-container>
  </q-layout>
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
    login(loginType) {
      if (loginType === 'google') {
        window.open(this.apiUrlGoogle, '_self'); 
      } else if (loginType === 'naver') {
        window.open(this.apiUrlNaver, '_self');  
      } else if (loginType === 'kakao') {
        window.open(this.apiUrlKakao, '_self');  
      } else if (loginType === 'apple') {
        ''
      } else {
        ''
      }
    },
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

// login_text {
//   font-size: 1.0em;
//   display: inline-block;
//   // font-family: 'Noto Sans KR', sans-serif;
//   padding: 2px 0 0 38px;
//   letter-spacing: -0.025rem;
// }

// login_list {
//   border: 1px solid #e4e4e4;
//   margin-bottom: 10px;
//   padding: 2px 0px 2px 20px;
//   margin: 8px 25px;
//   height: 60px;
// }

// Google{ 
//   background:url("../../assets/images/login/google.png") no-repeat 8px center; 
//   background-size:19px
// }
// kakao{ 
//   background:url("../../assets/images/login/kakao.png") no-repeat 8px center; 
//   background-size:19px
// }
// naver{
//   background:url("../../assets/images/login/naver.png") no-repeat 8px center; 
//   background-size:19px
// }
// apple{
//   background:url("../../assets/images/login/apple.png") no-repeat 8px center; 
//   background-size:19px
// }
</style>
