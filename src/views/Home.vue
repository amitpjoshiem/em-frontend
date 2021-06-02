<template>
  <div class="flex">
    <SideBar />
    <div class="flex flex-col w-full">
      <Header />
      <!-- <Dashboard /> -->
      <router-view />
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import Header from '@/components/Header.vue'
// import Dashboard from '@/components/Dashboard.vue'

import { mapState } from 'vuex'

export default {
  name: 'Home',

  components: {
    SideBar,
    Header,
    // Dashboard,
  },

  data() {
    return {
      // isLogin: true,
    }
  },

  computed: mapState({
    isAuth: (state) => state.auth.isAuth,
  }),
}
</script>
