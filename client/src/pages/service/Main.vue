<template>
  <div class="q-pa-md row justify-center q-gutter-md">
    <q-card class="my-card border-radius  ">
      <q-img
        src="../../assets/images/cards/main_card.png"
        basic
      >
        <div class="border-radius" style="background: white">
            <qriously :value="text" :size="100"  />    
        </div>
        <div class="absolute-bottom text-subtitle2 text-left">
            <!-- 이름 : {{userName}} -->
        </div>
      </q-img>
    </q-card>
    
    <!-- 카드 리스트  -->
    <q-card class="my-card" @click="$router.push('/login')">
        <q-card-section >
          <q-card-section horizontal class="col-6 flex flex-center">
            <q-img
              class="rounded-border"
              style="height: 55px; max-width: 55px"
              src="../../assets/images/menus/insurance.png"
            />
            <q-card-actions vertical>
              <div>
                <div class="text-weight-bold">예방접종</div>
                <div class="text-grey">예방접종 상세 내역을 확인해 보세요.</div>
              </div>
            </q-card-actions>

            <q-card-actions vertical>
              <q-btn flat round color="primary"  icon="chevron_right" />
            </q-card-actions>
          </q-card-section>
        </q-card-section>
    </q-card>

    <!-- 카드 리스트  -->
    <q-card class="my-card" @click="$router.push('/login')">
        <q-card-section >
          <q-card-section horizontal class="col-6 flex flex-center">
            <q-img
              class="rounded-border"
              style="height: 55px; max-width: 55px"
              src="../../assets/images/menus/insurance.png"
            />
            <q-card-actions vertical>
              <div>
                <div class="text-weight-bold">예방접종</div>
                <div class="text-grey">예방접종 상세 내역을 확인해 보세요.</div>
              </div>
            </q-card-actions>

            <q-card-actions vertical>
              <q-btn flat round color="primary"  icon="chevron_right" />
            </q-card-actions>
          </q-card-section>
        </q-card-section>
    </q-card>

    <!-- 카드 리스트  -->
    <q-card class="my-card" @click="$router.push('/login')">
        <q-card-section >
          <q-card-section horizontal class="col-6 flex flex-center">
            <q-img
              class="rounded-border"
              style="height: 55px; max-width: 55px"
              src="../../assets/images/menus/insurance.png"
            />
            <q-card-actions vertical>
              <div>
                <div class="text-weight-bold">예방접종</div>
                <div class="text-grey">예방접종 상세 내역을 확인해 보세요.</div>
              </div>
            </q-card-actions>

            <q-card-actions vertical>
              <q-btn flat round color="primary"  icon="chevron_right" />
            </q-card-actions>
          </q-card-section>
        </q-card-section>
    </q-card>

    <!-- 카드 리스트  -->
    <q-card class="my-card" @click="$router.push('/login')">
        <q-card-section >
          <q-card-section horizontal class="col-6 flex flex-center">
            <q-img
              class="rounded-border"
              style="height: 55px; max-width: 55px"
              src="../../assets/images/menus/insurance.png"
            />
            <q-card-actions vertical>
              <div>
                <div class="text-weight-bold">예방접종</div>
                <div class="text-grey">예방접종 상세 내역을 확인해 보세요.</div>
              </div>
            </q-card-actions>

            <q-card-actions vertical>
              <q-btn flat round color="primary"  icon="chevron_right" />
            </q-card-actions>
          </q-card-section>
        </q-card-section>
    </q-card>

    <!-- 카드 리스트  -->
    <q-card class="my-card" @click="$router.push('/login')">
        <q-card-section >
          <q-card-section horizontal class="col-6 flex flex-center">
            <q-img
              class="rounded-border"
              style="height: 55px; max-width: 55px"
              src="../../assets/images/menus/insurance.png"
            />
            <q-card-actions vertical>
              <div>
                <div class="text-weight-bold">예방접종</div>
                <div class="text-grey">예방접종 상세 내역을 확인해 보세요.</div>
              </div>
            </q-card-actions>

            <q-card-actions vertical>
              <q-btn flat round color="primary"  icon="chevron_right" />
            </q-card-actions>
          </q-card-section>
        </q-card-section>
    </q-card>
    
  </div>
</template>
<script>

export default {
  data () {
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      text: 'https://www.naver.com/',
    //   userName: this.$store.state.auth.user.firstname ? this.$store.state.auth.user.firstname : '홍길동'
    }
  },
  methods: {
      //해당 바코드 다운로드시 
    donwloadCanvas () {
      const canvas = document.getElementsByTagName('canvas')
      const link = document.createElement('a')
      link.download = 'QRCode.png'
      link.href = canvas[0].toDataURL()
      link.click()
    }
  }
}
</script>
<style lang="sass" scoped>
.my-card
  width: 90%
  max-width: 480px
.border-radius 
  border-radius: 10px
.custom-caption
    text-align: center
    padding: 12px
    color: white
</style>