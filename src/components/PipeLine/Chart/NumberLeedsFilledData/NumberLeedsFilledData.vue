<template>
  <div>
    <vue3-chart-js v-bind="chartOptions" ref="chartRef" />
  </div>
</template>

<script>
import { ref } from 'vue'
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import { useStatisticsChartDataOptions } from '@/components/PipeLine/Chart/NumberLeedsFilledData/useDataOptions.js'

export default {
  name: 'NumberLeedsFilledData',
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
    const chartRef = ref(null)

    const { chartOptions } = useStatisticsChartDataOptions(props.values)

    return {
      chartRef,
      chartOptions,
    }
  },
}
</script>
