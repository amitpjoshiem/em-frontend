<template>
  <div :class="avatarClass">
    <img :src="link" class="h-full w-full object-cover rounded-[100px]" />
  </div>
</template>
<script>
import DefaultAvatar from '@/assets/img/avatar.png'
import { computed } from 'vue'

export default {
  name: 'SwdAvatar',
  props: {
    link: {
      type: String,
      require: false,
      default: DefaultAvatar,
    },
    size: {
      type: String,
      require: false,
      default: 'medium',
      validator: (value) => {
        return ['large', 'medium', 'small'].includes(value)
      },
    },
  },

  setup(props) {
    const avatarClassMap = {
      large: 'h-14 w-14',
      medium: 'h-8 w-8',
      small: 'h-5 w-5',
    }

    const avatarClass = computed(() => {
      return avatarClassMap[props.size]
    })

    return {
      avatarClass,
    }
  },
}
</script>

height: 100%; object-fit: cover; margin: 0 auto; width: 100%;
