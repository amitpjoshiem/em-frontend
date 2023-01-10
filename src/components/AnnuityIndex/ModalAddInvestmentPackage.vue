<template>
  <el-dialog
    v-model="dialogVisible"
    title="Add Investment Package"
    width="55%"
    class="dialog-style pdf-viewer"
    :before-close="closeDialog"
    destroy-on-close
  >
    <el-form ref="form" :model="ruleForm" label-position="top" :rules="rules">
      <el-form-item label="Name" prop="name" class="w-full mb-4">
        <el-input v-model="ruleForm.name" placeholder="Enter name" />
      </el-form-item>
    </el-form>

    <div class="h-[200px] border rounded p-2" :class="validUpload ? 'border-main-gray' : 'border-color-error'">
      <SwdUpload
        :upload-data="{ collection: 'investment_package' }"
        :doc-list="fileList"
        :show-file-list="true"
        :auto-upload="true"
        :show-file-block="true"
        :limit="1"
        :on-exceed="handleExceed"
        :upload-before-hook="hookBeforeUploadFile"
        @upload-success="handleSuccess"
        @upload-change="handleChange"
        @upload-mounted="bindRef"
        @remove-media="removeMedia"
      >
        <template #main>
          <div class="my-5 flex items-center">
            <SwdButton primary small class="w-4/12 mr-2">Attach a document</SwdButton>
            <p v-if="!isLoadingMediaRules" class="text-xxs">
              <span v-if="getRulesFormat.length"> {{ getRulesFormat.join() }} files only </span>
              (max file size {{ mediaRules.data.size }}Mb)
            </p>
          </div>
          <div v-if="!inChangeFile" class="text-main text-center pt-6">No documents uploaded</div>
        </template>
      </SwdUpload>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <div class="flex justify-end">
          <SwdButton info main @click="closeDialog">Close</SwdButton>
          <SwdButton class="ml-2" primary main @click="save">
            Save
            <SwdSpinner v-show="loadingCreate" class="mr-2" />
          </SwdButton>
        </div>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import SwdUpload from '@/components/Global/SwdUpload.vue'
import { watchEffect, ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { rules } from '@/validationRules/addAnnuityIndex.js'
import { createInvestmentPackage } from '@/api/vueQuery/create-investment-package'
import { useMutation, useQueryClient } from 'vue-query'
import { useAlert } from '@/utils/use-alert'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useFetchMediaRules } from '@/api/use-fetch-media-rules.js'
import { useBeforeUploadFile } from '@/hooks/use-before-upload-file'

export default {
  name: 'ModalAddInvestmentPackage',
  components: {
    SwdUpload,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const queryClient = useQueryClient()

    const form = ref(null)
    const dialogVisible = ref(false)
    const upload = ref(null)
    const inChangeFile = ref(false)
    const validUpload = ref(true)
    const fileList = reactive([])

    const memberId = route.params.id
    const fixedIndexAnnuitiesId = route.params.annuityId

    const { beforeUploadFile } = useBeforeUploadFile()

    const { isLoading: isLoadingMediaRules, data: mediaRules } = useFetchMediaRules({
      collection: 'investment_package',
    })
    const { mutateAsync: create, isLoading: loadingCreate } = useMutation(createInvestmentPackage)

    const ruleForm = reactive({
      name: '',
      uuids: [],
    })

    watchEffect(() => {
      dialogVisible.value = store.state.globalComponents.dialog.showDialog.modalInvestmentPackage
    })

    const closeDialog = () => {
      if (ruleForm.name || ruleForm.uuids.length) {
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
        destination: 'modalInvestmentPackage',
        value: false,
      })
      initialState()
    }

    const initialState = () => {
      ruleForm.name = ''
      ruleForm.uuids = []
      inChangeFile.value = false
      removeMedia()
    }

    const save = (e) => {
      e.preventDefault()
      if (!ruleForm.uuids.length) validUpload.value = false
      form.value.validate(async (valid) => {
        if (valid && validUpload.value) {
          const res = await create({ id: fixedIndexAnnuitiesId, data: ruleForm })
          if (!('error' in res)) {
            useAlert({
              title: 'Success',
              type: 'success',
              message: 'Annuity Index created',
            })
            queryClient.invalidateQueries(['investment-package-all', fixedIndexAnnuitiesId])
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

    const handleExceed = (files, uploadFiles) => {
      ElMessage.warning(
        `The limit is 1, you selected ${files.length} files this time, add up to ${
          files.length + uploadFiles.length
        } totally`
      )
    }

    const hookBeforeUploadFile = (rawFile) => {
      return beforeUploadFile({ rawFile, rules: mediaRules.value.data })
    }

    const getRulesFormat = computed(() => {
      if (mediaRules.value.data.allowed_types) {
        return mediaRules.value.data.allowed_types.map((element) => {
          return element.extension
        })
      }
      return []
    })

    return {
      dialogVisible,
      closeDialog,
      memberId,
      form,
      ruleForm,
      save,
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
      isLoadingMediaRules,
      mediaRules,
      handleExceed,
      hookBeforeUploadFile,
      getRulesFormat,
    }
  },
}
</script>
