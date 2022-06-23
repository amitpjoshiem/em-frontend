<template>
  <div class="flex text-sm text-main font-semibold bg-widget-bg">
    <div class="header-item w-11/24 h-9 flex items-center justify-center">Name</div>
    <div class="header-item w-11/24 h-9 flex items-center justify-center">Domain</div>
    <div class="header-item w-2/24 h-9 flex items-center justify-center"></div>
  </div>
</template>
<script>
export default {
  name: 'CompaniesListHeader',
}
</script>

<style>
.header-item {
  @apply border-r first:border-l border-t;
}
</style>
