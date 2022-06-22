<template>
  <div class="p-5">
    <SwdSubHeader title="Companies" :with-back-btn="false">
      <template #add-company>
        <el-button type="primary" :icon="Edit" plain size="small" @click="openDialog">Add company</el-button>
      </template>
    </SwdSubHeader>
  </div>

  <el-dialog v-model="dialogFormVisible" title="Add company">
    <el-form ref="form" :model="ruleForm" label-position="top" :rules="rules">
      <el-form-item label="Name" class="mb-4" prop="name">
        <el-input v-model="ruleForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Domain" prop="domain">
        <el-input v-model="ruleForm.Domain" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">Cancel</el-button>
        <el-button type="primary" @click="confirm">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { Edit } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { rules } from '@/validationRules/modalAddCompany'
import { useAlert } from '@/utils/use-alert'

export default {
  name: 'Companies',
  setup() {
    const dialogFormVisible = ref(false)
    const form = ref(null)

    const ruleForm = reactive({
      name: '',
      domain: '',
    })

    const openDialog = () => {
      dialogFormVisible.value = true
    }

    const confirm = (e) => {
      e.preventDefault()

      form.value.validate(async (valid) => {
        if (valid) {
          // const res = await createAssetsConsolidationTable({ id: memberId, form: ruleForm })
          // if (!('error' in res)) {
          useAlert({
            title: 'Success',
            type: 'success',
            message: 'Company created',
          })
          dialogFormVisible.value = false

          // closeDialog()
          // queryClient.invalidateQueries(['AsetsConsolidationsMember', memberId])
          // }
        } else {
          return false
        }
      })
    }

    const cancel = () => {
      ruleForm.name = ''
      ruleForm.domain = ''
      dialogFormVisible.value = false
    }

    return {
      Edit,
      dialogFormVisible,
      openDialog,
      form,
      ruleForm,
      confirm,
      cancel,
      rules,
    }
  },
}
</script>
