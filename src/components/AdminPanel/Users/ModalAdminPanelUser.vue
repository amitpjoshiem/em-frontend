<template>
  <el-dialog v-model="dialogFormVisible" :title="getTitle" width="50%" :before-close="closeDialog" destroy-on-close>
    <el-scrollbar height="350px">
      <el-form ref="form" :model="ruleForm" label-position="top" :rules="rules" class="pr-4">
        <div class="flex justify-between mb-4">
          <el-form-item label="Role" class="w-6/12 pr-2" prop="role">
            <el-select v-model="ruleForm.role" placeholder="Select role" class="w-full" :loading="isLoadingInit">
              <el-option v-for="item in optionsRole" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>

          <el-form-item label="Company" class="w-6/12 pl-2" prop="company_id">
            <el-select
              v-model="ruleForm.company_id"
              placeholder="Select company"
              class="w-full"
              :loading="isLoadingInit"
              @change="handleCompany()"
            >
              <el-option v-for="item in optionsCompany" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </div>

        <el-form-item label="First name" class="mb-4" prop="first_name">
          <el-input
            v-model="ruleForm.first_name"
            autocomplete="off"
            :disabled="disabledForm"
            placeholder="Enter first name"
          />
        </el-form-item>
        <el-form-item label="Last name" class="mb-4" prop="last_name">
          <el-input
            v-model="ruleForm.last_name"
            autocomplete="off"
            :disabled="disabledForm"
            placeholder="Enter last name"
          />
        </el-form-item>
        <el-form-item label="Email" class="mb-4" prop="email">
          <el-input v-model="ruleForm.email" autocomplete="off" :disabled="disabledForm" placeholder="Enter email" />
        </el-form-item>
        <el-form-item label="Username" class="mb-4" prop="username">
          <el-input
            v-model="ruleForm.username"
            autocomplete="off"
            :disabled="disabledForm"
            placeholder="Enter Username"
          />
        </el-form-item>
        <el-form-item label="Phone" class="mb-4" prop="phone">
          <el-input
            v-model="ruleForm.phone"
            v-maska="'(###) ###-####'"
            placeholder="Enter phone number"
            :disabled="disabledForm"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item v-if="isShowNpn" label="NPN" class="mb-4" prop="npn">
          <el-input
            v-model="ruleForm.npn"
            type="number"
            autocomplete="off"
            :disabled="disabledForm"
            placeholder="Enter NPN"
          />
        </el-form-item>
        <el-form-item v-if="isShowPositionTitle" label="Position Title" class="mb-4" prop="position">
          <el-input
            v-model="ruleForm.position"
            autocomplete="off"
            :disabled="disabledForm"
            placeholder="Enter position title"
          />
        </el-form-item>

        <el-form-item v-if="isShowSelectAdvisors" label="Advisors" prop="advisors">
          <el-select-v2
            v-model="ruleForm.advisors"
            class="w-full"
            :disabled="disabledForm"
            :options="optionsAdvisors"
            placeholder="Please select advisors"
            multiple
          />
        </el-form-item>
      </el-form>
    </el-scrollbar>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">Cancel</el-button>
        <el-button
          type="primary"
          :disabled="isLoadingCreate"
          :loading="isLoadingCreate"
          class="w-[100px]"
          @click="confirm"
        >
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, reactive, watchEffect, computed } from 'vue'
import { useStore } from 'vuex'
import { rules } from '@/validationRules/modalAddAdminPanelUser'
import { useAlert } from '@/utils/use-alert'
import { maska } from 'maska'
import { ElMessageBox } from 'element-plus'
import { useMutation, useQueryClient } from 'vue-query'
import { createAdminPanelUsers } from '@/api/vueQuery/admin-panel/create-admin-panel-users'
import { updateAdminPanelUser } from '@/api/vueQuery/admin-panel/update-admin-panel-user'
import { useFetchAdminPanelRolesCompanies } from '@/api/admin-panel/use-fetch-admin-panel-roles-companies.js'
import { useFetchAdminPanelAdvisorsByCompany } from '@/api/admin-panel/use-fetch-admin-panel-advisors-by-company.js'

