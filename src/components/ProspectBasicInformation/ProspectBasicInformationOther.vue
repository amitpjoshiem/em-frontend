<template>
  <div class="border border-color-grey rounded p-10 mt-10">
    <span class="text-base text-main font-semibold">Other</span>

    <div class="flex my-7">
      <div class="w-2/12">
        <span class="text-gray03 text-xss font-semibold">Risk Tolerance</span>
      </div>
      <div class="w-10/12">
        <span class="text-main text-sm font-semibold capitalize">
          {{ other.risk }}
        </span>
      </div>
    </div>
    <div class="flex justify-between mb-7">
      <div class="w-2/12">
        <span class="text-gray03 text-xss font-semibold">
          Specific questions
        </span>
      </div>
      <div class="w-10/12">
        <span class="text-main text-sm"> {{ other.questions }} </span>
      </div>
    </div>
    <div class="flex justify-between mb-7">
      <div class="w-2/12">
        <span class="text-gray03 text-xss font-semibold">
          Goal for retirement
        </span>
      </div>
      <div class="w-10/12">
        <span class="text-main text-sm"> {{ other.retirement }} </span>
      </div>
    </div>

    <div class="flex justify-between mb-7">
      <div class="w-2/12">
        <span class="text-gray03 text-xss font-semibold">
          Goal for retirement money
        </span>
      </div>

      <div class="w-10/12">
        <span class="text-main text-sm">
          {{ other.retirementMoney }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProspectBasicInformationOther',
  props: {
    other: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  setup() {},
}
</script>
