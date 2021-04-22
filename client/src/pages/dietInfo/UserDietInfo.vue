<template>
  <div class="q-pa-md">
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      animated
      :contracted="$q.screen.lt.md"
    >
      <q-step
        :name="1"
        title="기본정보"
        icon="settings"
        :done="step > 1"
      >
        <div class="col-12">
            <q-input color="purple-12" v-model="userData.name" label="이메일">
                <template v-slot:prepend>
                <q-icon name="event" />
                </template>
            </q-input>
        </div>
        <div class="col-12">
            <q-input color="purple-12" v-model="userData.name" label="이름">
                <template v-slot:prepend>
                <q-icon name="event" />
                </template>
            </q-input>
        </div>
        <div class="col-12">
            <q-input color="purple-12" v-model="userData.name" label="생년월일">
                <template v-slot:prepend>
                <q-icon name="event" />
                </template>
            </q-input>
        </div>
        <div class="col-12">
            <q-input color="purple-12" v-model="userData.name" label="직업">
                <template v-slot:prepend>
                <q-icon name="event" />
                </template>
            </q-input>
        </div>
        <div class="q-gutter-sm col-12 ">
            <q-radio dense v-model="userData.sex" val="W" label="여성" />
            <q-radio dense v-model="userData.sex" val="M" label="남성" />
        </div>
      </q-step>

      <q-step
        :name="2"
        title="신장"
        caption="Optional"
        icon="create_new_folder"
        :done="step > 2"
      >
        <!-- 신장 입력 -->
        <q-card style="min-width: 100px">
            <q-card-section>
                <div class="text-h6">신장 입력</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
            <q-input 
                    filled 
                    bottom-slots 
                    v-model="userData.height" 
                    label="신장" 
                    type="number"
                    counter 
                    maxlength="3"
                    input-class="text-center">                    
                </q-input>
            </q-card-section>
        </q-card>
      </q-step>

      <q-step
        :name="3"
        title="체중"
        icon="assignment"
        :done="step > 3"
      >
        <!-- 체중 입력 -->
        <q-card style="min-width: 100x">
            <q-card-section>
                <div class="text-h6">체중 입력</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
            <q-input 
                    filled 
                    bottom-slots 
                    v-model="userData.weight" 
                    label="체중" 
                    type="number"
                    counter 
                    maxlength="3"
                    input-class="text-center">                    
                </q-input>
            </q-card-section>
        </q-card>
      </q-step>

      <q-step
        :name="4"
        title="목표체중"
        icon="add_comment"
        :done="step > 4"
      >
        <!-- 목표 체중 입력 -->
        <q-card style="min-width: 100px">
            <q-card-section>
                <div class="text-h6">목표 체중 입력</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
            <q-input 
                    filled 
                    bottom-slots 
                    v-model="userData.aimWeight" 
                    label="목표 체중" 
                    type="number"
                    counter 
                    maxlength="3"
                    input-class="text-center">                    
                </q-input>
            </q-card-section>
        </q-card>
      </q-step>

      <q-step
        :name="5"
        title="목표부위"
        icon="add_comment"
        :done="step > 5"
      >
        <!-- 목표 부위 입력 -->
        <q-card style="min-width: 100px">
            <q-card-section>
                <div class="text-h6">목표 부위 입력</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
            <q-input 
                    filled 
                    bottom-slots 
                    v-model="userData.targetBody" 
                    label="목표 부위" 
                    type="text"
                    counter 
                    input-class="text-center">                    
                </q-input>
            </q-card-section>
        </q-card>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="이전" class="q-ml-sm" />
          <q-btn  @click="step === 5 ? $router.push('/calendar') : $refs.stepper.next()" color="primary" :label="step === 5 ? '완료' : '다음'" />
          
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script>
import { date } from 'quasar'

export default {
  data () {
    return {
      step: 1,
      date: date.formatDate(new Date(), 'YYYY/MM/DD'),
      proxydate: date.formatDate(new Date(), 'YYYY/MM/DD') ,
      userData: {
          name: '',
          birth: '',
          job: '',
          sex: 'W',
          height: 160,
          weight: 50,
          aimWeight: 50,
          targetBody: '뱃살'
      }
      
    }
  }
}
</script>