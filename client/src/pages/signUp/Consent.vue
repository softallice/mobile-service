<template>
  <div class="q-pa-md">
    <!-- <div class="text-h8">
      <q-btn label="Reset" push color="white" text-color="primary" @click="step = 1" class="q-mb-md" />
    </div> -->
    <q-stepper
      v-model="step"
     
      ref="stepper"
      color="primary"
      animated
    >
      <q-step
        :name="1"
        title="약관동의"
        icon="settings"
        :done="step > 1"
        :header-nav="step > 1"
      >
      <div class="text-h6 text-center">
        약관 동의
      </div>
      <br>
      <span>
        <q-checkbox v-model="red" color="red" /> 전체 내용에 동의 합니다.
      </span>
      <q-separator />
      <br>
      <span>
        <q-checkbox v-model="red" color="red" /> 
          <span style="background: red; color: white">필수</span> 
          서비스 약관 동의
          <q-btn flat style="color: #FF0080" label="보기" @click="dialog = true"/>
          <q-card dark bordered class="bg-grey-8 my-card">
            <q-card-section>
              <div class="text-h9">
                <q-icon size="xs" style="color: #FF0080"  name="dvr"></q-icon>
                어플에서 제공하는 서비스정의</div>
              <div class="text-h9">
                <q-icon size="xs" style="color: #FF0080"  name="error_outline"></q-icon>
                회사와 회원의 의무 사항과 주의사항</div>
            </q-card-section>
          </q-card>
      </span>
      <br>
      <span>
        <q-checkbox v-model="red" color="red" /> <span style="background: red; color: white">필수</span> 
        개인정보 수집 및 이용 동의
          <q-btn flat style="color: #FF0080" label="보기" @click="dialog = true"/>
          <q-card dark bordered class="bg-grey-8 my-card">
              <q-card-section>
                <div class="text-h9">
                  <q-icon size="xs" style="color: #FF0080"  name="date_range"></q-icon>
                  회원가입 및 관리를 위한 정보수집</div>
                <div class="text-h9">
                  <q-icon size="xs" style="color: #FF0080"  name="perm_contact_calendar"></q-icon>
                  수집을 원하는 종류 및 제공처 안내</div>
                <div class="text-h9">
                  <q-icon size="xs" style="color: #FF0080"  name="vertical_split"></q-icon>
                  수집한 정보의 보유, 이용기간 안내</div>
              </q-card-section>
          </q-card>
      </span>
      <br>
      <span>
        <q-checkbox v-model="red" color="red" /> 
        <span style="background: red; color: white">필수</span> 
        개인정보처리 방침 및 서비스 약관
        <q-btn flat style="color: #FF0080" label="보기" @click="dialog = true"/>
         <q-card dark bordered class="bg-grey-8 my-card">
              <q-card-section>
                <div class="text-h9">
                  <q-icon size="xs" style="color: #FF0080"  name="insert_chart"></q-icon>
                  개인정보 수집 및 제공을 위한 정보 수집</div>
              </q-card-section>
          </q-card>
      </span>
        

        <q-stepper-navigation>
          <q-btn class="full-width" @click="() => { done1 = true; step = 2 }" color="primary" label="계속" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="본인인증 및 완료"
        icon="create_new_folder"
        :done="step > 2"
        :header-nav="step > 2"
      >
        본인인증 및 완료(PASS 모듈과 연계)

        <q-stepper-navigation>
          <div class="row justify-between">
            <q-btn flat @click="step = 1" color="primary" label="뒤로" class="q-ml-sm" />
            <q-btn @click="() => { done2 = true }" color="primary" label="완료" to="/" />
          </div>
        </q-stepper-navigation>
      </q-step>

      
    </q-stepper>
    <!-- dialog -->
    <div class="q-pa-md q-gutter-sm">
      <q-dialog
        v-model="dialog"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card class="text-white">
          <q-bar>
            <q-space />
            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip content-class="text-primary">Close</q-tooltip>
            </q-btn>
          </q-bar>   
          <q-card-section class="q-pt-none">
            <q-markdown :src="markdown" />
          </q-card-section>
          <q-bar>
            <q-space />
            <q-btn dense flat class="full-width" label="닫기" v-close-popup>
              <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
          </q-bar>
        </q-card>
      </q-dialog>
    </div>
  </div>
  
</template>

<script>
import markdown from "./consent.md"
export default {
  name: "Consent",
  data () {
    return {
      step: 1,
      red: false,
      dialog: false,
      maximizedToggle: true,
      markdown: markdown
    }
  },
}
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  // max-width: 250px
</style>