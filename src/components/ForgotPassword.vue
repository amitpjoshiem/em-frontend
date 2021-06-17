<template>
  <div class="flex flex-col w-full items-center justify-center">
    <div class="max-w-sm p-6 bg-widget-bg rounded-md w-[370px]">
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
          <img class="h-3 w-5" src="../assets/img/vector.png" />
        </div>
      </div>

      <h1 class="text-center text-main font-semibold text-2xl">
        Forgot password?
      </h1>
      <h1 class="text-center text-gray03 text-xss">Please enter you email</h1>

      <form v-if="!sendFormForgotPass" class="mt-6" @submit="forgotHandler">
        <div>
          <Input
            :placeholder="'Enter your e-mail'"
            :type="'email'"
            name="email"
            :label="'E-mail'"
          />
        </div>
        <div class="text-center pt-5">
          <Button
            :default-primary="!fetching"
            full
            :text-btn="'Save & Continue'"
            :disabled="fetching"
            @click="forgot"
          />
        </div>
      </form>
      <div v-else>{{ response.message }}</div>
    </div>
  </div>
</template>

<script>
import { useForgot } from '@/api/use-forgot'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { mapState } from 'vuex'

export default {
  name: 'ForgotPassword',
  setup() {
    const { response, error, fetching, forgot } = useForgot()
    const schema = yup.object({
      email: yup.string().required().email(),
    })
    const { handleSubmit } = useForm({
      validationSchema: schema,
      initialValues: {
        email: '',
      },
    })

    const forgotHandler = handleSubmit(forgot)

    return { response, error, fetching, forgotHandler }
  },
  computed: mapState({
    sendFormForgotPass: (state) => state.auth.sendFormForgotPass,
  }),
}
</script>
