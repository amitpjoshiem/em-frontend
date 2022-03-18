<template>
  <el-dialog v-model="state.dialogVisible" title="Account Name" width="45%" :before-close="closeDialog">
    <div>
      <el-form ref="form" :model="ruleForm" status-icon label-position="top" :rules="rules">
        <el-form-item label="Name" prop="name" class="w-full mb-4">
          <el-input v-model="ruleForm.name" placeholder="Enter Account Name" />
        </el-form-item>
        <div class="pt-5 text-right">
          <el-button class="mr-5" @click="closeDialog">Close</el-button>
          <Button default-blue-btn text-btn="Add table" @click="addTable" />
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, watchEffect, ref } from 'vue'
import { useAlert } from '@/utils/use-alert'
import { useMutation, useQueryClient } from 'vue-query'
import { useRoute } from 'vue-router'
import { rules } from '@/validationRules/modalNewTable'
import { createAssetsConsolidationTables } from '@/api/vueQuery/create-assets-consolidations-tables'

export default {
  name: 'ModalNewTable',
  setup() {
    const store = useStore()
    const form = ref(null)
    const route = useRoute()
    const memberId = route.params.id
    const queryClient = useQueryClient()

    const { mutateAsync: createAssetsConsolidationTable } = useMutation(createAssetsConsolidationTables)

    const ruleForm = reactive({
      name: '',
    })

    const state = reactive({
      dialogVisible: false,
    })

    watchEffect(() => {
      state.dialogVisible = store.state.globalComponents.dialog.showDialog.modalNewTable
    })

    const closeDialog = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'modalNewTable',
        value: false,
      })
    }

    const addTable = async (e) => {
      e.preventDefault()

      form.value.validate(async (valid) => {
        if (valid) {
          const res = await createAssetsConsolidationTable({ id: memberId, form: ruleForm })
          if (!('error' in res)) {
            useAlert({
              title: 'Success',
              type: 'success',
              message: 'Table create',
            })
            closeDialog()
            queryClient.invalidateQueries(['AsetsConsolidationsMember', memberId])
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
      addTable,
      rules,
    }
  },
}
</script>
