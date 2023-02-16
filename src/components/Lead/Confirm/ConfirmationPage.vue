<template>
  <div v-if="!isLoadingInfo" class="p-2 sm:p-5 lg:max-w-5xl lg:my-0 lg:mx-auto lg:w-[960px]">
    <SwdSubHeader :title="getTitle" :with-back-btn="!isReadOnlyLead" witch-info-btn />

    <div class="border border-border-blue rounded-md p-5 mb-4">
      <div class="flex items-center mb-4">
        <InlineSvg :src="IconDoneStep" />
        <div class="text-main text-xl font-semibold ml-2">Basic</div>
      </div>
      <ConfirmationInformation v-if="!isFetchingMember" :member="member" :is-read-only-lead="isReadOnlyLead" />
      <div v-else class="flex justify-center items-center">
        <SwdSpinner large />
      </div>
    </div>

    <div class="border border-border-blue rounded-md p-5 mb-4">
      <div class="flex items-center mb-5">
        <InlineSvg :src="IconDoneStep" />
        <div class="text-main text-xl font-semibold ml-2">Assets &amp; Income</div>
      </div>
      <ConfirmationAssets :is-read-only-lead="isReadOnlyLead" />
    </div>

    <div class="border border-border-blue rounded-md p-5 mb-4">
      <div class="flex items-center mb-5">
        <InlineSvg :src="IconDoneStep" />
        <div class="text-main text-xl font-semibold ml-2">Expenses</div>
      </div>
      <ConfirmationExpense :is-read-only-lead="isReadOnlyLead" />
    </div>

    <div class="border border-border-blue rounded-md p-5 mb-4">
      <div class="flex items-center mb-5">
        <InlineSvg :src="IconDoneStep" />
        <div class="text-main text-xl font-semibold ml-2">
          Investment and Retirement Accounts (most recent statements)
        </div>
      </div>
      <ListDocumentsClient
        doc-collections="investment_and_retirement_accounts"
        page="relevant-financial-documents"
        :is-read-only-lead="isReadOnlyLead"
      />
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
        page="relevant-financial-documents"
        :is-read-only-lead="isReadOnlyLead"
      />
    </div>

    <div class="border border-border-blue rounded-md p-5 mb-4">
      <div class="flex items-center mb-5">
        <InlineSvg :src="IconDoneStep" />
        <div class="text-main text-xl font-semibold ml-2">Social Security Information/Statement(s)</div>
      </div>
      <ListDocumentsClient
        doc-collections="social_security_information"
        page="relevant-financial-documents"
        :is-read-only-lead="isReadOnlyLead"
      />
    </div>

    <div class="border border-border-blue rounded-md p-5 mb-4">
      <div class="flex items-center mb-5">
        <InlineSvg :src="IconDoneStep" />
        <div class="text-main text-xl font-semibold ml-2">
          Upload your Medicare Details (Provider, Policy papers etc.)
        </div>
      </div>
      <ListDocumentsClient
        doc-collections="medicare_details"
        page="medicare-details"
        :is-read-only-lead="isReadOnlyLead"
      />
    </div>

    <div class="border border-border-blue rounded-md p-5 mb-4">
      <div class="flex items-center mb-5">
        <InlineSvg :src="IconDoneStep" />
        <div class="text-main text-xl font-semibold ml-2">Upload your Property Casualty statements</div>
      </div>
      <ListDocumentsClient
        doc-collections="property_casualty"
        page="property-casualty"
        :is-read-only-lead="isReadOnlyLead"
      />
    </div>

    <div v-if="$can('lead', 'all') && errorSend" class="text-center font-semibold pt-4">
      <span class="pulsate">Please fill out all the required information to proceed.</span>
    </div>

    <template v-if="!isFetchingMember">
      <div v-if="$can('advisor', 'all')" class="flex justify-end mt-4 mb-4">
        <SwdButton v-if="member.can_convert" primary main :disabled="isLoadingConvert" @click="convert">
          <SwdSpinner v-show="isLoadingConvert" class="mr-2" />
          Convert
        </SwdButton>
        <SwdButton v-else info main @click="goLeadsList">
          <SwdSpinner v-show="isLoadingConvert" class="mr-2" />
          Close
        </SwdButton>
      </div>
      <div v-if="$can('lead', 'all')" class="flex justify-end my-8">
        <template v-if="!isReadOnlyLead">
          <div class="pr-3">
            <Button default-gray-btn text-btn="Cancel" @click="cancel" />
          </div>
          <SwdButton primary main @click="submit">
            <SwdSpinner v-show="isLoadingSubmitAll" class="mr-2" />
            Submit
          </SwdButton>
        </template>
      </div>
    </template>
    <div v-else class="flex justify-center items-center">
      <SwdSpinner large />
    </div>
    <el-dialog v-model="dialogVisible" title="Info" width="50%" :show-close="false" :close-on-click-modal="false">
      <span>Thank you for submitting your information. We will be in contact soon!</span>
    </el-dialog>
  </div>
  <el-skeleton v-else :rows="15" animated />
  <ModalReadOnly />
