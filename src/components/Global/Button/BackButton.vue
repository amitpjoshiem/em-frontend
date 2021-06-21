<template>
  <div class="flex cursor-pointer">
    <InlineSvg :src="IconBack" />
    <span class="text-xss text-gray03 pl-3">Back</span>
  </div>
</template>
<script>
import IconBack from '@/assets/svg/icon-back.svg'

export default {
  name: 'BackButton',
  setup() {
    return {
      IconBack,
    }
  },
}
</script>
