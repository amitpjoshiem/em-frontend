<template>
  <div>
    <div class="text-base text-main font-medium py-5">Risk Profile Comparison</div>
    <div class="border border-color-grey box-border rounded-lg">
      <div class="flex">
        <div class="w-2/12 border-b border-color-grey" />
        <div class="w-5/12 border-l border-r border-b border-color-grey p-5 text-activity font-medium text-center">
          Rafael Carpenter Holdings
        </div>
        <div class="w-5/12 border-b border-color-grey p-5 text-activity font-medium text-center">
          Rafael Carpenter Recommendation
        </div>
      </div>

      <div class="flex">
        <div class="w-2/12 border-b border-color-grey box-border text-main text-xs font-medium text-center p-5">
          Asset Allocation
        </div>
        <div class="w-5/12 pl-2 border-l border-r border-b border-color-grey box-border flex py-5">
          <HoldingsChart />
          <div class="flex ml-4">
            <div class="flex flex-col justify-center mr-3">
              <div class="bg-dark-blue-charts w-2 h-2 rounded-full" />
              <div class="bg-activity w-2 h-2 rounded-full my-6" />
              <div class="bg-color-error w-2 h-2 rounded-full" />
            </div>
            <div class="flex flex-col justify-center text-main text-xs mr-3">
              <div>Equities</div>
              <div class="py-4">Fixed Income</div>
              <div>Cash</div>
            </div>
            <div class="flex flex-col justify-center text-main text-xs font-medium">
              <div>50%</div>
              <div class="py-4">40%</div>
              <div>10%</div>
            </div>
          </div>
        </div>
        <div class="w-5/12 border-b border-color-grey box-border flex py-5 pl-2">
          <RecommendationChart />
          <div class="flex ml-4">
            <div class="flex flex-col justify-center mr-3">
              <div class="bg-dark-blue-charts w-2 h-2 rounded-full" />
              <div class="bg-activity w-2 h-2 rounded-full my-6" />
              <div class="bg-color-error w-2 h-2 rounded-full" />
            </div>
            <div class="flex flex-col justify-center text-main text-xs mr-3">
              <div>Equities</div>
              <div class="py-4">Fixed Income</div>
              <div>Cash</div>
            </div>
            <div class="flex flex-col justify-center text-main text-xs font-medium">
              <div>50%</div>
              <div class="py-4">40%</div>
              <div>10%</div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex">
        <div class="w-2/12 border-color-grey box-border text-main text-xs font-medium text-center p-5">Risk/Return</div>
        <div class="w-5/12 border-l border-r border-color-grey box-border flex p-5">
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
            <div class="text-xs text-main font-medium pb-3">
              Potential Downside: <span class="font-medium"> -$219K</span>
            </div>
            <div class="text-xs text-main font-medium">
              Expected Return (5yr): <span class="font-medium"> +$219K</span>
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
            <div class="text-xs text-main font-medium pb-3">
              Potential Downside: <span class="font-medium"> -$219K</span>
            </div>
            <div class="text-xs text-main font-medium">
              Expected Return (5yr): <span class="font-medium"> +$219K</span>
            </div>
          </div>
        </div>
      </div>

      <div class="border-t border-color-grey bg-color-grey text-xs pl-5 py-2 font-medium">Risk Stats</div>

      <div class="flex text-xs text-main">
        <div class="w-2/12 border-r border-color-grey py-2 pl-5">Correlation Risk</div>
        <div class="w-5/12 border-r border-color-grey py-2 text-center">
          <span class="bg-lighy-green py-1 px-2 border border-border-green rounded text-border-green">0.26</span>
        </div>
        <div class="w-5/12 py-2 text-center">0.45</div>
      </div>

      <div class="flex text-xs text-main">
        <div class="w-2/12 border-t border-r border-color-grey py-2 pl-5">S&P 500 Beta</div>
        <div class="w-5/12 py-2 text-center border-t border-r border-color-grey">0.45</div>
        <div class="w-5/12 border-t border-r border-color-grey py-2 text-center">
          <span class="bg-lighy-green py-1 px-2 border border-border-green rounded text-border-green">0.26</span>
        </div>
      </div>

      <div class="border-t border-color-grey bg-color-grey text-xs pl-5 py-2 font-medium">Performance Stats</div>

      <div class="flex text-xs text-main">
        <div class="w-2/12 border-t border-r border-color-grey py-2 pl-5">Total Return</div>
        <div class="w-5/12 py-2 text-center border-t border-r border-color-grey">-6.68%</div>
        <div class="w-5/12 border-t border-r border-color-grey py-2 text-center">
          <span class="bg-lighy-green py-1 px-2 border border-border-green rounded text-border-green">13.48%</span>
        </div>
      </div>
      <div class="flex text-xs text-main">
        <div class="w-2/12 border-t border-r border-color-grey py-2 pl-5">Annualized Return</div>
        <div class="w-5/12 py-2 text-center border-t border-r border-color-grey">-6.68%</div>
        <div class="w-5/12 border-t border-r border-color-grey py-2 text-center">
          <span class="bg-lighy-green py-1 px-2 border border-border-green rounded text-border-green">13.48%</span>
        </div>
      </div>
      <div class="flex text-xs text-main">
        <div class="w-2/12 border-t border-r border-color-grey py-2 pl-5">Max Drawdown</div>
        <div class="w-5/12 py-2 text-center border-t border-r border-color-grey">-6.68%</div>
        <div class="w-5/12 border-t border-r border-color-grey py-2 text-center">
          <span class="bg-lighy-green py-1 px-2 border border-border-green rounded text-border-green">13.48%</span>
        </div>
      </div>
      <div class="flex text-xs text-main">
        <div class="w-2/12 border-t border-r border-color-grey py-2 pl-5">Volatility</div>
        <div class="w-5/12 py-2 text-center border-t border-r border-color-grey">-6.68%</div>
        <div class="w-5/12 border-t border-r border-color-grey py-2 text-center">
          <span class="bg-lighy-green py-1 px-2 border border-border-green rounded text-border-green">13.48%</span>
        </div>
      </div>

      <div class="border-t border-color-grey bg-color-grey text-xs pl-5 py-2 font-medium">Portfolio Stats</div>

      <div class="flex text-xs text-main">
        <div class="w-2/12 border-t border-r border-color-grey py-2 pl-5">Yield</div>
        <div class="w-5/12 py-2 text-center border-t border-r border-color-grey">-6.68%</div>
        <div class="w-5/12 border-t border-r border-color-grey py-2 text-center">
          <span class="bg-lighy-green py-1 px-2 border border-border-green rounded text-border-green">13.48%</span>
        </div>
      </div>
      <div class="flex text-xs text-main">
        <div class="w-2/12 border-t border-r border-color-grey py-2 pl-5">Sharpe Ratio</div>
        <div class="w-5/12 py-2 text-center border-t border-r border-color-grey">-6.68%</div>
        <div class="w-5/12 border-t border-r border-color-grey py-2 text-center">
          <span class="bg-lighy-green py-1 px-2 border border-border-green rounded text-border-green">13.48%</span>
        </div>
      </div>
      <div class="flex text-xs text-main">
        <div class="w-2/12 border-t border-r border-color-grey py-2 pl-5">Sortino Ratio</div>
        <div class="w-5/12 py-2 text-center border-t border-r border-color-grey">-6.68%</div>
        <div class="w-5/12 border-t border-r border-color-grey py-2 text-center">
          <span class="bg-lighy-green py-1 px-2 border border-border-green rounded text-border-green">13.48%</span>
        </div>
      </div>
      <div class="border-t border-color-grey bg-color-grey text-xs pl-5 py-2 font-medium">Expences</div>

      <div class="flex text-xs text-main">
        <div class="w-2/12 border-t border-r border-color-grey py-2 pl-5">Expense Ratio</div>
        <div class="w-5/12 py-2 text-center border-t border-r border-color-grey">-6.68%</div>
        <div class="w-5/12 border-t border-r border-color-grey py-2 text-center">
          <span class="bg-lighy-green py-1 px-2 border border-border-green rounded text-border-green">13.48%</span>
        </div>
      </div>
      <div class="flex text-xs text-main">
        <div class="w-2/12 border-t border-r border-color-grey py-2 pl-5">AUM Fee</div>
        <div class="w-5/12 py-2 text-center border-t border-r border-color-grey">-6.68%</div>
        <div class="w-5/12 border-t border-r border-color-grey py-2 text-center">
          <span class="bg-lighy-green py-1 px-2 border border-border-green rounded text-border-green">13.48%</span>
        </div>
      </div>
    </div>

    <div class="flex justify-end my-6">
      <div class="pr-3">
        <Button default-gray-btn text-btn="Back" @click="backStep" />
      </div>

      <div>
        <Button default-blue-btn text-btn="Show Report" @click="saveStep" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import IconDownRisk from '@/assets/svg/icon-down-risk.svg'
import IconUpRisk from '@/assets/svg/icon-up-risk.svg'
import { useRouter, useRoute } from 'vue-router'
import HoldingsChart from '@/components/NewProspect/Chart/HoldingsChart.vue'
import RecommendationChart from '@/components/NewProspect/Chart/RecommendationChart.vue'
import { scrollTop } from '@/utils/scrollTop'

export default {
  name: 'NewProspectStressTest',
  components: {
    HoldingsChart,
    RecommendationChart,
  },

  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    onMounted(() => {
      store.commit('newProspect/setStep', 5)
      scrollTop()
    })

    const step = computed(() => store.state.newProspect.step)

    const saveStep = () => {
      router.push({ name: 'blueprint-report', params: { id: route.params.id } })
    }

    const backStep = () => {
      store.commit('newProspect/setStep', step.value - 1)
      router.push({ name: 'assetsconsolidations', params: { id: route.params.id } })
    }

    return {
      IconDownRisk,
      IconUpRisk,
      saveStep,
      backStep,
    }
  },
}
</script>
