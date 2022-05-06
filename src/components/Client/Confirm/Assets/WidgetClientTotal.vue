<template>
  <div class="font-semibold text-main flex flex-wrap p-2">
    <div class="w-full sm:w-2/12 text-xss mb-2">Total</div>
    <div class="w-10/24 sm:w-5/24 text-sm">
      <div class="text-gray03 text-xs">OWNER</div>
      <div>
        {{ currencyFormat(member) }}
      </div>
    </div>

    <div v-if="isMarried" class="w-10/24 sm:w-5/24 text-sm">
      <div class="text-gray03 text-xs">SPOUSE</div>
      <div>
        {{ currencyFormat(spouse) }}
      </div>
    </div>

    <div class="w-10/24 sm:w-5/24 text-sm">
      <div class="text-gray03 text-xs">Insitution</div>
      <div>
        {{ currencyFormat(oNq) }}
      </div>
    </div>

    <div class="w-10/24 sm:w-5/24 text-sm">
      <div class="text-gray03 text-xs">BALANCE</div>
      <div>
        {{ currencyFormat(balance) }}
      </div>
    </div>
  </div>
</template>

<script>
import { currencyFormat } from '@/utils/currencyFormat'

export default {
  name: 'WidgetClientTotal',
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
  },
  setup() {
    return {
      currencyFormat,
    }
  },
}
</script>
