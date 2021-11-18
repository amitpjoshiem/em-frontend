<template>
  <div class="flex flex-col w-full items-center justify-center">
    <div class="max-w-sm pt-6 pl-6 pr-6 bg-widget-bg rounded-md w-[370px]">
      <div class="flex items-center justify-center p-2">
        <div class="rounded-full h-10 w-10 flex items-center justify-center bg-lightgray03">
          <InlineSvg :src="IconForgotPassword" />
        </div>
      </div>

      <h1 class="text-center text-main font-medium text-2xl">Forgot password?</h1>
      <h1 class="text-center text-gray03 text-xss">Please enter you email</h1>
      <div v-if="!sendFormForgotPass">
        <el-form ref="form" :model="ruleForm" status-icon :rules="rules" label-position="top" @submit.prevent="submit">
          <el-form-item label="E-mail" prop="email" class="py-3">
            <el-input v-model="ruleForm.email" placeholder="Enter your e-mail" />
          </el-form-item>
          <el-form-item>
            <Button :default-primary="!fetching" full text-btn="Continue" :disabled="fetching" type="submit" />
          </el-form-item>
        </el-form>
      </div>
      <div v-else class="my-5">{{ response.message }}</div>
    </div>
  </div>
</template>

<script>
import IconForgotPassword from '@/assets/svg/icon-forgot-password.svg'
import { rules } from '@/validationRules/login.js'
import { useForgot } from '@/api/authentication/use-forgot'
import { mapState } from 'vuex'
import { reactive, ref } from 'vue'

export default {
  name: 'ForgotPassword',
  setup() {
    const ruleForm = reactive({
      email: '',
    })
    const form = ref(null)

    const { response, error, fetching, forgot } = useForgot()

    const submit = async () => {
      form.value.validate((valid) => {
        if (valid) {
          forgot(ruleForm)
        } else {
          return false
        }
      })
    }

    return {
      response,
      error,
      fetching,
      IconForgotPassword,
      submit,
      ruleForm,
      form,
      rules,
    }
  },
  computed: mapState({
    sendFormForgotPass: (state) => state.auth.sendFormForgotPass,
  }),
}
</script>
