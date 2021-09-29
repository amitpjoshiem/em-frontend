<template>
  <div class="p-5">
    <SwdSubHeader title="Activity" />
    <div class="border rounded-lg p-5">
      <div>
        <span class="text-main text-smm font-semibold">Your Activity</span>
      </div>
      <div>
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :hollow="activity.hollow"
            :timestamp="activity.timestamp"
          >
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Activity',
  data() {
    return {
      activities: [
        {
          content: 'Custom icon',
          timestamp: '20:46',
          color: '#66B6FF',
        },
        {
          content: 'Custom color',
          timestamp: '20:46',
          color: '#66B6FF',
        },
        {
          content: 'Custom size',
          timestamp: '20:46',
          color: '#66B6FF',
        },
        {
          content: 'Custom hollow',
          timestamp: '20:46',
          color: '#66B6FF',
        },
        {
          content: 'Default node',
          timestamp: '20:46',
          color: '#66B6FF',
        },
      ],
    }
  },
}
</script>
