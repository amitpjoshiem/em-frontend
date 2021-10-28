<template>
  <div class="w-5/12">
    <div class="bg-widget-bg pt-5 pl-5 pb-2 rounded-tr-lg rounded-tl-lg text-smm text-main font-medium">
      Monthly Income analysis
    </div>
    <div class="flex py-2 border-b border-r border-l border-color-grey px-5">
      <div class="w-4/12" />
      <div class="w-4/12 text-xs text-gray03">Current</div>
      <div class="w-4/12 text-xs text-gray03">Future</div>
    </div>
    <el-form ref="form" :model="ruleForm" status-icon :rules="rules" size="mini">
      <!-- Member -->
      <div class="flex justify-center items-center px-3 border-b border-r border-l border-color-grey py-4">
        <div class="w-4/12 text-main text-xss">Member</div>
        <el-form-item class="w-4/12 mr-1">
          <el-input v-model="ruleForm.current_member" placeholder="$12345" type="number" @change="change()">
            <template #prepend>$</template>
          </el-input>
        </el-form-item>
        <el-form-item class="w-4/12 ml-1">
          <el-input v-model="ruleForm.future_member" placeholder="$12345" type="number" @change="change()">
            <template #prepend>$</template>
          </el-input>
        </el-form-item>
      </div>
      <!-- Spouse -->
      <div class="flex justify-center items-center px-3 border-b border-r border-l border-color-grey py-4">
        <div class="w-4/12 text-main text-xss">Spouse</div>
        <el-form-item class="w-4/12 mr-1">
          <el-input v-model="ruleForm.current_spouse" placeholder="$12345" type="number" @change="change()">
            <template #prepend>$</template>
          </el-input>
        </el-form-item>
        <el-form-item class="w-4/12 ml-1">
          <el-input v-model="ruleForm.future_spouse" placeholder="$12345" type="number" @change="change()">
            <template #prepend>$</template>
          </el-input>
        </el-form-item>
      </div>
      <!-- Pensions -->
      <div class="flex justify-center items-center px-3 border-b border-r border-l border-color-grey py-4">
        <div class="w-4/12 text-main text-xss">Pensions</div>
        <el-form-item class="w-4/12 mr-1">
          <el-input v-model="ruleForm.current_pensions" placeholder="$12345" type="number" @change="change()">
            <template #prepend>$</template>
          </el-input>
        </el-form-item>
        <el-form-item class="w-4/12 ml-1">
          <el-input v-model="ruleForm.future_pensions" placeholder="$12345" type="number" @change="change()">
            <template #prepend>$</template>
          </el-input>
        </el-form-item>
      </div>
      <!-- Rental income -->
      <div class="flex justify-center items-center px-3 border-b border-r border-l border-color-grey py-4">
        <div class="w-4/12 text-main text-xss">Rental income</div>
        <el-form-item class="w-4/12 mr-1">
          <el-input v-model="ruleForm.current_rental_income" placeholder="$12345" type="number" @change="change()">
            <template #prepend>$</template>
          </el-input>
        </el-form-item>
        <el-form-item class="w-4/12 ml-1">
          <el-input v-model="ruleForm.future_rental_income" placeholder="$12345" type="number" @change="change()">
            <template #prepend>$</template>
          </el-input>
        </el-form-item>
      </div>
      <!-- Investments -->
      <div class="flex justify-center items-center px-3 border-r border-l border-color-grey py-4">
        <div class="w-4/12 text-main text-xss">Investments</div>
        <el-form-item class="w-4/12 mr-1">
          <el-input v-model="ruleForm.current_investment" placeholder="$12345" type="number" @change="change()">
            <template #prepend>$</template>
          </el-input>
        </el-form-item>
        <el-form-item class="w-4/12 ml-1">
          <el-input v-model="ruleForm.future_investment" placeholder="$12345" type="number" @change="change()">
            <template #prepend>$</template>
          </el-input>
        </el-form-item>
      </div>

      <div class="bg-widget-bg px-5 py-2 text-xss text-main font-medium flex justify-between">
        <div class="w-8/12">Total</div>
        <SwdSpinner v-if="isFetching" />
        <div v-else class="w-4/12 text-right font-semibold pr-1">{{ currencyFormat(monthlyIncome.total) }}</div>
      </div>

      <!-- Tax -->
      <div class="flex justify-center items-center border-b border-r border-l border-color-grey py-4 px-3">
        <div class="w-8/12 text-main text-xss mr-2.5">Tax</div>
        <el-form-item class="w-4/12">
          <el-input v-model="ruleForm.tax" placeholder="$12345" @change="change()">
            <template #prepend>$</template>
          </el-input>
        </el-form-item>
      </div>
      <!-- IRA -->
      <div class="flex justify-center items-center border-b border-r border-l border-color-grey py-4 px-3">
        <div class="w-8/12 text-main text-xss mr-2.5">IRA</div>
        <el-form-item class="w-4/12">
          <el-input v-model="ruleForm.ira_first" placeholder="$12345" @change="change()">
            <template #prepend>$</template>
          </el-input>
        </el-form-item>
      </div>
      <!-- IRA SECOND-->
      <div class="flex justify-center items-center border-b border-r border-l border-color-grey py-4 px-3">
        <div class="w-8/12 text-main text-xss mr-2.5">IRA</div>
        <el-form-item class="w-4/12">
          <el-input v-model="ruleForm.ira_second" placeholder="$12345" @change="change()">
            <template #prepend>$</template>
          </el-input>
        </el-form-item>
      </div>
    </el-form>

    <div class="bg-color-light-blue rounded-br-lg rounded-bl-lg text-xss text-main font-medium">
      <div class="pl-5 pr-5 py-3 flex justify-between">
        <span>Monthly Expenses:</span>
        <SwdSpinner v-if="isFetching" />
        <span v-else>{{ currencyFormat(monthlyIncome.monthly_expenses) }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive } from 'vue'
import { currencyFormat } from '@/utils/currencyFormat'
import { rules } from '@/validationRules/monthlyIncomeAnalysis.js'
import { useRoute } from 'vue-router'
import { useFetchMonthlyIncomeAnalysis } from '@/api/use-fetch-monthly-income-analysis.js'
import { createMonthlyIncomeAnalysis } from '@/api/vueQuery/create-monthly-income-analysis'
import { useMutation } from 'vue-query'
import { useQueryClient } from 'vue-query'

export default {
  name: 'MonthlyIncome',
  setup() {
    const form = ref(null)
    const route = useRoute()
    const queryClient = useQueryClient()
    const id = route.params.id

    const { isLoading, isFetching, isError, data: monthlyIncome } = useFetchMonthlyIncomeAnalysis(id)

    const {
      mutateAsync: create,
      isLoading: isLoadingCreate,
      isError: isErrorCreate,
      isFetching: isFetchingCreate,
      data: dataCreate,
    } = useMutation(createMonthlyIncomeAnalysis)

    const ruleForm = reactive({ ...monthlyIncome.value })

    const change = async () => {
      const res = await create({ id, data: ruleForm })
      if (!('error' in res)) {
        queryClient.invalidateQueries(['blueprint/incomeAnalysis'])
      }
    }

    return {
      form,
      ruleForm,
      currencyFormat,
      rules,
      change,
      isLoading,
      isError,
      monthlyIncome,
      create,
      isLoadingCreate,
      isErrorCreate,
      isFetchingCreate,
      dataCreate,
      isFetching,
    }
  },
}
</script>
