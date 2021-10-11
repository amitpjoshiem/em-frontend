<template>
  <div class="flex">
    <div class="w-10/12">
      <vue3-chart-js v-bind="chartOptions" ref="chartRef" />
    </div>
    <LegendStatisticsRetiredChart />
  </div>
</template>

<script>
import { ref } from 'vue'
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import { useStatisticsRetiredChartDataOptions } from '@/components/PipeLine/Chart/StatisticsRetiredChart/useDataOptions'
import LegendStatisticsRetiredChart from '@/components/PipeLine/Chart/StatisticsRetiredChart/LegendStatisticsRetiredChart.vue'

export default {
  name: 'StatisticsRetiredChart',
  components: {
    Vue3ChartJs,
    LegendStatisticsRetiredChart,
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
    const { chartOptions } = useStatisticsRetiredChartDataOptions(props.values)

    return {
      chartOptions,
      chartRef,
    }
  },
}
</script>
