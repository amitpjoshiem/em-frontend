<template>
  <el-dialog v-model="state.dialogVisible" title="New Lead" width="45%" :before-close="closeDialog">
    <div>
      <el-form ref="form" :model="ruleForm" label-position="top" :rules="rules">
        <el-form-item label="Name" prop="name" class="w-full">
          <el-input v-model="ruleForm.name" placeholder="Enter first name" @keyup.enter="submit" />
        </el-form-item>
        <el-form-item label="Email" prop="email" class="w-full my-4">
          <el-input v-model="ruleForm.email" placeholder="Enter email" @keyup.enter="submit" />
        </el-form-item>
        <el-form-item label="Phone" prop="phone">
          <el-input
            v-model="ruleForm.phone"
            v-maska="'(###) ###-####'"
            placeholder="Enter phone number"
            @keyup.enter="submit"
          />
        </el-form-item>
        <div class="pt-5 flex justify-end">
          <SwdButton primary main class="mr-2 w-28" @click="closeDialog">Close</SwdButton>
          <SwdButton primary main class="w-28" :disabled="isLoading" @click="submit">
            <SwdSpinner v-if="isLoading" />
            Send
          </SwdButton>
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
import { useMutation, useQueryClient } from 'vue-query'
import { useAlert } from '@/utils/use-alert'
import { maska } from 'maska'
import { useRoute } from 'vue-router'

export default {
  name: 'NewLeadModal',
  directives: { maska },
  setup() {
    const store = useStore()
    const form = ref(null)
    const route = useRoute()
    const queryClient = useQueryClient()

    const { isLoading, mutateAsync: fetchSendLink, error } = useMutation(sendLinkNewLead)

    const ruleForm = reactive({
      name: '',
      email: '',
      phone: '',
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
      ruleForm.phone = ''
    }

    const submit = (e) => {
      e.preventDefault()
      form.value.validate(async (valid) => {
        if (valid) {
          const res = await fetchSendLink(ruleForm)
          if (!('error' in res)) {
            useAlert({
              title: 'Success',
              type: 'success',
              message: 'Send link success',
            })
            if (
              route.name === `${route.meta.type}/all-leads` ||
              route.name === `${route.meta.type}/active-leads` ||
              route.name === `${route.meta.type}/deactivated-leads`
            ) {
              queryClient.invalidateQueries(['householders-list'])
            }
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
      submit,
      isLoading,
      error,
    }
  },
}
</script>
