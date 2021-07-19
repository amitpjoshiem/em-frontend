<template>
  <div>
    <div class="border box-border color-light-gray rounded-lg">
      <div class="text-smm font-medium text-main py-5 pl-5">
        Prospect Asset Consolidations
      </div>
      <div class="flex h-12 bg-widget-bg">
        <div class="w-2/10 title">name</div>
        <div class="w-1/10 title">
          % of <br />
          Holdings
        </div>
        <div class="w-1/10 title">Amount</div>
        <div class="w-1/10 title">Management expence</div>
        <div class="w-1/10 title">Turnover%</div>
        <div class="w-1/10 title">
          Trading <br />
          costs
        </div>
        <div class="w-1/10 title">Wrap Fee</div>
        <div class="w-1/10 title">
          Total cost <br />
          in %
        </div>
        <div class="w-1/10 title">
          Total cost <br />
          in $
        </div>
      </div>
      <div class="flex h-10">
        <div class="w-2/10 item pt-4"><InputText type="inputTable" /></div>
        <div class="w-1/10 item">#DIV/0!</div>
        <div class="w-1/10 item pt-4 pl-2"><InputText type="inputTable" /></div>
        <div class="w-1/10 item pt-4 pl-2"><InputText type="inputTable" /></div>
        <div class="w-1/10 item pt-4 pl-2"><InputText type="inputTable" /></div>
        <div class="w-1/10 item">1.00%</div>
        <div class="w-1/10 item">0.00%</div>
        <div class="w-1/10 item">#DIV/0!</div>
        <div class="w-1/10 item">$0.00</div>
      </div>
      <div class="flex h-10">
        <div class="w-2/10 item pt-4"><InputText type="inputTable" /></div>
        <div class="w-1/10 item">#DIV/0!</div>
        <div class="w-1/10 item pt-4 pl-2"><InputText type="inputTable" /></div>
        <div class="w-1/10 item pt-4 pl-2"><InputText type="inputTable" /></div>
        <div class="w-1/10 item pt-4 pl-2"><InputText type="inputTable" /></div>
        <div class="w-1/10 item">1.00%</div>
        <div class="w-1/10 item">0.00%</div>
        <div class="w-1/10 item">#DIV/0!</div>
        <div class="w-1/10 item">$0.00</div>
      </div>

      <div class="flex h-10">
        <div class="w-2/10 total">Totals</div>
        <div class="w-1/10 total">#DIV/0!</div>
        <div class="w-1/10 total">$0.00</div>
        <div class="w-1/10 total">#DIV/0!</div>
        <div class="w-1/10 total">#DIV/0!</div>
        <div class="w-1/10 total">1.00%</div>
        <div class="w-1/10 total">0.00%</div>
        <div class="w-1/10 total">#DIV/0!</div>
        <div class="w-1/10 total">$0.00</div>
      </div>
    </div>
    <div class="flex justify-end my-6">
      <div class="pr-3">
        <Button default-gray-btn text-btn="Back" @click="backStep" />
      </div>

      <div>
        <Button
          default-blue-btn
          text-btn="Go to the stress test results"
          @click="saveStep"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'AssetsConsolidations',
  setup() {
    const router = useRouter()
    const store = useStore()

    onMounted(() => {
      store.commit('newProspect/setStep', 4)
    })

    const step = computed(() => store.state.newProspect.step)

    const saveStep = () => {
      store.commit('newProspect/setStep', step.value + 1)
      router.push({ name: 'stresstest' })
    }

    const backStep = () => {
      store.commit('newProspect/setStep', step.value - 1)
      router.push({ name: 'assetsacount' })
    }

    return {
      saveStep,
      backStep,
    }
  },
  data() {
    return {
      isLinkAcount: true,
    }
  },
}
</script>

<style scoped>
.title {
  @apply border-r border-b border-title-gray text-small text-gray03 flex items-center justify-center uppercase text-center last:border-r-0;
}

.item {
  @apply border-r border-b border-title-gray text-xs text-text-light-gray flex items-center justify-center uppercase text-center last:border-r-0;
}

.total {
  @apply border-r border-title-gray bg-color-grey text-xs font-medium text-main flex items-center justify-center text-center last:border-r-0;
}
</style>
