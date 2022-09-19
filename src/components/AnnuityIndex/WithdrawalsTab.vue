<template>
  <div>
    <div class="flex h-8 bg-main-gray">
      <div class="title w-1/4">Amount</div>
      <div class="title w-1/4">Date</div>
      <div class="title w-1/4">Fee</div>
      <div class="title w-1/4">Status</div>
    </div>
    <div class="flex text-xs items-center text-center">
      <div class="w-1/4 item">{{ currencyFormat(1000000) }}</div>
      <div class="w-1/4 item">01/01/2022</div>
      <div class="w-1/4 item">{{ currencyFormat(10000) }}</div>
      <div class="w-1/4 item">Status</div>
    </div>
    <div class="flex text-xs items-center text-center">
      <div class="w-1/4 item">{{ currencyFormat(1000000) }}</div>
      <div class="w-1/4 item">01/01/2022</div>
      <div class="w-1/4 item">{{ currencyFormat(10000) }}</div>
      <div class="w-1/4 item">Status</div>
    </div>
    <div class="flex text-xs items-center text-center">
      <div class="w-1/4 item">{{ currencyFormat(1000000) }}</div>
      <div class="w-1/4 item">01/01/2022</div>
      <div class="w-1/4 item">{{ currencyFormat(10000) }}</div>
      <div class="w-1/4 item">Status</div>
    </div>
    <div class="flex text-xs items-center text-center">
      <div class="w-1/4 item">{{ currencyFormat(1000000) }}</div>
      <div class="w-1/4 item">01/01/2022</div>
      <div class="w-1/4 item">{{ currencyFormat(10000) }}</div>
      <div class="w-1/4 item">Status</div>
    </div>
    <div class="flex text-xs items-center text-center">
      <div class="w-1/4 item">{{ currencyFormat(1000000) }}</div>
      <div class="w-1/4 item">01/01/2022</div>
      <div class="w-1/4 item">{{ currencyFormat(10000) }}</div>
      <div class="w-1/4 item">Status</div>
    </div>
    <div class="flex text-xs items-center text-center">
      <div class="w-1/4 item">{{ currencyFormat(1000000) }}</div>
      <div class="w-1/4 item">01/01/2022</div>
      <div class="w-1/4 item">{{ currencyFormat(10000) }}</div>
      <div class="w-1/4 item">Status</div>
    </div>
    <div class="flex text-xs items-center text-center">
      <div class="w-1/4 item">{{ currencyFormat(1000000) }}</div>
      <div class="w-1/4 item">01/01/2022</div>
      <div class="w-1/4 item">{{ currencyFormat(10000) }}</div>
      <div class="w-1/4 item">Status</div>
    </div>
    <div class="flex text-xs items-center text-center">
      <div class="w-1/4 item">{{ currencyFormat(1000000) }}</div>
      <div class="w-1/4 item">01/01/2022</div>
      <div class="w-1/4 item">{{ currencyFormat(10000) }}</div>
      <div class="w-1/4 item">Status</div>
    </div>
    <div class="flex text-xs items-center text-center">
      <div class="w-1/4 item">{{ currencyFormat(1000000) }}</div>
      <div class="w-1/4 item">01/01/2022</div>
      <div class="w-1/4 item">{{ currencyFormat(10000) }}</div>
      <div class="w-1/4 item">Status</div>
    </div>
    <div class="flex text-xs items-center text-center">
      <div class="w-1/4 item">{{ currencyFormat(1000000) }}</div>
      <div class="w-1/4 item">01/01/2022</div>
      <div class="w-1/4 item">{{ currencyFormat(10000) }}</div>
      <div class="w-1/4 item">Status</div>
    </div>
    <div class="flex text-xs items-center text-center">
      <div class="w-1/4 item">{{ currencyFormat(1000000) }}</div>
      <div class="w-1/4 item">01/01/2022</div>
      <div class="w-1/4 item">{{ currencyFormat(10000) }}</div>
      <div class="w-1/4 item">Status</div>
    </div>
    <div class="flex text-xs items-center text-center">
      <div class="w-1/4 item">{{ currencyFormat(1000000) }}</div>
      <div class="w-1/4 item">01/01/2022</div>
      <div class="w-1/4 item">{{ currencyFormat(10000) }}</div>
      <div class="w-1/4 item">Status</div>
    </div>
  </div>
</template>

<script>
import { currencyFormat } from '@/utils/currencyFormat'

export default {
  name: 'WithdrawalsTab',

  setup() {
    return {
      currencyFormat,
    }
  },
}
</script>

<style scoped>
.title {
  @apply text-xss text-main flex items-center uppercase first:pl-2;
}

.item {
  @apply text-xss text-main flex items-center h-8 text-left first:pl-2 border-b;
}
</style>
