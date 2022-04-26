<template>
  <div class="flex flex-col w-full items-center justify-center">
    <div class="form max-w-sm pt-6 pl-6 pr-6 bg-widget-bg rounded-md w-[370px]">
      <div class="flex items-center justify-center p-2">
        <div class="rounded-full h-10 w-10 flex items-center justify-center bg-lightgray03">
          <InlineSvg :src="IconLoginForm" />
        </div>
      </div>

      <h1 class="text-center text-main font-medium text-2xl">Login</h1>
      <h1 class="text-center text-gray03 text-xss">Please enter you email and password</h1>
      <el-form ref="form" :model="ruleForm" status-icon :rules="rules" label-position="top" @submit.prevent="submit">
        <el-form-item label="E-mail" prop="email" class="py-3">
          <el-input v-model="ruleForm.email" placeholder="Enter your e-mail" />
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <el-input
            v-model="ruleForm.password"
            show-password
            placeholder="Enter your password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item class="my-6">
          <Button
            :default-primary="!fetching"
            full
            text-btn="Continue"
            :disabled="fetching"
            type="submit"
            @click="submit()"
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="flex justify-between w-full pt-3 max-w-sm rounded-md pl-2">
      <span class="text-xss text-gray03 cursor-pointer">
        <router-link :to="{ name: 'forgotpassword' }"> Forgot your password? </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import IconLoginForm from '@/assets/svg/icon-login-form.svg'
import { useLogin } from '@/api/authentication/use-login'
import { reactive, ref } from 'vue'
import { rules } from '@/validationRules/login.js'

export default {
  name: 'LoginForm',
  setup() {
    const ruleForm = reactive({
      email: '',
      password: '111111',
    })
    const form = ref(null)

    const { response, error, fetching, login } = useLogin()

    const submit = async () => {
      form.value.validate(async (valid) => {
        if (valid) {
          await login(ruleForm)
        } else {
          return false
        }
      })
    }

    return {
      response,
      error,
      fetching,
      IconLoginForm,
      ruleForm,
      submit,
      rules,
      form,
    }
  },
}
</script>
