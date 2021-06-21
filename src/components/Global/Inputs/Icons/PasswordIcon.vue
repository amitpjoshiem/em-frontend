<template>
  <span class="absolute inset-y-0 right-0 flex items-center">
    <button type="button" class="p-1 focus:outline-none focus:shadow-outline">
      <InlineSvg :src="iconSrc" />
    </button>
  </span>
</template>

<script>
import IconShowPass from '@/assets/svg/icon-show-pass.svg'
import IconInputError from '@/assets/svg/icon-input-error.svg'

export default {
  name: 'PasswordInputIcon',
  props: {
    showError: { type: Boolean, required: false, default: false },
  },
  computed: {
    iconSrc() {
      return this.showError ? IconInputError : IconShowPass
    },
  },
}
</script>
