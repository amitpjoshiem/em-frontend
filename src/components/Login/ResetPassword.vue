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

      <h1 class="text-center text-main font-medium text-2xl">
        Create a new password
      </h1>

      <div class="py-5">
        <el-form
          ref="form"
          :model="ruleForm"
          :rules="rules"
          class="demo-ruleForm"
          label-position="top"
        >
          <el-form-item label="Password" prop="pass">
            <el-input
              v-model="ruleForm.pass"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="Confirm" prop="checkPass">
            <el-input
              v-model="ruleForm.checkPass"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
        </el-form>
        <div class="text-center pt-5">
          <Button
            :default-primary="!fetching"
            full
            :text-btn="'Continue'"
            :disabled="fetching"
            @click="submitForm('ruleForm')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconForgotPassword from '@/assets/svg/icon-forgot-password.svg'

import { reactive, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCreatePassword } from '@/api/authentication/use-create-password'

export default {
  name: 'ResetPassword',
  setup() {
    const { response, error, fetching, createPassword } = useCreatePassword()
    const route = useRoute()

    const data = reactive({
      email: '',
      token: '',
    })

    const ruleForm = reactive({
      pass: '',
      checkPass: '',
    })
    const form = ref(null)

    onMounted(() => {
      data.email = route.query.email
      data.token = route.query.token
    })

    const submitForm = async () => {
      form.value.validate((valid) => {
        if (valid) {
          createPassword(ruleForm)
        } else {
          return false
        }
      })
    }

    const validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== ruleForm.pass) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }

    const rules = {
      pass: [
        { type: 'string', required: true, message: 'Please input password' },
        { min: 6, message: 'Length should be min 6', trigger: 'blur' },
      ],
      checkPass: [
        { type: 'string', required: true, message: 'Please input password' },
        { validator: validateCheckPass, trigger: 'blur' },
      ],
    }

    return {
      response,
      error,
      fetching,
      data,
      route,
      IconForgotPassword,
      ruleForm,
      form,
      submitForm,
      rules,
    }
  },
}
</script>
