<template>
  <div class="text-main">
    <div class="flex justify-between text-sm">
      <div class="font-semibold text-base">
        <span class="pr-2">Carrier:</span>
        <span>Developer</span>
      </div>
      <div>
        <span class="pr-2">Income Account Value:</span>
        <span>{{ currencyFormat(99999999) }}</span>
      </div>
    </div>
    <div class="flex justify-between mt-5 text-sm">
      <div>
        <span class="pr-2">Contract# </span>
        <span>12232323</span>
      </div>
      <div>
        <span class="pr-2">IssueDate: </span>
        <span>01/01/2021</span>
      </div>
    </div>

    <table class="w-full table-auto border-collapse border rounded-md text-xs">
      <tr>
        <th colspan="5" scope="colgroup" class="border border-input-border w-5/10 bg-color-light-blue py-1">
          Current Year
        </th>
      </tr>
      <tr class="bg-widget-bg">
        <th class="border border-input-border w-1/10 py-1" scope="col">Beginning Balance</th>
        <th class="border border-input-border w-1/10 py-1" scope="col">Interested Credited</th>
        <th class="border border-input-border w-1/10 py-1" scope="col">Growth</th>
        <th class="border border-input-border w-1/10 py-1" scope="col">Withdrawals</th>
        <th class="border border-input-border w-1/10 py-1" scope="col">Contract value</th>
      </tr>
      <tr>
        <td class="border border-input-border w-2/10 py-1 font-semibold">50</td>
        <td class="border border-input-border w-2/10 py-1 font-semibold">30</td>
        <td class="border border-input-border w-2/10 py-1 font-semibold">100</td>
        <td class="border border-input-border w-2/10 py-1 font-semibold">80</td>
        <td class="border border-input-border w-2/10 py-1 font-semibold">80</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { currencyFormat } from '@/utils/currencyFormat'

export default {
  name: 'ContractInfoYear',
  setup() {
    return {
      currencyFormat,
    }
  },
}
</script>
