<template>
  <div class="flex py-5">
    <div class="w-10/12 text-xss text-main font-medium">SMS Authenticator</div>
    <div class="w-2/12 flex justify-between">
      <el-switch v-model="smsOtp" :loading="loadingPhone" :before-change="changePhoneOtp" />
    </div>
  </div>

  <div class="flex py-5">
    <div class="w-10/12 text-xss text-main font-medium">Google Authenticator</div>
    <div class="w-2/12 flex justify-between">
      <el-switch v-model="googleOtp" :loading="loadingGoogle" :before-change="beforeChange" />
    </div>
  </div>

  <div v-if="response && response.data" class="mt-5">
    <div v-show="showForm" class="w-5/12">
      <img ref="qrCode" :src="response.data.url" class="pb-5" />
      <el-form ref="form" :model="ruleForm" state-icon label-position="top">
        <el-form-item label="Code" prop="code" class="w-full">
          <el-input v-model="ruleForm.code" placeholder="Enter OTP code" />
        </el-form-item>
        <div class="pt-3 text-right">
          <Button default-blue-btn text-btn="Save" @click="saveOtp" />
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted } from 'vue'
import { useGoogleQr } from '@/api/use-google-qr'
import { useOtpsChange } from '@/api/use-otps-change'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useAlert } from '@/utils/use-alert'

export default {
  name: 'TwoFA',
  setup() {
    const store = useStore()
    const { response, error, fetching, getGoogleQr } = useGoogleQr()
    const { otpsChange } = useOtpsChange()
    const qrCode = ref(null)
    const form = ref(null)

    const ruleForm = reactive({
      code: '',
      googleOtp: false,
      smsOtp: false,
      loadingGoogle: false,
      loadingPhone: false,
    })

    const state = reactive({
      googleOtp: false,
      smsOtp: false,
      loadingGoogle: false,
      loadingPhone: false,
    })

    onMounted(() => {
      if (store.state.auth.otpType === 'google') state.googleOtp = true
      if (store.state.auth.otpType === 'phone') state.smsOtp = true
    })

    const beforeChange = () => {
      state.loadingGoogle = true
      if (!state.googleOtp) {
        return new Promise((resolve) => {
          return getGoogleQr().then(() => {
            qrCode.value.addEventListener('load', () => {
              state.loadingGoogle = false
            })
            return resolve(true)
          })
        })
      } else {
        return new Promise((resolve) => {
          otpsChange({ service: 'email' })
          state.loadingGoogle = false
          return resolve(true)
        })
      }
    }

    const saveOtp = async (e) => {
      e.preventDefault()
      otpsChange({ service: 'google', code: ruleForm.code })
        .then(() => {
          useAlert({
            title: 'Success',
            type: 'success',
            message: 'OTP has been changed successfully.',
          })
          state.smsOtp = false
        })
        .catch((error) => {
          console.error(error)
        })
    }

    const otpType = computed(() => {
      return store.state.auth.otpType
    })

    const showForm = computed(() => {
      return !state.loadingGoogle && otpType.value !== 'google' && state.googleOtp
    })

    const changePhoneOtp = () => {
      otpsChange({ service: state.smsOtp ? 'email' : 'phone' })
        .then(() => {
          useAlert({
            title: 'Success',
            type: 'success',
            message: 'OTP has been changed successfully.',
          })
          state.smsOtp = true
          state.googleOtp = false
        })
        .catch((error) => {
          console.error(error)
        })
    }

    return {
      ...toRefs(state),
      beforeChange,
      response,
      error,
      fetching,
      getGoogleQr,
      qrCode,
      otpType,
      showForm,
      ruleForm,
      form,
      saveOtp,
      changePhoneOtp,
    }
  },
}
</script>
