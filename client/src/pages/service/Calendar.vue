<template>
  <q-page>  
    <!-- 메인 달력  -->
    <div style="max-width: 800px; width: 100%;">
        <q-toolbar class="row justify-between items-center">
          <q-btn color="primary" flat icon="arrow_back_ios"  @click="onPrev" />
        
        <div class="col-4" style="text-align: center;">
        {{ title }}
        </div>

          <q-btn color="primary" flat icon="arrow_forward_ios" @click="onNext" />
      </q-toolbar>

      <q-calendar
        ref="calendar"
        v-model="selectedDate"
        view="month"
        locale="ko-kr"
        short-weekday-label
        :day-height="90"
        @change="onChange"
      >
        <template #day="{ timestamp }">
          <template v-for="(event, index) in getEvents(timestamp.date)">
            <q-badge
              :key="index"
              style="width: 100%; cursor: pointer; height: 16px; max-height: 16px"
              :class="badgeClasses(event, 'day')"
              :style="badgeStyles(event, 'day')"
            >
              <q-icon v-if="event.icon" :name="event.icon" class="q-mr-xs"></q-icon><span class="ellipsis">{{ event.title }}</span>
            </q-badge>
          </template>
        </template>
      </q-calendar>
    </div>
    <q-separator size="8px" style="max-width: 800px; width: 100%;"/>
    <!-- 체중 카드리스트  -->
    <q-card style="max-width: 800px; width: 100%;"  @click="$router.push('/weight-history')">
      <div class="q-pa-md text-weight-bold">{{selectedDate ? selectedDate : today }}</div>
        <q-card-section horizontal class="col-2 flex flex-center">
          <h4> {{weight_data.weight}} kg</h4>
          <q-card-actions vertical>
            <div class="text-grey">목표체중까지 4Kg 남았습니다.</div>
          </q-card-actions>
        </q-card-section>
    </q-card>

    <q-separator size="8px" style="max-width: 800px; width: 100%;"/>
    <!-- BMI 카드리스트  -->
    <q-card style="max-width: 800px; width: 100%;"  @click="$router.push('')">
      <div class="q-pa-md text-weight-bold">BMI( {{bmi}} )</div>
      
        <!-- <q-card-section > -->
          <q-card-section horizontal class="col flex flex-center">
            <q-img
              class="rounded-border"
              
              src="../../assets/images/diet/bmi.png"
            >
            <q-icon class="absolute all-pointer-events" size="30px" name="person_pin_circle" color="pink" :style="'top: 10px; left:' + bmiPosion + '%'"/>
            </q-img>
        </q-card-section>
    </q-card>
    
    <q-separator size="8px" style="max-width: 800px; width: 100%;"/>

    <!-- 일별 식사/운동/ 다짐 -->
    <div  style="max-width: 800px">
      <q-list bordered padding>
        <q-item-label header class="text-weight-bold">식사/운동/다짐</q-item-label>

        <q-item clickable v-ripple @click="$router.push('/meal-history')">
          <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" icon="restaurant" />
          </q-item-section>

          <q-item-section>
            <q-item-label>식사</q-item-label>
            <q-item-label caption lines="2">{{ mealhistory_data.eatType }} 하셨습니다.</q-item-label>
          </q-item-section>

          <q-item-section side top>
           
            <q-icon name="arrow_forward_ios" color="primary" />
          </q-item-section>
        </q-item>

        <q-separator spaced />

        <q-item clickable v-ripple @click="$router.push('/exercise-history')">
          <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" icon="directions_bike" />
          </q-item-section>

          <q-item-section>
            <q-item-label>운동</q-item-label>
            <q-item-label caption lines="2">{{exercise_time}} 시간 하셨습니다.</q-item-label>
          </q-item-section>

          <q-item-section side top>
           
            <q-icon name="arrow_forward_ios" color="primary" />
          </q-item-section>
        </q-item>

        <q-separator spaced />

        <q-item>
          <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" icon="local_cafe" />
          </q-item-section>

          <q-item-section>
            <q-item-label>다짐</q-item-label>
            <q-item-label caption lines="2">1일 두시간</q-item-label>
          </q-item-section>

          <q-item-section side top>
           
            <q-icon name="arrow_forward_ios" color="primary" />
          </q-item-section>
        </q-item>

        
      </q-list>
    </div>

    <!-- 다이어트 체중 입력 다이얼로그 -->
    <q-dialog v-model="promptWeight" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">체중 입력</div>
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
                      <q-btn label="선택" color="primary" flat @click="selectDate" v-close-popup />
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
    <!-- <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="monitor_weight" color="accent" @click="promptWeight = true" />
    </q-page-sticky> -->
  </q-page>
