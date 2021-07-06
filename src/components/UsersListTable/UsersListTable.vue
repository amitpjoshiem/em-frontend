<template>
  <div>
    <table v-if="!isEmptyDashboard" class="table-fixed">
      <thead class="bg-widget-bg uppercase text-gray03 h-6">
        <tr class="text-small text-left">
          <th class="w-7/24 pl-5">householder Name</th>
          <th class="w-3/24">Created on</th>
          <th class="w-3/24">type</th>
          <th class="w-3/24">Onboarding</th>
          <th class="w-4/24">location</th>
          <th class="w-2/24">net worth</th>
          <th class="w-1/24"></th>
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
            <DropDown class="ml-2.5" :options="actionsOptions">
              <template #titleDropDown>
                <span
                  class="
                    cursor-pointer
                    bg-white
                    rounded
                    flex
                    justify-center
                    items-center
                    py-2
                    px-3
                  "
                >
                  <InlineSvg :src="IconActionGray" />
                </span>
              </template>
            </DropDown>
          </td>
        </tr>
      </tbody>
    </table>
    <UsersListTableEmpty v-if="isEmptyDashboard" />
  </div>
</template>

<script>
import { useUserList } from '@/components/UsersListTable/DTO/usersList'
import IconActionGray from '@/assets/svg/icon-action-gray.svg'
import UsersListTableEmpty from '@/components/UsersListTable/UsersListTableEmpty.vue'
import { useEmptyDashboard } from '@/utils/useEmptyDashboard'

export default {
  name: 'UsersListTable',
  components: {
    UsersListTableEmpty,
  },
  setup() {
    const { data: usersList } = useUserList()
    const isEmptyDashboard = useEmptyDashboard()

    const actionsOptions = [
      {
        title: 'Basic Information',
        command: 'basic-information',
      },
      {
        title: 'Blueprint Report',
        command: 'blueprint-report',
      },
    ]

    return {
      usersList,
      actionsOptions,
      IconActionGray,
      isEmptyDashboard,
    }
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
