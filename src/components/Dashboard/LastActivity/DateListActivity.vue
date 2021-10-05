<template>
  <span>{{ getDay }}</span>
  <span class="ml-1">{{ timestamp }}</span>
</template>
<script>
import dayjs from 'dayjs'
import { computed } from 'vue'
export default {
  name: 'TitleDayActivity',
  props: {
    day: {
      type: String,
      require: true,
      default: '',
    },
    timestamp: {
      type: String,
      require: true,
      default: '',
    },
  },
  setup(props) {
    const getDay = computed(() => {
      return dayjs(props.day).calendar(null)
    })
    return {
      getDay,
    }
  },
}
</script>
