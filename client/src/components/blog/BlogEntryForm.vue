<template>
  <div class="q-pa-md" style="max-width: 800px">
    <h6 class="subtitle">{{isNew ? 'Create new ' : 'Edit existing'}} Blog Entry</h6>
    <q-form
      @submit="saveEntry"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="value.title"
        label="제목"
        required
      />
      <q-input
        filled
        v-model="value.type"
        label="식사유형"
        required
      />
      <q-input
        filled
        v-model="value.writeDate"
        label="등록일자"
        required
      />
      <q-input
        filled
        type="textarea"
        v-model="value.text"
        label="메모"
        required
      />

      <div v-if="value.images" class="q-gutter-sm row items-start">
          <div class="card" v-for="(image, idx) of value.images" :key="image" style="width: 200px; display: inline-block">
              <q-img
                :src="'http://localhost:3030/blobs/' + image"
                spinner-color="red"
                style="height: 140px; max-width: 150px"
            />
            <div class="absolute-bottom text-center text-italic text-body2">
                <a href="#" class="card-footer-item" @click.prevent="deleteImage(idx)">Delete</a>
            </div>
          </div>
          
      </div>
      <div v-if="!value.attachment">
        <!-- <q-uploader
            label="Upload files"
            accept="image/*"
            @added="imageAdded"
            url="https://localhost/3030/upload"
            ref="imageUploader"
            color="purple"
            square
            flat
            bordered
            style="max-width: 300px"
        /> -->
        <q-file
            accept="image/*" @input="imageAdded"
            v-model="files"
            label="Pick files"
            filled
            counter
            multiple
            style="max-width: 300px"
        />
        
        
      </div>
        <div v-else>
            <q-btn color="primary" icon="download" label="down" :href="'http://localhost:3030/blobs/' + value.attachment" />
            <q-btn color="primary" icon="delete" label="delete" @click.prevent="value.attachment = ''" />
        </div>

      
      <div>
        <q-btn label="Submit" type="submit" color="primary"  />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"  />
      </div>
    </q-form>

  </div>
</template>
<script>
export default {
    name: 'blog-entry-form',
    props: {
        // current model
        value: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        uploadingImage: false,
        uploadingAttachment: false,
        files: null
    }),
    // watch: {
    //     value: function (data) {
    //     console.log('value', data.text)
    //     }
    // },
    computed: {
        isNew () {
            // console.log('-----------------------',this.value.text)
            return !this.value._id;
        }
    },
    methods: {
        /**
         * save the entry to db
         */
        async saveEntry () {
            try {
                await this.value.save();
                this.$emit('change', this.value);
            } catch (e) {
                // this.$buefy.toast.open({ message: 'Error on save:' + e, type: 'is-danger', duration: 5000 });
                console.log(e)
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
                    console.log('response',response)
                    this.value.images.push(response.id);
                }).catch((err) => {
                    console.log(err);
                    // this.$buefy.toast.open({ message: 'Upload failed - see console.log!', type: 'is-danger', duration: 5000 });

                });

                me.uploadingImage = false;
            };
        },
        /**
         * event - attachment added
         */
        attachmentAdded (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            const me = this;
            me.uploadingAttachment = true;

            // upload finished...
            reader.onload = () => {
                // upload file to service
                this.$store.dispatch('uploads/create', { uri: reader.result }).then((response) => {
                    this.value.attachment = response.id;
                }).catch((err) => {
                    console.log(err);
                    // this.$buefy.toast.open({ message: 'Upload failed - see console.log!', type: 'is-danger', duration: 5000 });
                });

                me.uploadingAttachment = false;
            };
        },
        /**
         * delete image by index
         */
        deleteImage (idx) {
            this.value.images.splice(idx, 1);
            this.$emit('change', this.value);
        }
    }
};
</script>