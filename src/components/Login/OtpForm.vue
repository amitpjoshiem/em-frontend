<template>
  <div class="flex flex-col w-full items-center justify-center">
    <div class="form max-w-sm p-6 bg-widget-bg rounded-md w-[370px]">
      <div class="flex items-center justify-center p-2">
        <div
          class="
            rounded-full
            h-10
            w-10
            flex
            items-center
            justify-center
            bg-lightgray03
          "
        >
          <InlineSvg :src="IconLoginForm" />
        </div>
      </div>

      <h1 class="text-center text-main font-medium text-2xl">Login</h1>

      <div>
        <h1
          v-if="otpType === 'email'"
          class="text-center text-gray03 pt-2.5 text-sm"
        >
          We just sent you a temporary login code. Please check your inbox.
        </h1>
        <h1
          v-if="otpType === 'google'"
          class="text-center text-gray03 pt-2.5 text-sm"
        >
          Please check your Google Authenticator.
        </h1>
        <el-form
          ref="form"
          :model="ruleForm"
          :rules="rules"
          class="demo-ruleForm"
          label-position="top"
        >
          <el-form-item label="OTP" prop="code" class="py-3">
            <el-input v-model="ruleForm.code" placeholder="Enter otp code" />
          </el-form-item>
        </el-form>
        <div class="text-center pt-5">
          <Button
            :default-primary="!fetching"
            full
            :text-btn="'Continue'"
            :disabled="fetching"
            @click="submitForm('ruleForm')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconLoginForm from '@/assets/svg/icon-login-form.svg'
import { useStore } from 'vuex'
import { computed, reactive, ref } from 'vue'
import { useOtp } from '@/api/authentication/use-otp'
import { rules } from '@/validationRules/login.js'

export default {
  name: 'OtpForm',
  setup() {
    const store = useStore()
    const { response, error, fetching, otpAuth } = useOtp()

    const ruleForm = reactive({
      code: '',
    })
    const form = ref(null)

    const otpType = computed(() => {
      return store.state.auth.otpType
    })

    const submitForm = async () => {
      form.value.validate((valid) => {
        if (valid) {
          otpAuth(ruleForm)
        } else {
          return false
        }
      })
    }

    return {
      response,
      error,
      fetching,
      IconLoginForm,
      otpType,
      ruleForm,
      form,
      submitForm,
      rules,
    }
  },
}
</script>
