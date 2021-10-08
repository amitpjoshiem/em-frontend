<template>
  <div class="flex">
    <div class="w-40">
      <vue3-chart-js
        :id="doughnutChart.id"
        ref="chartRef"
        :type="doughnutChart.type"
        :data="doughnutChart.data"
        :options="doughnutChart.options"
        :plugins="doughnutChart.plugins"
      />
    </div>
    <div class="pt-8 ml-2.5 text-xs text-main">
      <div v-for="(item, index) in values" :key="index" class="flex items-center mb-5">
        <LegendChartAge :item="item" :index="index" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import { chartWithTextCenter } from '@/utils/chartWithText'
import { computed } from 'vue'

import LegendChartAge from './LegendChartAge.vue'

export default {
  name: 'StatisticsAgeChart',
  components: {
    Vue3ChartJs,
    LegendChartAge,
  },
  props: {
    values: {
      type: Array,
      require: true,
      default: () => [],
    },
  },
  setup(props) {
    const getData = computed(() => {
      const chartData = {
        percent: [],
      }
      props.values.forEach((item) => {
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

    return {
      doughnutChart,
      getData,
    }
  },
}
</script>
