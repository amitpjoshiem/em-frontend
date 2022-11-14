<template>
  <el-tag class="mx-1" :type="status ? 'success' : 'danger'" effect="dark">
    {{ getText }}
  </el-tag>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'SwdTag',
  props: {
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  setup(props) {
    const getText = computed(() => {
      return props.status ? 'Yes' : 'No'
    })
    return {
      getText,
    }
  },
}
</script>
