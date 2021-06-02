<template>
  <div class="flex w-full items-center justify-center">
    <div class="max-w-sm p-6 m-auto bg-widget-bg rounded-md">
      <div class="flex items-center justify-center p-4">
        <div
          class="
            rounded-full
            h-20
            w-20
            flex
            items-center
            justify-center
            bg-lightgray03
          "
        >
          <img src="../assets/img/vector.png" />
        </div>
      </div>

      <h1 class="text-center text-main font-semibold text-2xl">Login</h1>
      <h1 class="text-center text-gray03">
        Please enter you email and password
      </h1>

      <form class="mt-6">
        <div>
          <Input
            :placeholder="'Enter your e-mail'"
            :type="'email'"
            :label="'E-mail'"
          />
        </div>

        <div class="mt-4">
          <Input
            :placeholder="'Enter your password'"
            :type="'password'"
            :label="'Password'"
          />
        </div>

        <h1 class="text-center text-gray03 pt-2.5 text-sm">
          We just sent you a temporary login code. Please check your inbox.
        </h1>

        <div class="mt-4">
          <Input
            :placeholder="'Paste login code'"
            :type="'text'"
            :label="'Login code'"
          />
        </div>
        <div class="text-center pt-5">
          <Button default-primary full :text-btn="'Continue'" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Input from '@/components/Input/Input.vue'
import Button from '@/components/Button/Button.vue'

export default {
  name: 'LoginForm',
  components: {
    Input,
    Button,
  },
  setup() {},
}
</script>

<style lang="scss" scoped>
.login-form {
  width: 370px;
}
</style>
