<template>
  <SwdButton primary small @click="newOpportunity">
    <InlineSvg :src="IconPlus" class="mr-1.5" />
    Add new opportunity
  </SwdButton>
</template>

<script>
import IconPlus from '@/assets/svg/icon-plus.svg'
import { ElMessageBox } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'NewOpportunityBtn',
  setup() {
    const route = useRoute()
    const router = useRouter()

    const newOpportunity = () => {
      if (['assets-information', 'assets-account', 'add-assets-consolidations', 'stresstest'].includes(route.name)) {
        ElMessageBox.confirm('Are you sure you want to exit? All the unsaved changes will be lost', 'Info', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'info',
        })
          .then(() => {
            router.push({ name: 'basic-information' })
          })
          .catch(() => {})
      } else {
        router.push({ name: 'basic-information' })
      }
    }
    return {
      IconPlus,
      newOpportunity,
    }
  },
}
</script>
