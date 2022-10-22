<template>
  <div class="flex items-center">
    <SwdAvatar :link="getAvatarUrl" />
    <router-link :to="{ name: `advisor/dashboard` }" class="pl-2.5 text-main text-xss font-semibold cursor-pointer">
      {{ getName }}
    </router-link>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'AdvisorsListName',
  props: {
    advisor: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  setup(props) {
    const route = useRoute()

    const getAvatarUrl = computed(() => {
      if (props.advisor.avatar?.url) return props.advisor.avatar.url
      return ''
    })

    const getName = computed(() => {
      if (props.advisor.first_name !== null && props.advisor.last_name !== null)
        return props.advisor.first_name + ' ' + props.advisor.last_name
      return props.advisor.username
    })

    return {
      getAvatarUrl,
      getName,
      route,
    }
  },
}
</script>
