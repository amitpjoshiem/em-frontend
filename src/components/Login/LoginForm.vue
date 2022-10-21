<template>
  <div class="flex flex-col w-full items-center justify-center pr-[63px]">
    <div class="form max-w-sm pt-6 pl-6 pr-6 bg-main-gray rounded-md w-[370px]">
      <div class="flex items-center justify-center mb-2">
        <InlineSvg :src="IrisLogoStandart" width="100" height="40" />
      </div>
      <h1 class="text-center text-main font-medium text-2xl">Login</h1>
      <h1 class="text-center text-main text-xss">Please enter your email and password</h1>
      <el-form ref="form" :model="ruleForm" :rules="rules" label-position="top" @submit.prevent="submit">
        <el-form-item label="E-mail" prop="email" class="py-3">
          <el-input v-model="ruleForm.email" placeholder="Enter your e-mail" @keyup.enter="submit" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            v-model="ruleForm.password"
            show-password
            placeholder="Enter your password"
            type="password"
            autocomplete="off"
            @keyup.enter="submit"
          />
        </el-form-item>
        <el-form-item class="my-6">
          <SwdButton primary main :disabled="fetching" class="w-full" @click="submit">
            <SwdSpinner v-show="fetching" class="mr-2" />
            Continue
          </SwdButton>
        </el-form-item>
      </el-form>
    </div>
    <div class="flex justify-between w-full pt-3 max-w-sm rounded-md pl-2">
      <span class="text-xss text-main cursor-pointer">
        <router-link :to="{ name: 'forgotpassword' }"> Forgot your password? </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import IrisLogoStandart from '@/assets/svg/iris-logo-standard.svg'
import { useLogin } from '@/api/authentication/use-login'
import { reactive, ref } from 'vue'
import { rules } from '@/validationRules/login.js'

export default {
  name: 'LoginForm',
  setup() {
    const ruleForm = reactive({
      email: '',
      password: '',
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
      IrisLogoStandart,
      ruleForm,
      submit,
      rules,
      form,
    }
  },
}
</script>
