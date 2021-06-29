<template>
  <div style="max-width: 137px">
    <vue3-chart-js v-bind="{ ...doughnutChart }" />
  </div>
</template>

<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'

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
            backgroundColor: ['#B0B0B0', '#66B6FF', '#53576A'],
            data: [10, 40, 50],
          },
        ],
      },
    }

    return {
      doughnutChart,
    }
  },
}
</script>
