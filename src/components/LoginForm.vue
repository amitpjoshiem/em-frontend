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

      <div class="mt-6">
        <div>
          <Input
            v-model:value="email"
            :placeholder="'Enter your e-mail'"
            :type="'email'"
            :label="'E-mail'"
          />
          <span>{{ emailError }}</span>
        </div>

        <div class="mt-4">
          <Input
            v-model:value="password"
            :placeholder="'Enter your password'"
            :type="'password'"
            :label="'Password'"
          />
          <span>{{ passwordError }}</span>
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
          <Button default-primary full :text-btn="'Continue'" @click="login" />
        </div>
      </div>
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
import { useFetch, saveToStorage } from '@/api/use-fetch'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

export default {
  name: 'LoginForm',
  setup() {
    const router = useRouter()
    const store = useStore()

    const { response, error, fetching, fetchData } = useFetch('/login', {
      method: 'POST',
    })

    const schema = yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    })

    const { validate } = useForm({
      validationSchema: schema,
    })

    const { value: email, errorMessage: emailError } = useField('email')
    const { value: password, errorMessage: passwordError } =
      useField('password')

    const login = async () => {
      const body = {
        email,
        password,
      }
      const resultValidation = await validate()
      if (!resultValidation.valid) {
        return
      }

      await fetchData({ body })
      if (error.value !== null) return
      saveToStorage(localStorage, 'access_token', response.value.access_token)
      store.commit('auth/setAuthUser', true)
      router.push({ name: 'dashboard' })
    }

    return {
      response,
      error,
      fetching,
      login,
      email,
      emailError,
      password,
      passwordError,
    }
  },
  computed: mapState({
    isShowOtpForm: (state) => state.auth.isShowOtpForm,
  }),
}
</script>
