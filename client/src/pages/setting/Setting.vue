<template>
  <div class="q-pa-md" >
    <q-list bordered padding class="bg-grey-9">
      <q-item-label header>사용자 정보</q-item-label>

      <q-item clickable v-ripple @click="$router.push('/deviceSetting')">
        <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" round icon="settings" />
        </q-item-section>  
        <q-item-section>
          <q-item-label>기기 설정</q-item-label>
          <q-item-label caption>
            인증 비밀번호, 앱 잠그 설정 처리
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="arrow_forward_ios" color="grey" />
        </q-item-section>
      </q-item>
        
        <q-separator spaced inset="item" />

      <q-item clickable v-ripple>
        <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" round icon="backup" />
        </q-item-section> 
        <q-item-section>
          <q-item-label>백업</q-item-label>
          <q-item-label caption>
            앱에 저장된 정보를 백업합니다.
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="arrow_forward_ios" color="grey" />
        </q-item-section>
      </q-item>
      <q-separator spaced inset="item" />

      <q-item clickable v-ripple>
        <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" round icon="share" />
        </q-item-section> 
        <q-item-section>
          <q-item-label>앱 공유하기</q-item-label>
          <q-item-label caption>
            SNS, 카카오등으로 앱 공유
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="arrow_forward_ios" color="grey" />
        </q-item-section>
      </q-item>
      
      <q-separator spaced />
      <q-item-label header>일반</q-item-label>
      <q-item clickable v-ripple @click="$router.push('/notification-list')">
        <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" round icon="notifications" />
        </q-item-section> 
        <q-item-section>
          <q-item-label>공지사항</q-item-label>
          <q-item-label caption>
            주요 알람 정보를 확인
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="arrow_forward_ios" color="grey" />
        </q-item-section>
      </q-item>

        <q-separator spaced inset="item" />

      <q-item clickable v-ripple @click="dialog = true">
        <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" round icon="ballot" />
        </q-item-section> 
        <q-item-section>
          <q-item-label>이용약관</q-item-label>
          <q-item-label caption>
            이용 약관를 다시 확인합니다.
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="arrow_forward_ios" color="grey" />
        </q-item-section>
      </q-item>

        <q-separator spaced inset="item" />

      <q-item clickable v-ripple>
        <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" round icon="question_answer" />
        </q-item-section> 
        <q-item-section>
          <q-item-label>자주 묻는 질문</q-item-label>
          <q-item-label caption>
            주요 질문과 답변
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="arrow_forward_ios" color="grey" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset="item" />

      <q-item clickable v-ripple>
        <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" round icon="design_services" />
        </q-item-section> 
        <q-item-section>
          <q-item-label>서비스 가이드</q-item-label>
          <q-item-label caption>
            앱 서비스에 대한 가이드
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="arrow_forward_ios" color="grey" />
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>서비스정보</q-item-label>
      <q-item clickable v-ripple>
        <q-item-section top avatar>
           <q-avatar color="primary" text-color="white" round icon="info" />
        </q-item-section> 
        <q-item-section>
          <q-item-label>버전 v0.01</q-item-label>
          <q-item-label caption>
            초기 버전입니다.
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced inset="item" />

      <q-item clickable v-ripple>
        <q-item-section top avatar>
           <q-avatar color="primary" text-color="white" round icon="logout" />
        </q-item-section> 
        <q-item-section>
          <q-item-label>서비스 탈퇴</q-item-label>
          <q-item-label caption>
            서비스에서 탈퇴합니다.
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="arrow_forward_ios" color="grey" />
        </q-item-section>
      </q-item>
    </q-list>
    <!-- 이용약관 팝업 -->
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
      mic: 8,
      
      // 이용약관 정보
      dialog: false,
      maximizedToggle: true,
      markdown: null,
    }
  },
  mounted () {
    this.getConsentMd()
    
  },
  methods : {
      async getConsentMd () {
        const consentMd = await this.$feathersClient.service('consent').find({
            query: {
                version: 'latest'
            }
        })
        this.markdown = consentMd.data[0].text
      }
  }
}
</script>