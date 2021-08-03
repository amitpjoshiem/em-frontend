<template>
  <aside class="bg-primary min-h-screen flex flex-col w-[68px]">
    <router-link :to="{ name: 'dashboard' }">
      <img src="../assets/img/logo.png" />
    </router-link>

    <div v-if="isAuth" class="flex flex-col pt-32 items-center flex-grow">
      <router-link
        :to="{ name: 'dashboard' }"
        class="item flex justify-center items-center cursor-pointer w-full h-14"
        :class="{ active: getRouteName === 'dashboard' }"
      >
        <InlineSvg
          v-if="getRouteName === 'dashboard'"
          :src="IconDashboardActive"
        />
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
      <div
        class="item flex justify-center items-center cursor-pointer w-full h-14"
      >
        <img src="../assets/img/activity.png" />
      </div>
      <div
        class="item flex justify-center items-center cursor-pointer w-full h-14"
      >
        <img src="../assets/img/statistics.png" />
      </div>
    </div>
  </aside>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import IconList from '@/assets/svg/icon-list.svg'
import IconListActive from '@/assets/svg/list-sidebar-active.svg'
import IconAssets from '@/assets/svg/icon-assets.svg'
import IconDashboard from '@/assets/svg/dashboard-sidebar.svg'
import IconDashboardActive from '@/assets/svg/dashboard-sidebar-active.svg'

export default {
  setup() {
    const store = useStore()
    const route = useRoute()

    const isAuth = computed(() => {
      return store.state.auth.isAuth
    })

    const getRouteName = computed(() => {
      return route.name
    })

    const getActiveListOfHouseholds = computed(() => {
      return (
        getRouteName.value === 'all' ||
        getRouteName.value === 'clients' ||
        getRouteName.value === 'prospects'
      )
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
