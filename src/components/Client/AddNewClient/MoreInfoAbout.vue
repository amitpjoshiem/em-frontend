<template>
  <div v-if="!isLoadingClient && !isLoadingAdvisor" class="my-4 px-5">
    <el-form ref="form" :model="ruleForm" label-position="top">
      <!-- <el-form-item class="mb-4">
        <el-radio-group v-model="ruleForm.consultation" class="flex flex-col items-start" @change="changeConsultation">
          <el-radio label="want_consultation_and_book">Yes, I want a Free Consultation & Copy of Matt`s Book </el-radio>
          <el-radio label="want_consultation">Yes, I want a Free Consultation </el-radio>
          <el-radio label="dont_want_consultation">No, I don't want a Free Consultation </el-radio>
        </el-radio-group>
      </el-form-item> -->

      <!-- I Currently Have -->
      <!-- <el-form-item label="I Currently Have:" class="mb-4">
        <el-checkbox
          v-model="ruleForm.currently_have.cds"
          label="CDs"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.currently_have.bonds_or_bonds_funds"
          label="Bounds or Bound Funds"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.currently_have.ira_tsa_401_403"
          label="IRA/TSA/401(k)/403(b)"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.currently_have.annuity"
          label="An Annuity"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.currently_have.variable_annuity"
          label="A Variable Annuity"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.currently_have.long_term_care_insurance"
          label="Long Term Core Insurance"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.currently_have.life_insurance"
          label="Life Insurance"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.currently_have.mutual_funds_or_stocks"
          label="Mutual Funds or Stocks"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.currently_have.dormant_accounts"
          label="Dormant Accounts"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          @change="handleChange()"
        />
      </el-form-item> -->

      <!-- I Want More Info About: -->
      <el-form-item label="I Want More Info About ">
        <el-checkbox
          v-model="ruleForm.more_info_about.indexed_annuities"
          label="Indexed Annuities"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.more_info_about.strategic_wealth_report"
          label="Strategic Wealth Reports"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.more_info_about.rule_of_100"
          label="The rule of 100"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.more_info_about.moving_my_ira"
          label="Moving me IRA"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.more_info_about.rolling_over_my_401_403"
          label="Roling Over My 401/403"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.more_info_about.retirement_income_analysis"
          label="Retirement Income Analysis"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.more_info_about.securing_my_money"
          label="Securing me Money"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.more_info_about.tax_free_accounts"
          label="Tax Free Accounts"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.more_info_about.my_variable_annuity"
          label="Me Variable Annuity"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          @change="handleChange()"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useMutation } from 'vue-query'
import { updateConfirmation } from '@/api/vueQuery/clients/fetch-update-confirmation'
import { useConfirmationInfoHooks } from '@/hooks/use-confirmation-info-hooks'
import { useFetchClietsConfirmation } from '@/api/clients/use-fetch-confirmation.js'
import { useFetchGetClietsConfirmation } from '@/api/use-fetch-get-clients-confirmation.js'
import { useRoute } from 'vue-router'

export default {
  name: 'MoreInfoAbout',
  setup() {
    const form = ref(null)
    const route = useRoute()

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

    const { mutateAsync: updateCinfirmationInfo } = useMutation(updateConfirmation)

    const { setInitValueConfirmInfo } = useConfirmationInfoHooks()

    const ruleForm = reactive({
      consultation: 'want_consultation_and_book',
      currently_have: {
        cds: false,
        annuity: false,
        life_insurance: false,
        bonds_or_bonds_funds: false,
        variable_annuity: false,
        mutual_funds_or_stocks: false,
        ira_tsa_401_403: false,
        ong_term_care_insurance: false,
        dormant_accounts: false,
      },
      more_info_about: {
        indexed_annuities: false,
        moving_my_ira: false,
        securing_my_money: false,
        strategic_wealth_report: false,
        rolling_over_my_401_403: false,
        tax_free_accounts: false,
        rule_of_100: false,
        retirement_income_analysis: false,
        my_variable_annuity: false,
      },
    })

    onMounted(async () => {
      if (route.params.id) {
        await refetchAdvisor.value()
        setInitValueConfirmInfo(ruleForm, confirmationDataAdvisor.value)
      } else {
        await refetchClient.value()
        setInitValueConfirmInfo(ruleForm, confirmationDataClient.value)
      }
    })

    const handleChange = async () => {
      const formConfirmation = {
        currently_have: ruleForm.currently_have,
        more_info_about: ruleForm.more_info_about,
      }
      await updateCinfirmationInfo(formConfirmation)
    }

    const changeConsultation = async () => {
      const formConfirmation = {
        consultation: ruleForm.consultation,
      }
      await updateCinfirmationInfo(formConfirmation)
    }

    return {
      handleChange,
      form,
      ruleForm,
      changeConsultation,

      isLoadingClient,
      isFetchingConfirmationClient,
      confirmationDataClient,
      refetchClient,

      isLoadingAdvisor,
      isFetchingConfirmationAdvisor,
      confirmationDataAdvisor,
      refetchAdvisor,
    }
  },
}
</script>
