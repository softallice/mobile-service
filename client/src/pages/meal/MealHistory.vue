
<template>
  <div style="max-width: 800px; width: 100%;">
    <div class="title-bar row items-center overflow-hidden">
      <q-btn flat  icon="fas fa-chevron-left" class="direction-button" style="height: 100%" @click="onPrev" />
      <transition :name="transition" appear>
        <div :key="parsedStart.date" class="row justify-between items-center overflow-hidden" style="width: calc(100% - 112px)">
          <div v-for="day in days" :key="day.date" class="col-auto" :style="dayStyle">
            <q-btn flat :class="dayClass(day)" style="line-height: unset;" @click="selectedDate = day.date; transition = ''">
              <!-- <div class="text-center" style="width: 100%;">{{ monthFormatter(day, true) }}</div> -->
              <div class="text-center text-bold" style="width: 100%;  font-size: 16px;">{{ dayFormatter(day, false).replace('일','') }}</div>
              <div class="text-center" style="width: 100%; font-size: 8px;">{{ weekdayFormatter(day, true) }}</div>
            </q-btn>
          </div>
        </div>
      </transition>
      <q-btn flat  icon="fas fa-chevron-right" class="direction-button" style="height: 100%" @click="onNext" />
    </div>
    <card-time-line :value="mealhistory_data"/>
  </div>
</template>
<script>
// normally you would not import "all" of QCalendar, but is needed for this example to work with UMD (codepen)
import QCalendar from '@quasar/quasar-ui-qcalendar' // ui is aliased from '@quasar/quasar-ui-qcalendar'

const CURRENT_DAY = new Date()

function getCurrentDay (day) {
  const newDay = new Date(CURRENT_DAY)
  newDay.setDate(day)
  const tm = QCalendar.parseDate(newDay)
  return tm.date
}

