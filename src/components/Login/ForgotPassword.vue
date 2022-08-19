<template>
  <div class="flex flex-col w-full items-center justify-center">
    <div class="max-w-sm pt-6 pl-6 pr-6 bg-widget-bg rounded-md w-[370px]">
      <div class="flex items-center justify-center mb-2">
        <InlineSvg :src="IrisLogoStandart" width="100" height="40" />
      </div>
      <h1 class="text-center text-main font-medium text-2xl">Forgot password?</h1>
      <h1 class="text-center text-gray03 text-xss">Please enter you email</h1>
      <div v-if="sendFormForgotPass" class="my-5">Please check your email for your IRIS password reset link</div>
      <div v-else>
        <el-form ref="form" :model="ruleForm" :rules="rules" label-position="top" @submit.prevent="submit">
          <el-form-item label="E-mail" prop="email" class="py-3">
            <el-input v-model="ruleForm.email" placeholder="Enter your e-mail" />
          </el-form-item>
          <el-form-item class="my-6">
            <Button :default-primary="!fetching" full text-btn="Continue" :disabled="fetching" type="submit" />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import IrisLogoStandart from '@/assets/svg/iris-logo-standard.svg'
import { rules } from '@/validationRules/login.js'
import { useForgot } from '@/api/authentication/use-forgot'
import { reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ForgotPassword',
  setup() {
    const store = useStore()

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

    const sendFormForgotPass = computed(() => {
      return store.state.auth.sendFormForgotPass
    })

    return {
      response,
      error,
      fetching,
      IrisLogoStandart,
      submit,
      ruleForm,
      form,
      rules,
      sendFormForgotPass,
    }
  },
}
</script>
