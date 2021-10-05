<template>
  <div class="border rounded-lg p-5">
    <span class="text-main text-smm font-semibold">Your Activity</span>
    <div class="infinite-list-wrapper" style="overflow: auto">
      <ul v-if="status === 'success'" v-infinite-scroll="load" class="list p-1 mr-4">
        <div v-for="(activ, index) in activities.pages" :key="index">
          <div v-if="activ.data !== undefined">
            <el-timeline v-for="elem in activ.data" :key="elem.day">
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
import { ref, reactive, onMounted, computed } from 'vue'
import { useFetchActivities } from '@/api/use-fetch-activities.js'
import TitleDayActivity from './TitleDayActivity.vue'
import dayjs from 'dayjs'
import { useStore } from 'vuex'

export default {
  name: 'ActivityContent',
  components: {
    TitleDayActivity,
  },
  setup() {
    const store = useStore()
    const loading = ref(false)

    const state = reactive({
      betweenData: '',
      currentData: '',
      previousData: '',
      initialData: '',
    })

    const getInitialData = computed(() => {
      const currentData = dayjs().format('YYYY-MM-DD')
      const previousData = dayjs(currentData).subtract(7, 'day').format('YYYY-MM-DD')
      const betweenData = `created_at:` + previousData + ',' + currentData
      store.commit('globalComponents/setActivityPeriod', state.betweenData)

      return {
        reactiveSearch: betweenData,
        reactiveLimit: `0`,
        reactiveSearchFields: `created_at:between`,
      }
    })

    const { data: activities, error, refetch, fetchNextPage, status } = useFetchActivities(getInitialData.value)

    onMounted(() => {
      setPeriod()
    })

    const setPeriod = () => {
      state.currentData = dayjs().format('YYYY-MM-DD')
      state.previousData = dayjs(state.currentData).subtract(7, 'day').format('YYYY-MM-DD')
      state.betweenData = `created_at:` + state.previousData + ',' + state.currentData
      store.commit('globalComponents/setActivityPeriod', state.betweenData)
      fetchNextPage.value()
    }

    const load = () => {
      loading.value = true
      setTimeout(() => {
        state.currentData = state.previousData
        state.previousData = dayjs(state.previousData).subtract(7, 'day').format('YYYY-MM-DD')
        state.betweenData = `created_at:` + state.previousData + ',' + state.currentData
        store.commit('globalComponents/setActivityPeriod', state.betweenData)
        fetchNextPage.value()
        loading.value = false
      }, 1000)
    }
    return {
      state,
      activities,
      error,
      refetch,
      loading,
      load,
      fetchNextPage,
      status,
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
