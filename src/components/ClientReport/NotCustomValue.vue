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

<style>
.item-not-custom {
  @apply font-semibold bg-main-gray w-full pl-2 rounded flex items-center;
  height: 32px;
}
</style>
