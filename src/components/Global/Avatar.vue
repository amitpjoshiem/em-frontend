<template>
  <div
    :class="{
      'h-8 w-8': size === 'large',
      'h-5 w-5': size === 'small',
      'h-14 w-14': size === 'big',
    }"
  >
    <img :src="link" />
  </div>
</template>
<script>
import DefaultAvatar from '@/assets/img/avatar.png'
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
    },
  },
}
</script>
