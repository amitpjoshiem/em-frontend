<template>
  <div class="flex">
    <Aside class="fixed" />
    <div class="flex flex-col w-full ml-[150px]">
      <Header />
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Aside from '@/components/AdminPanel/Aside/Aside.vue'
import Header from '@/components/AdminPanel/Header.vue'

export default {
  name: 'AdminPanelHome',
  components: {
    Aside,
    Header,
  },
}
</script>
