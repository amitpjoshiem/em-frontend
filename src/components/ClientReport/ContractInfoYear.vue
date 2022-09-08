<template>
  <div class="text-main">
    <div class="flex justify-between text-sm">
      <div class="font-semibold text-base">
        <span class="pr-2">Carrier:</span>
        <span>{{ clientReport.carrier }}</span>
      </div>
      <!-- <div>
        <span class="pr-2">Income Account Value:</span>
        <span>{{ currencyFormat(99999999) }}</span>
      </div> -->
    </div>
    <div class="flex justify-between mt-5 text-sm">
      <div>
        <span class="pr-2">Contract# </span>
        <span>{{ clientReport.contractNumber }}</span>
      </div>
      <div>
        <span class="pr-2">IssueDate: </span>
        <span>{{ clientReport.originationDateFormatted }}</span>
      </div>
    </div>

    <table class="w-full table-auto border-collapse border rounded-md text-xs">
      <tr>
        <th colspan="5" scope="colgroup" class="border border-main-gray w-5/10 bg-color-main-blue py-1">
          Current Year
        </th>
      </tr>
      <tr class="bg-main-gray">
        <th class="border border-main-gray w-1/10 py-1" scope="col">Beginning Balance</th>
        <th class="border border-main-gray w-1/10 py-1" scope="col">Interest credited</th>
        <th class="border border-main-gray w-1/10 py-1" scope="col">Growth</th>
        <th class="border border-main-gray w-1/10 py-1" scope="col">Withdrawals</th>
        <th class="border border-main-gray w-1/10 py-1" scope="col">Current value</th>
      </tr>
      <tr>
        <td class="border border-main-gray w-2/10 py-1 pl-3 font-semibold">
          {{ currencyFormat(clientReportYear.beginningBalance) }}
        </td>
        <td class="border border-main-gray w-2/10 py-1 pl-3 font-semibold">
          {{ currencyFormat(clientReportYear.interestCredited) }}
        </td>
        <td class="border border-main-gray w-2/10 py-1 pl-3 font-semibold">
          {{ currencyFormat(clientReportYear.growth) }}
        </td>
        <td class="border border-main-gray w-2/10 py-1 pl-3 font-semibold">
          {{ currencyFormat(clientReportYear.withdrawals) }}
        </td>
        <td class="border border-main-gray w-2/10 py-1 pl-3 font-semibold">
          {{ currencyFormat(clientReportYear.currentValue) }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { currencyFormat } from '@/utils/currencyFormat'
import { ClientReport } from '@/dto/ClientReport/ClientReport'
import { ClientReportYear } from '@/dto/ClientReport/ClientReportYear'

export default {
  name: 'ContractInfoYear',
  props: {
    clientReport: {
      type: ClientReport,
      require: true,
      default: () => {},
    },
    clientReportYear: {
      type: ClientReportYear,
      require: true,
      default: () => {},
    },
  },
  setup() {
    return {
      currencyFormat,
    }
  },
}
</script>
