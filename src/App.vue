<template>
  <router-view v-if="!loading" />
  <SwdFullScreenLoading v-else />
  <VueQueryDevTools />
  <ModalReloadPage />
  <SwdShareDialog />
  <SwdModalExportSucces />
</template>

<script>
import { onMounted, watchEffect, ref } from 'vue'
import { useStore } from 'vuex'
import { useQueryProvider } from 'vue-query'
import { VueQueryDevTools } from 'vue-query/devtools'
import { tokenStorage } from './api/api-client/TokenStorage'
import { useSockets } from './sockets/use-sockets'
import ModalReloadPage from '@/components/ModalReloadPage/ModalRealoadPage.vue'
import SwdShareDialog from '@/components/Global/SwdShareDialog.vue'
import SwdModalExportSucces from '@/components/Documents/ClientReport/ModalExportSucces.vue'

import { useSetCompanies } from '@/hooks/use-companies'
import { useSetInit } from '@/hooks/use-set-init'

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

    const loading = ref(false)

    const store = useStore()

    const { setCompanies } = useSetCompanies()
    const { setInit } = useSetInit()

    onMounted(async () => {
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

    watchEffect(async () => {
      if (store.state.auth.isAuth) {
        loading.value = true
        await setInit()
        await setCompanies()
        loading.value = false
      }
    })
    return {
      loading,
    }
  },
}
</script>

<style lang="css">
@import '~element-plus/dist/index.css';
@import '~element-plus/theme-chalk/display.css';
@import '~cropperjs/dist/cropper.css';
</style>
