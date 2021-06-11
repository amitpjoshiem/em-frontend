<template>
  <div class="flex justify-between items-center">
    <span class="text-smm font-semibold">Assets</span>
    <div class="flex items-center">
      <Select :options="options" />
      <ActionBtn border class="ml-2" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'AssetsHeader',
  data() {
    return {
      options: [
        {
          value: 'Option1',
          label: 'Past month',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
      ],
      value: '',
    }
  },
}
</script>
