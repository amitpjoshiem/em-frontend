<template>
  <div class="flex">
    <div class="w-36">
      <vue3-chart-js
        :id="doughnutChart.id"
        ref="chartRef"
        :type="doughnutChart.type"
        :data="doughnutChart.data"
        :options="doughnutChart.options"
        :plugins="doughnutChart.plugins"
      />
    </div>
    <div>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
  </div>
</template>

<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import { chartWithTextCenter } from '@/utils/chartWithText'

export default {
  name: 'StatisticsAgeChart',
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
            text: 'Age',
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
