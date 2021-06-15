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

      <div v-if="!data.sendFormForgotPass" class="mt-6">
        <div>
          <Input
            v-model:value="data.email"
            :placeholder="'Enter your e-mail'"
            :type="'email'"
            :label="'E-mail'"
          />
        </div>
        <div class="text-center pt-5">
          <Button
            default-primary
            full
            :text-btn="'Save & Continue'"
            @click="forgot"
          />
        </div>
      </div>
      <div v-else>check your mail</div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useFetch } from '@/api/use-fetch'

export default {
  name: 'ForgotPassword',
  setup() {
    const data = reactive({
      email: 'dmytri.yarmachok@uinno.io',
      sendFormForgotPass: false,
    })
    const { response, error, fetching, fetchData } = useFetch(
      '/password/forgot',
      { method: 'POST' }
    )

    const forgot = async () => {
      const { email } = data
      const body = {
        email: email,
      }
      await fetchData({ body: JSON.stringify(body) })
      if (error.value !== null) return
      data.sendFormForgotPass = true
    }
    return { response, error, fetching, forgot, data }
  },
}
</script>
