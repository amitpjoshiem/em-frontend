<template>
  <div class="flex cursor-pointer items-center">
    <InlineSvg :src="IconBack" />
    <span class="text-xss text-gray03 pl-3">{{ text }}</span>
  </div>
</template>
<script>
import IconBack from '@/assets/svg/icon-back.svg'

export default {
  name: 'BackButton',
  props: {
    text: {
      type: String,
      required: false,
      default: 'Back',
    },
  },
  setup() {
    return {
      IconBack,
    }
  },
}
</script>
