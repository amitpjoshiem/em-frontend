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
          <InlineSvg :src="IconForgotPassword" />
        </div>
      </div>

      <h1 class="text-center text-main font-semibold text-2xl">
        Create a new password
      </h1>

      <form class="mt-6" @submit="handleNewPass">
        <div class="mt-4">
          <InputPassword
            placeholder="Enter your password"
            name="password"
            label="New password"
          />
        </div>

        <div class="mt-4">
          <InputPassword
            placeholder="Enter your password"
            name="password_confirmation"
            label="Confirm new password"
          />
        </div>

        <div class="text-center pt-5">
          <Button
            :default-primary="!fetching"
            full
            :text-btn="'Save & Continue'"
            :disabled="fetching"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import IconForgotPassword from '@/assets/svg/icon-forgot-password.svg'

import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCreatePassword } from '@/api/use-create-password'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

export default {
  name: 'ResetPassword',
  setup() {
    const { response, error, fetching, createPassword } = useCreatePassword()
    const route = useRoute()

    const data = reactive({
      email: '',
      token: '',
    })

    onMounted(() => {
      data.email = route.query.email
      data.token = route.query.token
    })

    const schema = yup.object({
      password: yup.string().required().min(6).defined(),
      password_confirmation: yup
        .string()
        .test('passwords-match', 'Passwords must match', function (value) {
          return this.parent.password === value
        }),
    })

    const { handleSubmit } = useForm({
      validationSchema: schema,
      initialValues: {
        password: '',
        password_confirmation: '',
      },
    })

    const handleCreatePass = handleSubmit((form) =>
      createPassword({ ...form, ...data })
    )

    return {
      response,
      error,
      fetching,
      handleCreatePass,
      data,
      route,
      IconForgotPassword,
    }
  },
}
</script>
