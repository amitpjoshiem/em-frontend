<template>
  <div class="bg-widget-bg items-center h-16 flex justify-between px-3">
    <SwdRemoteSearch v-if="!$can('client', 'all')" class="sm:w-4/24" />

    <div v-if="$can('advisor', 'all') || $can('assistant', 'all')" class="flex items-center justify-end sm:w-14/24">
      <TestEventBtn v-if="showContent.testNotificationsBtn && showContent.testSentryBtn && !$can('assistant', 'all')" />
      <NewLeadBtn />
      <NewOpportunityBtn />
    </div>

    <div v-if="$can('admin', 'all') || $can('ceo', 'all')" class="flex justify-between items-center text-sm sm:w-11/24">
      <el-button
        :type="getRouteName === 'admin-dashboard' || getRouteName === 'ceo-dashboard' ? 'primary' : 'info'"
        size="small"
        plain
        @click="goDashboard"
      >
        Dashboard
      </el-button>
      <el-button
        :type="getRouteName === 'admin-all-advisors' || getRouteName === 'ceo-all-advisors' ? 'primary' : 'info'"
        size="small"
        plain
        @click="goAdvisors"
      >
        Advisors
      </el-button>
      <el-button
        plain
        size="small"
        :type="getRouteName === 'admin-all-list' || getRouteName === 'ceo-all-list' ? 'primary' : 'info'"
        @click="goMembers"
      >
        Members
      </el-button>
      <el-button
        plain
        size="small"
        :type="getRouteName === 'admin-activity' || getRouteName === 'ceo-activity' ? 'primary' : 'info'"
        @click="goActivity"
      >
        Activity
      </el-button>
      <el-button
        plain
        size="small"
        :type="getRouteName === 'admin-pipeline' || getRouteName === 'ceo-pipeline' ? 'primary' : 'info'"
        @click="goPipeLine"
      >
        PipeLine
      </el-button>
    </div>

    <SelectCompany v-if="$can('ceo', 'all')" />
    <SelectAdvisors v-if="$can('assistant', 'all')" />

    <div class="flex items-center justify-end" :class="{ 'w-full': $can('client', 'all') }">
      <HeaderNotificationsBlock />
    </div>

    <div class="flex items-center justify-end cursor-pointer sm:w-4/24 xl:w-2/24 ml-2">
      <router-link :to="{ name: 'profile' }">
        <SwdAvatar v-if="!isLoadingUserProfile" :link="user.avatar.url" />
      </router-link>
      <UserAction />
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
import SelectAdvisors from '@/components/Header/SelectAdvisors.vue'
import { useUserProfile } from '@/api/use-user-profile.js'
import { useShowContentEnv } from '@/hooks/use-show-content-env'

import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

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
    SelectAdvisors,
  },

  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const { isLoading: isLoadingUserProfile, isError: isErrorUserProfile, data: user, isFetched } = useUserProfile()

    const { showContent } = useShowContentEnv()

    const getRouteName = computed(() => {
      return route.name
    })

    const getRole = computed(() => {
      return store.state.globalComponents.role
    })

    const goAdvisors = () => {
      if (getRole.value === 'admin') router.push({ name: 'admin-all-advisors' })
      if (getRole.value === 'ceo') router.push({ name: 'ceo-all-advisors' })
    }

    const goDashboard = () => {
      if (getRole.value === 'admin') router.push({ name: 'admin-dashboard' })
      if (getRole.value === 'ceo') router.push({ name: 'ceo-dashboard' })
    }

    const goActivity = () => {
      if (getRole.value === 'admin') router.push({ name: 'admin-activity' })
      if (getRole.value === 'ceo') router.push({ name: 'ceo-activity' })
    }

    const goMembers = () => {
      if (getRole.value === 'admin') router.push({ name: 'admin-all-list' })
      if (getRole.value === 'ceo') router.push({ name: 'ceo-all-list' })
    }

    const goPipeLine = () => {
      if (getRole.value === 'admin') router.push({ name: 'admin-pipeline' })
      if (getRole.value === 'ceo') router.push({ name: 'ceo-pipeline' })
    }

    return {
      isLoadingUserProfile,
      isErrorUserProfile,
      user,
      isFetched,
      showContent,
      goAdvisors,
      goDashboard,
      goActivity,
      goMembers,
      goPipeLine,
      getRouteName,
    }
  },
}
</script>
