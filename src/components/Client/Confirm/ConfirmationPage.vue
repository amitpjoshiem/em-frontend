<template>
  <div class="p-2 sm:p-5 lg:max-w-5xl lg:my-0 lg:mx-auto lg:w-[960px]">
    <SwdSubHeader title="Confirmation Information" :with-back-btn="!$can('client', 'all')" />

    <div class="border border-border-blue rounded-md p-5 mb-4">
      <div class="flex items-center mb-5">
        <InlineSvg :src="IconDoneStep" />
        <div class="text-main text-xl font-semibold ml-2">Basic</div>
      </div>
      <ConfirmationInformation />
    </div>

    <div class="border border-border-blue rounded-md p-5 mb-4">
      <div class="flex items-center mb-5">
        <InlineSvg :src="IconDoneStep" />
        <div class="text-main text-xl font-semibold ml-2">Assets &amp; Income</div>
      </div>
      <ConfirmationAssets />
    </div>

    <div class="border border-border-blue rounded-md p-5 mb-4">
      <div class="flex items-center mb-5">
        <InlineSvg :src="IconDoneStep" />
        <div class="text-main text-xl font-semibold ml-2">Expenses</div>
      </div>
      <ConfirmationExpense />
    </div>

    <div class="border border-border-blue rounded-md p-5 mb-4">
      <div class="flex items-center mb-5">
        <InlineSvg :src="IconDoneStep" />
        <div class="text-main text-xl font-semibold ml-2">
          Investment and Retirement Accounts (most recent statements)
        </div>
      </div>
      <ListDocumentsClient doc-collections="investment_and_retirement_accounts" page="investment-retirement" />
    </div>

    <div class="border border-border-blue rounded-md p-5 mb-4">
      <div class="flex items-center mb-5">
        <InlineSvg :src="IconDoneStep" />
        <div class="text-main text-xl font-semibold ml-2">
          Life Insurance, Annuity, and Long Term Care Policies (most recent statements)
        </div>
      </div>
      <ListDocumentsClient
        doc-collections="life_insurance_annuity_and_long_terms_care_policies"
        page="life-insurance"
      />
    </div>

    <div class="border border-border-blue rounded-md p-5 mb-4">
      <div class="flex items-center mb-5">
        <InlineSvg :src="IconDoneStep" />
        <div class="text-main text-xl font-semibold ml-2">Social Security Information/Statement(s)</div>
      </div>
      <ListDocumentsClient doc-collections="social_security_information" page="social-security" />
    </div>

    <!-- <div class="border border-border-blue rounded-md p-5 mb-4">
      <div class="flex items-center mb-5">
        <InlineSvg :src="IconDoneStep" />
        <div class="text-main text-xl font-semibold ml-2">List of Stock Certificates or Bonds</div>
      </div>
      <ListDocumentsClient doc-collections="list_of_stock_certificates_or_bonds" page="list-stock" />
    </div> -->

    <div class="flex justify-end mt-6 mb-4">
      <el-button
        v-if="$can('advisor', 'all')"
        type="primary"
        plain
        :disabled="isLoadingConvert"
        :loading="isLoadingConvert"
        @click="convert"
      >
        Convert to opportunity
      </el-button>
    </div>
    <div class="flex justify-end mt-6 mb-4">
      <el-button v-if="$can('client', 'all')" type="info" plain @click="cancel"> Cancel </el-button>
      <el-button v-if="$can('client', 'all')" type="primary" plain :disabled="disabledSubmitBtn" @click="submit">
        Submit
      </el-button>
    </div>
  </div>
</template>

<script>
import ConfirmationInformation from './Basic/ConfirmationBasic.vue'
import ConfirmationExpense from './Expense/ConfirmationExpense.vue'
import ConfirmationAssets from './Assets/ConfirmationAssets.vue'
import ListDocumentsClient from './ListDocuments/ListDocumentsClient'
import { convertLeadToOpportunity } from '@/api/vueQuery/fetch-convert-lead-to-opportunity'
import { sendAllInformation } from '@/api/vueQuery/clients/fetch-send-all-information'
import { useMutation } from 'vue-query'
import { useRoute, useRouter } from 'vue-router'
import { useAlert } from '@/utils/use-alert'
import { onMounted, computed } from 'vue'
import { scrollTop } from '@/utils/scrollTop'
import IconDoneStep from '@/assets/svg/icon-done-step.svg'
import { ElMessageBox } from 'element-plus'
import { useFetchClietsInfo } from '@/api/clients/use-fetch-clients-info'

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

    const id = route.params.id

    const { isLoading: isLoadingInfo, data: clientsInfo } = useFetchClietsInfo()

    const { mutateAsync: convertLead, isLoadingConvert } = useMutation(convertLeadToOpportunity)
    const { mutateAsync: sendAll } = useMutation(sendAllInformation)

    onMounted(() => {
      scrollTop()
    })

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

    const cancel = () => {
      router.push({ name: 'client-dashboard' })
    }

    const submit = () => {
      ElMessageBox.alert('Thank you for submitting your information. We will be in contact soon!', 'Info', {
        showConfirmButton: false,
        showClose: false,
      })

      setTimeout(async function () {
        const res = await sendAll(id)
        if (!('error' in res)) {
          router.push({ name: 'logout' })
        }
      }, 5000)
    }

    const disabledSubmitBtn = computed(() => {
      if (
        clientsInfo.value &&
        clientsInfo.value.steps.completed_financial_fact_finder &&
        clientsInfo.value.steps.investment_and_retirement_accounts &&
        clientsInfo.value.steps.life_insurance_annuity_and_long_terms_care_policies &&
        clientsInfo.value.steps.social_security_information
      ) {
        return false
      }
      return true
    })

    return {
      isLoadingConvert,
      convert,
      IconDoneStep,
      submit,
      cancel,
      isLoadingInfo,
      clientsInfo,
      disabledSubmitBtn,
    }
  },
}
</script>
