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
        <form @submit="verifyHandler">
          <InputTextForm name="code" type="number" placeholder="code" />
          <Button :default-primary="!fetching" full text-btn="Verify" type="submit" :disabled="fetching" />
        </form>
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

import { useForm } from 'vee-validate'
import * as yup from 'yup'

export default {
  setup() {
    const store = useStore()
    const { response, error, fetching, getGoogleQr } = useGoogleQr()
    const { verifyGoogle } = useVerifyGoogle()
    const qrCode = ref(null)

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

    const schema = yup.object({
      code: yup.string().required().defined(),
    })

    const { handleSubmit } = useForm({
      validationSchema: schema,
      initialValues: {
        code: '',
        service: 'google',
      },
    })

    const verifyHandler = handleSubmit(verifyGoogle)

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
      verifyHandler,
      otpType,
      showForm,
    }
  },
}
</script>
