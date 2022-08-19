<template>
  <div class="flex flex-col w-full items-center justify-center">
    <div class="max-w-sm pt-6 pl-6 pr-6 bg-widget-bg rounded-md w-[370px]">
      <div class="flex items-center justify-center mb-2">
        <InlineSvg :src="IrisLogoStandart" width="100" height="40" />
      </div>
      <h1 class="text-center text-main font-medium text-2xl">Create a new password</h1>
      <div class="py-5">
        <el-form ref="form" :model="ruleForm" :rules="rules" label-position="top" @submit.prevent="submit">
          <el-form-item label="Password" prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"
              placeholder="Please input password"
            />
          </el-form-item>
          <el-form-item label="Confirm" prop="password_confirmation" class="mt-2">
            <el-input
              v-model="ruleForm.password_confirmation"
              type="password"
              autocomplete="off"
              placeholder="Please input password"
            />
          </el-form-item>
          <el-form-item class="my-6">
            <Button
              :default-primary="!fetchingCreate && !fetchingReset"
              full
              text-btn="Continue"
              type="Submit"
              :disabled="fetchingCreate || fetchingReset"
            />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import IrisLogoStandart from '@/assets/svg/iris-logo-standard.svg'
import { reactive, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCreatePassword } from '@/api/authentication/use-create-password'
import { useResetPassword } from '@/api/authentication/use-reset-password'

export default {
  name: 'ResetPassword',
  setup(_, { attrs }) {
    const { fetchingCreate, createPassword } = useCreatePassword()
    const { fetchingReset, resetPassword } = useResetPassword()
    const route = useRoute()

    const data = reactive({
      email: '',
      token: '',
    })

    const ruleForm = reactive({
      password: '',
      password_confirmation: '',
    })
    const form = ref(null)

    onMounted(() => {
      data.email = route.query.email
      data.token = route.query.token
    })

    const submit = async () => {
      form.value.validate((valid) => {
        if (valid) {
          if (attrs.context === 'reset') {
            resetPassword({ ...ruleForm, ...data })
            return
          }
          createPassword({ ...ruleForm, ...data })
        } else {
          return false
        }
      })
    }

    const validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== ruleForm.password) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }

    const rules = {
      password: [
        { type: 'string', required: true, message: 'Please input password' },
        { min: 6, message: 'Length should be min 6', trigger: 'blur' },
      ],
      password_confirmation: [
        { type: 'string', required: true, message: 'Please input password' },
        { validator: validateCheckPass, trigger: 'blur' },
      ],
    }

    return {
      data,
      route,
      IrisLogoStandart,
      ruleForm,
      form,
      submit,
      rules,
      fetchingCreate,
      fetchingReset,
    }
  },
}
</script>
