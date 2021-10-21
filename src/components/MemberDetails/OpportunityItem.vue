<template>
  <div class="flex text-xs items-center text-center">
    <div class="w-4/12 item px-2">
      {{ user.name }}
    </div>
    <div class="w-2/12 item">
      {{ prospect.name }}
    </div>
    <div class="w-2/12 item">{{ currencyFormat(user.amount) }}</div>
    <div class="w-2/12 item">{{ user.stage }}</div>
    <div class="w-2/12 item">{{ user.closeDateFormatted }}</div>
  </div>
</template>
<script>
import { currencyFormat } from '@/utils/currencyFormat'

export default {
  name: 'OpportunityItem',
  props: {
    user: {
      type: Object,
      required: true,
    },
    prospect: {
      type: Object,
      required: true,
    },
    userProfile: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      currencyFormat,
    }
  },
}
</script>

<style scoped>
.item {
  @apply border-r  text-xs text-text-light-gray flex items-center justify-center uppercase text-center last:border-r-0 h-12;
}
</style>
