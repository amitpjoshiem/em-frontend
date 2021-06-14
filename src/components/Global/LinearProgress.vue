<template>
  <el-progress
    :percentage="percentage"
    :width="15"
    :stroke-width="6"
    :show-text="showText"
    color="#76E1BB"
  />
</template>
<script>
export default {
  name: 'LinearProgress',
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
