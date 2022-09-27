<template>
  <div
    v-loading="loadingUpdate || loadingSignAnnuityIndex"
    class="border border-color-grey rounded-md p-5 mb-4 h-[334px]"
  >
    <div class="flex justify-between items-center mb-5">
      <div class="flex">
        <InlineSvg :src="IconDoneStep" />
        <div class="text-main text-xl font-semibold ml-2">Basic Information</div>
      </div>
      <SwdSpinner v-if="isLoading" />

      <div v-else class="flex">
        <SwdButton
          v-if="ruleForm.is_client_signed && ruleForm.is_advisor_signed"
          primary
          small
          class="mr-4"
          @click="handlePreview(ruleForm.certificate.url)"
        >
          Add Index Annuity
        </SwdButton>

        <el-tag :type="ruleForm.is_client_signed ? 'success' : 'danger'" class="mr-4">
          <el-icon><EditPen /></el-icon>
          Client
        </el-tag>
        <el-tag :type="ruleForm.is_advisor_signed ? 'success' : 'danger'">
          <el-icon><EditPen /></el-icon>
          Advisor
        </el-tag>
      </div>
    </div>

    <el-skeleton v-if="isLoading" :rows="3" animated />
    <template v-else-if="annuityIndex.data">
      <div class="flex items-center justify-center">
        <div class="w-4/12 flex items-center justify-center flex-col">
          <el-icon color="#042D52" :size="100"><Document /></el-icon>
          <SwdUpload
            :upload-data="{ collection: 'fixed_index_annuities' }"
            :auto-upload="true"
            @upload-success="handleChangeDocSuccess"
            @upload-mounted="bindRef"
          >
            <template #main>
              <SwdButton primary small class="mt-4 w-[135px]">Change document</SwdButton>
            </template>
          </SwdUpload>
          <SwdButton primary small class="mt-4 w-[135px]" @click="handlePreview(ruleForm.media.url)">Preview</SwdButton>
        </div>
        <div class="w-8/12 text-xss">
          <el-form ref="form" :model="ruleForm">
            <div class="text-main flex items-center h-6">
              <span class="w-4/12 text-main font-semibold">Document name:</span>
              <el-form-item v-if="isEdit" size="small" class="w-4/12">
                <el-input v-model="ruleForm.name" />
              </el-form-item>
              <span v-else class="w-4/12">{{ ruleForm.name }}</span>
            </div>
            <div class="text-main flex items-center h-6 mt-2">
              <span class="w-4/12 text-main font-semibold">Insurance provider:</span>
              <el-form-item v-if="isEdit" size="small" class="w-4/12">
                <el-input v-model="ruleForm.insurance_provider" />
              </el-form-item>
              <span v-else class="w-4/12">{{ ruleForm.insurance_provider }}</span>
            </div>
            <div class="text-main flex items-center h-6 mt-2">
              <span class="w-4/12 text-main font-semibold">Date signed advisor:</span>
              <SwdStubForText :text="ruleForm.advisor_signed" plug="&mdash;" class="text-sm text-main" />
            </div>
            <div class="text-main flex items-center h-6 mt-2">
              <span class="w-4/12 text-main font-semibold">Date signed client:</span>
              <SwdStubForText :text="ruleForm.client_signed" plug="&mdash;" class="text-sm text-main" />
            </div>
            <div class="text-main flex items-center h-6 mt-2">
              <span class="w-4/12 text-main font-semibold">Tax Qualification:</span>
              <el-form-item v-if="isEdit" size="small" class="w-4/12">
                <el-select
                  v-model="ruleForm.tax_qualification"
                  class="w-full"
                  placeholder="Select Tax Qualification"
                  :loading="isLoadingInit"
                >
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
              <div v-else class="w-4/12 flex items-center cursor-pointer">{{ ruleForm.tax_qualification }}</div>
            </div>
            <div class="text-main flex items-center h-6 mt-2">
              <span class="w-4/12 text-main font-semibold">Agent Rep Code:</span>
              <el-form-item v-if="isEdit" size="small" class="w-4/12">
                <el-input v-model="ruleForm.agent_rep_code" />
              </el-form-item>
              <span v-else class="w-4/12">{{ ruleForm.agent_rep_code }}</span>
            </div>
            <div class="text-main flex items-center h-6 mt-2">
              <span class="w-4/12 text-main font-semibold">License Number:</span>
              <el-form-item v-if="isEdit" size="small" class="w-4/12">
                <el-input v-model="ruleForm.license_number" />
              </el-form-item>
              <span v-else class="w-4/12">{{ ruleForm.license_number }}</span>
            </div>
          </el-form>
        </div>
      </div>
      <div class="flex justify-end">
        <div v-if="isEdit" class="flex">
          <SwdButton info small class="w-[60px] mr-2" @click="cancelEdit">Cancel</SwdButton>
          <SwdButton primary small :disabled="loadingUpdate" class="w-[60px]" @click="saveBasicInformation">
            <SwdSpinner v-show="loadingUpdate" class="mr-2" />
            Save
          </SwdButton>
        </div>
        <div v-else class="flex">
          <el-popconfirm title="Are you sure to delete this?" @confirm="confirmDelete()">
            <template #reference>
              <el-button type="danger" size="small" class="w-[60px]" plain :loading="loadingDeleteAnnuity">
                Delete
              </el-button>
            </template>
          </el-popconfirm>
          <SwdButton primary small class="ml-2">Send</SwdButton>
          <SwdButton
            v-if="!ruleForm.is_advisor_signed"
            class="ml-2"
            :disabled="loadingSignAnnuityIndex"
            primary
            small
            @click="sign"
          >
            <SwdSpinner v-show="loadingSignAnnuityIndex" class="mr-2" />
            Sign
          </SwdButton>
          <SwdButton v-if="!isEdit" class="ml-2" primary small @click="editBasicInformation">Edit</SwdButton>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { Document, Edit, Check } from '@element-plus/icons-vue'
