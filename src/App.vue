<template>
  <router-view />
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    onMounted(() => {
      const auth = localStorage.getItem('auth')
      if (
        localStorage.getItem('access_token') !== null &&
        auth &&
        auth.isAuth !== null
      ) {
        store.commit('auth/setAuthUser', true)
      } else {
        store.commit('auth/setAuthUser', false)
      }
    })
  },
}
</script>

<style lang="css">
@import '~element-plus/lib/theme-chalk/index.css';
@import '~element-plus/lib/theme-chalk/display.css';
</style>
