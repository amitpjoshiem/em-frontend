<template>
  <div class="flex items-center">
    <SwdAvatar :link="getAvatarUrl" />
    <div class="pl-2.5 text-main text-xss font-semibold cursor-pointer" @click="openAdvisor">
      {{ getName }}
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

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
    const router = useRouter()
    const store = useStore()

    const getAvatarUrl = computed(() => {
      if (props.advisor.avatar?.url) return props.advisor.avatar.url
      return ''
    })

    const getName = computed(() => {
      if (props.advisor.first_name !== null && props.advisor.last_name !== null)
        return props.advisor.first_name + ' ' + props.advisor.last_name
      return props.advisor.username
    })

    const openAdvisor = () => {
      store.commit('globalComponents/setAdvisorId', props.advisor.id)
      router.push({ name: 'advisor/dashboard' })
    }

    return {
      getAvatarUrl,
      getName,
      route,

      openAdvisor,
    }
  },
}
</script>
