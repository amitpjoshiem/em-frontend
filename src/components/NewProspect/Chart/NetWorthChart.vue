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
import { ref, watch, computed } from 'vue'
import { currencyFormat } from '@/utils/currencyFormat'

export default {
  name: 'NetWorthChart',
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
      () => props.values,
      () => {
        doughnutChart.data.datasets = [
          {
            backgroundColor: ['#53576A', '#66B6FF', '#FF92A5'],
            data: [props.values.liquid.percent, props.values.market.percent, props.values.income_safe.percent],
          },
        ]
        doughnutChart.options.elements.center.text = 'Total ' + currencyFormat(getTotal.value)
        chartRef.value.update()
      },
      { deep: true }
    )

    const getTotal = computed(() => {
      return (
        Number(props.values.liquid.amount) +
        Number(props.values.market.amount) +
        Number(props.values.income_safe.amount)
      )
    })

    const doughnutChart = {
      id: 'doughnut',
      type: 'doughnut',
      data: {
        datasets: [
          {
            backgroundColor: getTotal.value !== '0' ? ['#53576A', '#66B6FF', '#FF92A5'] : ['#D3D3D3'],
            data:
              getTotal.value !== '0'
                ? [props.values.liquid.percent, props.values.market.percent, props.values.income_safe.percent]
                : [1],
          },
        ],
      },
      options: {
        elements: {
          center: {
            text: 'Total ' + currencyFormat(getTotal.value),
            size: 12,
          },
        },
      },
      plugins: [chartWithTextCenter],
    }

    return {
      doughnutChart,
      chartRef,
    }
  },
}
</script>
