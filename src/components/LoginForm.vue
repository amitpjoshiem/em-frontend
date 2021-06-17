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
          <img class="h-5 w-5" src="../assets/img/login.png" />
        </div>
      </div>

      <h1 class="text-center text-main font-semibold text-2xl">Login</h1>
      <h1 class="text-center text-gray03 text-xss">
        Please enter you email and password
      </h1>

      <form class="mt-6" @submit="loginHandler">
        <div>
          <Input
            :placeholder="'Enter your e-mail'"
            :type="'email'"
            name="email"
            :label="'E-mail'"
          />
        </div>

        <div class="mt-4">
          <Input
            :placeholder="'Enter your password'"
            :type="'password'"
            name="password"
            :label="'Password'"
          />
        </div>

        <template v-if="isShowOtpForm">
          <h1 class="text-center text-gray03 pt-2.5 text-sm">
            We just sent you a temporary login code. Please check your inbox.
          </h1>

          <div class="mt-4">
            <Input
              v-model:value="otp"
              :placeholder="'Paste login code'"
              :type="'text'"
              :label="'Login code'"
            />
          </div>
        </template>
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
    <div class="flex justify-between w-full pt-3 max-w-sm rounded-md pl-2">
      <span class="text-xss text-gray03 cursor-pointer">
        <router-link :to="{ name: 'forgotpassword' }">
          Forgot your password?
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { useLogin } from '@/api/use-login'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

export default {
  name: 'LoginForm',
  setup() {
    const { response, error, fetching, login } = useLogin()

    const schema = yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(8).defined(),
    })

    const { handleSubmit } = useForm({
      validationSchema: schema,
      initialValues: {
        email: '',
        password: '',
      },
    })

    const loginHandler = handleSubmit(login)

    return {
      response,
      error,
      fetching,
      loginHandler,
    }
  },
  computed: mapState({
    isShowOtpForm: (state) => state.auth.isShowOtpForm,
  }),
}
</script>
