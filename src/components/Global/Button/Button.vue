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
    }"
  >
    {{ textBtn }}
  </button>
</template>

<script>
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
    smalBtn: {
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
  },
  setup() {},
}
</script>