export default {
  components: {
      CardTimeLine: () =>  import('components/cards/CardTimeLine')
  },
  data () {
    return {
      currentBlogEntry: undefined,
      //달력
      selectedDate: getCurrentDay(CURRENT_DAY.getDate()),
      weekdays: [0, 1, 2, 3, 4, 5, 6],
      locale: 'en-us',
      monthFormatter: this.monthFormatterFunc(),
      dayFormatter: this.dayFormatterFunc(),
      weekdayFormatter: this.weekdayFormatterFunc(),
      transitionPrev: 'slide-right',
      transitionNext: 'slide-left',
      transition: '',
      message: {},
      mealhistory_data: []
    }
  },

  watch: {
    currentBlogEntry: function (data) {
      console.log('currentBlogEntry' , data)
    },
    message: function (data) {
      this.getMealHistory()
    },
    selectedDate: function (data) {
      this.getMealHistory()
    },
  },

  mounted () {
    this.getMealHistory()
    this.$feathersClient.service('meal')
      .on('created', message => this.message = message);
  },

  beforeMounted () {
  },

  computed: {
    weekdaySkips () {
      return QCalendar.getWeekdaySkips(this.weekdays)
    },

    parsedStart () {
      if (this.selectedDate) {
        return QCalendar.getStartOfWeek(QCalendar.parseTimestamp(this.selectedDate), this.weekdays, this.today)
      }
      return undefined
    },

    parsedEnd () {
      if (this.selectedDate) {
        return QCalendar.getEndOfWeek(QCalendar.parseTimestamp(this.selectedDate), this.weekdays, this.today)
      }
      return undefined
    },

    today () {
      const newDay = new Date(CURRENT_DAY)
      const tm = QCalendar.parseDate(newDay)
      return tm
    },

    days () {
      if (this.parsedStart && this.parsedEnd) {
        return QCalendar.createDayList(
          this.parsedStart,
          this.parsedEnd,
          this.today,
          this.weekdaySkips
        )
      }
      return []
    },

    dayStyle () {
      return {
        width: 100 / this.weekdays.length + '%'
      }
    }
  },

  methods: {
    onPrev () {
      const ts = QCalendar.addToDate(this.parsedStart, { day: -7 })
      this.selectedDate = ts.date
      this.transition = 'q-transition--' + this.transitionPrev
    },

    onNext () {
      const ts = QCalendar.addToDate(this.parsedStart, { day: 7 })
      this.selectedDate = ts.date
      this.transition = 'q-transition--' + this.transitionNext
    },

    dayClass (day) {
      return {
        row: true,
        'justify-center': true,
        'selected-date': this.selectedDate === day.date
      }
    },

    monthFormatterFunc () {
      const longOptions = { timeZone: 'UTC', month: 'long' }
      const shortOptions = { timeZone: 'UTC', month: 'short' }

      return QCalendar.createNativeLocaleFormatter(
        this.locale,
        (_tms, short) => short ? shortOptions : longOptions
      )
    },

    weekdayFormatterFunc () {
      const longOptions = { timeZone: 'UTC', weekday: 'long' }
      const shortOptions = { timeZone: 'UTC', weekday: 'short' }

      return QCalendar.createNativeLocaleFormatter(
        this.locale,
        (_tms, short) => short ? shortOptions : longOptions
      )
    },

    dayFormatterFunc () {
      console.log('day------')
      const longOptions = { timeZone: 'UTC', day: '2-digit' }
      const shortOptions = { timeZone: 'UTC', day: 'numeric' }

      return QCalendar.createNativeLocaleFormatter(
        this.locale,
        (_tms, short) => short ? shortOptions : longOptions
      )
    },

    async getMealHistory () {
    //   const resFind = await this.$feathersClient.service('notifications').find({ query: { $sort: { createdAt: 1 } } })
      try {
        // const resFind = await this.$axiosInstance.get("/notifications?$limit=10&$sort[createdAt]=-1")
        const resFind = await this.$feathersClient.service('meal').find({
            query: {
                writeDate: this.selectedDate,
                $sort: { sort: 1 } 
            }
        })
        // const resFind = await this.$axiosInstance.get("/blog-entry?writeDate[$in][]='2021-04-21'$sort[createdAt]=-1")
        this.mealhistory_data = resFind.data
        console.log(this.mealhistory_data)
        if (resFind.total === 0) {
            await this.putMealHistory()
        }
      } catch (err) {
          console.log(err)
      }
    },

    async putMealHistory () {
        const data1 =  
            {
                "title":"아침",
                "type":"아침",
                "writeDate":this.selectedDate,
                "text":"",
                "eatType": "소식",
                "images": [],
                "color": "red",
                "icon": "brunch_dining",
                "side": "left",
                "sort": "1"
            }
        const data2 =  
            {
                "title":"점심",
                "type":"점심",
                "writeDate":this.selectedDate,
                "text":"",
                "eatType": "소식",
                "images": [],
                "color": "orange",
                "icon": "lunch_dining",
                "side": "left",
                "sort": "2"
            }
        const data3 =
            {
                "title":"저녁",
                "type":"저녁",
                "writeDate":this.selectedDate,
                "text":"",
                "eatType": "소식",
                "images": [],
                "color": "blue",
                "icon": "dinner_dining",
                "side": "left",
                "sort": "3"
            }
        
        const data4 =  
            {
                "title":"간식",
                "type":"간식",
                "writeDate": this.selectedDate,
                "text":"",
                "eatType": "소식",
                "images": [],
                "color": "green",
                "icon": "local_cafe",
                "side": "left",
                "sort": "4"
            }
        
        /* meal 기초 데이터 등록 */
        try {
            const putMeal = await this.$feathersClient.service('meal').create(
                data1
            )
        } catch (err) {
            console.log('meal Register error', err)
        }

        /* meal 기초 데이터 등록 */
        try {
            const putMeal = await this.$feathersClient.service('meal').create(
                data2
            )
        } catch (err) {
            console.log('meal Register error', err)
        }

        /* meal 기초 데이터 등록 */
        try {
            const putMeal = await this.$feathersClient.service('meal').create(
                data3
            )
        } catch (err) {
            console.log('meal Register error', err)
        }

        /* meal 기초 데이터 등록 */
        try {
            const putMeal = await this.$feathersClient.service('meal').create(
                data4
            )
        } catch (err) {
            console.log('meal Register error', err)
        }
    }
  }
}
</script>
<style lang="sass" scoped>
.title-bar
  width: 100%
  height: 70px
  background: #F7C7CB
  display: flex
  flex-direction: row
  flex: 1

.direction-button
  background: #F7C7CB
  color: white
  z-index: 20

.selected-date
  color: #9c27b0
  background: white
</style>