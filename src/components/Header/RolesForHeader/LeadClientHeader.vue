<template>
  <div class="w-2/12" />
  <div class="flex items-center justify-center w-8/12">
    <InlineSvg :src="IrisLogoStandart" width="100" height="40" />
  </div>
  <UserAction class="w-2/12" />
</template>

<script>
import IrisLogoStandart from '@/assets/svg/iris-logo-standard.svg'
import UserAction from '@/components/UserAction.vue'

export default {
  name: 'LeadClientHeader',
  components: {
    UserAction,
  },
  setup() {
    return {
      IrisLogoStandart,
    }
  },
}
</script>
