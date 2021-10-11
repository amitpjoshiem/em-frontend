import { computed } from 'vue'

export const useStatisticsRetiredChartDataOptions = (values = []) => {
  const getData = computed(() => {
    const chartData = {
      employers: [],
      retired: [],
      labels: [],
    }
    values.forEach((item) => {
      chartData.employers.push(item.employers)
      chartData.retired.push(item.retired)
      chartData.labels.push(item.month)
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
          data: getData.value.employers,
          cubicInterpolationMode: 'monotone',
        },
        {
          borderRadius: 20,
          borderSkipped: false,
          borderColor: '#FF92A5',
          maxBarThickness: 10,
          backgroundColor: ['#FF92A5'],
          data: getData.value.retired,
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

  return { chartOptions: doughnutChart }
}
