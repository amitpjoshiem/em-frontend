<template>
  <div class="border border-border-blue rounded-md p-5 mb-4">
    <div class="flex items-center mb-5">
      <InlineSvg :src="IconDoneStep" />
      <div class="text-main text-xl font-semibold mx-2">Housing Information</div>
    </div>

    <template v-if="houses.length">
      <div v-for="(house, index) in houses" :key="index">
        <div>
          <span class="text-main text-xss font-semibold pr-2">Type:</span>
          <span
            data-testid="member-housing-information-type"
            class="text-border-green text-xxs font-semibold bg-main-green rounded px-2 py-1 capitalize"
          >
            {{ house.type }}
          </span>
        </div>

        <div v-if="house.type === 'own' || house.type === 'family'" class="flex justify-between my-7">
          <div class="w-6/24 text-main text-xss font-semibold">Market Value</div>
          <div class="w-9/24 text-main text-sm" data-testid="member-housing-information-market-value">
            {{ currencyFormat(house.market_value) }}
          </div>
        </div>

        <div v-if="house.type === 'own' || house.type === 'family'" class="flex justify-between mb-7">
          <div class="w-6/24 text-main text-xss font-semibold">Total Debt</div>
          <SwdStubForText
            class="w-9/24 text-sm text-main"
            :text="currencyFormat(house.total_debt)"
            plug="&mdash;"
            data-testid="member-housing-information-total-debt"
          />
        </div>

        <div v-if="house.type === 'own' || house.type === 'family'" class="flex justify-between mb-7">
          <div class="w-6/24 text-main text-xss font-semibold">Remaining mortgage amount</div>
          <div class="w-9/24 text-main text-sm" data-testid="member-housing-information-remaining-mortgage-amount">
            {{ currencyFormat(house.remaining_mortgage_amount) }}
          </div>
        </div>

        <div v-if="house.type === 'rent'" class="flex justify-between mb-7">
          <div class="w-6/24 text-main text-xss font-semibold">Monthly payment</div>
          <div class="w-9/24 text-main text-sm" data-testid="member-housing-information-monthly-payment">
            {{ currencyFormat(house.monthly_payment) }}
          </div>
        </div>

        <div v-if="house.type === 'rent'" class="flex justify-between mb-7">
          <div class="w-6/24 text-main text-xss font-semibold">Total monthly expenses</div>
          <div class="w-9/24 text-main text-sm" data-testid="member-housing-information-total-monthly-expenses">
            {{ currencyFormat(house.total_monthly_expenses) }}
          </div>
        </div>
        <el-divider v-if="index !== houses.length - 1" border-style="dashed" />
      </div>
    </template>

    <div v-else>
      <span class="text-main" data-testid="member-housing-no-information"> No information about housing </span>
    </div>
  </div>
</template>

<script>
import { currencyFormat } from '@/utils/currencyFormat'
import IconDoneStep from '@/assets/svg/icon-done-step.svg'

export default {
  name: 'MemberHousingInformation',
  props: {
    houses: {
      type: Array,
      require: true,
      default: () => [],
    },
  },
  setup() {
    return {
      currencyFormat,
      IconDoneStep,
    }
  },
}
</script>
