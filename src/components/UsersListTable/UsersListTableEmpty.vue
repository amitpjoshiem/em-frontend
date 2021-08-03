<template>
  <div
    class="
      bg-widget-bg
      uppercase
      text-gray03
      h-6
      flex
      justify-center
      items-center
    "
  >
    <span class="w-7/24 text-small ml-5">householder Name</span>
    <span class="w-3/24 text-small">Created on</span>
    <span class="w-3/24 text-small">type</span>
    <span class="w-3/24 text-small">Onboarding</span>
    <span class="w-4/24 text-small">location</span>
    <span class="w-4/24 text-small">net worth</span>
  </div>
  <div class="flex justify-center items-center py-8">
    <span class="text-gray03 text-xss">No recently added prospects</span>
  </div>
</template>

<script>
export default {
  name: 'UsersListTableEmpty',
}
</script>
