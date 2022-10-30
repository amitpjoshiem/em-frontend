<template>
  <div class="w-5/12">
    <SwdRemoteSearch class="w-5/12" />
  </div>
  <div class="w-2/12 flex justify-center">
    <InlineSvg :src="IrisLogoStandart" width="100" height="40" />
  </div>
  <div class="w-5/12 flex justify-end">
    <SelectAdvisors />
    <HeaderNotificationsBlock class="mx-4" />
    <UserAction />
  </div>
</template>

<script>
import SwdRemoteSearch from '@/components/Global/SwdRemoteSearch.vue'
import IrisLogoStandart from '@/assets/svg/iris-logo-standard.svg'
import SelectAdvisors from '@/components/Header/SelectAdvisors.vue'
import HeaderNotificationsBlock from '@/components/Header/HeaderNotificationsBlock.vue'
import UserAction from '@/components/UserAction.vue'

export default {
  name: 'AssistantHeader',
  components: {
    UserAction,
    SwdRemoteSearch,
    HeaderNotificationsBlock,
    SelectAdvisors,
  },
  setup() {
    return {
      IrisLogoStandart,
    }
  },
}
</script>