import { reactive, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAnnuityIndexFind } from '@/api/use-fetch-annuity-index-find.js'
import { updateAnnuityIndex } from '@/api/vueQuery/update-annuity-index'
import { fetchSignAnnuityIndex } from '@/api/vueQuery/fetch-sign-annuity-index'
import { fetchDeleteAnnuityIndex } from '@/api/vueQuery/fetch-delete-annuity-index'
import { useAlert } from '@/utils/use-alert'
import { useFetchTaxQualificationInit } from '@/api/use-fetch-tax-qualification-init.js'
import { useStore } from 'vuex'
import { EditPen, Key } from '@element-plus/icons-vue'
import { useMutation, useQueryClient } from 'vue-query'
import SwdUpload from '@/components/Global/SwdUpload.vue'
import IconDoneStep from '@/assets/svg/icon-done-step.svg'

export default {
  name: 'AnnuityIndexDetailsBasic',
  components: {
    Document,
    SwdUpload,
    EditPen,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const queryClient = useQueryClient()

    const form = ref(null)
    const options = ref([])
    const isEdit = ref(false)
    const upload = ref(null)
    const isChangeDocument = ref(false)

    const { isLoading, data: annuityIndex } = useAnnuityIndexFind(route.params.annuityId)
    const { isLoading: isLoadingInit, data: init } = useFetchTaxQualificationInit()

    const { mutateAsync: update, isLoading: loadingUpdate } = useMutation(updateAnnuityIndex)
    const { mutateAsync: signAnnuityIndex, isLoading: loadingSignAnnuityIndex } = useMutation(fetchSignAnnuityIndex)
    const { mutateAsync: deleteAnnuity, isLoading: loadingDeleteAnnuity } = useMutation(fetchDeleteAnnuityIndex)

    const ruleForm = reactive({})

    const setInitValue = (data) => {
      Object.assign(ruleForm, data)
    }

    watchEffect(() => {
      if (!isLoading.value) {
        setInitValue(annuityIndex.value.data)
      }
      if (!isLoadingInit.value && init.value) {
        options.value = init.value.tax_qualifications.map((item) => {
          return { label: item, value: item }
        })
      }
      if (store.state.globalComponents.needUpdateContent?.value === 'fixed_annuities_index') {
        store.commit('globalComponents/setNeedUpdateContent', {
          value: null,
        })
        queryClient.invalidateQueries(['investment-package-all', route.params.annuityId])
        queryClient.invalidateQueries(['annuityIndexFind', route.params.annuityId])
      }
    })

    const editBasicInformation = () => {
      isEdit.value = true
    }

    const saveBasicInformation = () => {
      form.value.validate(async (valid) => {
        if (valid) {
          const data = {
            name: ruleForm.name,
            insurance_provider: ruleForm.insurance_provider,
            tax_qualification: ruleForm.tax_qualification,
            agent_rep_code: ruleForm.agent_rep_code,
            license_number: ruleForm.license_number,
          }
          const res = await update({ form: data, id: route.params.annuityId })
          if (!('error' in res)) {
            isEdit.value = false
            queryClient.invalidateQueries(['annuityIndexFind', route.params.annuityId])
            useAlert({
              title: 'Success',
              type: 'success',
              message: 'Update successfully',
            })
          }
        }
      })
    }

    const sign = async () => {
      const res = await signAnnuityIndex(annuityIndex.value.data.id)
      if (!('error' in res)) {
        window.open(res.data.url, '_blank')
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'A signing link has been sent to your email.',
        })
      }
    }

    const cancelEdit = () => {
      isEdit.value = false
      setInitValue(annuityIndex.value.data)
    }

    const bindRef = (ref) => {
      upload.value = ref.value
    }

    const handleChangeDocSuccess = async (file) => {
      isChangeDocument.value = true
      const res = await update({ form: { uuids: [file.data.uuid] }, id: route.params.annuityId })
      if (!('error' in res)) {
        setInitValue(res.data)
        isChangeDocument.value = false
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Update successfully',
        })
      }
    }

    const handlePreview = (url) => {
      store.commit('globalComponents/setShowModal', {
        destination: 'prewievPdf',
        value: true,
      })
      store.commit('globalComponents/setPreviewUrlPdf', url)
    }

    const confirmDelete = async () => {
      const res = await deleteAnnuity(route.params.annuityId)
      if (!('error' in res)) {
        router.push({ name: 'annuity-index', params: { id: route.params.id } })
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Delete successfully',
        })
      }
    }

    return {
      IconDoneStep,
      Edit,
      Check,
      editBasicInformation,
      ruleForm,
      form,
      isEdit,
      saveBasicInformation,
      isLoading,
      annuityIndex,
      update,
      loadingUpdate,
      isLoadingInit,
      init,
      options,
      cancelEdit,
      signAnnuityIndex,
      loadingSignAnnuityIndex,
      sign,
      bindRef,
      handleChangeDocSuccess,
      handlePreview,
      confirmDelete,
      loadingDeleteAnnuity,
      Key,
    }
  },
}
</script>
