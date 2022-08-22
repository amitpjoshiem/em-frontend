<template>
  <div>
    <div class="flex h-8 bg-main-gray">
      <div class="title w-2/10">Amount</div>
      <div class="title w-2/10">Date</div>
      <div class="title w-2/10">Fee</div>
      <div class="title w-2/10">Source</div>
      <div class="title w-2/10">Status</div>
    </div>
    <div class="flex text-xs items-center text-center">
      <div class="w-2/10 item">{{ currencyFormat(1000000) }}</div>
      <div class="w-2/10 item">01/01/2022</div>
      <div class="w-2/10 item">{{ currencyFormat(10000) }}</div>
      <div class="w-2/10 item">Source</div>
      <div class="w-2/10 item">Status</div>
    </div>
    <div class="flex text-xs items-center text-center">
      <div class="w-2/10 item">{{ currencyFormat(1000000) }}</div>
      <div class="w-2/10 item">01/01/2022</div>
      <div class="w-2/10 item">{{ currencyFormat(10000) }}</div>
      <div class="w-2/10 item">Source</div>
      <div class="w-2/10 item">Status</div>
    </div>
    <div class="flex text-xs items-center text-center">
      <div class="w-2/10 item">{{ currencyFormat(1000000) }}</div>
      <div class="w-2/10 item">01/01/2022</div>
      <div class="w-2/10 item">{{ currencyFormat(10000) }}</div>
      <div class="w-2/10 item">Source</div>
      <div class="w-2/10 item">Status</div>
    </div>
    <div class="flex text-xs items-center text-center">
      <div class="w-2/10 item">{{ currencyFormat(1000000) }}</div>
      <div class="w-2/10 item">01/01/2022</div>
      <div class="w-2/10 item">{{ currencyFormat(10000) }}</div>
      <div class="w-2/10 item">Source</div>
      <div class="w-2/10 item">Status</div>
    </div>
    <div class="flex text-xs items-center text-center">
      <div class="w-2/10 item">{{ currencyFormat(1000000) }}</div>
      <div class="w-2/10 item">01/01/2022</div>
      <div class="w-2/10 item">{{ currencyFormat(10000) }}</div>
      <div class="w-2/10 item">Source</div>
      <div class="w-2/10 item">Status</div>
    </div>
    <div class="flex text-xs items-center text-center">
      <div class="w-2/10 item">{{ currencyFormat(1000000) }}</div>
      <div class="w-2/10 item">01/01/2022</div>
      <div class="w-2/10 item">{{ currencyFormat(10000) }}</div>
      <div class="w-2/10 item">Source</div>
      <div class="w-2/10 item">Status</div>
    </div>
    <div class="flex text-xs items-center text-center">
      <div class="w-2/10 item">{{ currencyFormat(1000000) }}</div>
      <div class="w-2/10 item">01/01/2022</div>
      <div class="w-2/10 item">{{ currencyFormat(10000) }}</div>
      <div class="w-2/10 item">Source</div>
      <div class="w-2/10 item">Status</div>
    </div>
    <div class="flex text-xs items-center text-center">
      <div class="w-2/10 item">{{ currencyFormat(1000000) }}</div>
      <div class="w-2/10 item">01/01/2022</div>
      <div class="w-2/10 item">{{ currencyFormat(10000) }}</div>
      <div class="w-2/10 item">Source</div>
      <div class="w-2/10 item">Status</div>
    </div>
    <div class="flex text-xs items-center text-center">
      <div class="w-2/10 item">{{ currencyFormat(1000000) }}</div>
      <div class="w-2/10 item">01/01/2022</div>
      <div class="w-2/10 item">{{ currencyFormat(10000) }}</div>
      <div class="w-2/10 item">Source</div>
      <div class="w-2/10 item">Status</div>
    </div>
    <div class="flex text-xs items-center text-center">
      <div class="w-2/10 item">{{ currencyFormat(1000000) }}</div>
      <div class="w-2/10 item">01/01/2022</div>
      <div class="w-2/10 item">{{ currencyFormat(10000) }}</div>
      <div class="w-2/10 item">Source</div>
      <div class="w-2/10 item">Status</div>
    </div>
    <div class="flex text-xs items-center text-center">
      <div class="w-2/10 item">{{ currencyFormat(1000000) }}</div>
      <div class="w-2/10 item">01/01/2022</div>
      <div class="w-2/10 item">{{ currencyFormat(10000) }}</div>
      <div class="w-2/10 item">Source</div>
      <div class="w-2/10 item">Status</div>
    </div>
    <div class="flex text-xs items-center text-center">
      <div class="w-2/10 item">{{ currencyFormat(1000000) }}</div>
      <div class="w-2/10 item">01/01/2022</div>
      <div class="w-2/10 item">{{ currencyFormat(10000) }}</div>
      <div class="w-2/10 item">Source</div>
      <div class="w-2/10 item">Status</div>
    </div>
  </div>
</template>

<script>
import { currencyFormat } from '@/utils/currencyFormat'

export default {
  name: 'DepositsTab',

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
