<template>
  <div class="bg-widget-bg items-center pl-7 h-16 pr-5 flex justify-between">
    <div class="flex items-center justify-between w-20/24">
      <SwdRemoteSearch v-if="$can('advisor', 'all') || $can('super-admin', 'all')" />
      <div v-if="$can('advisor', 'all')" class="flex items-center justify-end">
        <TestEventBtn v-if="showContent.testNotificationsBtn && showContent.testSentryBtn" />
        <NewLeadBtn />
        <NewOpportunityBtn />
        <div class="border-l border-color-grey h-16" />
        <HeaderNotificationsBlock />
        <div class="border-l border-color-grey h-16" />
      </div>
      <SelectCompany v-if="$can('super-admin', 'all')" />
    </div>

    <div class="w-4/24 flex items-center justify-end">
      <div class="flex items-center justify-center pl-5 cursor-pointer">
        <router-link :to="{ name: 'profile' }">
          <SwdAvatar v-if="!isLoadingUserProfile" :link="user.avatar.url" />
        </router-link>
        <UserAction />
      </div>
    </div>
  </div>
  <NewLeadModal />
</template>

<script>
import UserAction from '@/components/UserAction.vue'
import SwdRemoteSearch from '@/components/Global/SwdRemoteSearch.vue'
import HeaderNotificationsBlock from '@/components/Header/HeaderNotificationsBlock.vue'
import NewLeadModal from '@/components/Leads/NewLeadModal.vue'
import NewLeadBtn from '@/components/Header/NewLeadBtn.vue'
import NewOpportunityBtn from '@/components/Header/NewOpportunityBtn.vue'
import TestEventBtn from '@/components/Header/TestEventBtn.vue'
import SelectCompany from '@/components/Header/SelectCompany.vue'
import { useUserProfile } from '@/api/use-user-profile.js'
import { useShowContentEnv } from '@/hooks/use-show-content-env'

export default {
  name: 'Header',
  components: {
    UserAction,
    SwdRemoteSearch,
    HeaderNotificationsBlock,
    NewLeadModal,
    NewLeadBtn,
    NewOpportunityBtn,
    TestEventBtn,
    SelectCompany,
  },

  setup() {
    const { isLoading: isLoadingUserProfile, isError: isErrorUserProfile, data: user, isFetched } = useUserProfile()

    const { showContent } = useShowContentEnv()

    return {
      isLoadingUserProfile,
      isErrorUserProfile,
      user,
      isFetched,
      showContent,
    }
  },
}
</script>
