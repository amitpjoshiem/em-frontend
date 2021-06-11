<template>
  <el-progress
    type="circle"
    :percentage="percentage"
    :width="15"
    :stroke-width="2"
    :show-text="showText"
    color="#76E1BB"
  />
</template>

<script>
export default {
  name: 'CircularProgress',
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
