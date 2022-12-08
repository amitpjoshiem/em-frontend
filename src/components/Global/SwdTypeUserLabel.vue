<template>
  <div
    class="border border-opacity-50 rounded capitalize text-center w-full"
    :class="{
      'text-activity border-blue-primary bg-blue-primary-light': userType === 'prospect',
      'text-orange-primary border-orange-primary bg-orange-primary-light': userType === 'client',
      'text-main-green border-main-blue': userType === 'lead',
      'text-main border-main-blue': userType === 'pre_lead',
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
      if (props.userType === 'pre_lead') return 'Prospect 1app'
      if (props.userType === 'lead') return 'Prospect'
      return props.userType
    })

    return {
      title,
    }
  },
}
</script>
