import { computed } from 'vue'
import { chartWithTextCenter } from '@/utils/chartWithText'

export const useStatisticsAgeChartDataOptions = (values = []) => {
  const getData = computed(() => {
    const chartData = {
      percent: [],
    }
    if (values.length) {
      values.forEach((item) => {
        chartData.percent.push(Math.round(item.percent))
      })
    } else {
      chartData.percent = [0, 0, 0]
    }

    return chartData
  })

  const doughnutChart = {
    type: 'doughnut',
    data: {
      datasets: [
        {
          backgroundColor: values.length ? ['#FF92A5', '#66B6FF', '#53576A'] : ['#D3D3D3'],
          data: values.length ? getData.value.percent : [1],
        },
      ],
    },
    options: {
      elements: {
        center: {
          text: 'Age',
          size: 12,
        },
      },
    },
    plugins: [chartWithTextCenter],
  }

  return { chartOptions: doughnutChart }
}
