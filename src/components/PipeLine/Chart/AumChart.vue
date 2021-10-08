<template>
  <div>
    <vue3-chart-js
      :id="doughnutChart.id"
      ref="chartRef"
      :type="doughnutChart.type"
      :data="doughnutChart.data"
      :options="doughnutChart.options"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import { computed } from 'vue'
import { currencyCompact } from '@/utils/currencyCompactFormat'

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

    const getData = computed(() => {
      const chartData = {
        data: [],
        labels: [],
      }
      props.values.forEach((item) => {
        chartData.data.push(Math.round(item.amount))
        chartData.labels.push(item.period)
      })
      return chartData
    })

    const doughnutChart = {
      id: 'aumChart',
      type: 'line',
      data: {
        labels: getData.value.labels,
        datasets: [
          {
            borderRadius: 20,
            borderSkipped: false,
            borderColor: '#66B6FF',
            maxBarThickness: 10,
            backgroundColor: ['#66B6FF'],
            data: getData.value.data,
            cubicInterpolationMode: 'monotone',
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            type: 'linear',
            ticks: {
              callback: function (value) {
                return '$' + currencyCompact(value)
              },
              font: {
                size: 9,
              },
              fontFamily: 'Work Sans',
              color: '#424450',
            },
            grid: {
              borderDash: [8, 8],
              color: '#EFF6FF',
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: '#424450',
              font: {
                size: 9,
              },
            },
          },
        },
        plugins: {
          legend: false,
        },
      },
    }

    return {
      doughnutChart,
      chartRef,
      currencyCompact,
    }
  },
}
</script>
