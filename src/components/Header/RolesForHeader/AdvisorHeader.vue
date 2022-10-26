<template>
  <div class="w-5/12">
    <SwdRemoteSearch class="w-5/12" />
  </div>
  <div class="w-2/12 flex justify-center">
    <InlineSvg :src="IrisLogoStandart" width="100" height="40" />
  </div>
  <div class="w-5/12 flex justify-end">
    <NewLeadBtn class="mr-4" />
    <NewOpportunityBtn class="mr-4" />
    <HeaderNotificationsBlock class="mr-4" />
    <UserAction />
    <NewLeadModal />
  </div>
</template>

<script>
import NewLeadModal from '@/components/Modal/NewLeadModal.vue'
import NewLeadBtn from '@/components/Header/NewLeadBtn.vue'
import NewOpportunityBtn from '@/components/Header/NewOpportunityBtn.vue'
import UserAction from '@/components/UserAction.vue'
import SwdRemoteSearch from '@/components/Global/SwdRemoteSearch.vue'
import HeaderNotificationsBlock from '@/components/Header/HeaderNotificationsBlock.vue'
import IrisLogoStandart from '@/assets/svg/iris-logo-standard.svg'

export default {
  name: 'AdvisorHeader',
  components: {
    UserAction,
    SwdRemoteSearch,
    HeaderNotificationsBlock,
    NewLeadModal,
    NewLeadBtn,
    NewOpportunityBtn,
  },
  setup() {
    return {
      IrisLogoStandart,
    }
  },
}
</script>
