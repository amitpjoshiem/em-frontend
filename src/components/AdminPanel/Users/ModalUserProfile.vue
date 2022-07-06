<template>
  <el-dialog v-model="dialogVisible" title="Profile" width="50%" :before-close="closeDialog" destroy-on-close>
    <el-scrollbar height="500px" class="pr-[15px]">
      <div v-if="isLoading" class="flex items-center justify-center">
        <SwdSpinner large />
      </div>
      <SwdErrorBlock v-else-if="isError" />
      <div v-else-if="user">
        <div v-if="user.status === 'deleted'">
          <el-tag type="danger">User is delete</el-tag>
          <div>
            <span>Data transfered to: </span>
            <el-tag type="success"> {{ user.transferTo.last_name }} {{ user.transferTo.first_name }} </el-tag>
          </div>
          <el-divider />
        </div>
        <!-- Role -->
        <div class="flex">
          <div class="w-6/12 font-semibold">Role:</div>
          <div class="w-6/12 text-main">{{ user.roles[0].description }}</div>
        </div>
        <el-divider />
        <!-- Company -->
        <div class="flex">
          <div class="w-6/12 font-semibold">Company:</div>
          <div class="w-6/12 text-main">{{ user.company.name }}</div>
        </div>
        <el-divider />
        <!-- FirstName -->
        <div class="flex">
          <div class="w-6/12 font-semibold">First name:</div>
          <SwdStubForText :text="user.first_name" plug="&mdash;" class="w-6/12 text-main" />
        </div>
        <el-divider />
        <!-- LastName -->
        <div class="flex">
          <div class="w-6/12 font-semibold">Last name:</div>
          <SwdStubForText :text="user.last_name" plug="&mdash;" class="w-6/12 text-main" />
        </div>
        <el-divider />
        <!-- Email -->
        <div class="flex">
          <div class="w-6/12 font-semibold">Email:</div>
          <a class="w-6/12 text-activity" href="mailto:{{user.email}}">{{ user.email }}</a>
        </div>
        <el-divider />
        <!-- Phone -->
        <div class="flex">
          <div class="w-6/12 font-semibold">Phone:</div>
          <a v-if="user.phone" class="w-6/12 text-activity" href="tel:{{user.phone}}">{{ user.phone }}</a>
          <span v-else class="w-6/12 text-main">&mdash;</span>
        </div>
        <el-divider />
        <!-- NPN -->
        <template v-if="user.npm">
          <div class="flex">
            <div class="w-6/12 font-semibold">NPN:</div>
            <div class="w-6/12 text-main">{{ user.npm }}</div>
          </div>
          <el-divider />
        </template>
        <!-- Position -->
        <template v-if="user.position">
          <div class="flex">
            <div class="w-6/12 font-semibold">Position:</div>
            <div class="w-6/12 text-main">{{ user.position }}</div>
          </div>
          <el-divider />
        </template>
        <!-- Advisors -->
        <template v-if="user.advisors">
          <div class="flex">
            <div class="w-6/12 font-semibold">Advisors:</div>
            <div class="w-6/12 text-main">
              <el-tag v-for="(item, index) in getAdvisors" :key="index" type="info" class="mb-2">{{ item }}</el-tag>
            </div>
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
import { ref, watchEffect, computed } from 'vue'
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

    const getAdvisors = computed(() => {
      return user.value.advisors.map((item) => {
        return item.first_name + ' ' + item.last_name
      })
    })

    return {
      dialogVisible,
      closeDialog,
      Edit,
      confirm,
      isLoading,
      isError,
      user,
      refetch,
      getAdvisors,
    }
  },
}
</script>
