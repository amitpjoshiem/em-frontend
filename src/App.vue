<template>
  <router-view v-if="!loading" />
  <SwdFullScreenLoading v-else />
  <VueQueryDevTools />
  <ModalReloadPage />
  <SwdShareDialog />
  <SwdModalExportSucces />
  <SwdModalTerms />
  <ModalUserProfile />
  <ModalAdminPanelUser />
</template>

<script>
import { onMounted, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useQueryProvider } from 'vue-query'
import { VueQueryDevTools } from 'vue-query/devtools'
import { tokenStorage } from './api/api-client/TokenStorage'
import { useSockets } from './sockets/use-sockets'
import ModalReloadPage from '@/components/ModalReloadPage/ModalRealoadPage.vue'
import SwdShareDialog from '@/components/Global/SwdShareDialog.vue'
import SwdModalTerms from '@/components/Global/SwdModalTerms.vue'
import SwdModalExportSucces from '@/components/Documents/ClientReport/ModalExportSucces.vue'
import ModalUserProfile from '@/components/AdminPanel/Users/ModalUserProfile'
import ModalAdminPanelUser from '@/components/AdminPanel/Users/ModalAdminPanelUser'

export default {
  components: {
    VueQueryDevTools,
    ModalReloadPage,
    SwdShareDialog,
    SwdModalExportSucces,
    SwdModalTerms,
    ModalUserProfile,
    ModalAdminPanelUser,
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

    const loading = computed(() => {
      return store.state.globalComponents.isLoadingApp
    })

    onBeforeMount(() => {
      if (JSON.parse(tokenStorage.getByKey('refresh_token_expired'))) {
        localStorage.clear()
      }
    })

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
