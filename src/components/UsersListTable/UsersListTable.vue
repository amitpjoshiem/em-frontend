<template>
  <div>
    <table v-if="usersList.length" class="table-fixed">
      <thead class="bg-widget-bg uppercase text-gray03 h-6">
        <tr class="text-small text-left h-6">
          <th
            v-for="(item, index) in itemsHeader"
            :key="index"
            :class="item.class"
          >
            {{ item.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in usersList"
          :key="index"
          class="text-xss h-12 border-b last:border-b-0 box-border"
        >
          <UserListItem :user="user" />
        </tr>
      </tbody>
    </table>
    <UsersListTableEmpty v-else />
  </div>
</template>

<script>
import UsersListTableEmpty from '@/components/UsersListTable/UsersListTableEmpty.vue'
import { useEmptyDashboard } from '@/utils/useEmptyDashboard'
import UserListItem from '@/components/UsersListTable/UserListItem.vue'

export default {
  name: 'UsersListTable',
  components: {
    UsersListTableEmpty,
    UserListItem,
  },
  props: {
    itemsHeader: {
      type: Array,
      require: true,
      default: () => [],
    },
    usersList: {
      type: Array,
      require: true,
      default: () => [],
    },
  },
  setup() {
    const isEmptyDashboard = useEmptyDashboard()

    return {
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
