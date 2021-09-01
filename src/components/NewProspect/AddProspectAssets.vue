<template>
  <div>
    <el-form
      ref="form"
      :model="ruleForm"
      status-icon
      label-position="top"
      :rules="rules"
    >
      <!-- Current income -->
      <div class="border-b px-16 pb-7">
        <span class="text-main text-xl font-semibold">Current income</span>
        <div class="pt-5">
          <el-form-item
            label="Do you have a written income plan?"
            class="mr-20"
          >
            <el-radio-group v-model="ruleForm.income.income_plan">
              <el-radio :label="true">Yes</el-radio>
              <el-radio :label="false">No</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="flex pb-2 mt-8">
            <div class="w-2/12"></div>
            <div class="w-5/12 text-gray03 text-xs">OWNER</div>
            <div class="w-5/12 text-gray03 text-xs pl-2.5">SPOUSE</div>
          </div>

          <div class="flex items-center pb-2">
            <div class="w-2/12 text-main font-semibold text-xss">Salary</div>
            <el-form-item class="w-5/12 pr-2.5" prop="income.member.salary">
              <el-input v-model="ruleForm.income.member.salary" />
            </el-form-item>
            <el-form-item class="w-5/12 pl-2.5" prop="income.spouse.salary">
              <el-input v-model="ruleForm.income.spouse.salary" />
            </el-form-item>
          </div>

          <div class="flex items-center pb-2">
            <div class="w-2/12 text-main font-semibold text-xss">
              Social Security
            </div>
            <el-form-item
              class="w-5/12 pr-2.5"
              prop="income.member.social_security"
            >
              <el-input v-model="ruleForm.income.member.social_security" />
            </el-form-item>
            <el-form-item
              class="w-5/12 pl-2.5"
              prop="income.spouse.social_security"
            >
              <el-input v-model="ruleForm.income.spouse.social_security" />
            </el-form-item>
          </div>

          <div class="flex items-center pb-2">
            <div class="w-2/12 text-main font-semibold text-xss">Pension</div>
            <el-form-item class="w-5/12 pr-2.5" prop="income.member.pension">
              <el-input v-model="ruleForm.income.member.pension" />
            </el-form-item>
            <el-form-item class="w-5/12 pl-2.5" prop="income.spouse.pension">
              <el-input v-model="ruleForm.income.spouse.pension" />
            </el-form-item>
          </div>

          <div class="flex items-center pb-2">
            <div class="w-2/12 text-main font-semibold text-xss">
              Rental income
            </div>
            <el-form-item
              class="w-5/12 pr-2.5"
              prop="income.member.rental_income"
            >
              <el-input v-model="ruleForm.income.member.rental_income" />
            </el-form-item>
            <el-form-item
              class="w-5/12 pl-2.5"
              prop="income.spouse.rental_income"
            >
              <el-input v-model="ruleForm.income.spouse.rental_income" />
            </el-form-item>
          </div>

          <div class="flex items-center pb-2">
            <div class="w-2/12 text-main font-semibold text-xss">RMD’s</div>
            <el-form-item class="w-5/12 pr-2.5" prop="income.member.rmds">
              <el-input v-model="ruleForm.income.member.rmds" />
            </el-form-item>
            <el-form-item class="w-5/12 pl-2.5" prop="income.spouse.rmds">
              <el-input v-model="ruleForm.income.spouse.rmds" />
            </el-form-item>
          </div>

          <div class="flex items-center pb-2">
            <div class="w-2/12 text-main font-semibold text-xss">
              Interest/Dividents
            </div>
            <el-form-item
              class="w-5/12 pr-2.5"
              prop="income.member.interest_dividends"
            >
              <el-input v-model="ruleForm.income.member.interest_dividends" />
            </el-form-item>
            <el-form-item
              class="w-5/12 pl-2.5"
              prop="income.spouse.interest_dividends"
            >
              <el-input v-model="ruleForm.income.spouse.interest_dividends" />
            </el-form-item>
          </div>

          <div class="flex items-center pb-2">
            <div class="w-2/12 text-main font-semibold text-xss">Other</div>
            <el-form-item class="w-5/12 pr-2.5" prop="income.member.other">
              <el-input v-model="ruleForm.income.member.other" />
            </el-form-item>
            <el-form-item class="w-5/12 pl-2.5" prop="income.spouse.other">
              <el-input v-model="ruleForm.income.spouse.other" />
            </el-form-item>
          </div>
        </div>
      </div>

      <div class="border-b px-16 py-6">
        <span class="text-main text-xl font-semibold">Liquid assets</span>
        <div class="flex pb-2 mt-8">
          <div class="w-4/24" />
          <div class="w-5/24 text-gray03 text-xs">OWNER</div>
          <div class="w-5/24 text-gray03 text-xs">SPOUSE</div>
          <div class="w-5/24 text-gray03 text-xs pl-2.5">O/NQ</div>
          <div class="w-5/24 text-gray03 text-xs pl-2.5">BALANCE</div>
        </div>

        <div class="flex items-center pb-2">
          <div class="w-4/24 text-main font-semibold text-xss">
            Cash/Checking/ Savings/MM
          </div>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="liquid_assets.member.cash_checking_savings_mm"
          >
            <el-input
              v-model="ruleForm.liquid_assets.member.cash_checking_savings_mm"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="liquid_assets.spouse.cash_checking_savings_mm"
          >
            <el-input
              v-model="ruleForm.liquid_assets.spouse.cash_checking_savings_mm"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="liquid_assets.o_nq.cash_checking_savings_mm"
          >
            <el-input
              v-model="ruleForm.liquid_assets.o_nq.cash_checking_savings_mm"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="liquid_assets.balance.cash_checking_savings_mm"
          >
            <el-input
              v-model="ruleForm.liquid_assets.balance.cash_checking_savings_mm"
            />
          </el-form-item>
        </div>

        <div class="flex items-center pb-2">
          <div class="w-4/24 text-main font-semibold text-xss">CD’s</div>
          <el-form-item class="w-5/24 pr-2.5" prop="liquid_assets.member.cds">
            <el-input v-model="ruleForm.liquid_assets.member.cds" />
          </el-form-item>
          <el-form-item class="w-5/24 pr-2.5" prop="liquid_assets.spouse.cds">
            <el-input v-model="ruleForm.liquid_assets.spouse.cds" />
          </el-form-item>
          <el-form-item class="w-5/24 pl-2.5" prop="liquid_assets.o_nq.cds">
            <el-input v-model="ruleForm.liquid_assets.o_nq.cds" />
          </el-form-item>
          <el-form-item class="w-5/24 pl-2.5" prop="liquid_assets.balance.cds">
            <el-input v-model="ruleForm.liquid_assets.balance.cds" />
          </el-form-item>
        </div>

        <div class="flex items-center pb-2">
          <div class="w-4/24 text-main font-semibold text-xss">
            401k/IRA (if over 59)
          </div>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="liquid_assets.member.first_401k_ira_59"
          >
            <el-input
              v-model="ruleForm.liquid_assets.member.first_401k_ira_59"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="liquid_assets.spouse.first_401k_ira_59"
          >
            <el-input
              v-model="ruleForm.liquid_assets.spouse.first_401k_ira_59"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="liquid_assets.o_nq.first_401k_ira_59"
          >
            <el-input v-model="ruleForm.liquid_assets.o_nq.first_401k_ira_59" />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="liquid_assets.balance.first_401k_ira_59"
          >
            <el-input
              v-model="ruleForm.liquid_assets.balance.first_401k_ira_59"
            />
          </el-form-item>
        </div>

        <div class="flex items-center pb-2">
          <div class="w-4/24 text-main font-semibold text-xss">401k/IRA</div>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="liquid_assets.member.first_401k_ira"
          >
            <el-input v-model="ruleForm.liquid_assets.member.first_401k_ira" />
          </el-form-item>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="liquid_assets.spouse.first_401k_ira"
          >
            <el-input v-model="ruleForm.liquid_assets.spouse.first_401k_ira" />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="liquid_assets.o_nq.first_401k_ira"
          >
            <el-input v-model="ruleForm.liquid_assets.o_nq.first_401k_ira" />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="liquid_assets.balance.first_401k_ira"
          >
            <el-input v-model="ruleForm.liquid_assets.balance.first_401k_ira" />
          </el-form-item>
        </div>

        <div class="flex items-center pb-2">
          <div class="w-4/24 text-main font-semibold text-xss">401k/IRA</div>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="liquid_assets.member.second_401k_ira"
          >
            <el-input v-model="ruleForm.liquid_assets.member.second_401k_ira" />
          </el-form-item>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="liquid_assets.spouse.second_401k_ira"
          >
            <el-input v-model="ruleForm.liquid_assets.spouse.second_401k_ira" />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="liquid_assets.o_nq.second_401k_ira"
          >
            <el-input v-model="ruleForm.liquid_assets.o_nq.second_401k_ira" />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="liquid_assets.balance.second_401k_ira"
          >
            <el-input
              v-model="ruleForm.liquid_assets.balance.second_401k_ira"
            />
          </el-form-item>
        </div>

        <div class="flex items-center pb-2">
          <div class="w-4/24 text-main font-semibold text-xss">
            Stocks/Bonds/MF
          </div>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="liquid_assets.member.stocks_bonds_mf"
          >
            <el-input v-model="ruleForm.liquid_assets.member.stocks_bonds_mf" />
          </el-form-item>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="liquid_assets.spouse.stocks_bonds_mf"
          >
            <el-input v-model="ruleForm.liquid_assets.spouse.stocks_bonds_mf" />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="liquid_assets.o_nq.stocks_bonds_mf"
          >
            <el-input v-model="ruleForm.liquid_assets.o_nq.stocks_bonds_mf" />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="liquid_assets.balance.stocks_bonds_mf"
          >
            <el-input
              v-model="ruleForm.liquid_assets.balance.stocks_bonds_mf"
            />
          </el-form-item>
        </div>

        <div class="flex items-center pb-2">
          <div class="w-4/24 text-main font-semibold text-xss">
            Cash value life insurance
          </div>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="liquid_assets.member.cash_value_life_insurance"
          >
            <el-input
              v-model="ruleForm.liquid_assets.member.cash_value_life_insurance"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="liquid_assets.spouse.cash_value_life_insurance"
          >
            <el-input
              v-model="ruleForm.liquid_assets.spouse.cash_value_life_insurance"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="liquid_assets.o_nq.cash_value_life_insurance"
          >
            <el-input
              v-model="ruleForm.liquid_assets.o_nq.cash_value_life_insurance"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="liquid_assets.balance.cash_value_life_insurance"
          >
            <el-input
              v-model="ruleForm.liquid_assets.balance.cash_value_life_insurance"
            />
          </el-form-item>
        </div>

        <div class="flex items-center pb-2">
          <div class="w-4/24 text-main font-semibold text-xss">
            FA/VA not suject to penalty
          </div>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="liquid_assets.member.fa_va_not_subject_to_penalty"
          >
            <el-input
              v-model="
                ruleForm.liquid_assets.member.fa_va_not_subject_to_penalty
              "
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="liquid_assets.spouse.fa_va_not_subject_to_penalty"
          >
            <el-input
              v-model="
                ruleForm.liquid_assets.spouse.fa_va_not_subject_to_penalty
              "
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="liquid_assets.o_nq.fa_va_not_subject_to_penalty"
          >
            <el-input
              v-model="ruleForm.liquid_assets.o_nq.fa_va_not_subject_to_penalty"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="liquid_assets.balance.fa_va_not_subject_to_penalty"
          >
            <el-input
              v-model="
                ruleForm.liquid_assets.balance.fa_va_not_subject_to_penalty
              "
            />
          </el-form-item>
        </div>

        <div class="flex items-center pb-2">
          <div class="w-4/24 text-main font-semibold text-xss">
            Gift/Inheritance
          </div>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="liquid_assets.member.gift_inheritance"
          >
            <el-input
              v-model="ruleForm.liquid_assets.member.gift_inheritance"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="liquid_assets.spouse.gift_inheritance"
          >
            <el-input
              v-model="ruleForm.liquid_assets.spouse.gift_inheritance"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="liquid_assets.o_nq.gift_inheritance"
          >
            <el-input v-model="ruleForm.liquid_assets.o_nq.gift_inheritance" />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="liquid_assets.balance.gift_inheritance"
          >
            <el-input
              v-model="ruleForm.liquid_assets.balance.gift_inheritance"
            />
          </el-form-item>
        </div>

        <div class="flex items-center pb-2">
          <div class="w-4/24 text-main font-semibold text-xss">
            Lump sum pension
          </div>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="liquid_assets.member.lump_sum_pension"
          >
            <el-input
              v-model="ruleForm.liquid_assets.member.lump_sum_pension"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="liquid_assets.spouse.lump_sum_pension"
          >
            <el-input
              v-model="ruleForm.liquid_assets.spouse.lump_sum_pension"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="liquid_assets.o_nq.lump_sum_pension"
          >
            <el-input v-model="ruleForm.liquid_assets.o_nq.lump_sum_pension" />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="liquid_assets.balance.lump_sum_pension"
          >
            <el-input
              v-model="ruleForm.liquid_assets.balance.lump_sum_pension"
            />
          </el-form-item>
        </div>

        <div class="flex items-center pb-2">
          <div class="w-4/24 text-main font-semibold text-xss">
            Other liquid assets
          </div>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="liquid_assets.member.other_liquid_assets"
          >
            <el-input
              v-model="ruleForm.liquid_assets.member.other_liquid_assets"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="liquid_assets.spouse.other_liquid_assets"
          >
            <el-input
              v-model="ruleForm.liquid_assets.spouse.other_liquid_assets"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="liquid_assets.o_nq.other_liquid_assets"
          >
            <el-input
              v-model="ruleForm.liquid_assets.o_nq.other_liquid_assets"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="liquid_assets.balance.other_liquid_assets"
          >
            <el-input
              v-model="ruleForm.liquid_assets.balance.other_liquid_assets"
            />
          </el-form-item>
        </div>

        <div class="flex items-center pb-2">
          <div class="w-4/24 text-main font-semibold text-xss">Total</div>
          <el-form-item class="w-5/24 pr-2.5">
            <el-input v-model="ruleForm.liquid_assets.member.total" />
          </el-form-item>
          <el-form-item class="w-5/24 pr-2.5">
            <el-input v-model="ruleForm.liquid_assets.spouse.total" />
          </el-form-item>
          <el-form-item class="w-5/24 pl-2.5">
            <el-input v-model="ruleForm.liquid_assets.o_nq.total" />
          </el-form-item>
          <el-form-item class="w-5/24 pl-2.5">
            <el-input v-model="ruleForm.liquid_assets.balance.total" />
          </el-form-item>
        </div>
      </div>

      <div class="border-b px-16 py-6">
        <span class="text-main text-xl font-semibold">Non-liquid assets</span>
        <div class="flex pb-2 mt-8">
          <div class="w-4/24" />
          <div class="w-5/24 text-gray03 text-xs">OWNER</div>
          <div class="w-5/24 text-gray03 text-xs">SPOUSE</div>
          <div class="w-5/24 text-gray03 text-xs pl-2.5">O/NQ</div>
          <div class="w-5/24 text-gray03 text-xs pl-2.5">BALANCE</div>
        </div>

        <div class="flex items-center pb-2">
          <div class="w-4/24 text-main font-semibold text-xss">
            Value of home
          </div>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="non_liquid_assets.member.value_of_home"
          >
            <el-input
              v-model="ruleForm.non_liquid_assets.member.value_of_home"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="non_liquid_assets.spouse.value_of_home"
          >
            <el-input
              v-model="ruleForm.non_liquid_assets.spouse.value_of_home"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="non_liquid_assets.o_nq.value_of_home"
          >
            <el-input v-model="ruleForm.non_liquid_assets.o_nq.value_of_home" />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="non_liquid_assets.balance.value_of_home"
          >
            <el-input
              v-model="ruleForm.non_liquid_assets.balance.value_of_home"
            />
          </el-form-item>
        </div>

        <div class="flex items-center pb-2">
          <div class="w-4/24 text-main font-semibold text-xss">
            401k/IRA (if over 59)
          </div>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="non_liquid_assets.member.first_401k_ira_59"
          >
            <el-input
              v-model="ruleForm.non_liquid_assets.member.first_401k_ira_59"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="non_liquid_assets.spouse.first_401k_ira_59"
          >
            <el-input
              v-model="ruleForm.non_liquid_assets.spouse.first_401k_ira_59"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="non_liquid_assets.o_nq.first_401k_ira_59"
          >
            <el-input
              v-model="ruleForm.non_liquid_assets.o_nq.first_401k_ira_59"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="non_liquid_assets.balance.first_401k_ira_59"
          >
            <el-input
              v-model="ruleForm.non_liquid_assets.balance.first_401k_ira_59"
            />
          </el-form-item>
        </div>

        <div class="flex items-center pb-2">
          <div class="w-4/24 text-main font-semibold text-xss">401k/IRA</div>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="non_liquid_assets.member.first_401k_ira"
          >
            <el-input
              v-model="ruleForm.non_liquid_assets.member.first_401k_ira"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="non_liquid_assets.spouse.first_401k_ira"
          >
            <el-input
              v-model="ruleForm.non_liquid_assets.spouse.first_401k_ira"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="non_liquid_assets.o_nq.first_401k_ira"
          >
            <el-input
              v-model="ruleForm.non_liquid_assets.o_nq.first_401k_ira"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="non_liquid_assets.balance.first_401k_ira"
          >
            <el-input
              v-model="ruleForm.non_liquid_assets.balance.first_401k_ira"
            />
          </el-form-item>
        </div>

        <div class="flex items-center pb-2">
          <div class="w-4/24 text-main font-semibold text-xss">401k/IRA</div>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="non_liquid_assets.member.second_401k_ira"
          >
            <el-input
              v-model="ruleForm.non_liquid_assets.member.second_401k_ira"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="non_liquid_assets.spouse.second_401k_ira"
          >
            <el-input
              v-model="ruleForm.non_liquid_assets.spouse.second_401k_ira"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="non_liquid_assets.o_nq.second_401k_ira"
          >
            <el-input
              v-model="ruleForm.non_liquid_assets.o_nq.second_401k_ira"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="non_liquid_assets.balance.second_401k_ira"
          >
            <el-input
              v-model="ruleForm.non_liquid_assets.balance.second_401k_ira"
            />
          </el-form-item>
        </div>

        <div class="flex items-center pb-2">
          <div class="w-4/24 text-main font-semibold text-xss">
            FA/VA suject to penalty
          </div>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="non_liquid_assets.member.fa_va_subject_to_penalty"
          >
            <el-input
              v-model="
                ruleForm.non_liquid_assets.member.fa_va_subject_to_penalty
              "
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="non_liquid_assets.spouse.fa_va_subject_to_penalty"
          >
            <el-input
              v-model="
                ruleForm.non_liquid_assets.spouse.fa_va_subject_to_penalty
              "
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="non_liquid_assets.o_nq.fa_va_subject_to_penalty"
          >
            <el-input
              v-model="ruleForm.non_liquid_assets.o_nq.fa_va_subject_to_penalty"
            />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="non_liquid_assets.balance.fa_va_subject_to_penalty"
          >
            <el-input
              v-model="
                ruleForm.non_liquid_assets.balance.fa_va_subject_to_penalty
              "
            />
          </el-form-item>
        </div>

        <div class="flex items-center pb-2">
          <div class="w-4/24 text-main font-semibold text-xss">Other</div>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="non_liquid_assets.member.other"
          >
            <el-input v-model="ruleForm.non_liquid_assets.member.other" />
          </el-form-item>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="non_liquid_assets.spouse.other"
          >
            <el-input v-model="ruleForm.non_liquid_assets.spouse.other" />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="non_liquid_assets.o_nq.other"
          >
            <el-input v-model="ruleForm.non_liquid_assets.o_nq.other" />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="non_liquid_assets.balance.other"
          >
            <el-input v-model="ruleForm.non_liquid_assets.balance.other" />
          </el-form-item>
        </div>

        <div class="flex items-center pb-2">
          <div class="w-4/24 text-main font-semibold text-xss">Total</div>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="non_liquid_assets.member.total"
          >
            <el-input v-model="ruleForm.non_liquid_assets.member.total" />
          </el-form-item>
          <el-form-item
            class="w-5/24 pr-2.5"
            prop="non_liquid_assets.spouse.total"
          >
            <el-input v-model="ruleForm.non_liquid_assets.spouse.total" />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="non_liquid_assets.o_nq.total"
          >
            <el-input v-model="ruleForm.non_liquid_assets.o_nq.total" />
          </el-form-item>
          <el-form-item
            class="w-5/24 pl-2.5"
            prop="non_liquid_assets.balance.total"
          >
            <el-input v-model="ruleForm.non_liquid_assets.balance.total" />
          </el-form-item>
        </div>
      </div>
      <div class="flex justify-end my-10">
        <div class="pr-3">
          <Button default-gray-btn text-btn="Back" @click="backStep" />
        </div>
        <el-button type="primary" @click="submitForm('ruleForm')">
          Go to the assets accounts
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed, reactive, onMounted } from 'vue'
import { createAssetsIncome } from '@/api/vueQuery/create-assets-income'
import { useMutation } from 'vue-query'
import { useAlert } from '@/utils/use-alert'
import { rules } from '@/validationRules/assetsRules.js'
import { scrollTop } from '@/utils/scrollTop'

