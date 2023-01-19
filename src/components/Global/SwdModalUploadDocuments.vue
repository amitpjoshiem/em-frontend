<template>
  <el-dialog
    v-model="dialogVisible"
    title="Upload documents"
    width="55%"
    :fullscreen="isFullScreen"
    :before-close="closeDialog"
    destroy-on-close
  >
    <el-form ref="form" :model="ruleForm" label-position="top" :rules="rules">
      <el-form-item prop="only_my" class="only-my-filter pb-2 h-[40px]">
        <el-switch
          v-model="ruleForm.is_spouse"
          active-text="Spouse/Partner"
          :loading="isFetchingMember || isLoadingMember"
          inactive-text="Owner"
          style="--el-switch-on-color: #f58833; --el-switch-off-color: #83ccf0"
          :disabled="isDisabledSwitcher"
        />
      </el-form-item>
      <div v-loading="isFetchingMember || isLoadingMember">
        <div v-if="!ruleForm.is_spouse">
          <el-form-item label="Name" prop="name" class="w-full mb-4">
            <el-input v-model="ruleForm.name" placeholder="Enter name" />
          </el-form-item>
        </div>
        <div v-else class="flex">
          <el-form-item label="First name" prop="first_name" class="w-full mb-4 mr-2">
            <el-input v-model="ruleForm.first_name" placeholder="Enter first name" />
          </el-form-item>
          <el-form-item label="Last name" prop="last_name" class="w-full mb-4 ml-2">
            <el-input v-model="ruleForm.last_name" placeholder="Enter name" />
          </el-form-item>
        </div>

        <el-form-item label="Description" prop="description" class="w-full mb-4">
          <el-input v-model="ruleForm.description" placeholder="Enter description" type="textarea" />
        </el-form-item>
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
      </div>
    </el-form>
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
  </el-dialog>
</template>

<script>
import SwdUpload from '@/components/Global/SwdUpload.vue'
import { watchEffect, ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { rules } from '@/validationRules/rulesModalUploadDocuments.js'
import { uploadClientsDocs } from '@/api/vueQuery/clients/fetch-upload-clients-docs'
import { useMutation, useQueryClient } from 'vue-query'
import { useSetStatus } from '../Lead/use-set-status'
import { useRoute } from 'vue-router'
import { useFetchMember } from '@/api/use-fetch-member.js'
import { useBreakpoints } from '@/hooks/useBreakpoints'

export default {
  name: 'SwdModalUploadDocuments',
  components: {
    SwdUpload,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const form = ref(null)
    const dialogVisible = ref(false)
    const upload = ref(null)
    const inChangeFile = ref(false)
    const validUpload = ref(true)
    const collection = ref(null)
    const isDisabledSwitcher = ref(true)

    const { setStatus } = useSetStatus()
    const { screenType } = useBreakpoints()
    const queryClient = useQueryClient()

    const {
      isFetching: isFetchingMember,
      data: member,
      refetch: refetchMember,
      isLoading: isLoadingMember,
    } = useFetchMember({ id: route.params.id }, { enabled: false })

    const { isLoading: isLoadingUpload, mutateAsync: uploadDoc } = useMutation(uploadClientsDocs)

    const ruleForm = reactive({
      name: '',
      last_name: '',
      first_name: '',
      description: '',
      is_spouse: false,
      uuids: [],
    })

    watchEffect(() => {
      dialogVisible.value = store.state.globalComponents.dialog.showDialog.modalUploadDocuments
      collection.value = store.state.globalComponents.collectionUploadMedia
      if (dialogVisible.value) {
        refetchMember.value()
      }
      if (member.value && ruleForm.is_spouse) {
        ruleForm.first_name = member.value.spouse.first_name
        ruleForm.last_name = member.value.spouse.last_name
      }
      if (member.value && !ruleForm.is_spouse) {
        ruleForm.name = member.value.name
      }
      if (!isLoadingMember.value && member.value && member.value.married) {
        isDisabledSwitcher.value = false
      }
    })

    const closeDialog = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'modalUploadDocuments',
        value: false,
      })
      initialState()
    }

    const initialState = () => {
      ruleForm.name = ''
      ruleForm.last_name = ''
      ruleForm.first_nama = ''
      ruleForm.description = ''
      ruleForm.uuids = []
      inChangeFile.value = false
      ruleForm.is_spouse = false
      removeMedia()
    }

    const save = async (e) => {
      e.preventDefault()
      if (!ruleForm.uuids.length) validUpload.value = false
      form.value.validate(async (valid) => {
        if (valid && validUpload.value) {
          const data = {
            uuids: ruleForm.uuids,
            describe: ruleForm.description,
            is_spouse: ruleForm.is_spouse,
            name: ruleForm.is_spouse ? ruleForm.last_name + ' ' + ruleForm.first_name : ruleForm.name,
          }
          const response = await uploadDoc({ collection: collection.value, data })
          if (!('error' in response)) {
            inChangeFile.value = false
            queryClient.invalidateQueries(['clientsDocuments', collection.value])
            setStatus({ status: 'completed', context: collection.value })
            closeDialog()
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

    const isFullScreen = computed(() => {
      if (screenType.value === 'xs') return true
      return false
    })

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
      isFetchingMember,
      member,
      screenType,
      isFullScreen,
      isDisabledSwitcher,
      isLoadingMember,
    }
  },
}
</script>

<style>
.only-my-filter .el-switch__label.el-switch__label--right.is-active {
  color: #f58833;
}
</style>
