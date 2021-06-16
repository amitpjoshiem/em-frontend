<template>
  <button
    class="btn"
    :type="type"
    :class="{
      'bg-primary text-white rounded-md h-10': defaultPrimary,
      'w-full': full,
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
    dissabled: {
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
