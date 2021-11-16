<template>
  <vue3-chart-js v-bind="chartOptions" ref="chartRef" />
</template>

<script>
import { ref } from 'vue'
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import { useStatisticsAgeChartDataOptions } from '@/components/PipeLine/Chart/StatisticsCountChart/useDataOptions'

export default {
  name: 'StatisticsCountChart',
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

    const { chartOptions } = useStatisticsAgeChartDataOptions(props.values)

    return {
      chartRef,
      chartOptions,
    }
  },
}
</script>
