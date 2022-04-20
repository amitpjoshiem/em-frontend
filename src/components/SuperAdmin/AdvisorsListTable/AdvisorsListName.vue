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
      type: String,
      require: true,
      default: '',
    },
  },
  setup(props) {
    const router = useRouter()

    const getAvatarUrl = computed(() => {
      if (props.avatar) return props.avatar
      return ''
    })

    const getLink = () => {
      console.log('getLink')
      router.push({ name: 'confirmation-page', params: { id: props.id } })
    }

    return {
      getAvatarUrl,
      getLink,
    }
  },
}
</script>
