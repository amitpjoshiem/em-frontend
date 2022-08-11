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
  <ModalUserProfile />
  <ModalAdminPanelUser />
  <ModalAdminPanelCompany />
  <ModalDeleteAdminPanelUser />
</template>

<script>
import Aside from '@/components/AdminPanel/Aside/Aside.vue'
import Header from '@/components/AdminPanel/Header.vue'

import ModalUserProfile from '@/components/AdminPanel/Users/ModalUserProfile'
import ModalDeleteAdminPanelUser from '@/components/AdminPanel/Users/ModalDeleteAdminPanelUser'
import ModalAdminPanelUser from '@/components/AdminPanel/Users/ModalAdminPanelUser'
import ModalAdminPanelCompany from '@/components/AdminPanel/Companies/ModalAdminPanelCompany'

export default {
  name: 'AdminPanelHome',
  components: {
    Aside,
    Header,
    ModalUserProfile,
    ModalAdminPanelUser,
    ModalAdminPanelCompany,
    ModalDeleteAdminPanelUser,
  },
}
</script>
