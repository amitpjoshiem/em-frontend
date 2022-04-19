<template>
  <div
    style="border-top-color: transparent"
    class="size border-2 border-color-link border-solid rounded-full animate-spin"
    :class="size"
  />
</template>
<script>
import { computed } from 'vue'
export default {
  name: 'SwdSpinner',
  props: {
    large: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  setup(props) {
    const size = computed(() => {
      if (props.large) return 'w-8 h-8'
      return 'w-4 h-4'
    })

    return {
      size,
    }
  },
}
</script>
