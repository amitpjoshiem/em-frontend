<template>
  <SwdRemoteSearch class="w-2/12" />
  <div class="flex justify-end items-center text-sm w-8/12">
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
import { useRouter } from 'vue-router'
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
      goAdvisors,
      goDashboard,
      goActivity,
      goMembers,
      goPipeLine,
    }
  },
}
</script>
