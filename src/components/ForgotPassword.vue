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
          <img class="h-3 w-5" src="../assets/img/vector.png" />
        </div>
      </div>

      <h1 class="text-center text-main font-semibold text-2xl">
        Forgot password?
      </h1>
      <h1 class="text-center text-gray03 text-xss">Please enter you email</h1>

      <form class="mt-6">
        <div>
          <Input
            :placeholder="'Enter your e-mail'"
            :type="'email'"
            :label="'E-mail'"
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
export default {
  name: 'ForgotPassword',
}
</script>

<style lang="scss" scoped>
.form {
  width: 370px;
}
</style>