export default {
  name: 'AddProspectAssets',
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const ruleForm = reactive({
      income: {
        income_plan: true,
        member: {
          salary: '',
          social_security: '',
          pension: '',
          rental_income: '',
          rmds: '',
          interest_dividends: '',
          other: '',
        },
        spouse: {
          salary: '',
          social_security: '',
          pension: '',
          rental_income: '',
          rmds: '',
          interest_dividends: '',
          other: '',
        },
      },
      liquid_assets: {
        member: {
          gift_inheritance: '',
          first_401k_ira_59: '',
          cash_value_life_insurance: '',
          total: '',
          second_401k_ira: '',
          cash_checking_savings_mm: '',
          stocks_bonds_mf: '',
          first_401k_ira: '',
          other_liquid_assets: '',
          cds: '',
          lump_sum_pension: '',
          fa_va_not_subject_to_penalty: '',
        },
        spouse: {
          gift_inheritance: '',
          first_401k_ira_59: '',
          cash_value_life_insurance: '',
          total: '',
          second_401k_ira: '',
          cash_checking_savings_mm: '',
          stocks_bonds_mf: '',
          first_401k_ira: '',
          other_liquid_assets: '',
          cds: '',
          lump_sum_pension: '',
          fa_va_not_subject_to_penalty: '',
        },
        o_nq: {
          gift_inheritance: '',
          first_401k_ira_59: '',
          cash_value_life_insurance: '',
          total: '',
          second_401k_ira: '',
          cash_checking_savings_mm: '',
          stocks_bonds_mf: '',
          first_401k_ira: '',
          other_liquid_assets: '',
          cds: '',
          lump_sum_pension: '',
          fa_va_not_subject_to_penalty: '',
        },
        balance: {
          gift_inheritance: '',
          first_401k_ira_59: '',
          cash_value_life_insurance: '',
          total: '',
          second_401k_ira: '',
          cash_checking_savings_mm: '',
          stocks_bonds_mf: '',
          first_401k_ira: '',
          other_liquid_assets: '',
          cds: '',
          lump_sum_pension: '',
          fa_va_not_subject_to_penalty: '',
        },
      },
      non_liquid_assets: {
        member: {
          total: '',
          other: '',
          fa_va_subject_to_penalty: '',
          second_401k_ira: '',
          first_401k_ira: '',
          first_401k_ira_59: '',
          value_of_home: '',
        },
        spouse: {
          total: '',
          other: '',
          fa_va_subject_to_penalty: '',
          second_401k_ira: '',
          first_401k_ira: '',
          first_401k_ira_59: '',
          value_of_home: '',
        },
        o_nq: {
          total: '',
          other: '',
          fa_va_subject_to_penalty: '',
          second_401k_ira: '',
          first_401k_ira: '',
          first_401k_ira_59: '',
          value_of_home: '',
        },
        balance: {
          total: '',
          other: '',
          fa_va_subject_to_penalty: '',
          second_401k_ira: '',
          first_401k_ira: '',
          first_401k_ira_59: '',
          value_of_home: '',
        },
      },
      member_id: '',
    })

    onMounted(() => {
      store.commit('newProspect/setStep', 2)
      scrollTop()
      ruleForm.member_id = route.params.id
    })

    const {
      mutateAsync: create,
      isLoading,
      isError,
      isFetching,
      data,
      error,
    } = useMutation(createAssetsIncome)

    const step = computed(() => store.state.newProspect.step)

    const backStep = () => {
      store.commit('newProspect/setStep', step.value - 1)
      router.push({ name: 'basic-information' })
    }

    const submitForm = async () => {
      const res = await create(ruleForm)
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Prospect created successfully',
        })
        store.commit('newProspect/setStep', step.value + 1)
        router.push({
          name: 'assetsacount',
          params: { id: res.data.id },
        })
      }
    }

    return {
      ruleForm,
      backStep,
      create,
      isLoading,
      isError,
      isFetching,
      data,
      error,
      submitForm,
      rules,
    }
  },
}
</script>
