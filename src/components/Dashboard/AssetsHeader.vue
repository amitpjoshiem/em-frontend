<template>
  <div class="flex justify-between items-center">
    <span class="text-smm font-semibold">Assets</span>
    <div class="flex items-center">
      <Select :options="options" large />
      <DropDown
        with-border
        element-action
        class="ml-2"
        :options="actionsOptions"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'AssetsHeader',
  setup() {
    const actionsOptions = [
      {
        title: 'Item 1',
        command: 'item-1',
      },
      {
        title: 'Item 2',
        command: 'item2',
      },
    ]
    return { actionsOptions }
  },
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
