<template>
  <div class="flex items-center">
    <SwdAvatar :link="getAvatarUrl" />
    <div class="pl-2.5 text-main text-xss font-semibold cursor-pointer" @click="goUser">
      {{ user.name }}
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
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
    const store = useStore()

    const getAvatarUrl = computed(() => {
      if (props.user.avatar?.url) return props.user.avatar.url
      return ''
    })

    const getCurrentTypeUser = computed(() => {
      return store.state.globalComponents.currentTypeUser
    })

    const goUser = () => {
      if (props.user.type === 'lead') {
        store.commit('globalComponents/setClientId', props.user.client_user.id)
        router.push({ name: 'confirmation-page', params: { id: props.user.id } })
        return
      }

      if (getCurrentTypeUser.value === 'ceo' || getCurrentTypeUser.value === 'admin') {
        store.commit('globalComponents/setAdvisorId', props.user.owner_id)
        router.push({ name: 'member-details', params: { id: props.user.id } })
        return
      }

      if (props.user.type === 'client') {
        router.push({ name: 'member-details', params: { id: props.user.id } })
        return
      }

      if (props.user.step === 'default') {
        router.push({ name: 'basic-information', params: { id: props.user.id } })
        return
      }
      if (props.user.step !== 'default') {
        router.push({ name: 'member-details', params: { id: props.user.id } })
        return
      }
    }

    return {
      getAvatarUrl,
      goUser,
    }
  },
}
</script>
