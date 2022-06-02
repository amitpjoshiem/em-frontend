<template>
  <div class="flex py-5">
    <div class="w-10/12 text-xss text-main font-medium">Enabled TwoFa</div>
    <div class="w-2/12 flex justify-between">
      <el-switch
        v-model="statusOtp"
        inline-prompt
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="Y"
        inactive-text="N"
        :loading="loading"
        :before-change="beforeChange"
      />
    </div>
  </div>

  <TwoFA v-if="statusOtp" />

  <el-dialog v-model="dialogVisible" title="OTP verification" width="50%">
    <span>
      You are going to disable OTP verification for logging in to the platform. Note, that OTP verification is extra
      layer of security beyond your username and password.
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">Cancel</el-button>
        <el-button type="primary" @click="confirm">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, onMounted } from 'vue'
import TwoFA from '@/components/Settings/TwoFA.vue'
import { useOtpsChange } from '@/api/use-otps-change'
import { useAlert } from '@/utils/use-alert'

export default {
  name: 'OtpSettings',
  components: {
    TwoFA,
  },
  setup() {
    const statusOtp = ref(null)
    const dialogVisible = ref(false)
    const loading = ref(false)

    const { otpsChange } = useOtpsChange()

    const beforeChange = () => {
      loading.value = true
      return new Promise(() => {
        if (statusOtp.value) {
          dialogVisible.value = true
        } else {
          confirm()
        }
      })
    }

    onMounted(() => {
      const otpEnabled = localStorage.getItem('otp-enabled')
      if (otpEnabled === 'true') statusOtp.value = true
      if (otpEnabled === 'false') statusOtp.value = false
    })

    const cancel = () => {
      dialogVisible.value = !dialogVisible.value
      loading.value = false
    }

    const confirm = () => {
      let service = null
      if (!statusOtp.value) service = localStorage.getItem('otp-type')
      otpsChange({ service })
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
      dialogVisible.value = false
      loading.value = false
      statusOtp.value = !statusOtp.value
      localStorage.setItem('otp-enabled', statusOtp.value)
    }

    return {
      statusOtp,
      dialogVisible,
      loading,
      beforeChange,
      cancel,
      confirm,
    }
  },
}
</script>
