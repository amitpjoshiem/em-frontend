<template>
  <div style="max-width: 137px">
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
import { chartWithTextCenter } from '@/utils/chartWithText'

export default {
  name: 'TotalChart',
  components: {
    Vue3ChartJs,
  },
  setup() {
    const doughnutChart = {
      type: 'doughnut',
      data: {
        datasets: [
          {
            backgroundColor: ['#FF92A5', '#53576A'],
            data: [45, 10],
          },
        ],
      },
      options: {
        elements: {
          center: {
            text: 'Income Goal $5000',
            size: 12,
          },
        },
      },
      plugins: [chartWithTextCenter],
    }

    return {
      doughnutChart,
    }
  },
}
</script>
