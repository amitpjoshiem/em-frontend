<template>
  <div class="border-l border-r border-b rounded-b-xl border-color-grey pt-4 topmembers-block mr-5">
    <div v-if="!isFetching">
      <TopMembersItem v-for="(member, index) in members.data" :key="index" :member="member" />
      <div v-if="!members.data.length" class="flex flex-col items-center justify-center mt-10">
        <div class="bg-widget-bg rounded-full w-16 h-16 flex flex-col items-center justify-center mb-3">
          <InlineSvg :src="IconEmptyUsers" />
        </div>
        <p class="text-gray03 font-semibold text-xss mt-3">No recently added opportunity</p>
      </div>
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
}
</style>
