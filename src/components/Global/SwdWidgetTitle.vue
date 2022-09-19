<template>
  <span class="text-primary text-smm font-semibold">
    {{ text }}
  </span>
</template>

<script>
export default {
  name: 'SwdWidgetTitle',
  props: {
    text: {
      type: String,
      require: true,
      default: 'title',
    },
  },
}
</script>
