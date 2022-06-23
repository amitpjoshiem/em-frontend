<template>
  <el-dialog v-model="dialogVisible" title="Profile" width="50%" :before-close="closeDialog" destroy-on-close>
    <template #header>
      <div class="flex justify-between">
        <h4>Profile user</h4>
        <el-button type="primary" class="mr-5" :icon="Edit" plain size="small" @click="editUser">Edit user</el-button>
      </div>
    </template>

    <el-scrollbar height="350px">
      <div v-if="isLoading" class="flex items-center justify-center">
        <SwdSpinner large />
      </div>
      <SwdErrorBlock v-else-if="isError" />
      <div v-else-if="user">
        <el-form ref="form" :model="ruleForm" label-position="top" :rules="rules" class="pr-4">
          <div class="flex justify-between mb-4">
            <el-form-item label="Role" class="w-6/12 pr-2" prop="role">
              <el-select v-model="ruleForm.role" placeholder="Select role" class="w-full">
                <el-option v-for="item in optionsRole" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="Company" class="w-6/12 pl-2" prop="company">
              <el-select v-model="ruleForm.company" placeholder="Select company" class="w-full">
                <el-option v-for="item in optionsCompany" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </div>

          <!-- First name -->
          <el-form-item v-if="isEdit" label="First name" class="mb-4" prop="first_name">
            <el-input v-model="ruleForm.first_name" autocomplete="off" placeholder="Enter first name" />
          </el-form-item>

          <div v-if="!isEdit" class="el-form-item mb-4 pb-[2px]">
            <div class="el-form-item__label pl-[12px]">First name</div>
            <div class="flex items-center border border-input-border rounded h-[32px] pl-[10px]">
              {{ user.first_name }}
            </div>
          </div>

          <!-- Last name -->
          <el-form-item v-if="isEdit" label="Last name" class="mb-4" prop="last_name">
            <el-input v-model="ruleForm.last_name" autocomplete="off" placeholder="Enter last name" />
          </el-form-item>

          <div v-if="!isEdit" class="el-form-item mb-4 pb-[2px]">
            <div class="el-form-item__label">Last name</div>
            <div class="el-input__inner border-0 flex items-center">{{ user.last_name }}</div>
          </div>

          <el-form-item label="Email" class="mb-4" prop="email">
            <el-input v-model="ruleForm.email" autocomplete="off" placeholder="Enter email" />
          </el-form-item>
          <el-form-item label="Username" class="mb-4" prop="username">
            <el-input v-model="ruleForm.username" autocomplete="off" placeholder="Enter Username" />
          </el-form-item>
          <el-form-item label="Phone" class="mb-4" prop="phone">
            <el-input
              v-model="ruleForm.phone"
              v-maska="'(###) ###-####'"
              placeholder="Enter phone number"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item v-if="isShowNpn" label="NPN" class="mb-4" prop="npn">
            <el-input v-model="ruleForm.npn" autocomplete="off" placeholder="Enter NPN" />
          </el-form-item>
          <el-form-item v-if="isShowPositionTitle" label="Position Title" class="mb-4" prop="position_title">
            <el-input v-model="ruleForm.position_title" autocomplete="off" placeholder="Enter position title" />
          </el-form-item>
        </el-form>
      </div>
    </el-scrollbar>

    <template #footer>
      <span v-if="!isEdit" class="dialog-footer">
        <el-button @click="closeDialog">Close</el-button>
      </span>
      <span v-else class="dialog-footer">
        <el-button @click="closeDialog">Cancel</el-button>
        <el-button type="primary" @click="confirm">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, watchEffect, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { Edit } from '@element-plus/icons-vue'
import { useFetchAdminPanelUserById } from '@/api/admin-panel/use-fetch-ap-user-by-id.js'
import { maska } from 'maska'
import { rules } from '@/validationRules/modalAddCompany'

export default {
  name: 'ModalUserProfile',
  directives: { maska },
  setup() {
    const store = useStore()

    const dialogVisible = ref(false)
    const isEdit = ref(false)
    const form = ref(null)

    const ruleForm = reactive({
      first_name: '',
      last_name: '',
      email: '',
      role: '',
      company: '',
      npn: '',
      position_title: '',
      username: '',
    })

    const optionsRole = [
      {
        value: 'advisor',
        label: 'Advisor',
      },
      {
        value: 'Option2',
        label: 'Option2',
      },
      {
        value: 'Option3',
        label: 'Option3',
      },
      {
        value: 'Option4',
        label: 'Option4',
      },
      {
        value: 'Option5',
        label: 'Option5',
      },
    ]

    const optionsCompany = [
      {
        value: 'Option1',
        label: 'Option1',
      },
      {
        value: 'Option2',
        label: 'Option2',
      },
      {
        value: 'Option3',
        label: 'Option3',
      },
      {
        value: 'Option4',
        label: 'Option4',
      },
      {
        value: 'Option5',
        label: 'Option5',
      },
    ]

    const { isLoading, isError, data: user, refetch } = useFetchAdminPanelUserById({ enabled: false })

    watchEffect(() => {
      dialogVisible.value = store.state.globalComponents.dialog.showDialog.modalUserProfile
      if (store.state.globalComponents.editUserId !== null) {
        refetch.value()
      }
      if (!isLoading.value && user.value) {
        ruleForm.first_name = user.value.first_name
        ruleForm.last_name = user.value.last_name
      }
    })

    const closeDialog = () => {
      dialogVisible.value = false
      store.commit('globalComponents/setEditUserId', null)
      store.commit('globalComponents/setShowModal', {
        destination: 'modalUserProfile',
        value: false,
      })
    }

    const editUser = () => {
      isEdit.value = !isEdit.value
      // isEdit.value = true
    }

    const confirm = () => {
      console.log('confirm')
      closeDialog()
    }

    const disabledForm = computed(() => {
      if (!ruleForm.role) return true
      return false
    })

    const isShowNpn = computed(() => {
      if (ruleForm.role === 'advisor') return true
      return false
    })

    const isShowPositionTitle = computed(() => {
      if (ruleForm.role === 'advisor') return true
      return false
    })

    return {
      dialogVisible,
      closeDialog,
      Edit,
      isEdit,
      editUser,
      confirm,

      isLoading,
      isError,
      user,
      refetch,

      form,
      ruleForm,
      rules,

      disabledForm,
      isShowNpn,
      isShowPositionTitle,

      optionsRole,
      optionsCompany,
    }
  },
}
</script>
