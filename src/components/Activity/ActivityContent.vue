<template>
  <div v-if="!isLoading" class="border rounded-lg p-5">
    <span class="text-main text-smm font-semibold">Your Activity</span>
    <div class="infinite-list-wrapper" style="overflow: auto">
      <ul v-infinite-scroll="load" class="list p-1 mr-4" :infinite-scroll-disabled="state.disabledLoad">
        <div v-for="(activ, index) in activities.pages" :key="index">
          <div v-if="activ.data !== undefined">
            <el-timeline v-for="elem in activ.data.data" :key="elem.day">
              <div class="mb-6 text-gray03 font-semibold">
                <TitleDayActivity :day="elem.day" />
              </div>
              <el-timeline-item
                v-for="item in elem.events"
                :key="item.timestamp"
                center
                :timestamp="item.timestamp"
                placement="top"
                color="#66B6FF"
              >
                <div v-html="item.content" />
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </ul>
      <p v-if="loading">Loading...</p>
    </div>
  </div>
</template>
<script>
import { ref, reactive, onMounted } from 'vue'
import { useFetchActivities } from '@/api/use-fetch-activities.js'
import TitleDayActivity from './TitleDayActivity.vue'
import dayjs from 'dayjs'
import { useStore } from 'vuex'
import { useInfiniteQuery } from 'vue-query'

export default {
  name: 'ActivityContent',
  components: {
    TitleDayActivity,
  },
  setup() {
    const store = useStore()
    const loading = ref(false)

    const {
      data: activities,
      error,
      refetch,
      isFetched,
      isLoading,
    } = useInfiniteQuery('activities', useFetchActivities, {}, { enabled: false })

    const state = reactive({
      betweenData: '',
      currentData: '',
      previousData: '',
      disabledLoad: true,
    })

    onMounted(async () => {
      setPeriod()
    })

    const setPeriod = () => {
      state.currentData = dayjs().format('YYYY-MM-DD')
      state.previousData = dayjs(state.currentData).subtract(7, 'day').format('YYYY-MM-DD')
      state.betweenData = `created_at:` + state.previousData + ',' + state.currentData
      store.commit('globalComponents/setActivityPeriod', state.betweenData)
      refetch.value().then(() => {
        state.disabledLoad = false
      })
    }

    // const getActivitiData = computed(() => {
    //   const ttt = activities.value.pages.map((element) => {
    //     if (element.data !== undefined) return element.data.data
    //   })
    //   return ttt[0]
    // })

    const load = () => {
      loading.value = true
      setTimeout(() => {
        state.currentData = state.previousData
        state.previousData = dayjs(state.previousData).subtract(7, 'day').format('YYYY-MM-DD')
        state.betweenData = `created_at:` + state.previousData + ',' + state.currentData
        store.commit('globalComponents/setActivityPeriod', state.betweenData)
        refetch.value()
        console.log('loading')
      }, 1000)
    }

    return {
      state,
      activities,
      error,
      refetch,
      loading,
      load,
      isFetched,
      isLoading,
      // getActivitiData,
    }
  },
}
</script>

<style>
.el-timeline-item__content {
  background-color: #f2f5fa;
  border-radius: 10px;
}

.el-timeline-item__content p {
  padding-left: 18px;
  padding-bottom: 12px;
  padding-top: 12px;
  font-size: 12px;
}

.el-timeline-item__content p a {
  color: #424450;
  font-weight: 600;
}
.el-timeline-item__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-timeline-item__timestamp.is-top {
  width: 10%;
  margin-bottom: 0;
  color: #424450;
  font-size: 12px;
  font-weight: 600;
}

.el-timeline-item__content {
  width: 90%;
}

.infinite-list-wrapper {
  height: 780px;
}
</style>
