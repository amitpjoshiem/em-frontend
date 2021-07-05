<template>
  <div :class="avatarClass">
    <img :src="link" />
  </div>
</template>
<script>
import DefaultAvatar from '@/assets/img/avatar.png'
import { computed } from 'vue'

export default {
  name: 'Avatar',
  props: {
    link: {
      type: String,
      require: false,
      default: DefaultAvatar,
    },
    size: {
      type: String,
      require: false,
      default: 'large',
      validator: (value) => {
        return ['large', 'big', 'small'].includes(value)
      },
    },
  },

  setup(props) {
    const avatarClassMap = {
      large: 'h-8 w-8',
      small: 'h-5 w-5',
      big: 'h-14 w-14',
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
