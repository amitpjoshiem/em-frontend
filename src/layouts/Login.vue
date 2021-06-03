<template>
  <div class="flex w-full">
    <SideBar />
    <router-view />
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'

export default {
  name: 'Login',
  components: {
    SideBar,
  },
}
</script>
