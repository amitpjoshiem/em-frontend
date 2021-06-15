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
            v-model:value="data.email"
            :placeholder="'Enter your e-mail'"
            :type="'email'"
            :label="'E-mail'"
          />
        </div>

        <div class="mt-4">
          <Input
            v-model:value="data.password"
            :placeholder="'Enter your password'"
            :type="'password'"
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
import { reactive } from 'vue'
import { mapState } from 'vuex'
import { useFetch, saveToStorage } from '@/api/use-fetch'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginForm',
  setup() {
    const router = useRouter()
    const data = reactive({
      email: 'dmytri.yarmachok@uinno.io',
      password: 'h2r1mdima',
      otp: '',
    })

    const { response, error, fetching, fetchData } = useFetch('/login', {
      method: 'POST',
    })
    const login = async () => {
      const { email, password } = data
      const body = {
        email: email,
        password: password,
      }
      await fetchData({ body: JSON.stringify(body) })
      if (error.value !== null) return
      saveToStorage(localStorage, 'access_token', response.value.access_token)
      router.push({ name: 'dashboard' })
    }
    return { response, error, fetching, login, data }
  },
  computed: mapState({
    isShowOtpForm: (state) => state.auth.isShowOtpForm,
  }),
}
</script>
