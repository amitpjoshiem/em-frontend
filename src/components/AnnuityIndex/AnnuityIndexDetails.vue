<template>
  <div class="p-5">
    <SwdSubHeader title="Fixed Index Annuity Details" />
    <div class="border border-color-grey rounded-md p-5 mb-4">
      <div class="flex justify-between items-center mb-5">
        <div class="flex">
          <InlineSvg :src="IconDoneStep" />
          <div class="text-main text-xl font-semibold ml-2">Basic Information</div>
        </div>
        <el-button v-if="isEdit" type="success" :icon="Check" circle @click="saveBasicInformation" />
        <el-button v-else type="primary" :icon="Edit" circle @click="editBasicInformation" />
      </div>
      <div class="flex items-center justify-center">
        <div class="w-4/12">
          <el-icon color="#042D52" :size="100"><Document /></el-icon>
        </div>
        <div class="w-8/12 text-xss">
          <el-form ref="form" :model="ruleForm">
            <div class="text-main flex items-center h-6">
              <span class="w-6/12 text-gray03 font-semibold">Document name:</span>
              <el-form-item v-if="isEdit" size="small">
                <el-input v-model="ruleForm.document_name" />
              </el-form-item>
              <span v-else class="w-6/12">{{ ruleForm.document_name }}</span>
            </div>
            <div class="text-main flex items-center h-6 mt-2">
              <span class="w-6/12 text-gray03 font-semibold">Insurance provider:</span>
              <el-form-item v-if="isEdit" size="small">
                <el-input v-model="ruleForm.insurance_provider" />
              </el-form-item>
              <span v-else class="w-6/12">{{ ruleForm.insurance_provider }}</span>
            </div>
            <div class="text-main flex items-center h-6 mt-2">
              <span class="w-6/12 text-gray03 font-semibold">Date signed:</span>
              <el-form-item v-if="isEdit" size="small">
                <el-input v-model="ruleForm.date_signed" />
              </el-form-item>
              <span v-else class="w-6/12">{{ ruleForm.date_signed }}</span>
            </div>
            <div class="text-main flex items-center h-6 mt-2">
              <span class="w-6/12 text-gray03 font-semibold">Tax Qualification:</span>
              <div class="w-6/12 flex items-center cursor-pointer">Tax Qualification</div>
            </div>
            <div class="text-main flex items-center h-6 mt-2">
              <span class="w-6/12 text-gray03 font-semibold">Agent Rep Code:</span>
              <el-form-item v-if="isEdit" size="small">
                <el-input v-model="ruleForm.agent_rep_code" />
              </el-form-item>
              <span v-else class="w-6/12">{{ ruleForm.agent_rep_code }}</span>
            </div>
            <div class="text-main flex items-center h-6 mt-2">
              <span class="w-6/12 text-gray03 font-semibold">License Number:</span>
              <el-form-item v-if="isEdit" size="small">
                <el-input v-model="ruleForm.license_number" />
              </el-form-item>
              <span v-else class="w-6/12">{{ ruleForm.license_number }}</span>
            </div>
          </el-form>
        </div>
      </div>
    </div>

    <div class="border border-color-grey rounded-md p-5 mb-4">
      <div class="flex items-center mb-5">
        <InlineSvg :src="IconDoneStep" />
        <div class="text-main text-xl font-semibold ml-2">Investment Package</div>
      </div>

      <el-row :gutter="20">
        <el-col :span="12">
          <AnnuityIndexDetailsItem />
        </el-col>
        <el-col :span="12">
          <AnnuityIndexDetailsItem />
        </el-col>
        <el-col :span="12">
          <AnnuityIndexDetailsItem />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import IconDoneStep from '@/assets/svg/icon-done-step.svg'
import { Document, Edit, Check } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import AnnuityIndexDetailsItem from './AnnuityIndexDetailsItem.vue'
export default {
  name: 'AnnuityIndexDetails',
  components: {
    Document,
    AnnuityIndexDetailsItem,
  },
  setup() {
    const form = ref(null)
    const isEdit = ref(false)

    const ruleForm = reactive({
      document_name: 'Annuity Index name',
      insurance_provider: 'Insurance provider',
      date_signed: '01/01/2022',
      agent_rep_code: '123456789',
      license_number: '123456789',
    })

    const editBasicInformation = () => {
      isEdit.value = true
    }

    const saveBasicInformation = () => {
      isEdit.value = false
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
    }
  },
}
</script>
