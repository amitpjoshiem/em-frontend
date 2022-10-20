<template>
  <div class="flex flex-col w-full items-center justify-center pr-[63px]">
    <div class="form max-w-sm pt-6 pl-6 pr-6 bg-main-gray rounded-md w-[370px]">
      <div class="flex items-center justify-center mb-2">
        <InlineSvg :src="IrisLogoStandart" width="100" height="40" />
      </div>
      <h1 class="text-center text-main font-medium text-2xl">Login</h1>
      <div>
        <h1 v-if="otpTypeEmail" class="text-center text-main pt-2.5 text-sm">
          We just sent you a temporary login code. Please check your inbox.
        </h1>
        <h1 v-if="otpTypeGoogle" class="text-center text-main pt-2.5 text-sm">
          Please check your Google Authenticator.
        </h1>
        <h1 v-if="otpTypePhone" class="text-center text-main pt-2.5 text-sm">Please check your SMS.</h1>
        <el-form ref="form" :model="ruleForm" :rules="rules" label-position="top" @submit.prevent="submit">
          <el-form-item label="OTP" prop="code">
            <el-input v-model="ruleForm.code" placeholder="Enter otp code" autofocus="true" />
          </el-form-item>
          <el-form-item class="my-6">
            <SwdButton primary main :disabled="fetching" class="w-full" @click="submit">
              <SwdSpinner v-show="fetching" class="mr-2" />
              Continue
            </SwdButton>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-if="otpTypeEmail || otpTypePhone" class="flex justify-between w-full pt-3 max-w-sm rounded-md pl-2">
      <span class="text-xss text-main cursor-pointer" @click="getResendOtp">Resend OTP code</span>
    </div>
  </div>
</template>

<script>
import IrisLogoStandart from '@/assets/svg/iris-logo-standard.svg'
import { useStore } from 'vuex'
import { computed, reactive, ref } from 'vue'
import { useOtp } from '@/api/authentication/use-otp'
import { rules } from '@/validationRules/login.js'
import { useAlert } from '@/utils/use-alert'
import { useResendOtp } from '@/api/use-fetch-resend-otp.js'

export default {
  name: 'OtpForm',
  setup() {
    const store = useStore()

    const { response, error, fetching, otpAuth } = useOtp()
    const { isLoading, isError, data, refetch: refetchOtpCode } = useResendOtp({ enabled: false })

    const ruleForm = reactive({
      code: '000000',
    })
    const form = ref(null)

    const otpTypeEmail = computed(() => {
      return store.state.auth.otpType === 'email'
    })

    const otpTypeGoogle = computed(() => {
      return store.state.auth.otpType === 'google'
    })

    const otpTypePhone = computed(() => {
      return store.state.auth.otpType === 'phone'
    })

    const submit = async () => {
      form.value.validate(async (valid) => {
        if (valid) {
          await otpAuth(ruleForm)
        } else {
          return false
        }
      })
    }

    const getResendOtp = async () => {
      refetchOtpCode.value().then((res) => {
        const data = res.data
        if (data.succes) {
          useAlert({
            title: 'Success',
            type: 'success',
            message: 'We just have sent you new login code. Please check your inbox.',
          })
        }
      })
    }

    return {
      response,
      error,
      fetching,
      IrisLogoStandart,
      otpTypeEmail,
      ruleForm,
      form,
      submit,
      rules,
      getResendOtp,
      isLoading,
      isError,
      data,
      refetchOtpCode,
      otpTypeGoogle,
      otpTypePhone,
    }
  },
}
</script>
