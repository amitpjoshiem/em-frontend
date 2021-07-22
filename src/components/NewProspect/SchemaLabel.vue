<template>
  <span class="text-xl font-medium">{{ label }}</span>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: false,
      default: 'Label',
    },
  },
}
</script>
