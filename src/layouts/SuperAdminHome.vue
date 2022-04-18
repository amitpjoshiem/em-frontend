<template>
  <div class="flex">
    <SuperAdminSideBar />
    <div class="flex flex-col w-full">
      <Header />
      <router-view />
    </div>
  </div>
</template>

<script>
import SuperAdminSideBar from '@/components/SuperAdmin/SuperAdminSideBar.vue'
import Header from '@/components/Header/Header.vue'

export default {
  name: 'SuperAdminHome',

  components: {
    SuperAdminSideBar,
    Header,
  },
}
</script>
