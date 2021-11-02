<template>
  <div>
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
import { useRouter, useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { scrollTop } from '@/utils/scrollTop'

import TableAssetsConsolidations from '@/components/NewProspect/AssetsConsolidations/TableAssetsConsolidations.vue'

export default {
  name: 'AssetsConsolidations',
  components: {
    TableAssetsConsolidations,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    onMounted(() => {
      store.commit('newProspect/setStep', 4)
      scrollTop()
    })

    const step = computed(() => store.state.newProspect.step)

    const saveStep = () => {
      store.commit('newProspect/setStep', step.value + 1)
      router.push({ name: 'stresstest', params: { id: route.params.id } })
    }

    const backStep = () => {
      store.commit('newProspect/setStep', step.value - 1)
      router.push({ name: 'assetsacount', params: { id: route.params.id } })
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
