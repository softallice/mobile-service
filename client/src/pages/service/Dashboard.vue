<template>
  <q-page>
    <q-carousel
      animated
      infinite
      v-model="slide"
      :navigation-position="navPos"
      swipeable
      height="200px"
      
      control-color="blue-grey-3"
      :autoplay="autoplay"
    >
    <!-- 01. 캐로셀 광고 -->
      <q-carousel-slide  @click="$router.push('/')" name="first" img-src="https://www.mobihealthnews.com/sites/default/files/Vpassports.png">
        <div class="absolute-right custom-caption">
          <div class="text-h6">V-Health Passport</div>
          <div class="text-subtitle2">백신여권</div>
          <div> 
            <q-btn unelevated  rounded color="primary" size ="sm" label="로그인하기" to="/login" />
          </div>
        </div>
        
      </q-carousel-slide>
      <q-carousel-slide @click="$router.push('/')" name="second" img-src="http://www.anarsolutions.com/wp-content/uploads/2019/07/DID.png">
        <div class="absolute-right custom-caption">
          <div class="text-h6">DID</div>
          <div class="text-subtitle2">분산 신원 증명</div>
          <div> 
            <q-btn unelevated  rounded color="primary" size ="sm" label="로그인하기" to="/login" />
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
     
    <q-separator size="8px" color="white"/>    
    <!-- 02. 유튜브 정보 제공 -->
    <q-card class="my-card">
      <q-card-section>
        <div class="text-subtitle2">코로나 극복</div>
      </q-card-section>
      <q-video src="https://www.youtube.com/embed/OhFl41dn82Q?rel=0" />
      <!-- 동영상은  https://www.youtube.com/embed/<요기에 주소>?rel=0-->
    </q-card>

    <q-separator size="8px" color="white"/>

    <div class="q-pa-md">  
      <q-card class="my-card">
        <div class="text-subtitle2">컬러 변경 <span class="text-weight-bold" style="color: orange">컬러 텍스트</span> </div>
        <q-space />

        <div class="row fit justify-center items-center q-gutter-xs q-col-gutter no-wrap">
          <q-img class="rounded-borders col-5 " style="height: 150px; max-width: 300px" src="https://cdn.pixabay.com/photo/2021/01/15/17/01/green-5919790_960_720.jpg" />
          <q-img class="rounded-borders col-5 " style="height: 150px; max-width: 300px" src="https://cdn.pixabay.com/photo/2020/03/06/08/43/digital-paper-4906487_960_720.jpg" />        
        </div>
        <q-separator size="5px" color="white"/>
        <div class="row fit justify-center items-center q-gutter-xs q-col-gutter no-wrap">
          <q-img class="rounded-borders col-5 " style="height: 150px; max-width: 300px" src="https://cdn.pixabay.com/photo/2021/04/05/21/32/coffee-6154681_960_720.jpg" />
          <q-img class="rounded-borders col-5 " style="height: 150px; max-width: 300px" src="https://cdn.pixabay.com/photo/2020/07/03/14/28/water-5366496_960_720.jpg" />
        </div>
        <q-separator size="5px" color="white"/>
      </q-card>
    </div>
      <q-separator size="10px" color="white"/>
    <!-- 캐로셀 샘플 -->
      <q-carousel
        animated
        v-model="slide2"
        infinite
        swipeable
        height="130px"
        :autoplay="autoplay"
      >
        <q-carousel-slide :name="1" img-src="https://cdn.pixabay.com/photo/2021/01/21/09/11/mountains-5936682_960_720.jpg" />
        <q-carousel-slide :name="2" img-src="https://cdn.pixabay.com/photo/2014/03/30/09/44/cherry-blossoms-301253_960_720.jpg" />
    </q-carousel>

    <!-- (샘플) 다이어트 체중 입력 다이얼로그 -->
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">(샘플)체중 입력</div>
          <q-input 
            filled 
            v-model="weightdate" 
            label="측정일자"
            input-class="text-center">
            <template v-slot:append>
              <q-btn icon="event" round color="primary">
                <q-popup-proxy @before-show="updateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="proxyWeightdate">
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn label="취소" color="primary" flat v-close-popup />
                      <q-btn label="선택" color="primary" flat @click="save" v-close-popup />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-btn>
            </template>
          </q-input>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input 
                filled 
                bottom-slots 
                v-model="bodyWeight" 
                label="무게" 
                type="number"
                counter 
                maxlength="3"
                input-class="text-center">
                <template v-slot:prepend>
                  <q-btn round dense flat icon="remove" @click="weightMinus"  />
                </template>
                <template v-slot:append>
                  <q-btn round dense flat icon="add" @click="weightAdd" />
                </template>
              </q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="취소" v-close-popup />
          <q-btn flat label="저장" v-close-popup @click="saveUserInfo" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- 스티키 버튼 -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="monitor_weight" color="accent" @click="prompt = true" />
    </q-page-sticky>
  </q-page>
</template>

<script>
// import { LocalStorage } from 'quasar'
import { date } from 'quasar'
export default {
  name: 'MainAdv',
  data () {
    return {
      slide: 'first',
      slide2: 1,
      navPos: 'top',
      weightdate: date.formatDate(new Date(), 'YYYY/MM/DD'),
      proxyWeightdate: date.formatDate(new Date(), 'YYYY/MM/DD') ,
      autoplay: true,
      prompt: false,
      bodyWeight: 50,
      userInfo: {},
      userWeight: [],
      
    }
  },
  mounted () {
    
  },
  methods: {
    //일자 선택
    updateProxy () {
      this.proxyWeightdate = this.weightdate
    },

    save () {
      this.weightdate = this.proxyWeightdate
    },
    // 체중 선택
    weightAdd () {
      this.bodyWeight = this.bodyWeight + 1
    },

    weightMinus () {
      this.bodyWeight = this.bodyWeight - 1
    },
     
    async saveUserInfo  () {
    //   // const inputDate = date.formatDate(new Date(), 'YYYY/MM/DD')
    //   try {
    //     this.userWeight = await this.indexdb.get('userWeight');
    //   } catch (e) {
    //     console.error("failed to qusry the userWeight", e);
    //   }

    //   const userBodyWeight = {
    //     weightdate: this.weightdate,
    //     weight: this.bodyWeight,
    //     date: new Date(),
    //   }
    //   // 배열 저장을 위해 
    //   const weightArray = this.userWeight
    //   weightArray.push(userBodyWeight)

    //   // 몸무게 저장
    //   try {
    //     this.indexdb.store('userWeight', weightArray);
    //   } catch (e) {
    //     console.error("failed to save the userweight", e);
    //   }
      
    },
    
  },
//   beforeCreate: async function () {
//       // 로컬 DB 초기화 
//       this.indexdb = new KeyValueStore("user-metadata", "metadata");

//       try {
//         this.userInfo = await this.indexdb.get('userInfo');
//       } catch (e) {
//         console.error("failed to qusry the userInfo", e);
//       }
      
//       if (typeof this.userInfo === 'undefined' ) {
//         this.$router.push('/')
//       }
//     }
}
</script>

<style lang="sass" scoped>
.custom-caption
  text-align: right
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
.my-card
  width: 100%
  // max-width: 300px
</style>
