<template>
  <div class="flex pb-2 mt-8">
    <div class="w-6/12" />
    <div class="w-3/12 text-gray03 text-xs">ESSENTIAL</div>
    <div class="w-3/12 text-gray03 text-xs pl-2.5">DISCRETIONARY</div>
  </div>
  <el-card shadow="never" class="mb-5">
    <div class="flex mb-4">
      <div class="w-2/12 flex items-center">Housing</div>
      <div class="w-4/12 text-main font-semibold text-xss flex items-center">Copays/Uncovered Medical Service</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-2/12" />
      <div class="w-4/12 text-main font-semibold text-xss flex items-center">Copays/Uncovered Medical Service</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-2/12" />
      <div class="w-4/12 text-main font-semibold text-xss flex items-center">Copays/Uncovered Medical Service</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-2/12" />
      <div class="w-4/12 text-main font-semibold text-xss flex items-center">Copays/Uncovered Medical Service</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-2/12" />
      <div class="w-4/12 text-main font-semibold text-xss flex items-center">Copays/Uncovered Medical Service</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
  </el-card>
  <el-card shadow="never">
    <div class="flex mb-4">
      <div class="w-2/12 flex items-center">Food</div>
      <div class="w-4/12 text-main font-semibold text-xss flex items-center">Copays/Uncovered Medical Service</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-2/12" />
      <div class="w-4/12 text-main font-semibold text-xss flex items-center">Copays/Uncovered Medical Service</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-2/12 flex items-center">Transportation</div>
      <div class="w-4/12 text-main font-semibold text-xss flex items-center">Copays/Uncovered Medical Service</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-2/12" />
      <div class="w-4/12 text-main font-semibold text-xss flex items-center">Copays/Uncovered Medical Service</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-2/12" />
      <div class="w-4/12 text-main font-semibold text-xss flex items-center">Copays/Uncovered Medical Service</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-2/12" />
      <div class="w-4/12 text-main font-semibold text-xss flex items-center">Copays/Uncovered Medical Service</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
  </el-card>
</template>
<script>
import { onMounted } from 'vue'
import { scrollTop } from '@/utils/scrollTop'
import { useStore } from 'vuex'

export default {
  name: 'NewStep',
  setup() {
    const store = useStore()

    onMounted(() => {
      store.commit('newProspect/setStep', 3)
      scrollTop()
    })
  },
}
</script>
