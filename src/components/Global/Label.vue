<template>
  <span class="text-xs text-gray03 pt-6">{{ label }}</span>
</template>
<script>
export default {
  name: 'Label',
  props: {
    label: {
      type: String,
      required: true,
    },
  },
}
</script>
