<template>
  <div>
    <div>Risk Profile Comparison</div>
    <div class="border border-color-grey box-border rounded-lg">
      <div class="flex">
        <div class="w-2/12 border-b border-color-grey" />
        <div
          class="
            w-5/12
            border-l border-r border-b border-color-grey
            p-5
            text-activity
            font-semibold
            text-center
          "
        >
          Rafael Carpenter Holdings
        </div>
        <div
          class="
            w-5/12
            border-b border-color-grey
            p-5
            text-activity
            font-semibold
            text-center
          "
        >
          Rafael Carpenter Recommendation
        </div>
      </div>

      <div class="flex">
        <div
          class="
            w-2/12
            border-b border-color-grey
            box-border
            text-main text-xs
            font-semibold
            text-center
            p-5
          "
        >
          Asset Allocation
        </div>
        <div
          class="
            w-5/12
            border-l border-r border-b border-color-grey
            box-border
            flex
          "
        >
          <HoldingsChart />
          <div class="flex flex-col text-xs text-main">
            <div>
              <div class="bg-red w-2 h-2 rounded-full" />
              <span>Equities</span>
              <span>50%</span>
            </div>
            <div>
              <span></span>
              <span>Fixed Income</span>
              <span>40%</span>
            </div>
            <div>
              <span></span>
              <span>Cash</span>
              <span>10%</span>
            </div>
          </div>
        </div>
        <div class="w-5/12 border-b border-color-grey box-border">
          <RecommendationChart />
        </div>
      </div>

      <div class="flex">
        <div
          class="
            w-2/12
            border-color-grey
            box-border
            text-main text-xs
            font-semibold
            text-center
            p-5
          "
        >
          Risk/Return
        </div>
        <div
          class="w-5/12 border-l border-r border-color-grey box-border flex p-5"
        >
          <div class="flex border border-color-grey p-4 rounded-large mr-4">
            <div class="pr-4 text-center">
              <InlineSvg :src="IconDownRisk" />
              <span class="text-main text-xs">-21%</span>
            </div>
            <div class="text-center">
              <InlineSvg :src="IconUpRisk" />
              <span class="text-main text-xs">29%</span>
            </div>
          </div>
          <div class="flex flex-col justify-center">
            <div class="text-xs text-main font-semibold pb-3">
              Potential Downside: <span class="font-semibold"> -$219K</span>
            </div>
            <div class="text-xs text-main font-semibold">
              Expected Return (5yr): <span class="font-semibold"> +$219K</span>
            </div>
          </div>
        </div>
        <div class="w-5/12 border-r border-color-grey box-border flex p-5">
          <div class="flex border border-color-grey p-4 rounded-large mr-4">
            <div class="pr-4 text-center">
              <InlineSvg :src="IconDownRisk" />
              <span class="text-main text-xs">-21%</span>
            </div>
            <div class="text-center">
              <InlineSvg :src="IconUpRisk" />
              <span class="text-main text-xs">29%</span>
            </div>
          </div>
          <div class="flex flex-col justify-center">
            <div class="text-xs text-main font-semibold pb-3">
              Potential Downside: <span class="font-semibold"> -$219K</span>
            </div>
            <div class="text-xs text-main font-semibold">
              Expected Return (5yr): <span class="font-semibold"> +$219K</span>
            </div>
          </div>
        </div>
      </div>

      <div
        class="
          border-t border-color-grey
          bg-color-grey
          text-xs
          pl-5
          py-2
          font-semibold
        "
      >
        Risk Stats
      </div>

      <div class="flex text-xs text-main">
        <div class="w-2/12 border-r border-color-grey py-2 pl-5">
          Correlation Risk
        </div>
        <div class="w-5/12 border-r border-color-grey py-2 text-center">
          <span
            class="
              bg-lighy-green
              py-1
              px-2
              border border-border-green
              rounded
              text-border-green
            "
            >0.26</span
          >
        </div>
        <div class="w-5/12 py-2 text-center">0.45</div>
      </div>

      <div class="flex text-xs text-main">
        <div class="w-2/12 border-t border-r border-color-grey py-2 pl-5">
          S&P 500 Beta
        </div>
        <div
          class="w-5/12 py-2 text-center border-t border-r border-color-grey"
        >
          0.45
        </div>
        <div
          class="w-5/12 border-t border-r border-color-grey py-2 text-center"
        >
          <span
            class="
              bg-lighy-green
              py-1
              px-2
              border border-border-green
              rounded
              text-border-green
            "
            >0.26</span
          >
        </div>
      </div>

      <div
        class="
          border-t border-color-grey
          bg-color-grey
          text-xs
          pl-5
          py-2
          font-semibold
        "
      >
        Performance Stats
      </div>

      <div class="flex text-xs text-main">
        <div class="w-2/12 border-t border-r border-color-grey py-2 pl-5">
          Total Return
        </div>
        <div
          class="w-5/12 py-2 text-center border-t border-r border-color-grey"
        >
          -6.68%
        </div>
        <div
          class="w-5/12 border-t border-r border-color-grey py-2 text-center"
        >
          <span
            class="
              bg-lighy-green
              py-1
              px-2
              border border-border-green
              rounded
              text-border-green
            "
            >13.48%</span
          >
        </div>
      </div>
      <div class="flex text-xs text-main">
        <div class="w-2/12 border-t border-r border-color-grey py-2 pl-5">
          Annualized Return
        </div>
        <div
          class="w-5/12 py-2 text-center border-t border-r border-color-grey"
        >
          -6.68%
        </div>
        <div
          class="w-5/12 border-t border-r border-color-grey py-2 text-center"
        >
          <span
            class="
              bg-lighy-green
              py-1
              px-2
              border border-border-green
              rounded
              text-border-green
            "
            >13.48%</span
          >
        </div>
      </div>
      <div class="flex text-xs text-main">
        <div class="w-2/12 border-t border-r border-color-grey py-2 pl-5">
          Max Drawdown
        </div>
        <div
          class="w-5/12 py-2 text-center border-t border-r border-color-grey"
        >
          -6.68%
        </div>
        <div
          class="w-5/12 border-t border-r border-color-grey py-2 text-center"
        >
          <span
            class="
              bg-lighy-green
              py-1
              px-2
              border border-border-green
              rounded
              text-border-green
            "
            >13.48%</span
          >
        </div>
      </div>
      <div class="flex text-xs text-main">
        <div class="w-2/12 border-t border-r border-color-grey py-2 pl-5">
          Volatility
        </div>
        <div
          class="w-5/12 py-2 text-center border-t border-r border-color-grey"
        >
          -6.68%
        </div>
        <div
          class="w-5/12 border-t border-r border-color-grey py-2 text-center"
        >
          <span
            class="
              bg-lighy-green
              py-1
              px-2
              border border-border-green
              rounded
              text-border-green
            "
            >13.48%</span
          >
        </div>
      </div>

      <div
        class="
          border-t border-color-grey
          bg-color-grey
          text-xs
          pl-5
          py-2
          font-semibold
        "
      >
        Portfolio Stats
      </div>

      <div class="flex text-xs text-main">
        <div class="w-2/12 border-t border-r border-color-grey py-2 pl-5">
          Yield
        </div>
        <div
          class="w-5/12 py-2 text-center border-t border-r border-color-grey"
        >
          -6.68%
        </div>
        <div
          class="w-5/12 border-t border-r border-color-grey py-2 text-center"
        >
          <span
            class="
              bg-lighy-green
              py-1
              px-2
              border border-border-green
              rounded
              text-border-green
            "
            >13.48%</span
          >
        </div>
      </div>
      <div class="flex text-xs text-main">
        <div class="w-2/12 border-t border-r border-color-grey py-2 pl-5">
          Sharpe Ratio
        </div>
        <div
          class="w-5/12 py-2 text-center border-t border-r border-color-grey"
        >
          -6.68%
        </div>
        <div
          class="w-5/12 border-t border-r border-color-grey py-2 text-center"
        >
          <span
            class="
              bg-lighy-green
              py-1
              px-2
              border border-border-green
              rounded
              text-border-green
            "
            >13.48%</span
          >
        </div>
      </div>
      <div class="flex text-xs text-main">
        <div class="w-2/12 border-t border-r border-color-grey py-2 pl-5">
          Sortino Ratio
        </div>
        <div
          class="w-5/12 py-2 text-center border-t border-r border-color-grey"
        >
          -6.68%
        </div>
        <div
          class="w-5/12 border-t border-r border-color-grey py-2 text-center"
        >
          <span
            class="
              bg-lighy-green
              py-1
              px-2
              border border-border-green
              rounded
              text-border-green
            "
            >13.48%</span
          >
        </div>
      </div>
      <div
        class="
          border-t border-color-grey
          bg-color-grey
          text-xs
          pl-5
          py-2
          font-semibold
        "
      >
        Expences
      </div>

      <div class="flex text-xs text-main">
        <div class="w-2/12 border-t border-r border-color-grey py-2 pl-5">
          Expense Ratio
        </div>
        <div
          class="w-5/12 py-2 text-center border-t border-r border-color-grey"
        >
          -6.68%
        </div>
        <div
          class="w-5/12 border-t border-r border-color-grey py-2 text-center"
        >
          <span
            class="
              bg-lighy-green
              py-1
              px-2
              border border-border-green
              rounded
              text-border-green
            "
            >13.48%</span
          >
        </div>
      </div>
      <div class="flex text-xs text-main">
        <div class="w-2/12 border-t border-r border-color-grey py-2 pl-5">
          AUM Fee
        </div>
        <div
          class="w-5/12 py-2 text-center border-t border-r border-color-grey"
        >
          -6.68%
        </div>
        <div
          class="w-5/12 border-t border-r border-color-grey py-2 text-center"
        >
          <span
            class="
              bg-lighy-green
              py-1
              px-2
              border border-border-green
              rounded
              text-border-green
            "
            >13.48%</span
          >
        </div>
      </div>
    </div>

    <div class="flex justify-end my-6">
      <div class="pr-3">
        <Button default-gray-btn text-btn="Back" @click="backStep" />
      </div>

      <div>
        <Button
          default-blue-btn
          text-btn="Go to the assets &amp; income"
          @click="saveStep"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import IconDownRisk from '@/assets/svg/icon-down-risk.svg'
import IconUpRisk from '@/assets/svg/icon-up-risk.svg'

import HoldingsChart from '@/components/NewProspect/HoldingsChart.vue'
import RecommendationChart from '@/components/NewProspect/RecommendationChart.vue'

export default {
  components: {
    HoldingsChart,
    RecommendationChart,
  },

  setup() {
    const store = useStore()

    onMounted(() => {
      store.commit('newProspect/setStep', 5)
    })

    return {
      IconDownRisk,
      IconUpRisk,
    }
  },
}
</script>
