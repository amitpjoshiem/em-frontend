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
        Create a new password
      </h1>

      <form class="mt-6">
        <div class="mt-4">
          <Input
            v-model:value="data.password"
            :placeholder="'Enter your password'"
            :type="'password'"
            :label="'New password'"
          />
        </div>

        <div class="mt-4">
          <Input
            v-model:value="data.password_confirmation"
            :placeholder="'Enter your password'"
            :type="'password'"
            :label="'Confirm new password'"
          />
        </div>

        <div class="text-center pt-5">
          <Button default-primary full :text-btn="'Save & Continue'" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import { useFetch } from '@/api/use-fetch'
import { useRoute } from 'vue-router'

export default {
  name: 'NewPassword',
  setup() {
    const route = useRoute()

    const data = reactive({
      password: '',
      password_confirmation: '',
      email: '',
      token: '',
    })
    const { response, error, fetching, fetchData } = useFetch(
      '/password/reset',
      {
        method: 'POST',
      }
    )
    onMounted(() => {
      data.email = route.query.email
      data.token = route.query.token
    })

    const forgot = async () => {
      const { password, password_confirmation, email, token } = data
      const body = {
        password: password,
        password_confirmation: password_confirmation,
        email: email,
        token: token,
      }
      await fetchData({ body: JSON.stringify(body) })
      if (error.value !== null) return
      data.sendFormForgotPass = true
    }
    return { response, error, fetching, forgot, data, route }
  },
}
</script>
