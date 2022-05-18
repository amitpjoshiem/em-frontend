<template>
  <div
    class="
      h-[30px]
      bg-color-grey
      rounded-md
      border-input-border border
      flex
      items-center
      justify-center
      text-primary text-xss
      cursor-pointer
      mr-5
    "
    @click="newOpportunity"
  >
    <span class="px-2">
      <InlineSvg :src="IconPlus" />
    </span>
    <div class="pr-2">Add new opportunity</div>
  </div>
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
