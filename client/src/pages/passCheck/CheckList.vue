<template>
  <div class="q-pa-md" style="width: 100%">
    <q-list class="q-ma-sm q-mt-md">
        <q-expansion-item
          v-for="(check, index) in check_data" :key="index"
          style="border-radius: 10px"
          popup
          header-class="bg-primary"
        >
          <template v-slot:header>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://avatars2.githubusercontent.com/u/34883558?s=400&v=4">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label >{{check.verifier}}(검증자)</q-item-label>
              <q-item-label caption>{{check.createdAt}}</q-item-label>
            </q-item-section>
          </template>

          <q-separator/>
          <q-card>
            <q-card-section>
                {{check.holder}}
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
  </div>
</template>
<script>
export default {
  data () {
    return {
      check_data: [
          {
              verifier : 'aaaaa',
              holder: 'bbbb',
              text: '인증되었습니다.'
          }
        ],
      message: {}
    }
  },
  mounted () {
    this.getQrAuth()
    this.$feathersClient.service('qrauth')
      .on('created', message => this.message = message);
  },
  watch: {
    message: function (data) {
      this.getQrAuth()
    }
  },
  methods: {
    async getQrAuth () {
    //   const resFind = await this.$feathersClient.service('notifications').find({ query: { $sort: { createdAt: 1 } } })
      try {
        // const resFind = await this.$axiosInstance.get("/notifications?$limit=10&$sort[createdAt]=-1")
        const resFind = await this.$axiosInstance.get("/qrauth?$sort[createdAt]=-1")
        this.check_data = resFind.data.data
        // console.log(this.check_data)
      } catch (err) {
          console.log(err)
      }
    
    //   this.$axiosInstance.get("/notifications").then((r) => {
    //       this.notification_data = res.data.data
    //   }).catch((err)=> {
    //       console.log(err)
    //   })
    }
  }
}
</script>