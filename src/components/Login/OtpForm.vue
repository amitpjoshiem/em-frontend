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

      <form class="mt-6" @submit="otpHandler">
        <h1 class="text-center text-gray03 pt-2.5 text-sm">
          We just sent you a temporary login code. Please check your inbox.
        </h1>

        <div class="mt-4">
          <InputTextForm
            placeholder="Paste login code"
            type="text"
            name="code"
            label="Login code"
          />
        </div>
        <div class="text-center pt-5">
          <Button
            :default-primary="!fetching"
            full
            :text-btn="'Continue'"
            type="submit"
            :disabled="fetching"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import IconLoginForm from '@/assets/svg/icon-login-form.svg'

import { useOtp } from '@/api/use-otp'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

export default {
  name: 'OtpForm',
  setup() {
    const { response, error, fetching, otpAuth } = useOtp()

    const schema = yup.object({
      code: yup.number().required().defined(),
    })

    const { handleSubmit } = useForm({
      validationSchema: schema,
      initialValues: {
        code: '',
      },
    })

    const otpHandler = handleSubmit(otpAuth)

    return {
      response,
      error,
      fetching,
      otpHandler,
      IconLoginForm,
    }
  },
}
</script>
