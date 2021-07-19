<template>
  <div class="flex justify-between pb-5">
    <BackButton text="Back" @click="back" />
    <span class="text-title text-main font-medium">{{ headerTitle }}</span>
    <NextButton @click="next" />
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'NewProspectHeader',
  setup() {
    const router = useRouter()
    const store = useStore()

    const step = computed(() => store.state.newProspect.step)

    const next = () => {
      store.commit('newProspect/setStep', step.value + 1)
      goPage()
    }

    const hello = () => {
      console.log('hello')
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
          return 'Assets Acounts'
        case 4:
          return 'Assets Consolidations'
        case 5:
          return 'Stress Test Results'
        default:
          return 'Header title'
      }
    })

    const goPage = () => {
      switch (step.value) {
        case 1:
          router.push({ name: 'basic-information' })
          break
        case 2:
          router.push({ name: 'assets-information' })
          break
        case 3:
          router.push({ name: 'assetsacount' })
          break
        case 4:
          router.push({ name: 'assetsconsolidations' })
          break
        case 5:
          router.push({ name: 'stresstest' })
          break
        case 6:
          router.push({ name: 'bluereport' })
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
      hello,
    }
  },
}
</script>
