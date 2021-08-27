<template>
  <td class="flex items-center h-12 ml-5">
    <Avatar />
    <router-link
      :to="{ name: 'member-details', params: { id: user.id } }"
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
    <LinearProgress :percentage="getPercentage" :show-text="true" />
  </td>
  <td class="text-main">{{ user.city }}</td>
  <td class="font-medium">
    <PlugForField
      :text="user.netWorth"
      plug="&mdash;"
      class="text-sm text-main font-semibold"
    />
  </td>
  <td class="pr-5">
    <DropDown class="ml-2.5" :options="actionsOptions" @select="handleSelect">
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
import { computed } from 'vue'
import { useRouter } from 'vue-router'

function useActionOptions(user) {
  return computed(() => {
    if (user.type === 'prospect') {
      return [
        {
          title: 'Basic Information',
          command: 'basic-information',
        },
        {
          title: 'Blueprint Report',
          command: 'blueprint-report',
        },
      ]
    }
    return [
      {
        title: 'Basic Information',
        command: 'basic-information',
      },
      {
        title: 'Client Report',
        command: 'client-report',
      },
    ]
  })
}

export default {
  name: 'UserListItem',
  props: {
    user: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  setup(props) {
    const router = useRouter()

    const getPercentage = computed(() => {
      if (props.user && props.user.step) {
        return Number(props.user.step) * 20
      }
      return 20
    })

    const actionsOptions = useActionOptions(props.user)

    const handleSelect = (command) => {
      const actionHandler = actionsMap[command]
      actionHandler()
    }

    const actionsMap = {
      'basic-information': () =>
        router.push({
          name: 'member-basic-information',
          params: { id: props.user.id },
        }),
      'blueprint-report': () =>
        router.push({
          name: 'bluereport',
          params: { id: props.user.id },
        }),
      'client-report': () =>
        router.push({ name: 'clientreport', params: { id: props.user.id } }),
    }

    return {
      actionsOptions,
      IconActionGray,
      getPercentage,
      handleSelect,
    }
  },
}
</script>
