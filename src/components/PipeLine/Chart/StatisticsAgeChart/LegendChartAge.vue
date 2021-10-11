<template>
  <div class="rounded-full w-2 h-2 mr-2.5" :class="getClassLegend" />
  <span>{{ item.start_age }}-</span>
  <span>{{ item.end_age }} - </span>
  <span class="font-semibold ml-1">{{ percentFormat(item.percent / 100) }}</span>
</template>
<script>
import { percentFormat } from '@/utils/percentFormat'
import { computed } from 'vue'

export default {
  name: 'LegendChartAge',
  props: {
    item: {
      type: Object,
      require: true,
      default: () => {},
    },
    index: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  setup(props) {
    const getClassLegend = computed(() => {
      if (props.index === 0) return 'bg-color-error'
      if (props.index === 1) return 'bg-activity'
      return 'bg-dark-blue-charts'
    })

    return {
      percentFormat,
      getClassLegend,
    }
  },
}
</script>
