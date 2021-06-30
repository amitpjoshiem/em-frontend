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
import chartWithText from './chartWithText'

export default {
  name: 'RecomendationChart',
  components: {
    Vue3ChartJs,
  },
  setup() {
    const doughnutChart = {
      type: 'doughnut',
      data: {
        datasets: [
          {
            backgroundColor: ['#FF92A5', '#66B6FF', '#53576A'],
            data: [45, 45, 10],
          },
        ],
      },
      options: {
        elements: {
          center: {
            text: '45% Equities',
            size: 12,
          },
        },
      },
      plugins: [{ id: 'chart-with-text', beforeDraw: chartWithText }],
    }

    return {
      doughnutChart,
    }
  },
}
</script>
