import { computed } from 'vue'
import { chartWithTextCenter } from '@/utils/chartWithText'

export const useStatisticsAgeChartDataOptions = (values = []) => {
  const getData = computed(() => {
    const chartData = {
      percent: [],
    }
    values.forEach((item) => {
      chartData.percent.push(Math.round(item.percent))
    })
    return chartData
  })

  const doughnutChart = {
    type: 'doughnut',
    data: {
      datasets: [
        {
          backgroundColor: ['#FF92A5', '#66B6FF', '#53576A'],
          data: getData.value.percent,
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
