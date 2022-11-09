<template>
  <div class="border border-border-blue rounded-md p-5 mb-4">
    <div class="flex items-center mb-5">
      <InlineSvg :src="IconDoneStep" />
      <div class="text-main text-xl font-semibold ml-2">Household Info</div>
    </div>
    <div>In developing.</div>
  </div>
</template>

<script>
import IconDoneStep from '@/assets/svg/icon-done-step.svg'

export default {
  name: 'HouseHoldInfo',
  props: {
    member: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  setup() {
    return {
      IconDoneStep,
    }
  },
}
</script>
