<template>
  <el-dialog v-model="dialogFormVisible" title="Delete user" width="50%" :before-close="closeDialog" destroy-on-close>
    <el-form v-if="needTransfer" ref="form" :model="ruleForm" label-position="top" :rules="rules" class="pr-4">
      <div class="flex justify-between mb-4">
        <el-form-item label="Data transfered to:" class="w-6/12 pl-2">
          <el-select v-model="ruleForm.transfer_to" filterable placeholder="Select" :loading="isLoadingAdvisors">
            <el-option v-for="item in optionsAdvisors" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </div>
    </el-form>
    <div v-else>
      <span>Are you sure to delete?</span>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">Cancel</el-button>
        <el-button
          type="primary"
          :disabled="isLoadingDeleteUser"
          :loading="isLoadingDeleteUser"
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
import { useMutation, useQueryClient } from 'vue-query'
import { useFetchAdminPanelAdvisorsByCompany } from '@/api/admin-panel/use-fetch-admin-panel-advisors-by-company.js'
import { deleteAdminPanelUsers } from '@/api/vueQuery/admin-panel/delete-admin-panel-user'

export default {
  name: 'ModalDeleteAdminPanelUser',
  directives: { maska },
  setup() {
    const store = useStore()
    const queryClient = useQueryClient()
    const dialogFormVisible = ref(false)
    const deleteUser = ref(null)
    const form = ref(null)
    const optionsAdvisors = ref([])

    const ruleForm = reactive({
      transfer_to: '',
    })

    const {
      isLoading: isLoadingAdvisors,
      data: advisors,
      refetch: refetchAdvisors,
    } = useFetchAdminPanelAdvisorsByCompany({ enabled: false })

    const { mutateAsync: handleDeleteUser, isLoading: isLoadingDeleteUser } = useMutation(deleteAdminPanelUsers)

    watchEffect(async () => {
      dialogFormVisible.value = store.state.adminPanelUsers.dialog.showDialog.modalDeleteUser
      deleteUser.value = store.state.adminPanelUsers.deleteUser

      if (deleteUser.value) {
        await store.commit('adminPanelUsers/setCurrentCompanyId', deleteUser.value.company.id)
        await refetchAdvisors.value()
        advisors.value.forEach((element) => {
          if (element.id !== deleteUser.value.id) {
            optionsAdvisors.value.push({ label: element.last_name + ' ' + element.first_name, value: element.id })
          }
        })
      }
    })

    const confirm = (e) => {
      e.preventDefault()
      if (needTransfer.value) {
        deleteWithTransfer()
      } else {
        deleteWithoutTransfer()
      }
    }

    const deleteWithTransfer = () => {
      form.value.validate(async (valid) => {
        if (valid) {
          const data = { transfer_to: ruleForm.transfer_to }
          const res = await handleDeleteUser({ id: deleteUser.value.id, data })
          if (!('error' in res)) {
            succesDelete()
          }
        } else {
          return false
        }
      })
    }

    const deleteWithoutTransfer = async () => {
      const res = await handleDeleteUser({ id: deleteUser.value.id })
      if (!('error' in res)) {
        succesDelete()
      }
    }

    const succesDelete = () => {
      useAlert({
        title: 'Success',
        type: 'success',
        message: 'Delete completed',
      })
      queryClient.invalidateQueries(['admin-panel-users'])
      closeDialog()
    }

    const needTransfer = computed(() => {
      return deleteUser.value.roles[0].name === 'advisor'
    })

    const closeDialog = () => {
      store.commit('adminPanelUsers/setShowModal', {
        destination: 'modalDeleteUser',
        value: false,
      })
      initialState()
    }

    const initialState = () => {
      ruleForm.transfer_to = ''
      dialogFormVisible.value = false
      optionsAdvisors.value = []
    }

    return {
      dialogFormVisible,
      form,
      ruleForm,
      rules,
      confirm,

      optionsAdvisors,
      closeDialog,

      isLoadingAdvisors,
      advisors,
      refetchAdvisors,
      needTransfer,

      deleteWithTransfer,
      deleteWithoutTransfer,

      isLoadingDeleteUser,
    }
  },
}
</script>
