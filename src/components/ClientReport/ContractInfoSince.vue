<template>
  <div class="text-main mt-5">
    <div class="flex justify-between text-sm">
      <div>
        <span class="pr-2">Contract Years:</span>
        <span>{{ clientReport.contractYear }}</span>
      </div>
      <!-- <div>
        <span class="pr-2">Lifetime Income:</span>
        <span>2015</span>
      </div> -->
    </div>

    <table class="w-full table-auto border-collapse border rounded-md text-xs">
      <tr>
        <th colspan="5" scope="colgroup" class="border border-input-border w-5/10 bg-orange-bg py-1">
          Since Inception
        </th>
      </tr>
      <tr class="bg-widget-bg">
        <th class="border border-input-border w-1/10 py-1" scope="col">Total Premiums</th>
        <th class="border border-input-border w-1/10 py-1" scope="col">Bonus Received</th>
        <th class="border border-input-border w-1/10 py-1" scope="col">Interest credited</th>
        <th class="border border-input-border w-1/10 py-1" scope="col">Total Withdrawals</th>
        <th class="border border-input-border w-1/10 py-1" scope="col">Average Growth</th>
      </tr>
      <tr>
        <td class="border border-input-border w-2/10 py-1 pl-3 font-semibold">
          {{ currencyFormat(clientReportSince.totalPremiums) }}
        </td>
        <td class="border border-input-border w-2/10 py-1 pl-3 font-semibold">
          {{ currencyFormat(clientReportSince.bonusReceived) }}
        </td>
        <td class="border border-input-border w-2/10 py-1 pl-3 font-semibold">
          {{ currencyFormat(clientReportSince.interestCredited) }}
        </td>
        <td class="border border-input-border w-2/10 py-1 pl-3 font-semibold">
          {{ currencyFormat(clientReportSince.totalWithdrawals) }}
        </td>
        <td class="border border-input-border w-2/10 py-1 pl-3 font-semibold">
          {{ currencyFormat(clientReportSince.averageGrowth) }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { currencyFormat } from '@/utils/currencyFormat'
import { ClientReport } from '@/dto/ClientReport/ClientReport'
import { ClientReportSince } from '@/dto/ClientReport/ClientReportSince'

export default {
  name: 'ContractInfoSince',
  props: {
    clientReport: {
      type: ClientReport,
      require: true,
      default: () => {},
    },
    clientReportSince: {
      type: ClientReportSince,
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
