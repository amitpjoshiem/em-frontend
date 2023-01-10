<template>
  <SwdWrapper>
    <el-skeleton v-if="loading" :rows="10" animated />
    <template v-else>
      <div class="flex py-5">
        <div class="w-3/12">
          <BackButton text="Back" @click="$router.go(-1)" />
        </div>
        <div class="w-6/12 text-center">
          <span class="text-title text-main font-semibold">Contract</span>
        </div>
      </div>
      <el-card class="box-card mb-10 text-main">
        <template #header>
          <div class="card-header">
            <div class="flex items-center w-5/12">
              <span class="font-semibold pr-2">Carrier:</span>
              <el-form-item v-if="isCustom">
                <el-input
                  v-model="ruleForm.carrier"
                  placeholder="Enter Carrier"
                  :disabled="$can('client', 'all')"
                  @blur="updateDataContract"
                />
              </el-form-item>
              <span v-else>
                <SwdSpinner v-if="isFetching" />
                <span v-else class="font-semibold">{{ clientReport.carrier }}</span>
              </span>
            </div>
          </div>
        </template>
        <el-form ref="form" :model="ruleForm" label-position="top" :disabled="$can('client', 'all')">
          <div class="flex justify-between mb-2 w-full">
            <div class="flex items-center w-4/12">
              <span class="font-semibold pr-2">Contract ID:</span>
              <el-form-item v-if="isCustom">
                <el-input v-model="ruleForm.contract_number" placeholder="Enter Contract" />
              </el-form-item>
              <span v-else>
                <SwdSpinner v-if="isFetching" />
                <span v-else class="font-semibold">{{ clientReport.contract_number }}</span>
              </span>
            </div>

            <div class="flex items-center w-4/12">
              <div class="font-semibold pr-2 w-6/12">Issue Date:</div>
              <el-form-item class="w-6/12">
                <el-date-picker
                  v-if="isCustom"
                  v-model="ruleForm.origination_date"
                  type="date"
                  format="MM/DD/YYYY"
                  value-format="MM/DD/YYYY"
                  placeholder="Select Date"
                  @change="updateDataContract"
                />
                <span v-else>
                  <SwdSpinner v-if="isFetching" />
                  <span v-else class="font-semibold">{{ clientReport.originationDateFormatted }}</span>
                </span>
              </el-form-item>
            </div>
          </div>

          <!-- Current Year -->
          <div class="border border-main-gray border-dashed p-4">
            <div class="text-center pb-2 font-semibold">Current Year</div>
            <div class="flex justify-between">
              <el-form-item label="Beginning Balance" class="w-2/10 pr-1">
                <SwdCurrencyInput
                  v-if="isCustom"
                  v-model="ruleForm.current_year.beginning_balance"
                  :options="optionsCurrencyInput"
                  placeholder="000000"
                  prepend
                  :disabled="loadingUpdate"
                  @blur="updateDataContract"
                />
                <NotCustomValue
                  v-else
                  :value="isFetching ? 0 : clientReport.current_year.beginning_balance"
                  :is-fetching="isFetching"
                />
              </el-form-item>
              <el-form-item label="Interest credited" class="w-2/10 px-1">
                <SwdCurrencyInput
                  v-if="isCustom"
                  v-model="ruleForm.current_year.interest_credited"
                  :options="optionsCurrencyInput"
                  placeholder="000000"
                  prepend
                  :disabled="loadingUpdate"
                  @blur="updateDataContract"
                />
                <NotCustomValue
                  v-else
                  :value="isFetching ? 0 : clientReport.current_year.interest_credited"
                  :is-fetching="isFetching"
                />
              </el-form-item>
              <el-form-item label="Growth" class="w-2/10 px-1">
                <NotCustomValue
                  :value="isFetching ? 0 : ruleForm.current_year.growth"
                  :is-fetching="isFetching || loadingUpdate"
                />
              </el-form-item>
              <el-form-item label="Withdrawals" class="w-2/10 px-1">
                <SwdCurrencyInput
                  v-if="isCustom"
                  v-model="ruleForm.current_year.withdrawals"
                  :options="optionsCurrencyInput"
                  placeholder="000000"
                  prepend
                  :disabled="loadingUpdate"
                  @blur="updateDataContract"
                />
                <NotCustomValue
                  v-else
                  :value="isFetching ? 0 : clientReport.current_year.withdrawals"
                  :is-fetching="isFetching"
                />
              </el-form-item>
              <el-form-item label="Contract value" class="w-2/10 pl-1">
                <NotCustomValue
                  :value="isFetching ? 0 : ruleForm.current_year.contract_value"
                  :is-fetching="isFetching || loadingUpdate"
                />
              </el-form-item>
            </div>
          </div>

          <!-- Since Inception -->
          <div class="flex justify-between pt-10 mb-2">
            <div class="flex items-center w-full">
              <div class="font-semibold pr-2 w-3/12">
                <span> Contract Years: </span>
                <SwdSpinner v-if="isFetching || loadingUpdate" />
                <span v-else>{{ ruleForm.contract_year }}</span>
              </div>
            </div>
          </div>

          <div class="border border-dashed p-4">
            <div class="text-center pb-2 font-semibold">Since Inception</div>
            <div class="flex justify-between">
              <el-form-item label="Total Premiums" prop="address" class="w-2/10 pr-1">
                <SwdCurrencyInput
                  v-if="isCustom"
                  v-model="ruleForm.since_inception.total_premiums"
                  :options="optionsCurrencyInput"
                  placeholder="000000"
                  prepend
                  :disabled="loadingUpdate"
                  @blur="updateDataContract"
                />
                <NotCustomValue
                  v-else
                  :value="isFetching ? 0 : clientReport.since_inception.total_premiums"
                  :is-fetching="isFetching"
                />
              </el-form-item>
              <el-form-item label="Bonus Received" prop="address" class="w-2/10 px-1">
                <SwdCurrencyInput
                  v-if="isCustom"
                  v-model="ruleForm.since_inception.bonus_received"
                  :options="optionsCurrencyInput"
                  placeholder="000000"
                  prepend
                  :disabled="loadingUpdate"
                  @blur="updateDataContract"
                />
                <NotCustomValue
                  v-else
                  :value="isFetching ? 0 : clientReport.since_inception.bonus_received"
                  :is-fetching="isFetching"
                />
              </el-form-item>
              <el-form-item label="Interest credited" prop="address" class="w-2/10 px-1">
                <SwdCurrencyInput
                  v-if="isCustom"
                  v-model="ruleForm.since_inception.interest_credited"
                  :options="optionsCurrencyInput"
                  placeholder="000000"
                  prepend
                  :disabled="loadingUpdate"
                  @blur="updateDataContract"
                />
                <NotCustomValue
                  v-else
                  :value="isFetching ? 0 : clientReport.since_inception.interest_credited"
                  :is-fetching="isFetching"
                />
              </el-form-item>
              <el-form-item label="Total Withdrawals" prop="address" class="w-2/10 px-1">
                <SwdCurrencyInput
                  v-if="isCustom"
                  v-model="ruleForm.since_inception.total_withdrawals"
                  :options="optionsCurrencyInput"
                  placeholder="000000"
                  prepend
                  :disabled="loadingUpdate"
                  @blur="updateDataContract"
                />
                <NotCustomValue
                  v-else
                  :value="isFetching ? 0 : clientReport.since_inception.total_withdrawals"
                  :is-fetching="isFetching"
                />
              </el-form-item>
              <el-form-item label="Average Growth" prop="address" class="w-2/10 pl-1">
                <NotCustomValue
                  :value="isFetching ? 0 : ruleForm.since_inception.average_growth"
                  :is-fetching="isFetching || loadingUpdate"
                />
              </el-form-item>
            </div>
          </div>
        </el-form>
      </el-card>

      <div class="pr-5 w-96 total-info ml-auto mr-0 mb-5">
        <div class="bg-main-gray rounded-md py-2 flex justify-between">
          <span class="pl-3 w-7/12">TDA Total Value</span>
          <span class="w-5/12 text-center">---</span>
        </div>
        <div class="bg-main-gray rounded-md py-2 flex justify-between mt-3">
          <span class="pl-3 w-7/12">Total Current Value</span>
          <span class="w-5/12 text-center">---</span>
        </div>
      </div>
    </template>
  </SwdWrapper>
