<template>
  <div class="flex">
    <SideBar />
    <div class="flex flex-col w-full">
      <Header />
      <router-view />
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'Home',

  components: {
    SideBar,
    Header,
  },
}
</script>
