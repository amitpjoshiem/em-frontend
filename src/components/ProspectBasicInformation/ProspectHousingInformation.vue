<template>
  <div class="border border-color-grey rounded p-10 mt-10">
    <div class="mb-5">
      <span class="text-base text-main font-semibold">
        Housing Information
      </span>
      <span
        class="
          text-border-green text-xxs
          font-semibold
          bg-light-green
          rounded
          pr-2
          pl-1
          py-1
          capitalize
        "
      >
        {{ house.type }}
      </span>
    </div>

    <!-- Market Value -->
    <div
      v-if="house.type === 'own' || house.type === 'family'"
      class="flex justify-between my-7"
    >
      <span class="text-gray03 text-xss font-semibold">Market Value</span>
      <span class="text-main text-sm font-semibold">
        {{ currencyFormat(house.marketValue) }}
      </span>
    </div>

    <!-- Total Debt -->
    <div
      v-if="house.type === 'own' || house.type === 'family'"
      class="flex justify-between mb-7"
    >
      <span class="text-gray03 text-xss font-semibold">Total Debt</span>
      <span class="text-main text-sm">
        {{ currencyFormat(house.totalDebt) }}
      </span>
    </div>

    <!-- Remaining -->
    <div
      v-if="house.type === 'own' || house.type === 'family'"
      class="flex justify-between mb-7"
    >
      <span class="text-gray03 text-xss font-semibold">
        Remaining mortgage amount
      </span>
      <span class="text-main text-sm">
        {{ currencyFormat(house.remainingMortgageAmount) }}
      </span>
    </div>

    <!-- Monthly payment -->
    <div v-if="house.type === 'rent'" class="flex justify-between mb-7">
      <span class="text-gray03 text-xss font-semibold">Monthly payment</span>
      <span class="text-main text-sm">
        {{ currencyFormat(house.monthlyPayment) }}
      </span>
    </div>

    <!-- Total monthly -->
    <div v-if="house.type === 'rent'" class="flex justify-between mb-7">
      <span class="text-gray03 text-xss font-semibold">
        Total monthly expenses
      </span>
      <span class="text-main text-sm">
        {{ currencyFormat(house.totalMonthlyExpenses) }}
      </span>
    </div>
  </div>
</template>

<script>
import { currencyFormat } from '@/utils/currencyFormat'
import { ProspectDetailsHouse } from '@/dto/Prospect/ProspectDetailsHouse'

export default {
  name: 'ProspectHousingInformation',
  props: {
    house: {
      type: ProspectDetailsHouse,
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