</template>

<script>
import { useClientReport } from '@/api/use-fetch-client-report.js'
import { onMounted, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { updateContract } from '@/api/vueQuery/update-contract'
import { useMutation } from 'vue-query'
import dayjs from 'dayjs'
import NotCustomValue from './NotCustomValue.vue'

export default {
  name: 'ContractDetails',
  components: {
    NotCustomValue,
  },
  setup() {
    const route = useRoute()
    const form = ref(null)
    const isCustom = ref(true)
    const loading = ref(true)

    const {
      isLoading,
      isError,
      data: clientReport,
      refetch,
      isFetching,
    } = useClientReport(route.params.contract_id, { enabled: false })

    const { mutateAsync: update, isLoading: loadingUpdate } = useMutation(updateContract)

    const ruleForm = reactive({})

    onMounted(async () => {
      if (route.params.contract_id) {
        await refetch.value()
        isCustom.value = clientReport.value.is_custom
        Object.assign(ruleForm, JSON.parse(JSON.stringify(clientReport.value)))
        setDate(clientReport.value.origination_date)
      }
      loading.value = false
    })

    const updateDataContract = async () => {
      const res = await update({ id: route.params.contract_id, form: ruleForm })
      if (!('error' in res)) {
        Object.assign(ruleForm, JSON.parse(JSON.stringify(res.data)))
        setDate(res.data.origination_date)
      }
    }

    const setDate = (date) => {
      if (date) ruleForm.origination_date = dayjs(date).format('MM/DD/YYYY')
    }

    const optionsCurrencyInput = {
      currency: 'USD',
      locale: 'en-US',
      currencyDisplay: 'hidden',
      precision: 2,
    }

    return {
      isLoading,
      isError,
      clientReport,
      form,
      ruleForm,
      optionsCurrencyInput,
      isCustom,
      isFetching,
      loading,
      updateDataContract,
      update,
      loadingUpdate,
    }
  },
}
</script>
