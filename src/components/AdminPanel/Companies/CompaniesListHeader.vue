<template>
  <div class="flex text-sm text-main font-semibold bg-widget-bg">
    <div class="header-item w-11/24">Name</div>
    <div class="header-item w-11/24">Domain</div>
    <div class="header-item w-2/24"></div>
  </div>
</template>
<script>
export default {
  name: 'CompaniesListHeader',
}
</script>

<style>
.header-item {
  @apply border-t p-2 flex items-center;
}
</style>
