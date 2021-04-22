<template>
  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <q-card class="fit">
      <!-- {{value}} -->
      <q-card-section class="">
          <q-timeline  :side="value.side" color="secondary">

          <q-timeline-entry
            v-for="(timeline, index) in value"
            :key="index"
            :title="timeline.title"
            :subtitle="timeline.subtitle" :color="timeline.color" :icon="timeline.icon"
            :side="timeline.side"
          >
          <!-- 배열 이미지 보여주기 -->
            <div v-if="timeline.images" class="q-gutter-sm row items-start">
              <div class="card" v-for="(image, idx) of timeline.images" :key="idx" style="width: 200px; display: inline-block">
                  <q-img
                    :src="'http://localhost:3030/blobs/' + image"
                    spinner-color="red"
                    style="height: 140px; max-width: 150px"
                />
              </div>  
              
            </div>
              <!-- <q-img
                :src="'http://localhost:3030/blobs/' + timeline.images[index]"
                spinner-color="red"
                style="height: 110px; max-width: 150px"
            /> -->
            {{timeline.text}}
            <q-btn align="around" class="btn-fixed-width" color="primary" label="사진업로드" icon="folder_shared" @click="goWriteMeal(index)" />
            
          </q-timeline-entry>
        </q-timeline>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'CardTimeLine',
  props: {
      value: {
          type: Array,
          required: true
      }
    },
  data () {
    return {
      timeline_list: [
        {
            title: '아침 ',
            side: 'left',
            desc: '사진기록.',
            color: "red",
            icon: "brunch_dining"
        },
        {
            title: '점심',
            side: 'left',
            desc: '사진기록',
            color: "orange",
            icon: "lunch_dining"
        }, {
            title: '저녁',
            side: 'left',
            desc: '사진기록',
            color: "blue",
            icon: "dinner_dining"
        }, {
            title: '간식',
            side: 'left',
            desc: '사진기록',
            color: "green",
            icon: "local_cafe"
        }
      ],
    }
  }, 
  methods: {
    goWriteMeal ( sort ) {
      console.log('sort' , this.value[sort])
        this.$router.push({name: 'WriteMeal', params: {valueProp : this.value[sort]}})
        // this.$router.push({name: 'WriteMeal', params: { id: this.value[sort]._id}})
    }
  }
}
</script>