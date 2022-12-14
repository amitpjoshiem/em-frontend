<template>
  <el-dialog v-model="dialogVisible" title="New Contract" width="45%" :before-close="closeDialog">
    <div>
      <el-form ref="form" :model="ruleForm" label-position="top" :rules="rules">
        <el-form-item label="Contract ID" prop="contract_number" class="w-full">
          <el-input v-model="ruleForm.contract_number" placeholder="Enter contract number" autofocus="true" />
        </el-form-item>
        <div class="pt-5 flex justify-end">
          <SwdButton primary main class="mr-2 w-28" @click="closeDialog">Cancel</SwdButton>
          <SwdButton primary main class="w-28" :disabled="isLoading" @click="createNewContract">
            <SwdSpinner v-if="isLoading" />
            Create
          </SwdButton>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { rules } from '@/validationRules/contract'
import { ref, watchEffect, reactive } from 'vue'
import { useAlert } from '@/utils/use-alert'
import { useRouter, useRoute } from 'vue-router'
import { createClientReport } from '@/api/vueQuery/create-client-report'
import { useMutation } from 'vue-query'
import { useStore } from 'vuex'

export default {
  name: 'ModalNewContract',
  emits: ['refetchContract'],
  setup() {
    const form = ref(null)
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const dialogVisible = ref(false)

    const ruleForm = reactive({
      contract_number: null,
    })

    const {
      mutateAsync: create,
      isLoading: isLoading,
      isError: isError,
      isFetching: isFetching,
    } = useMutation(createClientReport)

    watchEffect(() => {
      dialogVisible.value = store.state.globalComponents.dialog.showDialog.newContract
    })

    const createNewContract = async (e) => {
      e.preventDefault()
      form.value.validate(async (valid) => {
        if (valid) {
          const res = await create({ id: route.params.id, data: { contract_number: ruleForm.contract_number } })
          if (!('error' in res)) {
            useAlert({
              title: 'Success',
              type: 'success',
              message: 'Contract created',
            })
            store.commit('globalComponents/setShowModal', {
              destination: 'newContract',
              value: false,
            })
            router.push({ name: `${route.meta.type}/contract-info`, params: { contract_id: res.data.id } })
          }
        }
      })
    }

    const closeDialog = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'newContract',
        value: false,
      })
    }

    return {
      form,
      rules,
      createNewContract,
      closeDialog,
      create,
      isLoading,
      isError,
      isFetching,
      dialogVisible,
      ruleForm,
    }
  },
}
</script>
