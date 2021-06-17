<template>
  <div class="p-5 flex justify-between">
    <span>List of Households</span>
    <div class="flex items-center">
      <ItemsPerPage />
      <Select large />
      <DropDown border class="ml-2" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'ListOfHouseholdsHeader',
}
</script>
