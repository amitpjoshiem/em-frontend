<template>
  <div class="flex items-center">
    <SwdAvatar :link="getAvatarUrl" />
    <div class="pl-2.5 text-main text-xss font-semibold cursor-pointer" @click="getLink">
      {{ name }}
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'AdvisorsListName',
  props: {
    id: {
      type: String,
      require: true,
      default: '',
    },
    name: {
      type: String,
      require: true,
      default: '',
    },
    avatar: {
      type: Array,
      require: true,
      default: () => [],
    },
  },
  setup(props) {
    const router = useRouter()
    const store = useStore()

    const getAvatarUrl = computed(() => {
      if (props.user?.avatar?.url) return props.user.avatar.url
      return ''
    })

    const getLink = () => {
      store.commit('globalComponents/setAdvisorId', props.id)
      router.push({ name: 'advisor-dashboard' })
    }

    return {
      getAvatarUrl,
      getLink,
    }
  },
}
</script>
