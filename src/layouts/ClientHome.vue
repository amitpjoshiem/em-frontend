<template>
  <div class="flex">
    <SwdSideBar />
    <div class="flex flex-col w-full">
      <Header />
      <router-view />
    </div>
  </div>
</template>

<script>
import SwdSideBar from '@/components/Global/SwdSideBar.vue'
import Header from '@/components/Header/Header.vue'

export default {
  name: 'ClientHome',

  components: {
    SwdSideBar,
    Header,
  },
}
</script>
