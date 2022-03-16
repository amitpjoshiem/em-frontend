<template>
  <div class="flex pb-5">
    <div class="w-3/12">
      <BackButton text="Back" @click="back" />
    </div>
    <div class="w-6/12 text-center">
      <span class="text-title text-main font-medium">{{ headerTitle }}</span>
    </div>
    <div class="w-3/12" />
  </div>
</template>
<script>
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'NewProspectHeader',
  setup() {
    const router = useRouter()
    const store = useStore()
    const route = useRoute()

    const step = computed(() => store.state.newProspect.step)

    const next = () => {
      store.commit('newProspect/setStep', step.value + 1)
      goPage()
    }

    const back = () => {
      if (step.value === 1) {
        router.push({ name: 'dashboard' })
      } else {
        store.commit('newProspect/setStep', step.value - 1)
        goPage()
      }
    }

    const headerTitle = computed(() => {
      switch (step.value) {
        case 1:
          return 'Basic information'
        case 2:
          return 'Assets & Income'
        case 3:
          return 'Expenses'
        case 4:
          return 'Assets Acounts'
        case 5:
          return 'Assets Consolidations'
        case 6:
          return 'Stress Test'
        default:
          return 'Header title'
      }
    })

    const goPage = () => {
      switch (step.value) {
        case 1:
          router.push({
            name: 'basic-information',
            params: { id: route.params.id ? route.params.id : '' },
          })
          break
        case 2:
          router.push({
            name: 'assets-information',
            params: { id: route.params.id ? route.params.id : '' },
          })
          break
        case 3:
          router.push({
            name: 'monthly-expense',
            params: { id: route.params.id ? route.params.id : '' },
          })
          break
        case 4:
          router.push({
            name: 'assets-account',
            params: { id: route.params.id ? route.params.id : '' },
          })
          break
        case 5:
          router.push({
            name: 'add-assets-consolidations',
            params: { id: route.params.id ? route.params.id : '' },
          })
          break
        case 6:
          router.push({ name: 'stresstest', params: { id: route.params.id ? route.params.id : '' } })
          break
        case 7:
          router.push({ name: 'blueprint-report', params: { id: route.params.id ? route.params.id : '' } })
          break
        default:
          router.push({ name: 'dashboard' })
      }
    }

    return {
      next,
      back,
      headerTitle,
      goPage,
    }
  },
}
</script>
