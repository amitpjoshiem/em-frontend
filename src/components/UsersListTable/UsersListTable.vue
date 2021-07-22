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
          <td class="flex items-center h-12 ml-5">
            <Avatar />
            <p class="pl-2.5 font-medium">
              {{ user.firstName }} {{ user.lastName }}
            </p>
          </td>
          <td class="text-main">
            {{ user.createdAtFormatted }}
          </td>
          <td>
            <TypeUserLabel :user-type="user.type" />
          </td>
          <td>
            <LinearProgress :percentage="20" :show-text="true" />
          </td>
          <td class="text-main">{{ user.address }} {{ user.city }}</td>
          <td class="font-medium">${{ Math.floor(Math.random() * 1000) }}</td>
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
    <UsersListTableEmpty v-else />
  </div>
</template>

<script>
import IconActionGray from '@/assets/svg/icon-action-gray.svg'
import UsersListTableEmpty from '@/components/UsersListTable/UsersListTableEmpty.vue'
import { useEmptyDashboard } from '@/utils/useEmptyDashboard'

export default {
  name: 'UsersListTable',
  components: {
    UsersListTableEmpty,
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
