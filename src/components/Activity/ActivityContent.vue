<template>
  <div v-if="!isFetching" class="border rounded-lg p-5">
    <span class="text-main text-smm font-semibold">Your Activity</span>
    <div class="infinite-list-wrapper" style="overflow: auto">
      <ul v-infinite-scroll="load" class="list">
        <el-timeline v-for="(elem, index) in activities.data" :key="index">
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
      </ul>
      <p v-if="loading">Loading...</p>
    </div>
  </div>
  <el-skeleton v-else :rows="5" animated class="p-5" />
</template>
<script>
import { ref } from 'vue'
import { useFetchActivities } from '@/api/use-fetch-activities.js'
import TitleDayActivity from './TitleDayActivity.vue'

export default {
  name: 'ActivityContent',
  components: {
    TitleDayActivity,
  },
  setup() {
    const loading = ref(false)
    const { data: activities, error, isFetching, refetch } = useFetchActivities()

    const load = () => {
      loading.value = true
      setTimeout(() => {
        console.log('loading')
      }, 1000)
    }

    return {
      activities,
      error,
      isFetching,
      refetch,
      loading,
      load,
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
