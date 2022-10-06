<template>
  <SwdSubHeader :title="headerTitle" />
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

    const headerTitle = computed(() => {
      switch (step.value) {
        case 1:
          return 'Basic information'
        case 2:
          return 'Assets & Income'
        case 3:
          return 'Expenses'
        case 4:
          return 'Confirmation'
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
          router.push({ name: 'lead-dashboard' })
      }
    }

    return {
      headerTitle,
      goPage,
    }
  },
}
</script>
