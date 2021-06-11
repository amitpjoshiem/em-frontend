<template>
  <div>
    <vue3-chart-js
      :id="doughnutChart.id"
      :type="doughnutChart.type"
      :data="doughnutChart.data"
      :options="doughnutChart.options"
    />
  </div>
</template>

<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'

export default {
  name: 'App',
  components: {
    Vue3ChartJs,
  },
  setup() {
    const doughnutChart = {
      id: 'doughnut',
      type: 'bar',
      data: {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            borderRadius: 20,
            borderSkipped: false,
            borderColor: '#41B883',
            maxBarThickness: 10,
            backgroundColor: ['#66B6FF'],
            data: [40, 20, 80, 10, 30, 50, 80, 25, 87, 34, 28, 84],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            type: 'linear',
            grace: '5%',
            ticks: {
              stepSize: 20,
              callback: function (value) {
                return value + '%'
              },
              font: {
                size: 9,
              },
              fontFamily: 'Eina01',
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
    }
  },
}
</script>
