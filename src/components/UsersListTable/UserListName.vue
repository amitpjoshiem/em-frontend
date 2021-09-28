<template>
  <div class="flex items-center">
    <SwdAvatar :link="getAvatarUrl" />
    <router-link
      :to="{
        name: step ? 'member-details' : 'basic-information',
        params: { id: id },
      }"
      class="pl-2.5 text-main text-xss font-semibold"
    >
      {{ name }}
    </router-link>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'UserListName',
  props: {
    step: {
      type: Number,
      require: true,
      default: 0,
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
    avatar: {
      type: String,
      require: true,
      default: '',
    },
  },
  setup(props) {
    const getAvatarUrl = computed(() => {
      if (props.avatar?.url) return props.avatar.url
      return ''
    })

    return {
      getAvatarUrl,
    }
  },
}
</script>