</template>
<script>
// normally you would not import "all" of QCalendar, but is needed for this example to work with UMD (codepen)
import QCalendar from '@quasar/quasar-ui-qcalendar' // ui is aliased from '@quasar/quasar-ui-qcalendar'
import { date } from 'quasar'

const CURRENT_DAY = new Date()

function getCurrentDay (day) {
  const newDay = new Date(CURRENT_DAY)
  newDay.setDate(day)
  const tm = QCalendar.parseDate(newDay)
  return tm.date
}

const reRGBA = /^\s*rgb(a)?\s*\((\s*(\d+)\s*,\s*?){2}(\d+)\s*,?\s*([01]?\.?\d*?)?\s*\)\s*$/

function textToRgb (color) {
  if (typeof color !== 'string') {
    throw new TypeError('Expected a string')
  }

  const m = reRGBA.exec(color)
  if (m) {
    const rgb = {
      r: Math.min(255, parseInt(m[2], 10)),
      g: Math.min(255, parseInt(m[3], 10)),
      b: Math.min(255, parseInt(m[4], 10))
    }
    if (m[1]) {
      rgb.a = Math.min(1, parseFloat(m[5]))
    }
    return rgb
  }
  return hexToRgb(color)
}

function hexToRgb (hex) {
  if (typeof hex !== 'string') {
    throw new TypeError('Expected a string')
  }

  hex = hex.replace(/^#/, '')

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  else if (hex.length === 4) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]
  }

  const num = parseInt(hex, 16)

  return hex.length > 6
    ? { r: num >> 24 & 255, g: num >> 16 & 255, b: num >> 8 & 255, a: Math.round((num & 255) / 2.55) }
    : { r: num >> 16, g: num >> 8 & 255, b: num & 255 }
}

function luminosity (color) {
  if (typeof color !== 'string' && (!color || color.r === undefined)) {
    throw new TypeError('Expected a string or a {r, g, b} object as color')
  }

  const
    rgb = typeof color === 'string' ? textToRgb(color) : color,
    r = rgb.r / 255,
    g = rgb.g / 255,
    b = rgb.b / 255,
    R = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4),
    G = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4),
    B = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

