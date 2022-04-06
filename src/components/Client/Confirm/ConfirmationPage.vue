<template>
  <div class="p-2 sm:p-5 lg:max-w-5xl lg:my-0 lg:mx-auto lg:w-[960px]">
    <SwdSubHeader title="Confirmation Information" class="mt-2" />
    <el-collapse v-model="activeNames" accordion>
      <el-collapse-item title="Basic" name="basic">
        <ConfirmationInformation />
      </el-collapse-item>

      <el-collapse-item title="Assets &amp; Income" name="assets">
        <ConfirmationAssets v-if="activeNames === 'assets'" />
      </el-collapse-item>

      <el-collapse-item title="Expense" name="expense">
        <ConfirmationExpense v-if="activeNames === 'expense'" />
      </el-collapse-item>

      <el-collapse-item title="Investment and Retirement Accounts (most recent statements)" name="investment">
        <ListDocumentsClient
          v-if="activeNames === 'investment'"
          doc-collections="investment_and_retirement_accounts"
          page="investment-retirement"
        />
      </el-collapse-item>

      <el-collapse-item
        title="Life Insurance, Annuity, and Long Term Care Policies (most recent statements)"
        name="life-insurance"
      >
        <ListDocumentsClient
          v-if="activeNames === 'life-insurance'"
          doc-collections="life_insurance_annuity_and_long_terms_care_policies"
          page="life-insurance"
        />
      </el-collapse-item>

      <el-collapse-item title="Social Security Information/Statement(s)" name="social-security">
        <ListDocumentsClient
          v-if="activeNames === 'social-security'"
          doc-collections="social_security_information"
          page="social-security"
        />
      </el-collapse-item>

      <el-collapse-item title="List of Stock Certificates or Bonds" name="list-stock">
        <ListDocumentsClient
          v-if="activeNames === 'list-stock'"
          doc-collections="list_of_stock_certificates_or_bonds"
          page="list-stock"
        />
      </el-collapse-item>
    </el-collapse>
    <div class="flex justify-end mt-6 mb-4">
      <el-button
        v-if="$can('advisor', 'all')"
        type="primary"
        plain
        :disabled="isLoading"
        :loading="isLoading"
        @click="convert"
      >
        Convert to opportunity
      </el-button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

import ConfirmationInformation from './Basic/ConfirmationBasic.vue'
import ConfirmationExpense from './Expense/ConfirmationExpense.vue'
import ConfirmationAssets from './Assets/ConfirmationAssets.vue'
import ListDocumentsClient from './ListDocuments/ListDocumentsClient'

import { convertLeadToOpportunity } from '@/api/vueQuery/fetch-convert-lead-to-opportunity'
import { useMutation } from 'vue-query'
import { useRoute, useRouter } from 'vue-router'
import { useAlert } from '@/utils/use-alert'

export default {
  name: 'ConfirmationPage',
  components: {
    ConfirmationInformation,
    ConfirmationExpense,
    ConfirmationAssets,
    ListDocumentsClient,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeNames = ref(['basic'])

    const id = route.params.id

    const { mutateAsync: convertLead, isLoading } = useMutation(convertLeadToOpportunity)

    const convert = async () => {
      const res = await convertLead(id)
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Convert to opportunity successfully',
        })
        router.push({ name: 'member-details', params: { id } })
      }
    }

    return {
      activeNames,
      isLoading,
      convert,
    }
  },
}
</script>
