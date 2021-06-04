<template>
  <div class="flex flex-col w-full items-center justify-center">
    <div class="form max-w-sm p-6 bg-widget-bg rounded-md">
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
    <div class="flex justify-between w-full pt-3 max-w-sm rounded-md">
      <span class="text-xss text-gray03 cursor-pointer">
        <router-link :to="{ name: 'forgotpassword' }">
          Forgot your password?
        </router-link>
      </span>
      <div class="flex items-center">
        <span class="text-link text-xss cursor-pointer">Reset password </span>
        <img class="w-2.5 h2.5 m-1 ml-1" src="../assets/img/resetpass.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
}
</script>

<style lang="scss" scoped>
.form {
  width: 370px;
}
</style>
