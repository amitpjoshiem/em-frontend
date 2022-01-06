<template>
  <div class="border border-color-grey rounded p-10 mt-10">
    <div class="mb-5">
      <span class="text-base text-main font-semibold"> Housing Information </span>
      <span
        v-if="house.type"
        data-testid="member-housing-information-type"
        class="text-border-green text-xxs font-semibold bg-light-green rounded pr-2 pl-1 py-1 capitalize"
      >
        {{ house.type }}
      </span>
    </div>

    <div v-if="house.id">
      <div v-if="house.type === 'own' || house.type === 'family'" class="flex justify-between my-7">
        <span class="text-gray03 text-xss font-semibold">Market Value</span>
        <span class="text-main text-sm font-semibold" data-testid="member-housing-information-market-value">
          {{ currencyFormat(house.marketValue) }}
        </span>
      </div>

      <div v-if="house.type === 'own' || house.type === 'family'" class="flex justify-between mb-7">
        <span class="text-gray03 text-xss font-semibold">Total Debt</span>
        <SwdStubForText
          :text="currencyFormat(house.totalDebt)"
          plug="&mdash;"
          data-testid="member-housing-information-total-debt"
        />
      </div>

      <div v-if="house.type === 'own' || house.type === 'family'" class="flex justify-between mb-7">
        <span class="text-gray03 text-xss font-semibold">Remaining mortgage amount</span>
        <span class="text-main text-sm" data-testid="member-housing-information-remaining-mortgage-amount">
          {{ currencyFormat(house.remainingMortgageAmount) }}
        </span>
      </div>

      <div v-if="house.type === 'rent'" class="flex justify-between mb-7">
        <span class="text-gray03 text-xss font-semibold">Monthly payment</span>
        <span class="text-main text-sm" data-testid="member-housing-information-monthly-payment">
          {{ currencyFormat(house.monthlyPayment) }}
        </span>
      </div>

      <div v-if="house.type === 'rent'" class="flex justify-between mb-7">
        <span class="text-gray03 text-xss font-semibold"> Total monthly expenses </span>
        <span class="text-main text-sm" data-testid="member-housing-information-total-monthly-expenses">
          {{ currencyFormat(house.totalMonthlyExpenses) }}
        </span>
      </div>
    </div>

    <div v-else>
      <span class="text-gray03" data-testid="member-housing-no-information"> No information about housing </span>
    </div>
  </div>
</template>

<script>
import { currencyFormat } from '@/utils/currencyFormat'
import { MemberDetailsHouse } from '@/dto/Member/MemberDetailsHouse'

export default {
  name: 'MemberHousingInformation',
  props: {
    house: {
      type: MemberDetailsHouse,
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
