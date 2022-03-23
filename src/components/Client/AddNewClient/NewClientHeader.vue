<template>
  <div class="flex pb-5">
    <div class="w-3/12">
      <BackButton text="Back" @click="back" />
    </div>
    <div class="w-6/12 text-center">
      <span class="text-sm sm:text-base text-title text-main font-medium">{{ headerTitle }}</span>
    </div>
    <div class="w-3/12" />
  </div>
</template>
<script>
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'NewClientHeader',
  setup() {
    const router = useRouter()
    const store = useStore()
    const route = useRoute()

    const step = computed(() => store.state.newClient.step)

    const back = () => {
      if (step.value === 1) {
        router.push({ name: 'dashboard' })
      } else {
        store.commit('newClient/setStep', step.value - 1)
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
        default:
          return 'Header title'
      }
    })

    const goPage = () => {
      switch (step.value) {
        case 1:
          router.push({
            name: 'client-basic-information',
            params: { id: route.params.id ? route.params.id : '' },
          })
          break
        case 2:
          router.push({
            name: 'client-assets-information',
            params: { id: route.params.id ? route.params.id : '' },
          })
          break
        case 3:
          router.push({
            name: 'client-expense-information',
            params: { id: route.params.id ? route.params.id : '' },
          })
          break
        default:
          router.push({ name: 'client-dashboard' })
      }
    }

    return {
      back,
      headerTitle,
      goPage,
    }
  },
}
</script>
