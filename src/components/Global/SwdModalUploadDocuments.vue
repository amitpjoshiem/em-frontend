<template>
  <el-dialog v-model="dialogVisible" title="Upload documents" width="55%" :before-close="closeDialog" destroy-on-close>
    <el-form ref="form" :model="ruleForm" label-position="top" :rules="rules">
      <el-form-item label="First Name" prop="first_name" class="w-full mb-4">
        <el-input v-model="ruleForm.first_name" placeholder="Enter first name" />
      </el-form-item>
      <el-form-item label="Last Name" prop="last_name" class="w-full mb-4">
        <el-input v-model="ruleForm.last_name" placeholder="Enter last name" />
      </el-form-item>
      <el-form-item label="Description" prop="description" class="w-full mb-4">
        <el-input v-model="ruleForm.description" placeholder="Enter description" type="textarea" />
      </el-form-item>
    </el-form>
    <div class="pb-4 text-main">
      <p>
        This could be the account type of a statement you are submitting, or a personal document such as a driver’s
        license. Examples Include: Fidelity 401k Statement or KY Driver’s License.
      </p>
    </div>
    <div class="h-[170px] border rounded p-2" :class="validUpload ? 'border-main-gray' : 'border-color-error'">
      <SwdUpload
        :upload-data="{ collection }"
        :show-file-list="true"
        :auto-upload="true"
        :show-file-block="true"
        :limit="1"
        @upload-success="handleSuccess"
        @upload-change="handleChange"
        @upload-mounted="bindRef"
        @remove-media="removeMedia"
      >
        <template #noDocuments>
          <div v-if="!inChangeFile" class="text-main text-center pt-5">No documents uploaded</div>
        </template>
      </SwdUpload>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <div class="flex justify-end">
          <SwdButton info main @click="closeDialog">Close</SwdButton>
          <SwdButton class="ml-2 w-[100px]" primary main @click="save">
            Save
            <SwdSpinner v-show="isLoadingUpload" class="mr-2" />
          </SwdButton>
        </div>
      </span>
    </template>
    <div>{{ collection }}</div>
  </el-dialog>
</template>

<script>
import SwdUpload from '@/components/Global/SwdUpload.vue'
import { watchEffect, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { rules } from '@/validationRules/rulesModalUploadDocuments.js'
import { ElMessageBox } from 'element-plus'
import { uploadClientsDocs } from '@/api/vueQuery/clients/fetch-upload-clients-docs'
import { useMutation, useQueryClient } from 'vue-query'
import { useSetStatus } from '../Lead/use-set-status'

export default {
  name: 'SwdModalUploadDocuments',
  components: {
    SwdUpload,
  },
  setup() {
    const store = useStore()
    const form = ref(null)
    const dialogVisible = ref(false)
    const upload = ref(null)
    const inChangeFile = ref(false)
    const validUpload = ref(true)
    const collection = ref(null)

    const { setStatus } = useSetStatus()

    const queryClient = useQueryClient()

    const { isLoading: isLoadingUpload, mutateAsync: uploadDoc } = useMutation(uploadClientsDocs)

    const ruleForm = reactive({
      first_name: '',
      last_name: '',
      description: '',
      uuids: [],
    })

    watchEffect(() => {
      dialogVisible.value = store.state.globalComponents.dialog.showDialog.modalUploadDocuments
      collection.value = store.state.globalComponents.collectionUploadMedia
    })

    const closeDialog = () => {
      if (ruleForm.first_name || ruleForm.last_name || ruleForm.description) {
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
        destination: 'modalUploadDocuments',
        value: false,
      })
      initialState()
    }

    const initialState = () => {
      ruleForm.description = ''
      ruleForm.uuids = []
      inChangeFile.value = false
      removeMedia()
    }

    const save = async (e) => {
      e.preventDefault()
      if (!ruleForm.uuids.length) validUpload.value = false
      form.value.validate(async (valid) => {
        if (valid && validUpload.value) {
          const response = await uploadDoc({ collection: collection.value, data: ruleForm })
          if (!('error' in response)) {
            inChangeFile.value = false
            queryClient.invalidateQueries(['clientsDocuments', collection.value])
            setStatus({ status: 'completed', context: collection.value })
            doneCloceDialog()
          } else {
            return false
          }
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
      inChangeFile.value = false
      ruleForm.uuids = []
    }

    const handleSuccess = (res) => {
      validUpload.value = true
      ruleForm.uuids.push(res.data.uuid)
    }

    return {
      dialogVisible,
      closeDialog,
      form,
      ruleForm,
      save,
      rules,
      handleChange,
      bindRef,
      removeMedia,
      handleSuccess,
      inChangeFile,
      validUpload,
      isLoadingUpload,
      collection,
    }
  },
}
</script>
