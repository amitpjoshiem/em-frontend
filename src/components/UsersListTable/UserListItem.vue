<template>
  <td class="flex items-center h-12 ml-5">
    <SwdAvatar :link="getAvatarUrl" />
    <router-link
      :to="{
        name: user.step ? `${route.meta.type}/member-details` : 'basic-information',
        params: { id: user.id },
      }"
      class="pl-2.5 font-medium"
    >
      {{ user.name }}
    </router-link>
  </td>
  <td class="text-main">
    {{ user.createdAtFormatted }}
  </td>
  <td>
    <SwdTypeUserLabel :user-type="user.type" />
  </td>
  <td>
    <SwdLinearProgress :percentage="getPercentage" :show-text="true" />
  </td>
  <td class="text-main">{{ user.city }}</td>
  <td class="font-medium">
    <SwdStubForText :text="user.netWorth" plug="&mdash;" class="text-sm text-main font-semibold" />
  </td>
  <td class="pr-5">
    <SwdMemberActions :user="user" />
  </td>
</template>

<script>
import SwdLinearProgress from '@/components/Global/SwdLinearProgress.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'UserListItem',
  components: {
    SwdLinearProgress,
  },
  props: {
    user: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  setup(props) {
    const route = useRoute()

    const getPercentage = computed(() => {
      if (props.user) {
        return Number(props.user.step) * 20
      }
      return 0
    })

    const getAvatarUrl = computed(() => {
      if (props.user?.avatar?.url) return props.user.avatar.url
      return ''
    })

    return {
      getPercentage,
      getAvatarUrl,
      route,
    }
  },
}
</script>
