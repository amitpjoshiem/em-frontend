<template>
  <div class="p-5">
    <SwdSubHeader title="Activity" />
    <div class="border rounded-lg p-5">
      <div v-if="!isFetching">
        <span class="text-main text-smm font-semibold">Your Activity</span>
        <div class="mt-5">
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in getData"
              :key="index"
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
    </div>
  </div>
</template>
<script>
import { ref, computed } from 'vue'
import { useFetchActivities } from '@/api/use-fetch-activities.js'

export default {
  name: 'Activity',
  setup() {
    const activeName = ref('')

    const { data, error, isFetching, refetch } = useFetchActivities()

    const getData = computed(() => {
      const timeLine = data.value.data
      // console.log('data - ', timeLine)
      Object.keys(timeLine).forEach((key) => {
        // console.log('----', timeLine[key])
      })
      return timeLine['2021-09-30']
      // return '2323'
    })

    return {
      activeName,
      data,
      error,
      isFetching,
      refetch,
      getData,
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
</style>
