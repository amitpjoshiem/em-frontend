<template>
  <div class="flex text-sm text-main font-semibold bg-widget-bg">
    <div class="header-item w-5/24 h-9 flex items-center justify-center">Name</div>
    <div class="header-item w-6/24 h-9 flex items-center justify-center">E-mail</div>
    <div class="header-item w-3/24 h-9 flex items-center justify-center">Position</div>
    <div class="header-item w-3/24 h-9 flex items-center justify-center">Role</div>
    <div class="header-item w-4/24 h-9 flex items-center justify-center">Company</div>
    <div class="header-item w-2/24 h-9 flex items-center justify-center">Verified</div>
    <div class="header-item w-1/24 h-9 flex items-center justify-center"></div>
  </div>
</template>
<script>
export default {
  name: 'UsersListHeader',
}
</script>

<style>
.header-item {
  @apply border-r first:border-l border-t;
}
</style>
