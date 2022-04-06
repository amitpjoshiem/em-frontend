<template>
  <el-tag :type="getType">{{ title }}</el-tag>
</template>
<script>
import { computed } from 'vue'
export default {
  name: 'ConfirmMoreInfoItem',
  props: {
    value: {
      type: Boolean,
      require: true,
      default: false,
    },
    title: {
      type: String,
      require: true,
      default: 'Title',
    },
  },
  setup(props) {
    const getType = computed(() => {
      if (props.value) return 'success'
      return 'danger'
    })

    return {
      getType,
    }
  },
}
</script>
