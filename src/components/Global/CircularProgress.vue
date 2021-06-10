<template>
  <el-progress
    type="circle"
    :percentage="percentage"
    :width="15"
    :stroke-width="2"
    :show-text="false"
    color="#76E1BB"
  />
</template>

<script>
export default {
  name: 'CircularProgress',
  props: {
    percentage: {
      type: String,
      require: true,
      default: '0',
    },
  },
}
</script>
