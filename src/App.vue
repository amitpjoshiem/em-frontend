<template>
  <router-view />
  <VueQueryDevTools />
  <ModalReloadPage />
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { useQueryProvider } from 'vue-query'
import { VueQueryDevTools } from 'vue-query/devtools'
import { tokenStorage } from './api/api-client/TokenStorage'
import { useSockets } from './sockets/use-sockets'
import ModalReloadPage from '@/components/ModalReloadPage/ModalRealoadPage.vue'
export default {
  components: {
    VueQueryDevTools,
    ModalReloadPage,
  },
  setup() {
    useQueryProvider()

    const store = useStore()
    onMounted(() => {
      const auth = JSON.parse(tokenStorage.getByKey('auth'))
      const access_token = tokenStorage.getByKey('access_token')
      if (access_token !== null && auth && auth.isAuth !== null) {
        store.commit('auth/setAuthUser', true)
        useSockets()
      } else {
        store.commit('auth/setAuthUser', false)
      }
      const otpType = tokenStorage.getByKey('otp-type')
      store.commit('auth/setOtpType', otpType)
    })
  },
}
</script>

<style lang="css">
@import '~element-plus/dist/index.css';
@import '~element-plus/theme-chalk/display.css';
@import '~cropperjs/dist/cropper.css';
</style>
