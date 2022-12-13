<template>
  <div class="bg-main-gray flex items-center px-5 h-[60px] w-full relative">
    <div class="w-4/12" />
    <div class="w-4/12 flex justify-center font-semibold">Admin Panel</div>
    <UserAction class="w-4/12" :id-admin-panel="true" />
  </div>
</template>

<script>
import UserAction from '@/components/UserAction.vue'

export default {
  name: 'Header',
  components: {
    UserAction,
  },
}
</script>
