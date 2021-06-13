<template>
  <div>
    <table class="table-fixed">
      <thead class="bg-widget-bg uppercase text-gray03 h-6">
        <tr class="text-small">
          <th class="w-[240px] text-left pl-5">householder Name</th>
          <th class="w-[110px] text-left">Created on</th>
          <th class="w-[110px] text-left">type</th>
          <th class="w-[130px] text-left">Onboarding</th>
          <th class="w-[170px] text-left">location</th>
          <th class="w-[110px] text-left">net worth</th>
          <th class="w-[47px] text-left"></th>
          <!-- <th class="w-3/12">householder Name</th>
          <th class="w-2/12">Created on</th>
          <th class="w-1/12">type</th>
          <th class="w-2/12">Onboarding</th>
          <th class="w-3/12">location</th>
          <th class="w-1/12">net worth</th>
          <th class="w-1/12"></th> -->
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in usersList"
          :key="index"
          class="text-xss h-12 border-b last:border-b-0 box-border"
        >
          <td class="flex items-center h-12 ml-5">
            <Avatar />
            <p class="pl-2.5 font-semibold">{{ user.name }}</p>
          </td>
          <td class="text-main">
            {{ user.createdOn }}
          </td>
          <td>
            <TypeUserLabel :user-type="user.type" />
          </td>
          <td>
            <LinearProgress :percentage="user.onboarding" :show-text="true" />
          </td>
          <td class="text-main">
            {{ user.location }}
          </td>
          <td class="font-semibold">${{ user.netWorth }}</td>
          <td class="pr-5">
            <ActionBtn grey class="ml-2.5" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useUserList } from '@/components/UsersListTable/DTO/usersList'

export default {
  name: 'UsersListTable',
  setup() {
    const { data: usersList } = useUserList()
    return { usersList }
  },

  computed: {
    getHeadlines() {
      return [
        'householder Name',
        'Created on',
        'type',
        'Onboarding',
        'location',
        'net worth',
      ]
    },
  },
}
</script>

<style>
.el-progress__text span {
  font-size: 13px;
}
</style>
