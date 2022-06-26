<template>
  <el-dialog v-model="dialogVisible" title="Profile" width="50%" :before-close="closeDialog" destroy-on-close>
    <el-scrollbar height="500px">
      <div v-if="isLoading" class="flex items-center justify-center">
        <SwdSpinner large />
      </div>
      <SwdErrorBlock v-else-if="isError" />
      <div v-else-if="user">
        <!-- Role -->
        <div class="flex">
          <div class="w-6/12 pr-2 font-semibold">Role:</div>
          <div class="w-6/12 pl-2 text-main">{{ user.roles[0].description }}</div>
        </div>
        <el-divider />
        <!-- Company -->
        <div class="flex">
          <div class="w-6/12 pr-2 font-semibold">Company:</div>
          <div class="w-6/12 pl-2 text-main">{{ user.company.name }}</div>
        </div>
        <el-divider />
        <!-- FirstName -->
        <div class="flex">
          <div class="w-6/12 pr-2 font-semibold">First name:</div>
          <SwdStubForText :text="user.first_name" plug="&mdash;" class="w-6/12 pl-2 text-main" />
        </div>
        <el-divider />
        <!-- LastName -->
        <div class="flex">
          <div class="w-6/12 pr-2 font-semibold">Last name:</div>
          <SwdStubForText :text="user.last_name" plug="&mdash;" class="w-6/12 pl-2 text-main" />
        </div>
        <el-divider />
        <!-- Email -->
        <div class="flex">
          <div class="w-6/12 pr-2 font-semibold">Email:</div>
          <!-- <div class="w-6/12 pl-2 text-main">{{ user.email }}</div> -->
          <a href="mailto:{{user.email}}">{{ user.email }}</a>
        </div>
        <el-divider />
        <!-- Phone -->
        <div class="flex">
          <div class="w-6/12 pr-2 font-semibold">Phone:</div>
          <SwdStubForText :text="user.phone" plug="&mdash;" class="w-6/12 pl-2 text-main" />
        </div>
        <el-divider />
        <!-- NPN -->
        <template v-if="user.npm">
          <div class="flex">
            <div class="w-6/12 pr-2 font-semibold">NPN:</div>
            <div class="w-6/12 pl-2 text-main">{{ user.npm }}</div>
          </div>
          <el-divider />
        </template>
        <!-- Position -->
        <template v-if="user.position">
          <div class="flex">
            <div class="w-6/12 pr-2 font-semibold">Position:</div>
            <div class="w-6/12 pl-2 text-main">{{ user.position }}</div>
          </div>
          <el-divider />
        </template>
      </div>
    </el-scrollbar>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">Close</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { Edit } from '@element-plus/icons-vue'
import { useFetchAdminPanelUserById } from '@/api/admin-panel/use-fetch-ap-user-by-id.js'
import { maska } from 'maska'

export default {
  name: 'ModalUserProfile',
  directives: { maska },
  setup() {
    const store = useStore()
    const dialogVisible = ref(false)

    const { isLoading, isError, data: user, refetch } = useFetchAdminPanelUserById({ enabled: false })

    watchEffect(() => {
      dialogVisible.value = store.state.adminPanelUsers.dialog.showDialog.modalUserProfile
      if (store.state.adminPanelUsers.profileUserId !== null) {
        refetch.value()
      }
    })

    const closeDialog = () => {
      dialogVisible.value = false
      store.commit('adminPanelUsers/setProfileUserId', null)
      store.commit('adminPanelUsers/setShowModal', {
        destination: 'modalUserProfile',
        value: false,
      })
    }

    const confirm = () => {
      closeDialog()
    }

    return {
      dialogVisible,
      closeDialog,
      Edit,
      confirm,

      isLoading,
      isError,
      user,
      refetch,
    }
  },
}
</script>
