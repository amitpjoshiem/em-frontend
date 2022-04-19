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

export default {
  name: 'UserListName',
  props: {
    step: {
      type: String,
      require: true,
      default: '',
    },
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
    type: {
      type: String,
      require: true,
      default: '',
    },
    avatar: {
      type: [Object, Array],
      require: true,
      default: () => {},
    },
  },
  setup(props) {
    const router = useRouter()

    const getAvatarUrl = computed(() => {
      if (props.avatar?.url) return props.avatar.url
      return ''
    })

    const getLink = () => {
      if (props.type === 'lead') {
        router.push({ name: 'confirmation-page', params: { id: props.id } })
        return
      }
      if (props.step === 'default') {
        router.push({ name: 'basic-information', params: { id: props.id } })
        return
      }
      if (props.step !== 'default') {
        router.push({ name: 'member-details', params: { id: props.id } })
        return
      }
    }

    return {
      getAvatarUrl,
      getLink,
    }
  },
}
</script>
