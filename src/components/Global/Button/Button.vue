<template>
  <button
    :type="type"
    :disabled="disabled"
    class="rounded-md h-10"
    :class="{
      'bg-primary  text-white': defaultPrimary,
      'w-full': full,
      'bg-input-border rounded-md h-10 text-color-grey cursor-not-allowed ':
        disabled,
      'bg-activity px-7 text-white text-xss': defaultBlueBtn,
      'bg-color-grey text-xss px-7 text-activity': defaultGrayBtn,
      'bg-color-link-btn w-full flex justify-center items-center text-xss font-medium':
        defaultLinkBtn,
      'border border-dashed border-input-border w-full flex justify-center items-center text-xss font-medium':
        transparentBtn,
      'bg-activity text-xss text-white px-1.5': smallBtnActivity,
      'text-xss border border-activity px-1.5': smallBtnGray,
      'font-semibold': textSemiBold,
    }"
  >
    <InlineSvg
      v-if="witchIcon && iconType === 'lock'"
      :src="IconLock"
      class="mr-2"
    />
    <InlineSvg
      v-if="witchIcon && iconType === 'upload'"
      :src="IconUpload"
      class="mr-2"
    />
    {{ textBtn }}
  </button>
</template>

<script>
import IconLock from '@/assets/svg/icon-lock.svg'
import IconUpload from '@/assets/svg/icon-upload.svg'

export default {
  name: 'Button',
  props: {
    defaultPrimary: {
      type: Boolean,
      default: false,
    },
    defaultBtn: {
      type: Boolean,
      default: false,
    },
    defaultBlueBtn: {
      type: Boolean,
      default: false,
    },
    defaultGrayBtn: {
      type: Boolean,
      default: false,
    },
    defaultLinkBtn: {
      type: Boolean,
      default: false,
    },
    pressed: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    primary: {
      type: Boolean,
      default: true,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    iconLeft: {
      type: Boolean,
      default: false,
    },
    iconRight: {
      type: Boolean,
      default: false,
    },
    smallBtnActivity: {
      type: Boolean,
      default: false,
    },
    smallBtnGray: {
      type: Boolean,
      default: false,
    },
    textSemiBold: {
      type: Boolean,
      default: false,
    },
    textBtn: {
      type: String,
      default: 'Buttton',
    },
    type: {
      type: String,
      default: 'buttton',
    },
    full: {
      type: Boolean,
      default: false,
    },
    witchIcon: {
      type: Boolean,
      default: false,
    },
    iconType: {
      type: String,
      default: '',
    },
    transparentBtn: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      IconLock,
      IconUpload,
    }
  },
}
</script>
