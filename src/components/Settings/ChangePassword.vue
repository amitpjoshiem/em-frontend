<template>
  <SwdDialog title="Change password" confirm-action="changePassword" destination-dialog="changePassword">
    <template #buttonDialog>
      <div class="flex items-center">
        <InlineSvg :src="IconPencil" class="mb-1" />
      </div>
    </template>
    <template #contentDialog>
      <el-form v-if="data.isShowForm" ref="form" :model="ruleForm" status-icon :rules="rules" label-position="top">
        <el-form-item label="Current password" prop="current_password">
          <el-input
            v-model="ruleForm.current_password"
            type="password"
            autocomplete="off"
            placeholder="Please input password"
          />
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
        </el-form-item>

        <el-form-item label="Confirm" prop="password_confirmation">
          <el-input
            v-model="ruleForm.password_confirmation"
            type="password"
            autocomplete="off"
            placeholder="Please input password"
          />
        </el-form-item>

        <div class="pt-3 text-right">
          <Button default-blue-btn text-btn="Save" @click="savePass" />
        </div>
      </el-form>
      <SwdDialogSucces v-else text="The password was succesfully changed!" @closeDialog="closeDialog" />
    </template>
  </SwdDialog>
</template>
<script>
import IconPencil from '@/assets/svg/icon-pencil.svg'
import SwdDialogSucces from '@/components/Global/SwdDialogSucces.vue'
import { useChangePassword } from '@/api/authentication/use-change-password'
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ChangePassword',
  components: {
    SwdDialogSucces,
  },
  setup() {
    const store = useStore()
    const { response, error, fetching, changePassword } = useChangePassword()

    const ruleForm = reactive({
      current_password: '',
      password: '',
      password_confirmation: '',
    })
    const form = ref(null)

    const data = reactive({
      isShowForm: true,
    })

    const savePass = async (e) => {
      e.preventDefault()
      changePassword(ruleForm)
        .then(() => {
          data.isShowForm = false
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const closeDialog = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'changePassword',
        value: false,
      })
    }

    const getDialogTitle = computed(() => {
      if (data.isShowForm) return 'Change name'
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
      IconPencil,
      savePass,
      ruleForm,
      form,
      rules,
      data,
      closeDialog,
      getDialogTitle,
    }
  },
}
</script>
