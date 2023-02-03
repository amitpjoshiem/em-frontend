<template>
  <el-dialog v-model="dialogVisible" :title="getDialogTitle" :before-close="closeDialog" destroy-on-close>
    <el-form v-if="isShowForm" ref="form" :model="ruleForm" :rules="rules" label-position="top">
      <el-form-item label="Current password" prop="current_password" class="mb-4">
        <el-input
          v-model="ruleForm.current_password"
          type="password"
          autocomplete="off"
          placeholder="Please input current password"
          show-password
        />
      </el-form-item>

      <el-form-item label="New Password" prop="password" class="mb-4">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
          placeholder="Please input new password"
          show-password
        />
      </el-form-item>

      <el-form-item label="Confirm new password" prop="password_confirmation">
        <el-input
          v-model="ruleForm.password_confirmation"
          type="password"
          autocomplete="off"
          placeholder="Please input confirm password"
          show-password
        />
      </el-form-item>
    </el-form>
    <SwdDialogSucces v-else text="The password was succesfully changed!" @closeDialog="closeDialog" />
    <template #footer>
      <span class="dialog-footer">
        <div class="flex justify-end">
          <el-button @click="closeDialog">Cancel</el-button>
          <SwdButton class="ml-4" primary main @click="savePass">Save</SwdButton>
        </div>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import SwdDialogSucces from '@/components/Global/SwdDialogSucces.vue'
import { useChangePassword } from '@/api/authentication/use-change-password'
import { ref, reactive, watchEffect, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ChangePassword',
  components: {
    SwdDialogSucces,
  },
  setup() {
    const dialogVisible = ref(false)
    const form = ref(null)
    const isShowForm = ref(true)
    const store = useStore()
    const { response, error, fetching, changePassword } = useChangePassword()

    const ruleForm = reactive({
      current_password: '',
      password: '',
      password_confirmation: '',
    })

    watchEffect(() => {
      dialogVisible.value = store.state.globalComponents.dialog.showDialog.changePassword
    })

    const savePass = async (e) => {
      e.preventDefault()
      form.value.validate(async (valid) => {
        if (valid) {
          changePassword(ruleForm)
            .then(() => {
              isShowForm.value = false
            })
            .catch((error) => {
              console.log(error)
            })
        }
      })
    }

    const closeDialog = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'changePassword',
        value: false,
      })
    }

    const getDialogTitle = computed(() => {
      if (isShowForm.value) return 'Change password'
      return 'Succes'
    })

    const validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== ruleForm.password_confirmation) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }

    const rules = {
      current_password: [
        { type: 'string', required: true, message: 'Please input current current password' },
        { min: 6, message: 'Length should be min 6', trigger: 'blur' },
      ],
      password: [
        { type: 'string', required: true, message: 'Please input correct password' },
        { min: 6, message: 'Length should be min 6', trigger: 'blur' },
      ],
      password_confirmation: [
        { type: 'string', required: true, message: 'Please input correct password confirmation' },
        { validator: validateCheckPass, trigger: 'blur' },
      ],
    }

    return {
      response,
      error,
      fetching,
      changePassword,
      savePass,
      ruleForm,
      form,
      rules,
      isShowForm,
      closeDialog,
      getDialogTitle,
      dialogVisible,
    }
  },
}
</script>
