<template>
  <Dialog
    title="Change password"
    confirm-action="changePassword"
    @confirmDialog="changePasswordHandler"
  >
    <template #buttonDialog>
      <div class="flex items-center">
        <InlineSvg :src="IconPencil" class="mb-1" />
      </div>
    </template>
    <template #contentDialog>
      <form @submit="changePasswordHandler">
        <InputPassword
          label="Сurrent password"
          name="current_password"
          placeholder="Enter your current password"
          type="password"
        />
        <InputPassword
          label="Password"
          name="password"
          placeholder="Enter your new password"
          type="password"
        />
        <InputPassword
          label="Confirm Password"
          name="password_confirmation"
          placeholder="Confirm your new password"
          type="password"
        />
      </form>
    </template>
  </Dialog>
</template>
<script>
import IconPencil from '@/assets/svg/icon-pencil.svg'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

export default {
  name: 'ChangePassword',
  setup() {
    // const { response, error, fetching, changePassword } = useChangePassword()

    const schema = yup.object({
      current_password: yup.string().required().min(6).defined(),
      password: yup.string().required().min(6).defined(),
      password_confirmation: yup.string().required().min(6).defined(),
    })

    const { handleSubmit } = useForm({
      validationSchema: schema,
      initialValues: {
        current_password: '',
        password: '',
        password_confirmation: '',
      },
    })

    // const changePasswordHandler = handleSubmit(changePassword)

    return {
      // response,
      // error,
      // fetching,
      // changePassword,
      IconPencil,
      handleSubmit,
      // changePasswordHandler,
    }
  },
}
</script>
