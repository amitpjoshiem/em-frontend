<template>
  <div class="flex text-sm text-main font-semibold bg-widget-bg">
    <div class="header-item w-4/24 p-2">Name</div>
    <div class="header-item w-5/24 p-2">E-mail</div>
    <div class="header-item w-3/24 p-2">Position</div>
    <div class="header-item w-3/24 p-2">Phone</div>
    <div class="header-item w-2/24 p-2">NPM</div>
    <div class="header-item w-2/24 p-2">Role</div>
    <div class="header-item w-2/24 p-2">Company</div>
    <div class="header-item w-2/24 p-2">Verified</div>
    <div class="header-item w-1/24 p-2"></div>
  </div>
</template>
<script>
export default {
  name: 'UsersListHeader',
  setup() {},
}
</script>

<style>
.header-item {
  @apply border-r first:border-l border-t;
}
</style>
