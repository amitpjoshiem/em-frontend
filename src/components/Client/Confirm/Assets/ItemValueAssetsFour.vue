<template>
  <div class="items-center mb-5 p-2">
    <div class="text-main font-semibold text-xss mb-4">{{ title }}</div>
    <div class="flex mb-2">
      <div class="w-6/12">
        <div class="text-gray03 text-xs">OWNER</div>
        <div>{{ currencyFormat(member) }}</div>
      </div>
      <div v-if="isMarried" class="w-6/12">
        <div class="text-gray03 text-xs">SPOUSE</div>
        <div>{{ currencyFormat(spouse) }}</div>
      </div>
    </div>
    <div class="flex mb-2">
      <div class="w-6/12">
        <div class="text-gray03 text-xs">ONQ</div>
        <div>{{ currencyFormat(onq) }}</div>
      </div>
      <div class="w-6/12">
        <div class="text-gray03 text-xs">BALANCE</div>
        <div>{{ currencyFormat(balance) }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { currencyFormat } from '@/utils/currencyFormat'

export default {
  name: 'ItemValueAssetsFour',
  props: {
    title: {
      type: String,
      required: true,
      default: 'Title',
    },
    spouse: {
      type: String,
      required: false,
      default: '',
    },
    member: {
      type: String,
      required: false,
      default: '',
    },
    onq: {
      type: String,
      required: false,
      default: '',
    },
    balance: {
      type: String,
      required: false,
      default: '',
    },
    isMarried: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  setup() {
    return { currencyFormat }
  },
}
</script>
