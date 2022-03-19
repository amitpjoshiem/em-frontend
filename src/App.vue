<template>
  <router-view />
  <VueQueryDevTools />
  <ModalReloadPage />
  <SwdShareDialog />
  <SwdModalExportSucces />
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { useQueryProvider } from 'vue-query'
import { VueQueryDevTools } from 'vue-query/devtools'
import { tokenStorage } from './api/api-client/TokenStorage'
import { useSockets } from './sockets/use-sockets'
import { useSetUpdateAbility } from '@/hooks/use-set-update-ability.js'
import ModalReloadPage from '@/components/ModalReloadPage/ModalRealoadPage.vue'
import SwdShareDialog from '@/components/Global/SwdShareDialog.vue'
import SwdModalExportSucces from '@/components/Documents/ClientReport/ModalExportSucces.vue'

export default {
  components: {
    VueQueryDevTools,
    ModalReloadPage,
    SwdShareDialog,
    SwdModalExportSucces,
  },
  setup() {
    useQueryProvider({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    })

    const store = useStore()
    const { setUpdateAbility } = useSetUpdateAbility()

    onMounted(() => {
      const auth = JSON.parse(tokenStorage.getByKey('auth'))
      const role = JSON.parse(tokenStorage.getByKey('role'))
      const access_token = tokenStorage.getByKey('access_token')
      if (access_token !== null && auth && auth.isAuth !== null) {
        store.commit('auth/setAuthUser', true)
        useSockets()
      } else {
        store.commit('auth/setAuthUser', false)
      }
      if (role.auth.role) {
        setUpdateAbility()
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