export default {
  data () {
    return {
      // 달력
      selectedDate: getCurrentDay(CURRENT_DAY.getDate()),
      today: getCurrentDay(CURRENT_DAY.getDate()),
      title: '',
      shortWeekdayLabel: false,
      shortMonthLabel: false,
      dateFormatter: undefined,
      start: undefined,
      events: [
        {
          title: '체중',
          // details: '51 kg',
          date: getCurrentDay(22),
          bgcolor: 'orange',
          icon: 'fact_check'
        },
        {
          title: '식사',
          // details: '몇끼 식사',
          date: getCurrentDay(22),
          bgcolor: 'blue',
          icon: 'restaurant'
        },
        {
          title: '운동',
          // details: '몇번 운동',
          date: getCurrentDay(22),
          bgcolor: 'green',
          icon: 'directions_bike'
        }
      ],
      //bmi 포지션
      bmiPosion: 0,
      bmi: 0 ,
      //체중 다이얼로그
      weightdate: date.formatDate(new Date(), 'YYYY/MM/DD'),
      proxyWeightdate: date.formatDate(new Date(), 'YYYY/MM/DD') ,
      promptWeight: false,
      bodyWeight: 50,
      //식사 조회
      mealhistory_data: {},
      exercise_data: {
        writeDate: '',
        walking: 0,
        running: 0,
        gym:0,
        bike:0,
        riding:0,
        hiking:0,
        yoga:0,
        etc:0
      },
      exercise_time: 0,        
      weight_data: {
        writeDate: '',
        weight: 0
      },
      messageMeal: {},
      messageWeight: {},
      messageExercise: {},
    }
  },
  beforeMount () {
    this.updateFormatter()
  },
  watch: {
    messageExercise: function (data) {
      this.getExerciseHistory()
    },
    messageWeight: function (data) {
      this.getWeightHistory()
    },
    messageMeal: function (data) {
      this.getMealHistory()
    },
    selectedDate: function (data) {
      this.getExerciseHistory()
      this.getMealHistory()
      this.getWeightHistory()
    },
    
  },
  mounted () {
    // 운동 정보
    this.getExerciseHistory()
    this.$feathersClient.service('exercise')
      .on('patch', messageExercise => this.messageExercise = messageExercise);
    // 식사 정보
    this.getMealHistory()
    this.$feathersClient.service('meal')
      .on('patch', messageMeal => this.messageMeal = messageMeal);
    // 체중 정보      
    this.getWeightHistory()
    this.$feathersClient.service('weight')
      .on('patch', messageWeight => this.messageWeight = messageWeight);
  },
  methods: {
    isCssColor (color) {
      return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
    },

    badgeClasses (event, type) {
      const cssColor = this.isCssColor(event.bgcolor)
      const isHeader = type === 'header'
      return {
        [`text-white bg-${event.bgcolor}`]: !cssColor,
        'full-width': !isHeader && (!event.side || event.side === 'full'),
        'left-side': !isHeader && event.side === 'left',
        'right-side': !isHeader && event.side === 'right'
      }
    },

    badgeStyles (event, type, timeStartPos, timeDurationHeight) {
      const s = {}
      if (this.isCssColor(event.bgcolor)) {
        s['background-color'] = event.bgcolor
        s.color = luminosity(event.bgcolor) > 0.5 ? 'black' : 'white'
      }
      if (timeStartPos) {
        s.top = timeStartPos(event.time) + 'px'
      }
      if (timeDurationHeight) {
        s.height = timeDurationHeight(event.duration) + 'px'
      }
      s['align-items'] = 'flex-start'
      return s
    },

    getEvents (dt) {
      const currentDate = QCalendar.parseTimestamp(dt)
      const events = []
      for (let i = 0; i < this.events.length; ++i) {
        let added = false
        if (this.events[i].date === dt) {
          if (this.events[i].time) {
            if (events.length > 0) {
              // check for overlapping times
              const startTime = QCalendar.parseTimestamp(this.events[i].date + ' ' + this.events[i].time)
              const endTime = QCalendar.addToDate(startTime, { minute: this.events[i].duration })
              for (let j = 0; j < events.length; ++j) {
                if (events[j].time) {
                  const startTime2 = QCalendar.parseTimestamp(events[j].date + ' ' + events[j].time)
                  const endTime2 = QCalendar.addToDate(startTime2, { minute: events[j].duration })
                  if (QCalendar.isBetweenDates(startTime, startTime2, endTime2) || QCalendar.isBetweenDates(endTime, startTime2, endTime2)) {
                    events[j].side = 'left'
                    this.events[i].side = 'right'
                    events.push(this.events[i])
                    added = true
                    break
                  }
                }
              }
            }
          }
          if (!added) {
            this.events[i].side = undefined
            events.push(this.events[i])
          }
        }
        else if (this.events[i].days) {
          // check for overlapping dates
          const startDate = QCalendar.parseTimestamp(this.events[i].date)
          const endDate = QCalendar.addToDate(startDate, { day: this.events[i].days })
          if (QCalendar.isBetweenDates(currentDate, startDate, endDate)) {
            events.push(this.events[i])
            added = true
          }
        }
      }
      return events
    },
    // 달력이동 툴바
    onChange ({ start }) {
      this.start = start
      this.updateTitle()
    },

    onPrev () {
      this.$refs.calendar.prev()
    },

    onNext () {
      this.$refs.calendar.next()
    },

    updateTitle () {
      const myDate = QCalendar.makeDate(this.start)
      if (this.dateFormatter !== undefined) {
        this.title = this.dateFormatter.format(myDate)
      }
    },

    updateFormatter () {
      try {
        this.dateFormatter = new Intl.DateTimeFormat(this.locale || undefined, {
          month: this.shortMonthLabel ? 'short' : 'long',
          year: 'numeric',
          timeZone: 'UTC'
        })
      }
      catch (e) {
        // console.error('Intl.DateTimeFormat not supported')
        this.dateFormatter = undefined
      }
    },
    // 체중 다이얼로그
    //일자 선택
    updateProxy () {
      this.proxyWeightdate = this.weightdate
    },
    selectDate () {
      this.weightdate = this.proxyWeightdate
    },
    // 체중 선택
    weightAdd () {
      this.bodyWeight = this.bodyWeight + 1
    },

    weightMinus () {
      this.bodyWeight = this.bodyWeight - 1
    },
    //체중 저장
    async saveUserInfo  () {
    },
    calBmi () {
      // bmi = 무게 / (키/100 * 키/100)
      const height = 160 / 100
      let bmi = this.weight_data.weight / (height * height)
      console.log(' this.weight_data',  this.weight_data.weight)
      this.bmi = Math.round(bmi * 100) /100
    },
    // 
    calBmiMarker (data) {
      let posion
      if (data < 18.5) {
        posion = (23.5 * data) / 18.5
      } else if ( data >= 18.5 && data < 23 ) {
        posion = (42 * data) / 23
      } else if ( data >= 23 && data < 25 ) {
        posion = (60 * data) / 25
      } else if ( data >= 25 && data < 30 ) {
        posion = ( 77 * data) / 30
      } else {
        posion = (100 * data) / 40
      }
      // console.log('data', data)
      // console.log('posion', posion)
      this.bmiPosion = posion
    },
    // 체중 조회
    async getWeightHistory () {
        try {
        const resFind = await this.$feathersClient.service('weight').find({
            query: {
                writeDate: this.selectedDate,
                $sort: { sort: 1 } 
            }
        })
        if (resFind.total > 0 ) {
            this.weight_data = resFind.data[0]
            this.calBmi()
            this.calBmiMarker(this.bmi)
            // this.calBmiMarker(18.4)
        } else {
            this.weight_data = {
            writeDate: '',
            weight: 50
            }
        }
        
        } catch (err) {
            console.log(err)
        }
    },
    // 운동 조회
    async getExerciseHistory () {
        try {
        const resFind = await this.$feathersClient.service('exercise').find({
            query: {
                writeDate: this.selectedDate
            }
        })
        if (resFind.total > 0 ) {
          console.log('resFind.data[0]', resFind.data[0])
            this.exercise_data = resFind.data[0]
            this.exercise_time = resFind.data[0].running + 
                            resFind.data[0].walking +  
                            resFind.data[0].gym + 
                            resFind.data[0].bike + 
                            resFind.data[0].riding + 
                            resFind.data[0].hiking + 
                            resFind.data[0].yoga + 
                            resFind.data[0].etc
        } else {
            this.exercise_data = {
            writeDate: '',
            walking: 0,
            running: 0,
            gym:0,
            bike:0,
            riding:0,
            hiking:0,
            yoga:0,
            etc:0
            }
        }
        
        } catch (err) {
            console.log(err)
        }
    },
    async getMealHistory () {
        try {
          const resFind = await this.$feathersClient.service('meal').find({
              query: {
                  writeDate: this.selectedDate,
                  $sort: { sort: -1 } ,
                  $limit: 1
              }
          })
          this.mealhistory_data = resFind.data[0]
          console.log('this.mealhistory_data', this.mealhistory_data)
        } catch (err) {
            console.log(err)
        }
    }  
  }  
}
</script>
<style lang="sass">
// calendar overrides
.q-calendar-daily__day-interval:hover
  background-color: rgba(0,0,255,.1)

.q-calendar-weekly__workweek:hover
  background-color: rgba(0,0,255,.1)

.q-calendar-weekly__day:hover
  background-color: rgba(0,0,255,.1)

.q-calendar-weekly__head-weekday:hover
  background-color: rgba(0,0,255,.1)
</style>
