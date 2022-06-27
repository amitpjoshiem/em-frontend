<template>
  <el-dialog v-model="dialogVisible" :title="getTitle" :before-close="closeDialog">
    <el-form ref="form" :model="ruleForm" label-position="top" :rules="rules">
      <el-form-item label="Name" class="mb-4" prop="name">
        <el-input v-model="ruleForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Domain" prop="domain">
        <el-input v-model="ruleForm.domain" autocomplete="off" />
      </el-form-item>
    </el-form>
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
import { useAlert } from '@/utils/use-alert'
import { rules } from '@/validationRules/modalAddCompany'
import { useStore } from 'vuex'
import { ElMessageBox } from 'element-plus'

import { createAdminPanelCompanies } from '@/api/vueQuery/admin-panel/create-admin-panel-company'
import { updateAdminPanelCompany } from '@/api/vueQuery/admin-panel/update-admin-panel-company'

import { useMutation, useQueryClient } from 'vue-query'

export default {
  name: 'ModalAdminPanelCompany',
  setup() {
    const store = useStore()
    const dialogVisible = ref(false)
    const form = ref(null)
    const isEditModal = ref(false)
    const queryClient = useQueryClient()

    const ruleForm = reactive({
      name: '',
      domain: '',
    })

    const { isLoading: isLoadingCreate, mutateAsync: createCompany } = useMutation(createAdminPanelCompanies)
    const { mutateAsync: updateCompany } = useMutation(updateAdminPanelCompany)

    watchEffect(() => {
      dialogVisible.value = store.state.adminPanelUsers.dialog.showDialog.modalCompany

      if (store.state.adminPanelUsers.editCompany) {
        isEditModal.value = true
        const company = store.state.adminPanelUsers.editCompany
        setInitValue(company)
      }
    })

    const confirm = (e) => {
      e.preventDefault()

      form.value.validate(async (valid) => {
        if (valid) {
          let res = null
          if (isEditModal.value) {
            res = await updateCompany({ id: store.state.adminPanelUsers.editCompany.id, data: ruleForm })
          } else {
            res = await createCompany(ruleForm)
          }
          if (!('error' in res)) {
            useAlert({
              title: 'Success',
              type: 'success',
              message: isEditModal.value ? 'Company update' : 'Company created',
            })
            doneCloceDialog()
            queryClient.invalidateQueries(['admin-panel-companies'])
          }
        } else {
          return false
        }
      })
    }

    const closeDialog = () => {
      console.log('closeDialog')
      if (ruleForm.name || ruleForm.domain) {
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
        destination: 'modalCompany',
        value: false,
      })
      store.commit('adminPanelUsers/setEditCompany', null)
      isEditModal.value = false
      initialState()
    }

    const initialState = () => {
      ruleForm.name = ''
      ruleForm.domain = ''
      dialogVisible.value = false
    }

    const setInitValue = (company) => {
      ruleForm.name = company.name
      ruleForm.domain = company.domain
    }

    const getTitle = computed(() => {
      if (isEditModal.value) return 'Edit company'
      return 'Add company'
    })

    return {
      rules,
      form,
      ruleForm,
      confirm,
      closeDialog,
      dialogVisible,
      isEditModal,

      isLoadingCreate,
      getTitle,
    }
  },
}
</script>
