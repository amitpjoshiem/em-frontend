<template>
  <div>
    <vue3-chart-js ref="chartRef" v-bind="chartOptions" />
  </div>
</template>

<script>
import { ref } from 'vue'
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import { useAumChartDataOptions } from '@/components/PipeLine/Chart/AumChart/useDataOptions'

export default {
  name: 'AumChart',
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

    const { chartOptions } = useAumChartDataOptions(props.values)

    return {
      chartOptions,
      chartRef,
    }
  },
}
</script>
