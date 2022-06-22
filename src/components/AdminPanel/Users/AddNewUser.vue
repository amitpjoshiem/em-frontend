<template>
  <el-dialog v-model="dialogFormVisible" title="Add user" width="50%" :before-close="closeDialog" destroy-on-close>
    <el-scrollbar height="350px">
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
          <el-input v-model="ruleForm.npn" autocomplete="off" :disabled="disabledForm" placeholder="Enter NPN" />
        </el-form-item>
        <el-form-item v-if="isShowPositionTitle" label="Position Title" class="mb-4" prop="position_title">
          <el-input
            v-model="ruleForm.position_title"
            autocomplete="off"
            :disabled="disabledForm"
            placeholder="Enter position title"
          />
        </el-form-item>
      </el-form>
    </el-scrollbar>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">Cancel</el-button>
        <el-button type="primary" @click="confirm">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, reactive, watchEffect, computed } from 'vue'
import { rules } from '@/validationRules/modalAddCompany'
import { useAlert } from '@/utils/use-alert'
import { useStore } from 'vuex'
import { maska } from 'maska'
import { ElMessageBox } from 'element-plus'

export default {
  name: 'AddNewUser',
  directives: { maska },
  setup() {
    const store = useStore()

    const dialogFormVisible = ref(false)
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

    watchEffect(() => {
      dialogFormVisible.value = store.state.globalComponents.dialog.showDialog.modalAddNewUser
    })

    const confirm = (e) => {
      e.preventDefault()

      form.value.validate(async (valid) => {
        if (valid) {
          // const res = await createAssetsConsolidationTable({ id: memberId, form: ruleForm })
          // if (!('error' in res)) {
          useAlert({
            title: 'Success',
            type: 'success',
            message: 'Company created',
          })
          dialogFormVisible.value = false

          // closeDialog()
          // queryClient.invalidateQueries(['AsetsConsolidationsMember', memberId])
          // }
        } else {
          return false
        }
      })
    }

    const closeDialog = () => {
      if (ruleForm.role || ruleForm.company) {
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
      store.commit('globalComponents/setShowModal', {
        destination: 'modalAddNewUser',
        value: false,
      })
      initialState()
    }

    const initialState = () => {
      ruleForm.first_name = ''
      ruleForm.last_name = ''
      ruleForm.email = ''
      ruleForm.role = ''
      ruleForm.company = ''
      ruleForm.npn = ''
      ruleForm.position_title = ''
      ruleForm.username = ''
      dialogFormVisible.value = false
    }

    return {
      dialogFormVisible,
      form,
      ruleForm,
      rules,
      confirm,
      optionsRole,
      optionsCompany,
      disabledForm,
      isShowNpn,
      isShowPositionTitle,
      closeDialog,
    }
  },
}
</script>
