<template>
  <div class="flex cursor-pointer">
    <span class="text-xss text-gray03 pr-3">Next</span>
    <InlineSvg :src="IconNext" />
  </div>
</template>
<script>
import IconNext from '@/assets/svg/icon-next.svg'

export default {
  name: 'NextButton',
  setup() {
    return {
      IconNext,
    }
  },
}
</script>
