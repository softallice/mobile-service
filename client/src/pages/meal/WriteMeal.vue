<template>
  <div class="q-pa-md" style="max-width: 800px">
    <h6 class="subtitle">{{isNew ? 'Create new ' : 'Edit existing'}} Blog Entry</h6>
    <q-form
      @submit="saveEntry"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="valueProp.title"
        label="제목"
        required
      />
      <q-input
        filled
        v-model="valueProp.type"
        label="식사유형"
      />
      <!-- <q-input
        filled
        v-model="valueProp.eatType"
        label="식사유형"
      /> -->
      <div class="q-gutter-sm">
        <q-radio v-model="valueProp.eatType" val="소식" label="소식" />
        <q-radio v-model="valueProp.eatType" val="적당" label="적당" />
        <q-radio v-model="valueProp.eatType" val="과식" label="과식" />
        <q-radio v-model="valueProp.eatType" val="폭식" label="폭식" />
      </div>
      <!-- <q-input
        filled
        v-model="valueProp.writeDate"
        label="등록일자"
        required
      /> -->
      <q-input filled label="등록일자" v-model="valueProp.writeDate" mask="date" :rules="['date']">
        <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="valueProp.writeDate">
                <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
                </q-date>
            </q-popup-proxy>
            </q-icon>
        </template>
      </q-input>
      <q-input
        filled
        type="textarea"
        v-model="valueProp.text"
        label="메모"
      />
      <q-input
        filled
        v-model="valueProp.color"
        label="아이콘컬러"
      />
      <q-input
        filled
        v-model="valueProp.icon"
        label="아이콘모양"
      />
      <q-input
        filled
        v-model="valueProp.side"
        label="아이콘위치"
      />
      <q-input
        filled
        v-model="valueProp.sort"
        label="정렬"
      />


      <div v-if="valueProp.images" class="q-gutter-sm row items-start">
          <div class="card" v-for="(image, idx) of valueProp.images" :key="image" style="width: 200px; display: inline-block">
              <q-img
                :src="'http://localhost:3030/blobs/' + image"
                spinner-color="red"
                style="height: 140px; max-width: 150px"
            />
            <div class="text-center text-italic text-body2">
                <a href="#" class="card-footer-item" @click.prevent="deleteImage(idx)">Delete</a>
            </div>
          </div>
          
      </div>
       
        <q-file
            accept="image/*" @input="imageAdded"
            v-model="files"
            label="Pick files"
            filled
            counter
            multiple
            style="max-width: 300px"
        />
        <q-btn class="full-width absolute-bottom" label="저장" type="submit" color="primary"  />
      
    </q-form>

  </div>
</template>
<script>
export default {
    name: 'WriteMeal',
    // 파라메터가 아닌 props로 받는거 나중에 확인
    props: {
        // current model
        valueProp: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        uploadingImage: false,
        uploadingAttachment: false,
        files: null,
        valueParams: {}
    }),
    // created() {
    //     this.valueParams = this.$route.params.valueProp
    //     console.log('this.valueParams', this.valueParams)
    //     this.update()
    // },
    // watch: {
    //     valueParams: function (data) {
    //         // $this.forceUpdate()
    //         console.log('data ', data)
    //         this.update()
    //     }
    // },
    computed: {
        
        isNew () {
            console.log('-----------------------',this.valueParams )
            // return !this.valueParams._id;
            return !this.valueProp._id;
        }
    },
    methods: {
        /**
         * save the entry to db
         */
        async saveEntry () {
            // try {
            //     await this.valueParams.save();
            //     this.$emit('change', this.valueParams);
            // } catch (e) {
            //     // this.$buefy.toast.open({ message: 'Error on save:' + e, type: 'is-danger', duration: 5000 });
            //     console.log(e)
            // }

            try {
                const updateData = await this.$feathersClient.service('meal').patch(this.valueProp._id,
                    {
                        title: this.valueProp.title,
                        type: this.valueProp.type,
                        writeDate: this.valueProp.writeDate,
                        text: this.valueProp.text,
                        eatType: this.valueProp.eatType,
                        images: this.valueProp.images,
                        color: this.valueProp.color,
                        icon: this.valueProp.icon,
                        side: this.valueProp.side,
                        sort: this.valueProp.sort
                    }
                )
                this.$router.go(-1)
            } catch (err) {
                console.log('meal Register error', err)
            }
        },
        /**
         * event - image added
         */
        imageAdded (file) {
            console.log('image add', file)
            const reader = new FileReader();
            
            reader.readAsDataURL(file[0]);
            console.log('reader', reader)
            const me = this;
            me.uploadingImage = true;

            // upload finished...
            reader.onload = () => {
                // upload file to service
                this.$store.dispatch('uploads/create', { uri: reader.result }).then((response) => {
                    console.log('response.id',response.id)
                    this.valueProp.images.push(response.id);
                    console.log('this.valueParams', this.valueProp)
                }).catch((err) => {
                    console.log(err);
                    // this.$buefy.toast.open({ message: 'Upload failed - see console.log!', type: 'is-danger', duration: 5000 });

                });

                me.uploadingImage = false;
            };
        },
        /**
         * delete image by index
         */
        deleteImage (idx) {
            this.valueProp.images.splice(idx, 1);
            this.$emit('change', this.valueProp);
        }
    }
};
</script>