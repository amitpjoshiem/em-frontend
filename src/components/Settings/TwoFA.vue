<template>
  <!-- <div class="flex py-5">
    <div class="w-10/12 text-xss text-main font-medium">SMS Authenticator</div>
    <div class="w-2/12 flex justify-between">
      <el-switch
        v-model="smsOtp"
        :loading="loadingPhone"
        :before-change="changePhoneOtp"
        :disabled="user.phone_status !== 'verified'"
      />
    </div>
  </div> -->

  <div class="flex py-5">
    <div class="w-10/12 text-xss text-main font-medium">Google Authenticator</div>
    <div class="w-2/12 flex justify-between">
      <el-switch
        v-model="state.googleOtp"
        :loading="isLoading"
        inline-prompt
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="Y"
        inactive-text="N"
        @change="changeGoogle"
      />
    </div>
  </div>

  <div v-if="!isLoading && googleQr?.data && isShowQr" class="flex justify-center items-center flex-col">
    <QRCodeVue3
      :value="googleQr.data"
      :dots-options="{
        type: 'dots',
        color: '#000000',
      }"
    />
    <div class="w-5/12 flex justify-between">
      <el-form ref="form" :model="ruleForm" state-icon>
        <el-form-item prop="code" class="w-full">
          <el-input v-model="ruleForm.code" placeholder="Enter OTP code" />
        </el-form-item>
      </el-form>
      <SwdButton class="ml-2 w-[100px]" primary main @click="saveOtp">
        <SwdSpinner v-show="loadingChange" class="mr-2" />
        Save
      </SwdButton>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { otpsChange } from '@/api/use-otps-change'
import { useFetchGoogleQr } from '@/api/use-fetch-google-qr'
import { useAlert } from '@/utils/use-alert'
import { useStore } from 'vuex'
import { useMutation } from 'vue-query'
import QRCodeVue3 from 'qrcode-vue3'

export default {
  name: 'TwoFA',
  components: {
    QRCodeVue3,
  },
  setup() {
    const store = useStore()
    const form = ref(null)
    const isShowQr = ref(true)

    const { mutateAsync: changeOtps, isLoading: loadingChange } = useMutation(otpsChange)

    const { isLoading, refetch, data: googleQr } = useFetchGoogleQr({ enabled: false })

    const ruleForm = reactive({
      code: '',
    })

    const state = reactive({
      googleOtp: false,
      smsOtp: false,
    })

    onMounted(() => {
      if (store.state.auth.otpType === 'google') state.googleOtp = true
    })

    const changeGoogle = async () => {
      if (state.googleOtp) {
        isShowQr.value = true
        refetch.value()
      } else {
        const res = await changeOtps({ service: 'email' })
        if (!('error' in res)) {
          setTypeOtp('email')
          useAlert({
            title: 'Success',
            type: 'success',
            message: 'OTP has been changed successfully.',
          })
        }
      }
    }

    const saveOtp = async (e) => {
      e.preventDefault()
      const res = await changeOtps({ service: 'google', code: ruleForm.code })
      if (!('error' in res)) {
        setTypeOtp('google')
        isShowQr.value = false
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'OTP has been changed successfully.',
        })
      }
    }

    // const changePhoneOtp = () => {
    //   changeOtps({ service: state.smsOtp ? 'email' : 'phone' })
    //     .then(() => {
    //       useAlert({
    //         title: 'Success',
    //         type: 'success',
    //         message: 'OTP has been changed successfully.',
    //       })
    //       state.smsOtp = true
    //       state.googleOtp = false
    //     })
    //     .catch((error) => {
    //       console.error(error)
    //     })
    // }

    const setTypeOtp = (type) => {
      store.commit('auth/setOtpType', type)
      localStorage.setItem('otp-type', type)
    }

    return {
      state,
      changeGoogle,
      ruleForm,
      form,
      saveOtp,
      googleQr,
      isLoading,
      loadingChange,
      changeOtps,
      isShowQr,
    }
  },
}
</script>
