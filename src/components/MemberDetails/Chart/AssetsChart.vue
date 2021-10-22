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
import { ref, watch } from 'vue'
import { currencyFormat } from '@/utils/currencyFormat'

export default {
  name: 'AssetsChart',
  components: {
    Vue3ChartJs,
  },
  props: {
    values: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  setup(props) {
    const chartRef = ref(null)

    watch(
      () => props.values.total,
      () => {
        doughnutChart.data.datasets = [
          {
            backgroundColor: ['#FF92A5', '#66B6FF', '#53576A'],
            data: Object.values(props.values.assetsData),
          },
        ]
        doughnutChart.options.elements.center.text = 'Monthly ' + currencyFormat(props.values.total)
        chartRef.value.update()
      },
      { deep: true }
    )

    const doughnutChart = {
      id: 'doughnut',
      type: 'doughnut',
      data: {
        datasets: [
          {
            backgroundColor: ['#D3D3D3'],
            data: [1],
          },
        ],
      },
      options: {
        elements: {
          center: {
            text: 'Monthly $0',
            size: 12,
          },
        },
      },
      plugins: [chartWithTextCenter],
    }

    return {
      doughnutChart,
      chartRef,
      currencyFormat,
    }
  },
}
</script>
