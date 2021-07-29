<template>
  <div class="mr-2.5 flex items-center">
    <span class="text-xss text-text-gray mr-1.5">Items per page</span>
    <SwdSelect
      class="w-3/12"
      :options="actionsOptions"
      size="small"
      init-value="6"
      @select="handleSelect"
    />
  </div>
</template>
<script>
export default {
  name: 'ItemsPerPage',
  setup() {
    const options = [
      {
        value: 'Option1',
        label: 'All',
      },
      {
        value: 'Option2',
        label: 'Prospect',
      },
      {
        value: 'Option3',
        label: 'Clients',
      },
    ]
    return {
      options,
    }
  },
}
</script>