export default {
  name: 'ModalAdminPanelUser',
  directives: { maska },
  setup() {
    const store = useStore()
    const queryClient = useQueryClient()
    const isEditModal = ref(false)

    const ruleForm = reactive({
      first_name: '',
      last_name: '',
      email: '',
      role: '',
      company_id: '',
      npn: '',
      position: '',
      username: '',
      phone: '',
      advisors: [],
    })

    const {
      isLoading: isLoadingInit,
      data: init,
      refetch: refetchInit,
    } = useFetchAdminPanelRolesCompanies({ enabled: false })

    const {
      isLoading: isLoadingAdvisors,
      data: advisors,
      refetch: refetchAdvisors,
    } = useFetchAdminPanelAdvisorsByCompany({ enabled: false })

    const { isLoading: isLoadingCreate, mutateAsync: createUser } = useMutation(createAdminPanelUsers)

    const { mutateAsync: updateUser } = useMutation(updateAdminPanelUser)

    const dialogFormVisible = ref(false)
    const form = ref(null)
    const optionsRole = ref([])
    const optionsCompany = ref([])
    const optionsAdvisors = ref([])

    const disabledForm = computed(() => {
      if (!ruleForm.role || !ruleForm.company_id) return true
      return false
    })

    const isShowNpn = computed(() => {
      const idAdvisorRole = init.value.roles.find((item) => item.name === 'advisor').id
      if (ruleForm.role === idAdvisorRole) return true
      return false
    })

    const isShowPositionTitle = computed(() => {
      const idCeoRole = init.value.roles.find((item) => item.name === 'ceo').id
      const idAdminRole = init.value.roles.find((item) => item.name === 'admin').id
      if (ruleForm.role !== idCeoRole && ruleForm.role !== idAdminRole) return true
      return false
    })

    const isShowSelectAdvisors = computed(() => {
      const idAssistantRole = init.value.roles.find((item) => item.name === 'assistant').id
      if (ruleForm.role === idAssistantRole) return true
      return false
    })

    watchEffect(() => {
      dialogFormVisible.value = store.state.adminPanelUsers.dialog.showDialog.modalAddNewUser

      if (dialogFormVisible.value) {
        refetchInit.value()
      }

      if (store.state.adminPanelUsers.editUser) {
        isEditModal.value = true
        const user = store.state.adminPanelUsers.editUser
        setInitValue(user)
      }

      if (!isLoadingInit.value && init.value) {
        optionsRole.value = init.value.roles.map((item) => {
          return { label: item.display_name, value: item.id }
        })
        optionsCompany.value = init.value.companies.map((item) => {
          return { label: item.name, value: item.id }
        })
      }
    })

    const confirm = (e) => {
      e.preventDefault()
      form.value.validate(async (valid) => {
        if (valid) {
          let res = null
          if (isEditModal.value) {
            res = await updateUser({ id: store.state.adminPanelUsers.editUser.id, data: ruleForm })
          } else {
            res = await createUser(ruleForm)
          }
          if (!('error' in res)) {
            useAlert({
              title: 'Success',
              type: 'success',
              message: isEditModal.value ? 'User update' : 'User created',
            })
            queryClient.invalidateQueries(['admin-panel-users'])
            dialogFormVisible.value = false
            doneCloceDialog()
          }
        } else {
          return false
        }
      })
    }

    const closeDialog = () => {
      if (ruleForm.role || ruleForm.company_id) {
        ElMessageBox.confirm('Are you sure to close this dialog?')
          .then(() => {
            doneCloceDialog()
          })
          .catch(() => {})
      } else {
        doneCloceDialog()
      }
    }

    const doneCloceDialog = () => {
      store.commit('adminPanelUsers/setShowModal', {
        destination: 'modalAddNewUser',
        value: false,
      })
      store.commit('adminPanelUsers/setEditUser', null)
      isEditModal.value = false
      initialState()
    }

    const initialState = () => {
      ruleForm.first_name = ''
      ruleForm.last_name = ''
      ruleForm.email = ''
      ruleForm.role = ''
      ruleForm.company_id = ''
      ruleForm.npn = ''
      ruleForm.position = ''
      ruleForm.username = ''
      ruleForm.advisors = []
      dialogFormVisible.value = false
    }

    const getTitle = computed(() => {
      if (isEditModal.value) return 'Edit user'
      return 'Add user'
    })

    const setOptionsAdvisors = async () => {
      await refetchAdvisors.value()
      optionsAdvisors.value = advisors.value.map((item) => {
        return { label: item.last_name + ' ' + item.first_name, value: item.id }
      })
    }

    const handleCompany = async () => {
      await store.commit('adminPanelUsers/setCurrentCompanyId', ruleForm.company_id)
      await setOptionsAdvisors()
    }

    const setInitValue = async (user) => {
      if (user.company.id) {
        await store.commit('adminPanelUsers/setCurrentCompanyId', user.company.id)
        await setOptionsAdvisors()
      }
      if (user.roles[0].name === 'assistant') {
        ruleForm.advisors = user.advisors.map((item) => item.id)
      }
      ruleForm.first_name = user.first_name
      ruleForm.last_name = user.last_name
      ruleForm.email = user.email
      ruleForm.role = user.roles[0].id
      ruleForm.company_id = user.company.id
      ruleForm.npn = user.npn
      ruleForm.position = user.position
      ruleForm.username = user.username
      ruleForm.phone = user.phone
    }

    return {
      dialogFormVisible,
      form,
      ruleForm,
      rules,
      confirm,
      optionsRole,
      optionsCompany,
      optionsAdvisors,
      disabledForm,
      isShowNpn,
      isShowPositionTitle,
      isShowSelectAdvisors,
      closeDialog,
      isLoadingInit,
      init,
      refetchInit,
      createUser,
      isLoadingCreate,
      isEditModal,
      getTitle,
      isLoadingAdvisors,
      advisors,
      refetchAdvisors,
      handleCompany,
    }
  },
}
</script>
