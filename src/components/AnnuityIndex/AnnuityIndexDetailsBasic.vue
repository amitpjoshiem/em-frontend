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

      <div v-else>
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
              <el-button type="primary" size="small" plain class="mt-4 w-[130px]">Change document</el-button>
            </template>
          </SwdUpload>
          <el-button
            type="primary"
            size="small"
            plain
            class="mt-4 w-[130px]"
            @click="handlePreview(ruleForm.media.url)"
          >
            Preview
          </el-button>
        </div>
        <div class="w-8/12 text-xss">
          <el-form ref="form" :model="ruleForm">
            <div class="text-main flex items-center h-6">
              <span class="w-4/12 text-gray03 font-semibold">Document name:</span>
              <el-form-item v-if="isEdit" size="small" class="w-4/12">
                <el-input v-model="ruleForm.name" />
              </el-form-item>
              <span v-else class="w-4/12">{{ ruleForm.name }}</span>
            </div>
            <div class="text-main flex items-center h-6 mt-2">
              <span class="w-4/12 text-gray03 font-semibold">Insurance provider:</span>
              <el-form-item v-if="isEdit" size="small" class="w-4/12">
                <el-input v-model="ruleForm.insurance_provider" />
              </el-form-item>
              <span v-else class="w-4/12">{{ ruleForm.insurance_provider }}</span>
            </div>
            <div class="text-main flex items-center h-6 mt-2">
              <span class="w-4/12 text-gray03 font-semibold">Date signed advisor:</span>
              <SwdStubForText :text="ruleForm.advisor_signed" plug="&mdash;" class="text-sm text-main" />
            </div>
            <div class="text-main flex items-center h-6 mt-2">
              <span class="w-4/12 text-gray03 font-semibold">Date signed client:</span>
              <SwdStubForText :text="ruleForm.client_signed" plug="&mdash;" class="text-sm text-main" />
            </div>
            <div class="text-main flex items-center h-6 mt-2">
              <span class="w-4/12 text-gray03 font-semibold">Tax Qualification:</span>
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
              <span class="w-4/12 text-gray03 font-semibold">Agent Rep Code:</span>
              <el-form-item v-if="isEdit" size="small" class="w-4/12">
                <el-input v-model="ruleForm.agent_rep_code" />
              </el-form-item>
              <span v-else class="w-4/12">{{ ruleForm.agent_rep_code }}</span>
            </div>
            <div class="text-main flex items-center h-6 mt-2">
              <span class="w-4/12 text-gray03 font-semibold">License Number:</span>
              <el-form-item v-if="isEdit" size="small" class="w-4/12">
                <el-input v-model="ruleForm.license_number" />
              </el-form-item>
              <span v-else class="w-4/12">{{ ruleForm.license_number }}</span>
            </div>
          </el-form>
        </div>
      </div>
      <div class="flex justify-end">
        <div v-if="isEdit">
          <el-button type="primary" size="small" class="w-[60px]" @click="cancelEdit">Cancel</el-button>
          <el-button
            type="primary"
            size="small"
            :loading="loadingUpdate"
            class="w-[60px]"
            @click="saveBasicInformation"
          >
            Save
          </el-button>
        </div>
        <div v-else>
          <el-popconfirm title="Are you sure to delete this?" @confirm="confirmDelete()">
            <template #reference>
              <el-button type="danger" size="small" class="w-[60px]" plain :loading="loadingDeleteAnnuity">
                Delete
              </el-button>
            </template>
          </el-popconfirm>

          <el-button type="primary" size="small" plain>Send</el-button>
          <el-button
            v-if="!ruleForm.is_advisor_signed"
            type="primary"
            size="small"
            plain
            :loading="loadingSignAnnuityIndex"
            class="w-[60px]"
            @click="sign"
          >
            Sign
          </el-button>
          <el-button v-if="!isEdit" type="primary" size="small" class="w-[60px]" plain @click="editBasicInformation">
            Edit
          </el-button>
        </div>
      </div>
    </template>
  </div>
  <PrewiewPdfModal v-if="state.dialogVisible" :pdf-url="state.previewUrl" />
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
import { EditPen } from '@element-plus/icons-vue'
import { useMutation, useQueryClient } from 'vue-query'
import PrewiewPdfModal from '@/components/NewProspect/StressTestResult/PrewievPdfModal.vue'
import SwdUpload from '@/components/Global/SwdUpload.vue'
import IconDoneStep from '@/assets/svg/icon-done-step.svg'

export default {
  name: 'AnnuityIndexDetailsBasic',
  components: {
    Document,
    SwdUpload,
    PrewiewPdfModal,
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

    const state = reactive({
      dialogVisible: false,
      previewUrl: '',
    })

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
        setInitValue(res.data)
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Annuity Index signed',
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
      state.previewUrl = url
      state.dialogVisible = true
      store.commit('globalComponents/setShowModal', {
        destination: 'prewievPdf',
        value: true,
      })
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
      state,

      confirmDelete,
      loadingDeleteAnnuity,
    }
  },
}
</script>
