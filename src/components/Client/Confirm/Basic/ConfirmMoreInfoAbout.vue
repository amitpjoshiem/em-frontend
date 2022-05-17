<template>
  <div v-if="!isFetchingConfirmationClient && !isFetchingConfirmationAdvisor" class="my-4">
    <div v-if="data.value?.consultation">
      <el-tag v-if="data.value.consultation === 'want_consultation_and_book'" type="success">
        Yes, I want a Free Consultation & Copy of Matt`s Book
      </el-tag>
      <el-tag v-if="data.value.consultation === 'want_consultation'" type="success">
        Yes, I want a Free Consultation
      </el-tag>
      <el-tag v-if="data.value.consultation === 'dont_want_consultation'" type="success">
        No, I don't want a Free Consultation
      </el-tag>
    </div>

    <!-- I Currently Have -->
    <div v-if="data.value?.currently_have">
      <div class="mb-2 text-main font-semibold">I Currently Have:</div>
      <ConfirmMoreInfoItem title="CDs" :value="data.value.currently_have.cds" />
      <ConfirmMoreInfoItem title="Bounds or Bound Funds" :value="data.value.currently_have.bonds_or_bonds_funds" />
      <ConfirmMoreInfoItem title="IRA/TSA/401(k)/403(b)" :value="data.value.currently_have.ira_tsa_401_403" />
      <ConfirmMoreInfoItem title="An Annuity" :value="data.value.currently_have.annuity" />
      <ConfirmMoreInfoItem title="A Variable Annuity" :value="data.value.currently_have.variable_annuity" />
      <ConfirmMoreInfoItem
        title="Long Term Core Insurance"
        :value="data.value.currently_have.long_term_care_insurance"
      />
      <ConfirmMoreInfoItem title="Life Insurance" :value="data.value.currently_have.life_insurance" />
      <ConfirmMoreInfoItem title="Mutual Funds or Stocks" :value="data.value.currently_have.mutual_funds_or_stocks" />
      <ConfirmMoreInfoItem title="Dormant Accounts" :value="data.value.currently_have.dormant_accounts" />
    </div>

    <!-- I Want More Info About: -->
    <div v-if="data.value?.currently_have">
      <div class="mb-2 text-main font-semibold">I Want More Info About:</div>
      <ConfirmMoreInfoItem title="Indexed Annuities" :value="data.value.more_info_about.indexed_annuities" />
      <ConfirmMoreInfoItem
        title="Strategic Wealth Reports"
        :value="data.value.more_info_about.strategic_wealth_report"
      />
      <ConfirmMoreInfoItem title="The rule of 100" :value="data.value.more_info_about.rule_of_100" />
      <ConfirmMoreInfoItem title="Moving my IRA" :value="data.value.more_info_about.moving_my_ira" />
      <ConfirmMoreInfoItem
        title="Rolling Over My 401/403"
        :value="data.value.more_info_about.rolling_over_my_401_403"
      />
      <ConfirmMoreInfoItem
        title="Retirement Income Analysis"
        :value="data.value.more_info_about.retirement_income_analysis"
      />
      <ConfirmMoreInfoItem title="Securing my Money" :value="data.value.more_info_about.securing_my_money" />
      <ConfirmMoreInfoItem title="Tax Free Accounts" :value="data.value.more_info_about.tax_free_accounts" />
      <ConfirmMoreInfoItem title="My Variable Annuity" :value="data.value.more_info_about.my_variable_annuity" />
    </div>
  </div>
  <div v-else class="flex justify-center items-center">
    <SwdSpinner large />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useFetchClietsConfirmation } from '@/api/clients/use-fetch-confirmation.js'
import { useFetchGetClietsConfirmation } from '@/api/use-fetch-get-clients-confirmation.js'
import { useRoute } from 'vue-router'
import ConfirmMoreInfoItem from './ConfirmMoreInfoItem.vue'
export default {
  name: 'ConfirmMoreInfoAbout',
  components: {
    ConfirmMoreInfoItem,
  },
  setup() {
    const route = useRoute()
    const data = ref({})

    const {
      isLoading: isLoadingClient,
      isFetching: isFetchingConfirmationClient,
      data: confirmationDataClient,
      refetch: refetchClient,
    } = useFetchClietsConfirmation({ enabled: false })

    const {
      isLoading: isLoadingAdvisor,
      isFetching: isFetchingConfirmationAdvisor,
      data: confirmationDataAdvisor,
      refetch: refetchAdvisor,
    } = useFetchGetClietsConfirmation(route.params.id, { enabled: false })

    onMounted(async () => {
      if (route.params.id) {
        await refetchAdvisor.value()
        data.value = confirmationDataAdvisor
      } else {
        await refetchClient.value()
        data.value = confirmationDataClient
      }
    })

    return {
      isLoadingClient,
      isFetchingConfirmationClient,
      confirmationDataClient,
      refetchClient,

      isLoadingAdvisor,
      isFetchingConfirmationAdvisor,
      confirmationDataAdvisor,
      refetchAdvisor,
      data,
    }
  },
}
</script>
