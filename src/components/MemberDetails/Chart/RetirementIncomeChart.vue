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

export default {
  name: 'RetirementIncomeChart',
  components: {
    Vue3ChartJs,
  },
  setup() {
    const chartRef = ref(null)

    const doughnutChart = {
      id: 'doughnut',
      type: 'bar',
      data: {
        labels: [
          '59',
          '60',
          '61',
          '62',
          '63',
          '64',
          '65',
          '66',
          '67',
          '80',
          '69',
          '70',
          '72',
          '73',
          '74',
          '75',
          '76',
          '77',
          '78',
          '79',
          '80',
        ],
        datasets: [
          {
            borderSkipped: false,
            borderColor: '#76E1BB',
            maxBarThickness: 10,
            backgroundColor: ['#76E1BB'],
            data: [
              1, 0.6, 0.4, 0.2, 0.2, 0.6, 0.7, 0.1, 0.9, 0.8, 1.2, 0.4, 0.1, 1.2, 1.5, 0.2, 0.3, 0.8, 0.9, 0.3, 0.4,
            ],
          },
          {
            borderSkipped: false,
            borderColor: '#FF92A5',
            maxBarThickness: 10,
            backgroundColor: ['#FF92A5'],
            data: [
              1, 0.6, 0.4, 0.2, 0.2, 0.6, 0.7, 0.1, 0.9, 0.8, 1.2, 0.4, 0.1, 1.2, 1.5, 0.2, 0.3, 0.8, 0.9, 0.3, 0.4,
            ],
          },
          {
            borderSkipped: false,
            borderColor: '#66B6FF',
            maxBarThickness: 10,
            backgroundColor: ['#66B6FF'],
            data: [
              1, 0.6, 0.4, 0.2, 0.2, 0.6, 0.7, 0.1, 0.9, 0.8, 1.2, 0.4, 0.1, 1.2, 1.5, 0.2, 0.3, 0.8, 0.9, 0.3, 0.4,
            ],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            type: 'linear',
            grace: '5%',
            min: 0,
            max: 2,
            stepSize: 0.5,
            stacked: true,
            ticks: {
              callback: function (value) {
                return '$' + value + 'm'
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
            stacked: true,
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
    }
  },
}
</script>
