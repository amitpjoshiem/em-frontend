<template>
  <!-- <el-progress :percentage="percentage" :width="15" :stroke-width="6" :show-text="showText" color="#76E1BB" /> -->
  <el-progress :text-inside="true" :stroke-width="16" :percentage="Math.round(percentage)" color="#76E1BB" />
</template>
<script>
export default {
  name: 'SwdLinearProgress',
  props: {
    percentage: {
      type: Number,
      require: true,
      default: 0,
    },
    showText: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
}
</script>

<style>
.el-progress__text {
  color: #282828;
}
.el-progress-bar__innerText {
  color: #282828;
}
</style>
