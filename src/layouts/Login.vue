<template>
  <div class="flex w-full">
    <SwdSideBar />
    <router-view />
  </div>
</template>

<script>
import SwdSideBar from '@/components/Global/SwdSideBar.vue'

export default {
  name: 'Login',
  components: {
    SwdSideBar,
  },
}
</script>
