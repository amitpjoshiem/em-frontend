<template>
  <div class="p-5 flex justify-between">
    <span>List of Households</span>
    <div class="flex items-center">
      <ItemsPerPage />
      <Select large />
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
  name: 'ListOfHouseholdsHeader',
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
}
</script>
