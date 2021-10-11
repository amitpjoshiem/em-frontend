<template>
  <div class="flex">
    <div class="w-40">
      <vue3-chart-js v-bind="chartOptions" ref="chartRef" />
    </div>
    <div class="pt-8 ml-2.5 text-xs text-main">
      <div v-for="(item, index) in values" :key="index" class="flex items-center mb-5">
        <LegendChartAge :item="item" :index="index" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import LegendChartAge from '@/components/PipeLine/Chart/StatisticsAgeChart/LegendChartAge.vue'
import { useStatisticsAgeChartDataOptions } from '@/components/PipeLine/Chart/StatisticsAgeChart/useDataOptions'

export default {
  name: 'StatisticsAgeChart',
  components: {
    Vue3ChartJs,
    LegendChartAge,
  },
  props: {
    values: {
      type: Array,
      require: true,
      default: () => [],
    },
  },
  setup(props) {
    const { chartOptions } = useStatisticsAgeChartDataOptions(props.values)

    return {
      chartOptions,
    }
  },
}
</script>
