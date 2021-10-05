<template>
  <span>{{ getData }}</span>
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
  },
  setup(props) {
    const getData = computed(() => {
      return dayjs(props.day).calendar(null)
    })
    return {
      getData,
    }
  },
}
</script>
