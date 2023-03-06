<template>
  <div class="w-5/12">
    <SwdRemoteSearch class="w-5/12" />
  </div>
  <div class="w-2/12 flex justify-center">
    <InlineSvg :src="IrisLogoStandart" width="100" height="40" />
  </div>
  <div class="w-5/12 flex justify-end">
    <template v-if="showContent.showNewLeadBtn">
      <NewProspectBtn class="mr-4" />
      <NewLeadModal />
    </template>

    <NewOpportunityBtn class="mr-4" />
    <HeaderNotificationsBlock class="mr-4" />
    <UserAction />
  </div>
</template>

<script>
import NewProspectBtn from '@/components/Header/NewProspectBtn.vue'
import NewLeadModal from '@/components/Modal/NewLeadModal.vue'
import NewOpportunityBtn from '@/components/Header/NewOpportunityBtn.vue'
import UserAction from '@/components/UserAction.vue'
import SwdRemoteSearch from '@/components/Global/SwdRemoteSearch.vue'
import HeaderNotificationsBlock from '@/components/Header/HeaderNotificationsBlock.vue'
import IrisLogoStandart from '@/assets/svg/iris-logo-standard.svg'
import { useShowContentEnv } from '@/hooks/use-show-content-env'

export default {
  name: 'AdvisorHeader',
  components: {
    UserAction,
    SwdRemoteSearch,
    HeaderNotificationsBlock,
    NewLeadModal,
    NewOpportunityBtn,
    NewProspectBtn,
  },
  setup() {
    const { showContent } = useShowContentEnv()

    return {
      IrisLogoStandart,
      showContent,
    }
  },
}
</script>
