<template>
  <div class="q-pa-md" style="width: 100%">
    <q-list class="q-ma-sm q-mt-md">
        <q-expansion-item
          v-for="(notification, index) in notification_data" :key="index"
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
              <q-item-label >{{notification.title}}</q-item-label>
              <!-- <q-item-label caption>{{notification.date}}</q-item-label> -->
            </q-item-section>
          </template>

          <q-separator/>
          <q-card>
            <q-card-section v-html="notification.body">
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
      notification_data: [
          {
              title : 'aaaaa',
              body: 'bbbb'
          },
          {
              title : 'aaaaa',
              body: "cccc"
          },
        ]
    }
  },
  mounted () {
    this.getNotification()
  },
  watch: {
    
  },
  methods: {
    async getNotification () {
    //   const resFind = await this.$feathersClient.service('notifications').find({ query: { $sort: { createdAt: 1 } } })
      try {
        // const resFind = await this.$axiosInstance.get("/notifications?$limit=10&$sort[createdAt]=-1")
        const resFind = await this.$axiosInstance.get("/notifications?$sort[createdAt]=-1")
        this.notification_data = resFind.data.data
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