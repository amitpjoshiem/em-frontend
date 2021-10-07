<template>
  <div class="border-l border-r border-b rounded-b-xl border-color-grey pt-4 topmembers-block">
    <div v-if="!isLoading">
      <TopMembersItem v-for="(member, index) in members.data" :key="index" :member="member" />
    </div>
    <el-skeleton v-else :rows="4" animated class="p-5" />
  </div>
</template>
<script>
import TopMembersItem from '@/components/Dashboard/TopMembers/TopMembersItem.vue'
import IconEmptyUsers from '@/assets/svg/icon-empty-users.svg'
import { useDashboardMembers } from '@/api/use-dashboard-members.js'

export default {
  name: 'TopMembers',
  components: {
    TopMembersItem,
  },
  setup() {
    const { error, data: members, isFetching, isLoading } = useDashboardMembers()

    return {
      IconEmptyUsers,
      error,
      members,
      isFetching,
      isLoading,
    }
  },
}
</script>

<style>
.topmembers-block {
  height: 230px;
  width: 600px;
}
</style>
