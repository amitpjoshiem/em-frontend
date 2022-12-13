<template>
  <SwdRemoteSearch class="w-2/12" />
  <div class="flex justify-end items-center text-sm w-8/12">
    <SwdButton
      :primary="getRouteName === 'admin/dashboard' || getRouteName === 'ceo/dashboard'"
      :plain="getRouteName !== 'admin/dashboard' && getRouteName !== 'ceo/dashboard'"
      small
      class="mr-4"
      @click="goDashboard"
    >
      Dashboard
    </SwdButton>
    <SwdButton
      :primary="getRouteName === 'admin/all-advisors' || getRouteName === 'ceo/all-advisors'"
      :plain="getRouteName !== 'admin/all-advisors' && getRouteName !== 'ceo/all-advisors'"
      small
      class="mr-4"
      @click="goAdvisors"
    >
      Advisors
    </SwdButton>
    <SwdButton
      :primary="getRouteName === 'admin/all' || getRouteName === 'ceo/all'"
      :plain="getRouteName !== 'admin/all' && getRouteName !== 'ceo/all'"
      small
      class="mr-4"
      @click="goMembers"
    >
      Members
    </SwdButton>
    <SwdButton
      :primary="getRouteName === 'admin/activity' || getRouteName === 'ceo/activity'"
      :plain="getRouteName !== 'admin/activity' && getRouteName !== 'ceo/activity'"
      small
      class="mr-4"
      @click="goActivity"
    >
      Activity
    </SwdButton>
    <SwdButton
      :primary="getRouteName === 'admin/pipeline' || getRouteName === 'ceo/pipeline'"
      :plain="getRouteName !== 'admin/pipeline' && getRouteName !== 'ceo/pipeline'"
      small
      class="mr-4"
      @click="goPipeLine"
    >
      PipeLine
    </SwdButton>
    <SelectCompany v-if="$can('ceo', 'all')" />
  </div>
  <div class="w-2/12 flex justify-end">
    <HeaderNotificationsBlock class="mr-4" />
    <UserAction />
  </div>
</template>

<script>
import SwdRemoteSearch from '@/components/Global/SwdRemoteSearch.vue'
import SelectCompany from '@/components/Header/SelectCompany.vue'
import HeaderNotificationsBlock from '@/components/Header/HeaderNotificationsBlock.vue'
import UserAction from '@/components/UserAction.vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'AdminCeoHeader',
  components: {
    UserAction,
    SwdRemoteSearch,
    HeaderNotificationsBlock,
    SelectCompany,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const getRole = computed(() => {
      return store.state.globalComponents.role
    })

    const getRouteName = computed(() => {
      return route.name
    })

    const goAdvisors = () => {
      if (getRole.value === 'admin') router.push({ name: 'admin/all-advisors' })
      if (getRole.value === 'ceo') router.push({ name: 'ceo/all-advisors' })
    }

    const goDashboard = () => {
      if (getRole.value === 'admin') router.push({ name: 'admin/dashboard' })
      if (getRole.value === 'ceo') router.push({ name: 'ceo/dashboard' })
    }

    const goActivity = () => {
      if (getRole.value === 'admin') router.push({ name: 'admin/activity' })
      if (getRole.value === 'ceo') router.push({ name: 'ceo/activity' })
    }

    const goMembers = () => {
      if (getRole.value === 'admin') router.push({ name: 'admin/all' })
      if (getRole.value === 'ceo') router.push({ name: 'ceo/all' })
    }

    const goPipeLine = () => {
      if (getRole.value === 'admin') router.push({ name: 'admin/pipeline' })
      if (getRole.value === 'ceo') router.push({ name: 'ceo/pipeline' })
    }

    return {
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
