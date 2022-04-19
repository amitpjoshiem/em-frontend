<template>
  <div class="flex">
    <SideBar />
    <div class="flex flex-col w-full">
      <Header />
      <SettingsApp />
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import Header from '@/components/Header/Header.vue'
import SettingsApp from '../views/SettingsApp.vue'

export default {
  name: 'ClientHome',

  components: {
    SideBar,
    Header,
    SettingsApp,
  },
}
</script>
