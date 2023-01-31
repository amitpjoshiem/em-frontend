<template>
  <SwdDialog title="Change phone" confirm-action="changePhone" destination-dialog="changePhone">
    <template #buttonDialog>
      <div class="flex items-center">
        <InlineSvg :src="IconPencil" class="mb-1" />
      </div>
    </template>
    <template #contentDialog>
      <el-form ref="form" :model="ruleForm" label-position="top" :rules="rules" @submit.prevent="submit">
        <el-form-item v-if="state.isShowConfirmCode" label="Confirm code" class="w-full" prop="code">
          <el-input v-model="ruleForm.code" placeholder="Enter confirm code" />
        </el-form-item>

        <el-form-item v-else label="Phone number" class="w-full">
          <el-input v-model="ruleForm.phone" placeholder="Enter pnone number" />
        </el-form-item>

        <div v-if="!state.isShowConfirmCode" class="pt-3 text-right">
          <Button default-blue-btn text-btn="Verified" @click="verifiedNumber" />
        </div>

        <div v-else class="pt-3 text-right">
          <Button default-gray-btn text-btn="Back" class="mr-2" @click="backStep" />
          <Button default-blue-btn text-btn="Confirm" @click="confirmChange" />
        </div>
      </el-form>
    </template>
  </SwdDialog>
</template>
<script>
import IconPencil from '@/assets/svg/icon-pencil.svg'
import { useUserProfile } from '@/api/use-user-profile.js'
import { useMutation, useQueryClient } from 'vue-query'
import { useStore } from 'vuex'
import { userPhoneSendVerify } from '@/api/vueQuery/user-phone-send-verify'
import { userPhoneVerify } from '@/api/vueQuery/user-phone-verify'
import { reactive, ref, onMounted } from 'vue'
import { maska } from 'maska'
import { useAlert } from '@/utils/use-alert'

export default {
  name: 'ChangePhone',
  directives: { maska },

  setup() {
    const store = useStore()
    const queryClient = useQueryClient()
    const form = ref(null)

    const ruleForm = reactive({
      phone: '',
      code: '',
    })

    const state = reactive({
      isShowConfirmCode: false,
    })

    const rules = reactive({
      phone: [{ required: true }, { len: 17, trigger: 'blur', message: 'Incorrect phone number' }],
      code: [{ required: true }],
    })

    const { mutateAsync: phoneSendVerify, error } = useMutation(userPhoneSendVerify)

    const { mutateAsync: phoneVerify } = useMutation(userPhoneVerify)

    const { data: user, refetch } = useUserProfile()

    onMounted(async () => {
      if (user.value.phone) {
        ruleForm.phone = user.value.phone
      }
    })

    const verifiedNumber = () => {
      form.value.validate(async (valid) => {
        if (valid) {
          const res = await phoneSendVerify({ phone: ruleForm.phone })
          if (!('error' in res)) {
            state.isShowConfirmCode = true
            useAlert({
              title: 'Success',
              type: 'success',
              message: 'Send code. Check sms.',
            })
          }
        } else {
          return false
        }
      })
    }

    const confirmChange = () => {
      form.value.validate(async (valid) => {
        if (valid) {
          const res = await phoneVerify({ code: ruleForm.code })
          if (!('error' in res)) {
            state.isShowConfirmCode = true
            queryClient.invalidateQueries(['users'])
            useAlert({
              title: 'Success',
              type: 'success',
              message: 'Phone verified.',
            })
            closeDialog()
          }
        } else {
          return false
        }
      })
    }

    const closeDialog = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'changePhone',
        value: false,
      })
    }

    const backStep = () => {
      ruleForm.code = null
      state.isShowConfirmCode = false
    }

    return {
      state,
      IconPencil,
      user,
      refetch,
      ruleForm,
      form,
      closeDialog,
      verifiedNumber,
      confirmChange,
      rules,
      phoneSendVerify,
      phoneVerify,
      error,
      backStep,
    }
  },
}
</script>
