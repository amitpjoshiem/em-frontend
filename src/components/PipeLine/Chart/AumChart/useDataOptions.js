import { computed } from 'vue'
import { currencyCompact } from '@/utils/currencyCompactFormat'

export const useAumChartDataOptions = (values = []) => {
  const getData = computed(() => {
    const chartData = {
      data: [],
      labels: [],
    }
    values.forEach((item) => {
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
