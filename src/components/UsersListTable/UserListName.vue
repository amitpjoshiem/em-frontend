<template>
  <div class="flex items-center">
    <SwdAvatar :link="getAvatarUrl" class="w-2/12" />
    <div
      class="w-10/12 pl-2.5 text-main text-xss font-semibold break-words"
      :class="{ 'cursor-pointer': isCursor }"
      @click="showSummary"
    >
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

    const showSummary = () => {
      if (props.user.type === 'client' || props.user.type === 'prospect') {
        store.commit('globalComponents/setSummaryInfoMemberId', props.user.id)
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
    }

    const isCursor = computed(() => {
      if (props.user.type === 'pre_lead') return false
      return true
    })

    return {
      getAvatarUrl,
      showSummary,
      isCursor,
    }
  },
}
</script>
