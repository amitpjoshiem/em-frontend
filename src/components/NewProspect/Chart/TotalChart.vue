<template>
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
</template>

<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import { chartWithTextCenter } from '@/utils/chartWithText'
import { currencyFormat } from '@/utils/currencyFormat'

export default {
  name: 'TotalChart',
  components: {
    Vue3ChartJs,
  },
  props: {
    goal: {
      type: Number,
      require: true,
      default: null,
    },
  },
  setup(props) {
    const doughnutChart = {
      type: 'doughnut',
      data: {
        datasets: [
          {
            backgroundColor: props.goal ? ['#FF92A5', '#53576A'] : ['#D3D3D3'],
            data: [0, props.goal ? props.goal : 1],
          },
        ],
      },
      options: {
        elements: {
          center: {
            text: props.goal ? currencyFormat(props.goal) : '---',
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
