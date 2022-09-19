import { computed } from 'vue'

export const useStatisticsChartDataOptions = (values = []) => {
  const getData = computed(() => {
    const chartData = {
      data: [],
      labels: [],
    }
    values.forEach((item) => {
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
            font: {
              size: 9,
            },
            fontFamily: 'Montserrat',
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

  return { chartOptions: doughnutChart }
}
