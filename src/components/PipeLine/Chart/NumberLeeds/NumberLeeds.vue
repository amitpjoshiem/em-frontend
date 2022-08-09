<template>
  <div>
    <vue3-chart-js v-bind="chartOptions" ref="chartNumberLeedsRef" />
  </div>
</template>

<script>
import { ref } from 'vue'
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import { useStatisticsChartDataOptions } from '@/components/PipeLine/Chart/NumberLeeds/useDataOptions.js'

export default {
  name: 'NumberLeeds',
  components: {
    Vue3ChartJs,
  },
  props: {
    values: {
      type: Array,
      require: true,
      default: () => [],
    },
  },
  setup(props) {
    const chartNumberLeedsRef = ref(null)

    const { chartOptions } = useStatisticsChartDataOptions(props.values)

    return {
      chartNumberLeedsRef,
      chartOptions,
    }
  },
}
</script>
