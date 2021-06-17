<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="{
      'bg-primary rounded-md h-10 text-white': defaultPrimary,
      'w-full': full,
      'bg-input-border rounded-md h-10 text-color-grey cursor-not-allowed ':
        disabled,
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
