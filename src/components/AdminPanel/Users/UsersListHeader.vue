<template>
  <div class="flex text-sm text-main font-semibold bg-widget-bg">
    <div class="header-item w-5/24">Name</div>
    <div class="header-item w-6/24">E-mail</div>
    <div class="header-item w-3/24">Position</div>
    <div class="header-item w-3/24">Role</div>
    <div class="header-item w-4/24">Company</div>
    <div class="header-item w-2/24">Verified</div>
    <div class="header-item w-1/24"></div>
  </div>
</template>
<script>
export default {
  name: 'UsersListHeader',
}
</script>

<style>
.header-item {
  @apply p-2 flex items-center;
}
</style>
