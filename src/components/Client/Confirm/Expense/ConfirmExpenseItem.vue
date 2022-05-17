<template>
  <div class="text-xss">
    {{ currencyFormat(item) }}
  </div>
</template>

<script>
import { currencyFormat } from '@/utils/currencyFormat'

export default {
  name: 'ConfirmExpenseItem',
  props: {
    item: {
      type: Number,
      require: false,
      default: null,
    },
  },
  setup() {
    return {
      currencyFormat,
    }
  },
}
</script>
