<template>
  <aside class="bg-primary min-h-screen flex-col w-[68px] sm:flex hidden">
    <div class="fixed cursor-pointer" @click="goHome">
      <InlineSvg :src="IconLogo" />
    </div>
    <div v-if="isAuth && $can('advisor', 'all')" class="flex flex-col items-center flex-grow w-[68px] fixed top-1/3">
      <router-link
        :to="{ name: 'dashboard' }"
        class="item flex justify-center items-center cursor-pointer w-full h-14"
        :class="{ active: getRouteName === 'dashboard' }"
      >
        <InlineSvg v-if="getRouteName === 'dashboard'" :src="IconDashboardActive" />
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
    </div>
  </aside>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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
import IconLogo from '@/assets/svg/icon-logo.svg'

export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const isAuth = computed(() => {
      return store.state.auth.isAuth
    })

    const getRouteName = computed(() => {
      return route.name
    })

    const getActiveListOfHouseholds = computed(() => {
      return getRouteName.value === 'all' || getRouteName.value === 'clients' || getRouteName.value === 'prospects'
    })

    const goHome = () => {
      if (isAuth.value) {
        router.push({ path: '/' })
      } else {
        router.push({ name: 'login' })
      }
    }

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
      IconLogo,
      IconAssetsActive,
      goHome,
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
