<template>
  <el-dialog v-model="state.dialogVisible" title="New Lead" width="45%" :before-close="closeDialog">
    <div>
      <el-form ref="form" :model="ruleForm" label-position="top" :rules="rules">
        <el-form-item label="Name" prop="name" class="w-full mb-4">
          <el-input v-model="ruleForm.name" placeholder="Enter first name" />
        </el-form-item>
        <el-form-item label="Email" prop="email" class="w-full">
          <el-input v-model="ruleForm.email" placeholder="Enter email" />
        </el-form-item>
        <div class="pt-5 text-right">
          <el-button class="mr-5 w-20" @click="closeDialog">Close</el-button>
          <el-button :loading="isLoading" :disabled="isLoading" type="primary" class="w-20" @click="sendLink">
            Send
          </el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, watchEffect, ref } from 'vue'
import { rules } from '@/validationRules/modalNewLead.js'
import { sendLinkNewLead } from '@/api/vueQuery/fetch-send-link-new-lead'
import { useMutation } from 'vue-query'
import { useAlert } from '@/utils/use-alert'

export default {
  name: 'NewLeadModal',
  setup() {
    const store = useStore()
    const form = ref(null)

    const { isLoading, mutateAsync: fetchSendLink, error } = useMutation(sendLinkNewLead)

    const ruleForm = reactive({
      name: '',
      email: '',
    })

    const state = reactive({
      dialogVisible: false,
    })

    watchEffect(() => {
      state.dialogVisible = store.state.globalComponents.dialog.showDialog.newLead
    })

    const closeDialog = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'newLead',
        value: false,
      })
      ruleForm.name = ''
      ruleForm.email = ''
    }

    const sendLink = (e) => {
      e.preventDefault()
      form.value.validate(async (valid) => {
        if (valid) {
          const res = await fetchSendLink(ruleForm)
          if (!('error' in res)) {
            useAlert({
              title: 'Success',
              type: 'success',
              message: 'Send link',
            })
            closeDialog()
          }
        } else {
          return false
        }
      })
    }

    return {
      state,
      closeDialog,

      ruleForm,
      form,
      rules,
      sendLink,
      isLoading,
      error,
    }
  },
}
</script>
