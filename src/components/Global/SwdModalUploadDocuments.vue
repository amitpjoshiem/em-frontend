<template>
  <el-dialog
    v-model="dialogVisible"
    title="Upload documents"
    width="60%"
    :fullscreen="isFullScreen"
    :before-close="closeDialog"
    destroy-on-close
  >
    <div v-loading="isFetchingMember || isLoadingMember">
      <el-form ref="form" :model="ruleForm" label-position="top" :rules="rules">
        <div class="w-full flex justify-center">
          <el-form-item prop="only_my" class="pb-4">
            <div class="flex" :class="{ 'no-valid-switcher': !validSwitcher }">
              <span
                class="w-32 three-switch-item rounded-tl-md rounded-bl-md"
                :class="{
                  active: ruleForm.is_spouse === false,
                  'cursor-not-allowed': isDisabledSwitcher,
                  'cursor-pointer': !isDisabledSwitcher,
                }"
                @click="changeOwner(false)"
              >
                Owner
              </span>
              <span
                class="three-switch-item cursor-not-allowed w-16"
                :class="{ active: ruleForm.is_spouse === null }"
                @click="changeOwner(null)"
              >
                N/A
              </span>
              <span
                class="w-32 three-switch-item rounded-tr-md rounded-br-md"
                :class="{
                  active: ruleForm.is_spouse === true,
                  'cursor-not-allowed': isDisabledSwitcher,
                  'cursor-pointer': !isDisabledSwitcher,
                }"
                @click="changeOwner(true)"
              >
                Spouse/Partner
              </span>
            </div>
          </el-form-item>
        </div>
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

        <div class="flex">
          <el-form-item
            v-if="collection === 'investment_and_retirement_accounts'"
            label="File type"
            prop="type"
            class="w-6/12 pr-2 pb-5"
          >
            <el-select
              v-model="ruleForm.type"
              class="w-full"
              placeholder="Select"
              allow-create
              filterable
              :loading="isFetchingClientsDocsTypes"
            >
              <el-option v-for="item in docsTypesList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <div v-if="ruleForm.type === 'other'" class="w-6/12 pl-2 flex flex-col">
            <el-form-item label="Other type" prop="custom_type" class="w-full">
              <el-input v-model="ruleForm.custom_type" placeholder="Enter other type" maxlength="60" />
            </el-form-item>
            <div class="text-gray-500 flex justify-end text-xxs">
              <span>{{ 60 - ruleForm.custom_type.length }}</span>
              <span class="pl-1">characters remaining</span>
            </div>
          </div>
        </div>

        <div class="el-form-item__label h-0">File Description</div>
        <div class="flex pb-4 text-main">
          <div class="w-1/12">Note:</div>
          <div class="w-11/12 font-semibold leading-5" style="word-break: break-word">
            Please briefly describe the file you are uploading by listing the carrier or institution below. Examples
            include Fidelity, Amazon Employer Sponsored Plan, or KY Driver’s License.
          </div>
        </div>

        <el-form-item prop="description" class="w-full">
          <el-input v-model="ruleForm.description" placeholder="Enter description" maxlength="60" />
        </el-form-item>
        <div class="mb-4 text-gray-500 flex justify-end text-xxs">
          <span>{{ 60 - ruleForm.description.length }}</span>
          <span class="pl-1">characters remaining</span>
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
              <div v-if="!inChangeFile" class="text-main text-center pt-5">No documents uploaded.</div>
            </template>
          </SwdUpload>
        </div>
      </el-form>
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
  </el-dialog>
</template>

