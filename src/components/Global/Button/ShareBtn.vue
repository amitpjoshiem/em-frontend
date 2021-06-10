<template>
  <div class="border border-color-grey rounded p-2 cursor-pointer">
    <InlineSvg :src="IconShare" />
  </div>
</template>

<script>
import IconShare from '@/assets/svg/icon-share.svg'
export default {
  name: 'ShareBtn',
  setup() {
    return {
      IconShare,
    }
  },
}
</script>
