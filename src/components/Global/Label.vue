<template>
  <span
    class="text-xss"
    :class="{
      'flex items-center text-main': positionLeft,
      'text-gray03': !positionLeft,
    }"
    >{{ label }}</span
  >
</template>
<script>
export default {
  name: 'Label',
  props: {
    label: {
      type: String,
      required: true,
    },
    positionLeft: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>