<script>
import SwdUpload from '@/components/Global/SwdUpload.vue'
import { watchEffect, ref, reactive, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { rules } from '@/validationRules/rulesModalUploadDocuments.js'
import { uploadClientsDocs } from '@/api/vueQuery/clients/fetch-upload-clients-docs'
import { useMutation, useQueryClient } from 'vue-query'
import { useSetStatus } from '../Lead/use-set-status'
import { useRoute } from 'vue-router'
import { useFetchMember } from '@/api/use-fetch-member.js'
import { useFetchClientsDocsTypes } from '@/api/use-fetch-clients-docs-types.js'
import { useBreakpoints } from '@/hooks/use-breakpoints'
import { ElNotification } from 'element-plus'

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
    const isDisabledSwitcher = ref(false)
    const validSwitcher = ref(true)

    const { setStatus } = useSetStatus()
    const { screenType } = useBreakpoints()
    const queryClient = useQueryClient()

    const {
      isFetching: isFetchingMember,
      data: member,
      refetch: refetchMember,
      isLoading: isLoadingMember,
    } = useFetchMember({ id: route.params.id }, { enabled: false })

    const {
      isFetching: isFetchingClientsDocsTypes,
      data: clientsDocsTypes,
      refetch: refetchClientsDocsTypes,
    } = useFetchClientsDocsTypes({ enabled: false })

    const { isLoading: isLoadingUpload, mutateAsync: uploadDoc } = useMutation(uploadClientsDocs)

    const ruleForm = reactive({
      name: '',
      last_name: '',
      first_name: '',
      description: '',
      is_spouse: null,
      type: '',
      uuids: [],
      custom_type: '',
    })

    watch(
      dialogVisible,
      (newValue, oldValue) => {
        if (newValue === true && oldValue === false) {
          refetchMember.value()
          if (collection.value === 'investment_and_retirement_accounts') refetchClientsDocsTypes.value()
        }
      },
      { immediate: true }
    )

    watchEffect(() => {
      dialogVisible.value = store.state.globalComponents.dialog.showDialog.modalUploadDocuments
      collection.value = store.state.globalComponents.collectionUploadMedia
      if (member.value && ruleForm.is_spouse) {
        ruleForm.first_name = member.value.spouse.first_name
        ruleForm.last_name = member.value.spouse.last_name
      }
      if (member.value && ruleForm.is_spouse === false) {
        ruleForm.name = member.value.name
      }
      if (!isLoadingMember.value && member.value && !member.value.married) {
        ruleForm.is_spouse = false
        isDisabledSwitcher.value = true
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
      ruleForm.custom_type = ''
      inChangeFile.value = false
      ruleForm.is_spouse = null
      ruleForm.type = null
      validUpload.value = true
      validSwitcher.value = true
      removeMedia()
    }

    const save = async (e) => {
      e.preventDefault()
      if (!ruleForm.uuids.length) validUpload.value = false
      if (ruleForm.is_spouse === null) {
        validSwitcher.value = false
      }
      form.value.validate(async (valid) => {
        if (valid && validUpload.value && validSwitcher.value) {
          const data = {
            uuids: ruleForm.uuids,
            describe: ruleForm.description,
            is_spouse: ruleForm.is_spouse,
            name: ruleForm.is_spouse ? ruleForm.last_name + ' ' + ruleForm.first_name : ruleForm.name,
          }
          if (ruleForm.type && ruleForm.type === 'other') data.type = ruleForm.custom_type
          if (ruleForm.type && ruleForm.type !== 'other') data.type = ruleForm.type

          const response = await uploadDoc({ collection: collection.value, data })
          if (!('error' in response)) {
            inChangeFile.value = false
            queryClient.invalidateQueries(['clientsDocuments', collection.value])
            setStatus({ status: 'completed', context: collection.value })
            closeDialog()
          } else {
            return false
          }
        } else {
          ElNotification({
            title: 'Error',
            message: 'Please enter all required information.',
            type: 'error',
            dangerouslyUseHTMLString: true,
          })
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

    const changeOwner = (value) => {
      ruleForm.is_spouse = value
      validSwitcher.value = true
    }

    const docsTypesList = computed(() => {
      if (!clientsDocsTypes.value) return []
      return [...clientsDocsTypes.value, ...[{ value: 'other', label: 'Other' }]]
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
      changeOwner,
      validSwitcher,
      isFetchingClientsDocsTypes,
      docsTypesList,
    }
  },
}
</script>

<style>
.three-switch-item {
  @apply text-center bg-main-gray text-main;
}

.active {
  @apply bg-primary text-white font-semibold border border-main-blue;
}

.no-valid-switcher {
  @apply border border-red-500 rounded-md;
}
</style>
