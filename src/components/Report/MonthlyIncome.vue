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
        <el-form-item prop="montly.member_current" class="w-4/12 mr-1">
          <el-input v-model="ruleForm.montly.member_current" placeholder="$12345" @change="changeMontly()" />
        </el-form-item>
        <el-form-item prop="montly.member_future" class="w-4/12 ml-1">
          <el-input v-model="ruleForm.montly.member_future" placeholder="$12345" @change="changeMontly()" />
        </el-form-item>
      </div>
      <!-- Spouse -->
      <div class="flex justify-center items-center px-3 border-b border-r border-l border-color-grey py-4">
        <div class="w-4/12 text-main text-xss">Spouse</div>
        <el-form-item prop="montly.spouse_current" class="w-4/12 mr-1">
          <el-input v-model="ruleForm.montly.spouse_current" placeholder="$12345" @change="changeMontly()" />
        </el-form-item>
        <el-form-item prop="montly.spouse_future" class="w-4/12 ml-1">
          <el-input v-model="ruleForm.montly.spouse_future" placeholder="$12345" @change="changeMontly()" />
        </el-form-item>
      </div>
      <!-- Pensions -->
      <div class="flex justify-center items-center px-3 border-b border-r border-l border-color-grey py-4">
        <div class="w-4/12 text-main text-xss">Pensions</div>
        <el-form-item prop="montly.pensions_current" class="w-4/12 mr-1">
          <el-input v-model="ruleForm.montly.pensions_current" placeholder="$12345" @change="changeMontly()" />
        </el-form-item>
        <el-form-item prop="montly.pensions_future" class="w-4/12 ml-1">
          <el-input v-model="ruleForm.montly.pensions_future" placeholder="$12345" @change="changeMontly()" />
        </el-form-item>
      </div>
      <!-- Rental income -->
      <div class="flex justify-center items-center px-3 border-b border-r border-l border-color-grey py-4">
        <div class="w-4/12 text-main text-xss">Rental income</div>
        <el-form-item prop="montly.rental_current" class="w-4/12 mr-1">
          <el-input v-model="ruleForm.montly.rental_current" placeholder="$12345" @change="changeMontly()" />
        </el-form-item>
        <el-form-item prop="montly.rental_future" class="w-4/12 ml-1">
          <el-input v-model="ruleForm.montly.rental_future" placeholder="$12345" @change="changeMontly()" />
        </el-form-item>
      </div>
      <!-- Investments -->
      <div class="flex justify-center items-center px-3 border-r border-l border-color-grey py-4">
        <div class="w-4/12 text-main text-xss">Investments</div>
        <el-form-item prop="montly.investments_current" class="w-4/12 mr-1">
          <el-input v-model="ruleForm.montly.investments_current" placeholder="$12345" @change="changeMontly()" />
        </el-form-item>
        <el-form-item prop="montly.investments_future" class="w-4/12 ml-1">
          <el-input v-model="ruleForm.montly.investments_future" placeholder="$12345" @change="changeMontly()" />
        </el-form-item>
      </div>

      <div class="bg-widget-bg px-5 py-2 text-xss text-main font-medium flex justify-between">
        <div class="w-8/12">Monthly Expenses</div>
        <div class="w-4/12 text-right font-semibold pr-1">{{ currencyFormat(ruleForm.monthlyExpenses) }}</div>
      </div>

      <!-- Tax -->
      <div class="flex justify-center items-center border-b border-r border-l border-color-grey py-4 px-3">
        <div class="w-8/12 text-main text-xss mr-2.5">Tax</div>
        <el-form-item prop="total.tax" class="w-4/12">
          <el-input v-model="ruleForm.total.tax" placeholder="$12345" @change="changeTotal()" />
        </el-form-item>
      </div>
      <!-- IRA -->
      <div class="flex justify-center items-center border-b border-r border-l border-color-grey py-4 px-3">
        <div class="w-8/12 text-main text-xss mr-2.5">IRA</div>
        <el-form-item prop="total.ira" class="w-4/12">
          <el-input v-model="ruleForm.total.ira" placeholder="$12345" @change="changeTotal()" />
        </el-form-item>
      </div>
      <!-- IRA SECOND-->
      <div class="flex justify-center items-center border-b border-r border-l border-color-grey py-4 px-3">
        <div class="w-8/12 text-main text-xss mr-2.5">IRA</div>
        <el-form-item prop="total.ira_second" class="w-4/12">
          <el-input v-model="ruleForm.total.ira_second" placeholder="$12345" @change="changeTotal()" />
        </el-form-item>
      </div>
    </el-form>

    <div class="bg-color-light-blue rounded-br-lg rounded-bl-lg text-xss text-main font-medium">
      <div class="pl-5 pr-5 py-3 flex justify-between">
        <span>Total:</span>
        <span>{{ currencyFormat(ruleForm.total_all) }}</span>
      </div>
      <div class="pl-5 pr-5 pb-3 flex justify-between">
        <span>Shortfall:</span>
        <span>{{ currencyFormat(ruleForm.short_fall) }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { useMonthlyIncome, useMonthlyExpenses } from '@/components/NewProspect/DTO/blueReport'
import { ref, reactive } from 'vue'
import { currencyFormat } from '@/utils/currencyFormat'
import { rules } from '@/validationRules/monthlyIncomeAnalysis.js'

export default {
  name: 'MonthlyIncome',
  setup() {
    const form = ref(null)

    const { data: monthlyIncome } = useMonthlyIncome()
    const { data: monthlyExpenses } = useMonthlyExpenses()

    const ruleForm = reactive({
      montly: {
        member_current: '',
        member_future: '',
        spouse_current: '',
        spouse_future: '',
        pensions_current: '',
        pensions_future: '',
        rental_current: '',
        rental_future: '',
        investments_current: '',
        investments_future: '',
      },
      total: {
        tax: '',
        ira: '',
        ira_second: '',
      },
      total_all: 0,
      short_fall: 0,
      monthlyExpenses: 0,
    })

    const changeMontly = () => {
      ruleForm.monthlyExpenses = 0
      for (const key in ruleForm.montly) {
        if (Object.hasOwnProperty.call(ruleForm.montly, key)) {
          if (!isNaN(ruleForm.montly[key])) ruleForm.monthlyExpenses += Number(ruleForm.montly[key])
        }
      }
    }
    const changeTotal = () => {
      ruleForm.total_all = 0
      ruleForm.short_fall = 0
      for (const key in ruleForm.total) {
        if (Object.hasOwnProperty.call(ruleForm.total, key)) {
          if (!isNaN(ruleForm.total[key])) {
            ruleForm.total_all += Number(ruleForm.total[key])
            ruleForm.short_fall += Number(ruleForm.total[key])
          }
        }
      }
    }

    return {
      form,
      ruleForm,
      monthlyIncome,
      monthlyExpenses,
      currencyFormat,
      rules,
      changeMontly,
      changeTotal,
    }
  },
}
</script>
