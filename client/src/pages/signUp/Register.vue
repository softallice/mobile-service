<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'50%'}">
          <q-card-section>
            <div class="col-lg-8" v-if="!registrationComplete">
              <q-form @submit="onSubmit" class="q-gutter-md q-mt-sm">
                <div class="row justify-start items-start">
                  <p class="q-ma-sm body-1">
                  회원 가입을 통하여 서비스를 이용하실수 있습니다.
                  </p>
                  <div class="col-12">
                    <q-input
                      outlined
                      v-model="$v.formData.firstname.$model"
                      label="이름"
                      label-color="accent"
                      hint="이름"
                      lazy-rules
                      dense
                      class="q-ma-sm"
                      :error="
                        $v.formData.firstname.$invalid && $v.formData.firstname.$dirty
                      "
                    >
                      <template v-slot:prepend>
                        <q-icon color="accent" name="fas fa-user" size="xs" />
                      </template>
                      <template v-slot:error>
                        <div v-if="!$v.formData.firstname.required">
                          필수 항목입니다.
                        </div>
                        <div v-if="!$v.formData.firstname.minLength">
                          한글자 이상 입력해 주세요
                        </div>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 ">
                    <q-input
                      outlined
                      v-model="$v.formData.lastname.$model"
                      label="성"
                      label-color="accent"
                      hint="성씨"
                      lazy-rules
                      dense
                      class="q-ma-sm"
                      :error="
                        $v.formData.lastname.$invalid && $v.formData.lastname.$dirty
                      "
                      error-message="Must be at least 2 characters"
                    >
                      <template v-slot:prepend>
                        <q-icon color="accent" name="fas fa-user" size="xs" />
                      </template>
                      <template v-slot:error>
                        <div v-if="!$v.formData.lastname.required">
                          필수 항목입니다.
                        </div>
                        <div v-if="!$v.formData.lastname.minLength">
                          한글자 이상 입력해 주세요
                        </div>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 ">
                    <q-input
                      outlined
                      v-model="$v.formData.email.$model"
                      label-color="accent"
                      label="Email"
                      type="email"
                      hint="검증된 이메일 사용"
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
                          필수 항목입니다.
                        </div>
                        <div v-if="!$v.formData.email.email">
                          Please provide a valid email address
                        </div>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 ">
                    <q-input
                      outlined
                      v-model="$v.formData.confirmEmail.$model"
                      label-color="accent"
                      label="Email 확인"
                      type="text"
                      lazy-rules
                      hint="입력된 이메일 확인"
                      dense
                      class="q-ma-sm"
                      :error="
                        $v.formData.confirmEmail.$invalid &&
                          $v.formData.confirmEmail.$dirty
                      "
                    >
                      <template v-slot:prepend>
                        <q-icon color="accent" name="fas fa-envelope" size="xs" />
                      </template>
                      <template v-slot:error>
                        <div v-if="!$v.formData.confirmEmail.sameAsEmail">
                          동일한 이메일을 입력해야 합니다.
                        </div>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 ">
                    <q-input
                      outlined
                      v-model="$v.formData.password.$model"
                      label-color="accent"
                      label="Password"
                      type="password"
                      lazy-rules
                      dense
                      class="q-ma-sm"
                      hint="최소 8자리 이상 필요"
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
                          필수 항목입니다.
                        </div>
                        <div v-if="!$v.formData.password.minLength">
                          Password must be at least 8 characters.
                        </div>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 ">
                    <q-input
                      outlined
                      type="password"
                      label-color="accent"
                      v-model="$v.formData.confirmPassword.$model"
                      label="Password 확인"
                      lazy-rules
                      dense
                      hint="Password 확인"
                      class="q-ma-sm"
                      :error="
                        $v.formData.confirmPassword.$invalid &&
                          $v.formData.confirmPassword.$dirty
                      "
                    >
                      <template v-slot:prepend>
                        <q-icon color="accent" name="fas fa-lock" size="xs" />
                      </template>
                      <template v-slot:error>
                        <div v-if="!$v.formData.confirmPassword.sameAsPassword">
                          동일한 패스워드를 입력해야 합니다.
                        </div>
                      </template>
                    </q-input>
                  </div>
                </div>

                <div class="q-pa-sm">
                  <q-btn
                    class="full-width"
                    :disable="disableSubmit"
                    :loading="submitting"
                    label="Register"
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
            <div class="col-lg-8 text-center" v-else>
              회원등록이 완료 되었습니다. 이메일 검증을 부탁 드립니다.
              (이메일로 확인 메일 발송)
              <q-btn
                class="full-width"
                label="로그인 페이지로 이동"
                to="/login"
                color="positive"
              >
              </q-btn>
            </div>
          </q-card-section>
        </q-card>        
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      formData: {
        firstname: "",
        lastname: "",
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: ""
      }
    };
  },
  validations: {
    formData: {
      firstname: {
        required,
        minLength: minLength(1)
      },
      lastname: {
        required,
        minLength: minLength(1)
      },
      email: {
        required,
        email
      },
      confirmEmail: {
        sameAsEmail: sameAs(formData => {
          return formData.email;
        })
      },
      password: {
        required,
        minLength: minLength(8)
      },
      confirmPassword: {
        sameAsPassword: sameAs(formData => {
          return formData.password;
        })
      }
    }
  },
  computed: {
    ...mapState({
      submitting: state => state.auth.showLoading,
      registrationComplete: state => state.auth.registrationComplete
    }),
    disableSubmit() {
      return this.$v.formData.$invalid;
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("account/registerUser", { formData: this.formData });
    }
  }
};
</script>
