<template>
  <div style="max-width: 137px">
    <!-- <vue3-chart-js v-bind="{ ...doughnutChart }" /> -->
    <vue3-chart-js
      :id="doughnutChart.id"
      ref="chartRef"
      :type="doughnutChart.type"
      :data="doughnutChart.data"
      :options="doughnutChart.options"
      :plugins="doughnutChart.plugins"
    />
  </div>
</template>

<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'

import chartWithText from './chartWithText'

export default {
  name: 'HoldingsChart',
  components: {
    Vue3ChartJs,
  },
  setup() {
    const doughnutChart = {
      type: 'doughnut',
      data: {
        datasets: [
          {
            backgroundColor: ['#B0B0B0', '#66B6FF', '#53576A'],
            data: [10, 40, 50],
          },
        ],
      },
      plugins: [{ chartWithText }],
    }

    return {
      doughnutChart,
    }
  },
}
</script>
