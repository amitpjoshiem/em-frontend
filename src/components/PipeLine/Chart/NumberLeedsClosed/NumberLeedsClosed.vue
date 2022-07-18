<template>
  <div class="flex">
    <div class="w-10/12">
      <vue3-chart-js v-bind="chartOptions" ref="chartRef" />
    </div>
    <div class="w-2/12 flex flex-col ml-2.5">
      <div class="flex items-center">
        <div class="bg-color-error rounded-full w-2 h-2" />
        <span class="text-xs text-main ml-1">Closed</span>
      </div>
      <div class="flex items-center mt-2.5">
        <div class="bg-activity rounded-full w-2 h-2" />
        <span class="text-xs text-main ml-1">Win</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import { useStatisticsChartDataOptions } from '@/components/PipeLine/Chart/NumberLeedsClosed/useDataOptions.js'

export default {
  name: 'NumberLeedsClosed',
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
