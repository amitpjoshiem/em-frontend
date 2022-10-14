<template>
  <aside class="bg-primary min-h-screen flex-col w-[68px] sm:flex hidden">
    <div class="fixed cursor-pointer" @click="goHome">
      <div class="flex items-center justify-center mt-4 w-[63px]">
        <InlineSvg :src="IrisIconReverse" width="50" height="50" />
      </div>
    </div>
    <div v-if="isShowSideBar" class="flex flex-col items-center flex-grow w-[68px] fixed top-1/3">
      <router-link
        :to="{ name: 'advisor-dashboard' }"
        class="item flex justify-center items-center cursor-pointer w-full h-14"
        :class="{ active: getRouteName === 'advisor-dashboard' }"
      >
        <InlineSvg v-if="getRouteName === 'advisor-dashboard'" :src="IconDashboardActive" />
        <InlineSvg v-else :src="IconDashboard" />
      </router-link>

      <router-link
        :to="{ name: 'all' }"
        class="item flex justify-center items-center cursor-pointer w-full h-14"
        :class="{
          active: getActiveListOfHouseholds,
        }"
      >
        <InlineSvg v-if="getActiveListOfHouseholds" :src="IconListActive" />
        <InlineSvg v-else :src="IconList" />
      </router-link>

      <router-link
        :to="{ name: 'activity' }"
        class="item flex justify-center items-center cursor-pointer w-full h-14"
        :class="{ active: getRouteName === 'activity' }"
      >
        <InlineSvg v-if="getRouteName === 'activity'" :src="IconAssetsActive" />
        <InlineSvg v-else :src="IconAssets" />
      </router-link>

      <router-link
        :to="{ name: 'pipeline' }"
        class="item flex justify-center items-center cursor-pointer w-full h-14"
        :class="{ active: getRouteName === 'pipeline' }"
      >
        <InlineSvg v-if="getRouteName === 'pipeline'" :src="IconActivityPipeLine" />
        <InlineSvg v-else :src="IconPipeLine" />
      </router-link>

      <router-link
        :to="{ name: 'list-all-leads' }"
        class="item flex justify-center items-center cursor-pointer w-full h-14"
        :class="{ active: getRouteName === 'leads' }"
      >
        <InlineSvg
          v-if="
            getRouteName === 'list-all-leads' ||
            getRouteName === 'list-active-leads' ||
            getRouteName === 'list-deactivated-leads'
          "
          :src="IconLeadsActive"
        />
        <InlineSvg v-else :src="IconLeads" />
      </router-link>

      <router-link
        v-if="!$can('lead', 'all')"
        :to="{ name: 'logs' }"
        class="item flex justify-center items-center cursor-pointer w-full h-14"
        :class="{ active: getRouteName === 'logs' }"
      >
        <InlineSvg v-if="getRouteName === 'logs'" :src="IconLogsActive" width="20" height="20" />
        <InlineSvg v-else :src="IconLogs" width="20" height="20" />
      </router-link>
    </div>
  </aside>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAbility } from '@casl/vue'

import IconList from '@/assets/svg/icon-list.svg'
import IconListActive from '@/assets/svg/list-sidebar-active.svg'
import IconAssets from '@/assets/svg/icon-assets.svg'
import IconAssetsActive from '@/assets/svg/icon-assets-active.svg'
import IconDashboard from '@/assets/svg/dashboard-sidebar.svg'
import IconDashboardActive from '@/assets/svg/dashboard-sidebar-active.svg'
import IconActivityActiv from '@/assets/svg/icon-activity-activ.svg'
import IconActivityGray from '@/assets/svg/icon-activity-gray.svg'
import IconActivityPipeLine from '@/assets/svg/icon-pipeline-activ.svg'
import IconPipeLine from '@/assets/svg/icon-pipeline.svg'
import IconLeads from '@/assets/svg/icon-leads.svg'
import IconLeadsActive from '@/assets/svg/icon-leads-active.svg'
import IconLogs from '@/assets/svg/icon-logs.svg'
import IconLogsActive from '@/assets/svg/icon-logs-active.svg'
import IrisIconReverse from '@/assets/svg/iris-icon-reverse.svg'

export default {
  name: 'SwdSideBar',
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const { can } = useAbility()

    const isAuth = computed(() => {
      return store.state.auth.isAuth
    })

    const userType = computed(() => {
      return store.state.globalComponents.currentTypeUser
    })

    const userRole = computed(() => {
      return store.state.globalComponents.role
    })

    const getRouteName = computed(() => {
      return route.name
    })

    const getActiveListOfHouseholds = computed(() => {
      return (
        getRouteName.value === 'all' ||
        getRouteName.value === 'clients' ||
        getRouteName.value === 'opportunities' ||
        getRouteName.value === 'list-of-advisors'
      )
    })

    const goHome = () => {
      router.push({ name: 'home' })
    }

    const isShowSideBar = computed(() => {
      if (isAuth.value && userType.value === 'advisor' && !can('lead', 'all')) return true
      if (isAuth.value && userRole.value === 'advisor') return true
      return false
    })

    return {
      IconList,
      IconAssets,
      IconDashboard,
      IconDashboardActive,
      IconListActive,
      isAuth,
      getRouteName,
      getActiveListOfHouseholds,
      IconActivityGray,
      IconActivityActiv,
      IconActivityPipeLine,
      IconPipeLine,
      IconAssetsActive,
      IconLeads,
      IconLeadsActive,
      IconLogs,
      IconLogsActive,
      goHome,
      isShowSideBar,
      IrisIconReverse,
    }
  },
}
</script>

<style lang="css" scoped>
.active {
  background-color: rgba(103, 116, 148, 0.1);
}
.item:hover {
  background-color: rgba(103, 116, 148, 0.1);
}
</style>
