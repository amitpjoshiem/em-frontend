<template>
  <div class="flex items-center font-semibold text-main">
    <div class="w-2/12 text-xss">Total</div>
    <div class="w-5/24 pr-2.5">
      <div class="el-input el-input__inner flex items-center text-sm">
        <SwdSpinner v-if="isLoadingUpdate" />
        <span v-else>
          {{ currencyFormat(member) }}
        </span>
      </div>
    </div>
    <div v-if="isMarried" class="w-5/24 pr-2.5">
      <div class="el-input el-input__inner flex items-center text-smm">
        <SwdSpinner v-if="isLoadingUpdate" />
        <span v-else>
          {{ currencyFormat(spouse) }}
        </span>
      </div>
    </div>
    <div class="w-5/24 pr-2.5">
      <div class="el-input el-input__inner flex items-center text-sm">
        <SwdSpinner v-if="isLoadingUpdate" />
        <span v-else>
          {{ currencyFormat(oNq) }}
        </span>
      </div>
    </div>
    <div class="w-5/24 pr-2.5">
      <div class="el-input el-input__inner flex items-center text-sm">
        <SwdSpinner v-if="isLoadingUpdate" />
        <span v-else>
          {{ currencyFormat(balance) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { currencyFormat } from '@/utils/currencyFormat'

export default {
  name: 'WidgetTotal',
  props: {
    member: {
      type: String,
      require: true,
      default: '',
    },
    spouse: {
      type: String,
      require: true,
      default: '',
    },
    oNq: {
      type: String,
      require: true,
      default: '',
    },
    balance: {
      type: String,
      require: true,
      default: '',
    },
    isMarried: {
      type: Boolean,
      require: true,
      default: false,
    },
    isLoadingUpdate: {
      type: Boolean,
      require: true,
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
