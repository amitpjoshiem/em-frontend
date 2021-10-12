<template>
  <div class="border rounded-lg p-5">
    <div class="text-main text-smm font-semibold">Your Activity</div>
    <div class="infinite-list-wrapper" style="overflow: auto">
      <ul
        v-if="status === 'success'"
        v-infinite-scroll="load"
        class="list p-1 mr-4"
        infinite-scroll-disabled="disabled"
      >
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
      <el-skeleton v-else-if="!loading" :rows="15" animated />
      <div v-if="loading" class="text-center">
        <span>Loading...</span>
      </div>
    </div>
  </div>
</template>
<script>
import { useFetchActivities } from '@/api/use-fetch-activities.js'
import TitleDayActivity from './TitleDayActivity.vue'

export default {
  name: 'ActivityContent',
  components: {
    TitleDayActivity,
  },
  setup() {
    const { data: activities, error, status, load, disabled, loading } = useFetchActivities()
    return {
      activities,
      error,
      loading,
      load,
      status,
      disabled,
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
  height: 77vh;
}
</style>
