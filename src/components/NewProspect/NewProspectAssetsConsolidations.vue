<template>
  <div>
    <div class="border box-border color-light-gray rounded-lg"></div>
    <TableAssetsConsolidations />
    <div class="flex justify-end my-6">
      <div class="pr-3">
        <Button default-gray-btn text-btn="Back" @click="backStep" />
      </div>

      <div>
        <Button default-blue-btn text-btn="Go to the stress test results" @click="saveStep" />
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { scrollTop } from '@/utils/scrollTop'

import TableAssetsConsolidations from '@/components/Table/TableAssetsConsolidations.vue'

export default {
  name: 'AssetsConsolidations',
  components: {
    TableAssetsConsolidations,
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    onMounted(() => {
      store.commit('newProspect/setStep', 4)
      scrollTop()
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
