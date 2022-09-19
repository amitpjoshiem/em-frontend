import { computed } from 'vue'

export const useStatisticsChartDataOptions = (values = []) => {
  const getData = computed(() => {
    const chartData = {
      lost: [],
      win: [],
      labels: [],
    }
    values.forEach((item) => {
      chartData.lost.push(item.lost)
      chartData.win.push(item.win)
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
          data: getData.value.win,
          cubicInterpolationMode: 'monotone',
        },
        {
          borderRadius: 20,
          borderSkipped: false,
          borderColor: '#FF92A5',
          maxBarThickness: 10,
          backgroundColor: ['#FF92A5'],
          data: getData.value.lost,
          cubicInterpolationMode: 'monotone',
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          type: 'linear',
          min: 0,
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
