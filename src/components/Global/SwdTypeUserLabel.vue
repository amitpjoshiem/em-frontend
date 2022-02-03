<template>
  <div
    class="border border-opacity-50 rounded capitalize text-center w-full"
    :class="{
      'text-activity border-color-blue-border bg-color-light-blue': userType === 'prospect',
      'text-orange-badge border-orange-border bg-orange-bg': userType === 'client',
    }"
  >
    <span>
      {{ title }}
    </span>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'SwdTypeUserLabel',
  props: {
    userType: {
      type: String,
      require: true,
      default: 'prospect',
    },
  },
  setup(props) {
    const title = computed(() => {
      if (props.userType === 'prospect') return 'Opportunity'
      return props.userType
    })

    return {
      title,
    }
  },
}
</script>
