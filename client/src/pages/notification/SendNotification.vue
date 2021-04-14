<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
    >
        <!-- 메시지 Title -->
        <q-input
            filled
            v-model="title"
            label="Notification Title *"
            hint="제목 or 주제"
            lazy-rules
            :rules="[ val => val && val.length > 0 || '필수 입력']"
        />
        <!-- 메시지 Body -->
        <q-editor v-model="body" min-height="5rem" />
        <!-- 메시지 이미지 URL -->
        <q-input
            filled
            v-model="image"
            label="이미지 URL *"
            hint="https://....."
            lazy-rules
            
        />
        <!-- 메시지 로고 URL -->
        <q-input
            filled
            v-model="logo"
            label="로고 URL *"
            hint="https://....."
            lazy-rules
            
        />
        <!-- 메시지 리다이렉트 URL -->
        <q-input
            filled
            v-model="url"
            label="URL *"
            hint="https://....."
            lazy-rules
        />
  
      <!-- <q-input
        filled
        type="number"
        v-model="age"
        label="Your age *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]"
      /> -->

      <div>
        <q-btn label="전송" type="submit" color="primary"/>
        <q-btn label="다시작성" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script>

export default {
    data(){
        return {
            title: "",
            body: "",
            image: "",
            logo: "",
            url: "",
            notificationId: ""
        }
    },
    methods: {
        async onSubmit () {
            const data = 
                {
                    "title" : this.title,
                    "body" : this.body,
                    "image" : this.image,
                    "logo" : this.logo,
                    "url" : this.url
                }
            /* notification 등록 */
            try {
                const notification = await this.$feathersClient.service('notifications').create(
                    data
                )
                this.notificationId = notification._id
            } catch (err) {
                console.log('notification Register error', err)
            }

            /* notification 등록 후 push 등록 */
            try {
                const push = await this.$feathersClient.service('push').create(
                    {
                        "notification": this.notificationId
                    }                
                )
            } catch (err) {
                console.log('notification push error', err)
            }

            this.$q.notify(
                {
                    color: 'green-4',
                    textColor: 'white',
                    icon: 'cloud_done',
                    message: 'Submitted'
                }
            )
        },

        onReset () {
            this.title=""
            this.body=""
            this.image=""
            this.logo=""
            this.url=""
        }
  }
}
</script>