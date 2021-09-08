<template>
  <div class="pl-24 pt-14 text-main w-10/12">
    <div class="flex py-5">
      <div class="w-10/12 text-xss text-main font-medium">Google Authenticator</div>
      <div class="w-2/12 flex justify-between">
        <el-switch v-model="value" :loading="loading" :before-change="beforeChange" />
      </div>
    </div>

    <div v-if="response && response.data" class="mt-5">
      <div v-show="showForm" class="w-5/12">
        <img ref="qrCode" :src="response.data.url" class="pb-5" />
        <el-form ref="form" :model="ruleForm" status-icon label-position="top">
          <el-form-item label="Code" prop="code" class="w-full">
            <el-input v-model="ruleForm.code" placeholder="Enter OTP code" />
          </el-form-item>
          <div class="pt-3 text-right">
            <Button default-blue-btn text-btn="Save" @click="saveOtp" />
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted } from 'vue'
import { useGoogleQr } from '@/api/use-google-qr'
import { useVerifyGoogle } from '@/api/use-verify-google'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useAlert } from '@/utils/use-alert'

export default {
  setup() {
    const store = useStore()
    const { response, error, fetching, getGoogleQr } = useGoogleQr()
    const { verifyGoogle } = useVerifyGoogle()
    const qrCode = ref(null)
    const form = ref(null)

    const ruleForm = reactive({
      code: '',
      value: false,
      loading: false,
    })

    const status = reactive({
      value: false,
      loading: false,
    })

    onMounted(() => {
      status.value = !!(store.state.auth.otpType === 'google')
    })

    const beforeChange = () => {
      status.loading = true
      if (!status.value) {
        return new Promise((resolve) => {
          return getGoogleQr().then(() => {
            qrCode.value.addEventListener('load', () => {
              status.loading = false
            })
            return resolve(true)
          })
        })
      } else {
        return new Promise((resolve) => {
          verifyGoogle({ service: 'email' })
          status.loading = false
          return resolve(true)
        })
      }
    }

    const saveOtp = async (e) => {
      e.preventDefault()
      verifyGoogle({ service: 'google', code: ruleForm.code })
        .then(() => {
          useAlert({
            title: 'Success',
            type: 'success',
            message: 'OTP has been changed successfully.',
          })
        })
        .catch((error) => {
          console.error(error)
        })
    }

    const otpType = computed(() => {
      return store.state.auth.otpType
    })

    const showForm = computed(() => {
      return !status.loading && otpType.value !== 'google' && status.value
    })

    return {
      ...toRefs(status),
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
    }
  },
}
</script>
