<template>
  <div v-if="!isLoading" class="my-4">
    <el-form ref="form" :model="ruleForm" label-position="top">
      <el-form-item class="mb-4">
        <el-radio-group
          v-model="ruleForm.consultation"
          class="flex flex-col items-start"
          :disabled="disabled"
          @change="changeConsultation"
        >
          <el-radio label="want_consultation_and_book">Yes, I want a Free Consultation & Copy of Matt`s Book </el-radio>
          <el-radio label="want_consultation">Yes, I want a Free Consultation </el-radio>
          <el-radio label="dont_want_consultation">No, I don't want a Free Consultation </el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- I Currently Have -->
      <el-form-item label="I Currently Have:" class="mb-4">
        <el-checkbox
          v-model="ruleForm.currently_have.cds"
          label="CDs"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          :disabled="disabled"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.currently_have.bonds_or_bonds_funds"
          label="Bounds or Bound Funds"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          :disabled="disabled"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.currently_have.ira_tsa_401_403"
          label="IRA/TSA/401(k)/403(b)"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          :disabled="disabled"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.currently_have.annuity"
          label="An Annuity"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          :disabled="disabled"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.currently_have.variable_annuity"
          label="A Variable Annuity"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          :disabled="disabled"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.currently_have.long_term_care_insurance"
          label="Long Term Core Insurance"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          :disabled="disabled"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.currently_have.life_insurance"
          label="Life Insurance"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          :disabled="disabled"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.currently_have.mutual_funds_or_stocks"
          label="Mutual Funds or Stocks"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          :disabled="disabled"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.currently_have.dormant_accounts"
          label="Dormant Accounts"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          :disabled="disabled"
          @change="handleChange()"
        />
      </el-form-item>

      <!-- I Want More Info About: -->
      <el-form-item label="I Currently Have:">
        <el-checkbox
          v-model="ruleForm.more_info_about.indexed_annuities"
          label="Indexed Annuities"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          :disabled="disabled"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.more_info_about.strategic_wealth_report"
          label="Strategic Wealth Reports"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          :disabled="disabled"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.more_info_about.rule_of_100"
          label="The rule of 100"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          :disabled="disabled"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.more_info_about.moving_my_ira"
          label="Moving me IRA"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          :disabled="disabled"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.more_info_about.rolling_over_my_401_403"
          label="Roling Over My 401/403"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          :disabled="disabled"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.more_info_about.retirement_income_analysis"
          label="Retirement Income Analysis"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          :disabled="disabled"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.more_info_about.securing_my_money"
          label="Securing me Money"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          :disabled="disabled"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.more_info_about.tax_free_accounts"
          label="Tax Free Accounts"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          :disabled="disabled"
          @change="handleChange()"
        />
        <el-checkbox
          v-model="ruleForm.more_info_about.my_variable_annuity"
          label="Me Variable Annuity"
          class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          :disabled="disabled"
          @change="handleChange()"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { watchEffect, reactive, ref } from 'vue'
import { useMutation } from 'vue-query'
import { updateConfirmation } from '@/api/vueQuery/clients/fetch-update-confirmation'
import { useConfirmationInfoHooks } from '@/hooks/use-confirmation-info-hooks'
import { useFetchClietsConfirmation } from '@/api/clients/use-fetch-confirmation.js'

export default {
  name: 'MoreInfoAbout',
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup() {
    const form = ref(null)

    const { isLoading, isFetching: isFetchingConfirmation, data: confirmationData } = useFetchClietsConfirmation()

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

    watchEffect(() => {
      if (isLoading.value === false) {
        setInitValueConfirmInfo(ruleForm, confirmationData.value)
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

      isFetchingConfirmation,
      confirmationData,
      isLoading,
    }
  },
}
</script>

<style>
/* .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #76e1bb;
  border-color: #76e1bb;
}

.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
  border-color: white;
} */
</style>
