<template>
  <div class="flex items-center">
    <SwdAvatar :link="getAvatarUrl" />
    <div class="pl-2.5 text-main text-xss font-semibold cursor-pointer" @click="showSummary">
      {{ user.name }}
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'UserListName',
  props: {
    user: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const getAvatarUrl = computed(() => {
      if (props.user.avatar?.url) return props.user.avatar.url
      return ''
    })

    const getCurrentTypeUser = computed(() => {
      return store.state.globalComponents.currentTypeUser
    })

    const showSummary = () => {
      console.log('props.user.type - ', props.user.type)
      console.log('getCurrentTypeUser - ', getCurrentTypeUser.value)

      if (props.user.type === 'client' || props.user.type === 'prospect') {
        store.commit('globalComponents/setShowModal', {
          destination: 'modalSummaryInfo',
          value: true,
        })
      }

      if (props.user.type === 'lead') {
        store.commit('globalComponents/setLeadId', props.user.client_user.id)
        router.push({ name: 'confirmation-page', params: { id: props.user.id } })
        return
      }

      // if (getCurrentTypeUser.value === 'ceo' || getCurrentTypeUser.value === 'admin') {
      //   store.commit('globalComponents/setAdvisorId', props.user.owner_id)
      //   router.push({ name: `${route.meta.type}/member-details`, params: { id: props.user.id } })
      //   return
      // }

      // if (props.user.type === 'client') {
      //   router.push({ name: `${route.meta.type}/member-details`, params: { id: props.user.id } })
      //   return
      // }

      // if (props.user.step === 'default') {
      //   router.push({ name: 'basic-information', params: { id: props.user.id } })
      //   return
      // }
      // if (props.user.step !== 'default') {
      //   router.push({ name: `${route.meta.type}/member-details`, params: { id: props.user.id } })
      //   return
      // }
    }

    return {
      getAvatarUrl,
      showSummary,
    }
  },
}
</script>
