<template>
  <div>
    <vue3-chart-js
      :id="doughnutChart.id"
      ref="chartNumberLeedsRef"
      :type="doughnutChart.type"
      :data="doughnutChart.data"
      :options="doughnutChart.options"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
// import { useStatisticsChartDataOptions } from '@/components/PipeLine/Chart/NumberLeeds/useDataOptions.js'

export default {
  name: 'NumberLeeds',
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
    const chartNumberLeedsRef = ref(null)

    // const { chartOptions } = useStatisticsChartDataOptions(props.values)

    const getData = computed(() => {
      const chartData = {
        data: [],
        labels: [],
      }
      props.values.forEach((item) => {
        chartData.data.push(item.count)
        chartData.labels.push(item.period)
      })
      return chartData
    })

    const doughnutChart = {
      id: 'doughnut',
      type: 'bar',
      data: {
        labels: getData.value.labels,
        datasets: [
          {
            borderRadius: 20,
            borderSkipped: false,
            borderColor: '#41B883',
            maxBarThickness: 10,
            backgroundColor: ['#66B6FF'],
            data: getData.value.data,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            type: 'linear',
            ticks: {
              min: 0,
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
      chartNumberLeedsRef,
      doughnutChart,
      // chartOptions,
    }
  },
}
</script>
