<template>
  <div class="border border-color-grey rounded p-10 mt-10">
    <span class="text-base text-main font-semibold"> Housing Information </span>
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

    <div class="flex justify-between my-7">
      <span class="text-gray03 text-xss font-semibold">Market Value</span>
      <span class="text-main text-sm font-semibold">
        ${{ house.marketValue }}
      </span>
    </div>
    <div class="flex justify-between mb-7">
      <span class="text-gray03 text-xss font-semibold">Total Debt</span>
      <span class="text-main text-sm"> ${{ house.totalDebt }} </span>
    </div>
    <div class="flex justify-between mb-7">
      <span class="text-gray03 text-xss font-semibold">
        Remaining mortgage amount
      </span>
      <span class="text-main text-sm">
        ${{ house.remainingMortgageAmount }}
      </span>
    </div>
    <div v-if="house.type === 'rent'" class="flex justify-between mb-7">
      <span class="text-gray03 text-xss font-semibold"> Monthly payment </span>
      <span class="text-main text-sm"> ${{ house.monthlyPayment }} </span>
    </div>
    <div class="flex justify-between mb-7">
      <span class="text-gray03 text-xss font-semibold">
        Total monthly expenses
      </span>
      <span class="text-main text-sm"> ${{ house.totalMonthlyExpenses }} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProspectHousingInformation',
  props: {
    house: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
}
</script>
