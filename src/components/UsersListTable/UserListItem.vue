<template>
  <td class="flex items-center h-12 ml-5">
    <Avatar />
    <router-link
      :to="{ name: 'prospect-details', params: { id: user.id } }"
      class="pl-2.5 font-medium"
    >
      {{ user.name }}
    </router-link>
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
  <td class="text-main">{{ user.city }}</td>
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
</template>

<script>
import IconActionGray from '@/assets/svg/icon-action-gray.svg'

export default {
  name: 'UserListItem',
  props: {
    user: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  setup() {
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
    }
  },
}
</script>
