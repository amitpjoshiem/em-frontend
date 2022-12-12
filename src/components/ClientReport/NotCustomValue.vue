<template>
  <span class="item-not-custom">
    <SwdSpinner v-if="isFetching" />
    <span v-else>{{ currencyFormat(value) }}</span>
  </span>
</template>

<script>
import { currencyFormat } from '@/utils/currencyFormat'

export default {
  name: 'NotCustomValue',
  props: {
    value: {
      type: [Number, null],
      required: true,
      default: 0,
    },
    isFetching: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  setup() {
    return {
      currencyFormat,
    }
  },
}
</script>
