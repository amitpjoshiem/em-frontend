<template>
  <el-dialog
    v-model="dialogVisible"
    title="Add Annuity Index"
    width="55%"
    custom-class="dialog-style pdf-viewer"
    :before-close="closeDialog"
    destroy-on-close
  >
    <el-form ref="form" :model="ruleForm" label-position="top" :rules="rules">
      <el-form-item label="Name" prop="name" class="w-full mb-4">
        <el-input v-model="ruleForm.name" placeholder="Enter name" />
      </el-form-item>

      <el-form-item label="Insurance provider" prop="insurance_provider" class="w-full mb-4">
        <el-input v-model="ruleForm.insurance_provider" placeholder="Enter Insurance provider" />
      </el-form-item>

      <el-form-item label="Tax Qualification" prop="tax_qualification" class="mb-4">
        <el-select
          v-model="ruleForm.tax_qualification"
          placeholder="Select Tax Qualification"
          :loading="isLoadingInit"
          class="w-full"
        >
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="Agent Rep Code" prop="agent_rep_code" class="w-full mb-4">
        <el-input v-model="ruleForm.agent_rep_code" placeholder="Enter Agent Rep Code" />
      </el-form-item>

      <el-form-item label="License Number" prop="license_number" class="w-full mb-4">
        <el-input v-model="ruleForm.license_number" placeholder="Enter License Number" />
      </el-form-item>
    </el-form>

    <div class="h-[200px] border rounded p-2" :class="validUpload ? 'border-input-border' : 'border-color-error'">
      <SwdUpload
        :upload-data="{ collection: 'fixed_index_annuities' }"
        :doc-list="fileList"
        :show-file-list="true"
        :auto-upload="true"
        :show-file-block="true"
        :limit="1"
        @upload-success="handleSuccess"
        @upload-change="handleChange"
        @upload-mounted="bindRef"
        @remove-media="removeMedia"
      >
        <template #main>
          <div class="my-5">
            <el-button :disabled="fileList.length > 0" size="small" type="primary" class="mr-5">
              Attach a document
            </el-button>
            <div class="el-upload__tip">PDF files only (max file size 10Mb)</div>
          </div>
          <div v-if="!inChangeFile" class="text-gray03 text-center pt-6">No documents uploaded</div>
        </template>
      </SwdUpload>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button class="w-[80px]" @click="closeDialog">Close</el-button>
        <el-button type="primary" class="ml-4 w-[80px]" :loading="loadingCreate" @click="save">Save</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { watchEffect, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useFetchTaxQualificationInit } from '@/api/use-fetch-tax-qualification-init.js'
import { ElMessageBox } from 'element-plus'
import { rules } from '@/validationRules/addAnnuityIndex.js'
import SwdUpload from '@/components/Global/SwdUpload.vue'
import { createAnnuitiIndex } from '@/api/vueQuery/create-annuiti-index'
import { useMutation, useQueryClient } from 'vue-query'
import { useAlert } from '@/utils/use-alert'

export default {
  name: 'ModalAddAnnuityIndex',
  components: {
    SwdUpload,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const queryClient = useQueryClient()

    const form = ref(null)
    const options = ref([])
    const dialogVisible = ref(false)
    const upload = ref(null)
    const inChangeFile = ref(false)
    const validUpload = ref(true)

    const memberId = route.params.id

    const fileList = reactive([])

    const { mutateAsync: create, isLoading: loadingCreate } = useMutation(createAnnuitiIndex)

    const ruleForm = reactive({
      name: '',
      insurance_provider: '',
      tax_qualification: '',
      agent_rep_code: '',
      license_number: '',
      uuids: [],
    })

    const {
      isLoading: isLoadingInit,
      data: init,
      refetch: refetchInit,
    } = useFetchTaxQualificationInit({ enabled: false })

    watchEffect(() => {
      dialogVisible.value = store.state.globalComponents.dialog.showDialog.modalAddAnnuityIndex

      if (dialogVisible.value) {
        refetchInit.value()
      }

      if (!isLoadingInit.value && init.value) {
        options.value = init.value.tax_qualifications.map((item) => {
          return { label: item, value: item }
        })
      }
    })

    const closeDialog = () => {
      if (
        ruleForm.name ||
        ruleForm.insurance_provider ||
        ruleForm.tax_qualification ||
        ruleForm.agent_rep_code ||
        ruleForm.license_number ||
        ruleForm.uuids.length
      ) {
        ElMessageBox.confirm('Are you sure to close this dialog?')
          .then(() => {
            doneCloceDialog()
          })
          .catch(() => {})
      } else {
        doneCloceDialog()
      }
    }

    const doneCloceDialog = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'modalAddAnnuityIndex',
        value: false,
      })
      initialState()
    }

    const initialState = () => {
      ruleForm.name = ''
      ruleForm.insurance_provider = ''
      ruleForm.tax_qualification = ''
      ruleForm.agent_rep_code = ''
      ruleForm.license_number = ''
      ruleForm.uuids = []
    }

    const save = (e) => {
      e.preventDefault()
      if (!fileList.length) validUpload.value = false
      form.value.validate(async (valid) => {
        if (valid && validUpload.value) {
          const res = await createAnnuitiIndex({ id: memberId, data: ruleForm })
          if (!('error' in res)) {
            useAlert({
              title: 'Success',
              type: 'success',
              message: 'Annuity Index created',
            })
            queryClient.invalidateQueries(['annuityIndex'])
            doneCloceDialog()
          }
        } else {
          return false
        }
      })
    }

    const handleChange = () => {
      inChangeFile.value = true
    }

    const bindRef = (ref) => {
      upload.value = ref.value
    }

    const removeMedia = () => {
      fileList.splice(0, 1)
    }

    const handleSuccess = (res) => {
      validUpload.value = true
      ruleForm.uuids.push(res.data.uuid)
    }

    return {
      dialogVisible,
      closeDialog,
      memberId,
      form,
      ruleForm,
      save,
      isLoadingInit,
      init,
      refetchInit,
      options,
      rules,
      fileList,
      handleChange,
      bindRef,
      removeMedia,
      handleSuccess,
      inChangeFile,
      create,
      loadingCreate,

      validUpload,
    }
  },
}
</script>