</template>

<script>
import ConfirmationInformation from './Basic/ConfirmationBasic.vue'
import ConfirmationAssets from './Assets/ConfirmationAssets.vue'
import ConfirmationExpense from './Expense/ConfirmationExpense.vue'
import ListDocumentsClient from './ListDocuments/ListDocumentsClient'
import IconDoneStep from '@/assets/svg/icon-done-step.svg'
import { convertLeadToOpportunity } from '@/api/vueQuery/fetch-convert-lead-to-opportunity'
import { sendAllInformation } from '@/api/vueQuery/clients/fetch-send-all-information'
import { useMutation } from 'vue-query'
import { useRoute, useRouter } from 'vue-router'
import { useAlert } from '@/utils/use-alert'
import { onMounted, computed, ref } from 'vue'
import { scrollTop } from '@/utils/scrollTop'
import { useFetchClietsInfo } from '@/api/clients/use-fetch-clients-info'
import { useFetchMember } from '@/api/use-fetch-member.js'
import ModalReadOnly from '../ModalReadOnly.vue'

export default {
  name: 'ConfirmationPage',
  components: {
    ConfirmationInformation,
    ConfirmationExpense,
    ConfirmationAssets,
    ListDocumentsClient,
    ModalReadOnly,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const errorSend = ref(false)
    const dialogVisible = ref(false)
    const id = route.params.id

    const { isLoading: isLoadingInfo, data: clientsInfo } = useFetchClietsInfo()
    const { isFetching: isFetchingMember, data: member } = useFetchMember({ id: route.params.id })

    const { mutateAsync: convertLead, isLoading: isLoadingConvert } = useMutation(convertLeadToOpportunity)
    const { mutateAsync: sendAll, isLoading: isLoadingSubmitAll } = useMutation(sendAllInformation)

    onMounted(() => {
      scrollTop()
    })

    const convert = async () => {
      const res = await convertLead(id)
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Convert to opportunity successfully.',
        })
        router.push({ name: `advisor/all` })
      }
    }

    const cancel = () => {
      router.push({ name: 'lead/dashboard' })
    }

    const submit = () => {
      dialogVisible.value = true

      setTimeout(async function () {
        const res = await sendAll(id)
        if (!('error' in res)) {
          dialogVisible.value = false
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
        clientsInfo.value.steps.social_security_information &&
        clientsInfo.value.steps.property_casualty &&
        clientsInfo.value.steps.medicare_details
      ) {
        return false
      }
      return true
    })

    const goLeadsList = () => {
      router.push({ name: `advisor/all-leads` })
    }

    const isReadOnlyLead = computed(() => {
      return clientsInfo.value.readonly
    })

    const getTitle = computed(() => {
      if (clientsInfo.value.readonly) return 'Submitted Info'
      return 'Confirm Information'
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
      isLoadingSubmitAll,
      errorSend,
      goLeadsList,
      isFetchingMember,
      member,
      dialogVisible,
      route,
      isReadOnlyLead,
      getTitle,
    }
  },
}
</script>

<style>
.pulsate {
  -webkit-animation: pulsate 2s ease-out;
  -webkit-animation-iteration-count: infinite;
  opacity: 0.5;
}
@-webkit-keyframes pulsate {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}
</style>
