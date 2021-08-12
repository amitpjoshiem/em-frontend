<template>
  <div class="my-3 text-xs border border-input-border rounded p-5">
    <div class="flex">
      <div class="w-4/12 text-gray03 font-semibold">Company Name</div>
      <div class="w-4/12">{{ elem.companyName[0] }}</div>
      <div class="w-4/12">{{ elem.companyName[1] }}</div>
    </div>
    <div class="flex py-2">
      <div class="w-4/12 text-gray03 font-semibold">Occupation</div>
      <div class="w-4/12">{{ elem.occupation[0] }}</div>
      <div class="w-4/12">{{ elem.occupation[1] }}</div>
    </div>
    <div class="flex">
      <div class="w-4/12 text-gray03 font-semibold">Years</div>
      <div class="w-4/12">{{ elem.years[0] }}</div>
      <div class="w-4/12">{{ elem.years[1] }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EmploymentHistoryItem',
  props: {
    elem: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
}
</script>
