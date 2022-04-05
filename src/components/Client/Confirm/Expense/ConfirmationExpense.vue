<template>
  <div class="lg:w-[960px]">
    <div v-if="!isLoadingExpense">
      <div class="flex justify-end mb-4">
        <el-button type="primary" plain class="mr-10" size="small" @click="edit">Edit</el-button>
      </div>
      <div class="lg:max-w-5xl lg:my-0 lg:mx-auto">
        <div class="hidden pb-2 mt-8 md:flex">
          <div class="md:w-8/12" />
          <div class="md:w-2/12 text-gray03 text-xs">ESSENTIAL</div>
          <div class="md:w-2/12 text-gray03 text-xs">DISCRETIONARY</div>
        </div>
        <div>
          <!-- HOUSING -->
          <el-card shadow="never" class="mb-5">
            <div class="md:flex mb-4">
              <div class="w-3/12 flex items-center text-sm font-semibold">Housing</div>
              <div class="flex pb-2 mt-5 md:hidden">
                <div class="w-6/12 text-gray03 text-xs md:text-center">ESSENTIAL</div>
                <div class="w-6/12 text-gray03 text-xs md:text-center">DISCRETIONARY</div>
              </div>
              <div class="md:w-5/12 text-main text-xss flex items-center">At Home</div>
              <div class="flex md:w-4/12">
                <ConfirmExpenseItem :item="data.housing.mortgage_rent_fees.essential" class="w-6/12" />
                <ConfirmExpenseItem :item="data.housing.mortgage_rent_fees.discretionary" class="w-6/12" />
              </div>
            </div>

            <div class="md:flex mb-4">
              <div class="w-3/12" />
              <div class="md:w-5/12 text-main text-xss flex items-center">Property Taxes & Insurance</div>
              <div class="flex md:w-4/12">
                <ConfirmExpenseItem :item="data.housing.property_taxes_and_insurance.essential" class="w-6/12" />
                <ConfirmExpenseItem :item="data.housing.property_taxes_and_insurance.discretionary" class="w-6/12" />
              </div>
            </div>
            <div class="md:flex mb-4">
              <div class="w-3/12" />
              <div class="md:w-5/12 text-main text-xss flex items-center">Utilities</div>
              <div class="flex md:w-4/12">
                <ConfirmExpenseItem :item="data.housing.utilities.essential" class="w-6/12" />
                <ConfirmExpenseItem :item="data.housing.utilities.discretionary" class="w-6/12" />
              </div>
            </div>
            <div class="md:flex mb-4">
              <div class="w-3/12" />
              <div class="md:w-5/12 text-main text-xss flex items-center">Household Improvement</div>
              <div class="flex md:w-4/12">
                <ConfirmExpenseItem :item="data.housing.household_improvement.essential" class="w-6/12" />
                <ConfirmExpenseItem :item="data.housing.household_improvement.discretionary" class="w-6/12" />
              </div>
            </div>
            <div class="md:flex mb-4">
              <div class="w-3/12" />
              <div class="md:w-5/12 text-main text-xss flex items-center">Household Maintenance</div>
              <div class="flex md:w-4/12">
                <ConfirmExpenseItem :item="data.housing.household_maintenance.essential" class="w-6/12" />
                <ConfirmExpenseItem :item="data.housing.household_maintenance.discretionary" class="w-6/12" />
              </div>
            </div>
          </el-card>

          <!-- FOOD TRANSPORTATION -->
          <el-card shadow="never" class="mb-5">
            <div class="md:flex mb-4">
              <div class="w-3/12 flex items-center text-sm font-semibold">Food</div>
              <div class="flex pb-2 mt-5 md:hidden">
                <div class="w-6/12 text-gray03 text-xs md:text-center">ESSENTIAL</div>
                <div class="w-6/12 text-gray03 text-xs md:text-center">DISCRETIONARY</div>
              </div>
              <div class="md:w-5/12 text-main text-xss flex items-center">At Home</div>
              <div class="flex md:w-4/12">
                <ConfirmExpenseItem :item="data.food_transportation.at_home.essential" class="w-6/12" />
                <ConfirmExpenseItem :item="data.food_transportation.at_home.discretionary" class="w-6/12" />
              </div>
            </div>
            <div class="md:flex mb-4">
              <div class="w-3/12" />
              <div class="md:w-5/12 text-main text-xss flex items-center">Dining Out</div>
              <div class="flex md:w-4/12">
                <ConfirmExpenseItem :item="data.food_transportation.dining_out.essential" class="w-6/12" />
                <ConfirmExpenseItem :item="data.food_transportation.dining_out.discretionary" class="w-6/12" />
              </div>
            </div>
            <div class="md:flex mb-4">
              <div class="w-3/12 flex items-center text-sm font-semibold">Transportation</div>
              <div class="md:w-5/12 text-main text-xss flex items-center">Vehicle Purchases/Payments</div>
              <div class="flex md:w-4/12">
                <ConfirmExpenseItem
                  :item="data.food_transportation.vehicle_purchases_payments.essential"
                  class="w-6/12"
                />
                <ConfirmExpenseItem
                  :item="data.food_transportation.vehicle_purchases_payments.discretionary"
                  class="w-6/12"
                />
              </div>
            </div>
            <div class="md:flex mb-4">
              <div class="w-3/12" />
              <div class="md:w-5/12 text-main text-xss flex items-center">Auto Insurance and Taxes</div>
              <div class="flex md:w-4/12">
                <ConfirmExpenseItem
                  :item="data.food_transportation.auto_insurance_and_taxes.essential"
                  class="w-6/12"
                />
                <ConfirmExpenseItem
                  :item="data.food_transportation.auto_insurance_and_taxes.discretionary"
                  class="w-6/12"
                />
              </div>
            </div>
            <div class="md:flex mb-4">
              <div class="w-3/12" />
              <div class="md:w-5/12 text-main text-xss flex items-center">Fuel & Maintenance</div>
              <div class="flex md:w-4/12">
                <ConfirmExpenseItem :item="data.food_transportation.fuel_and_maintenance.essential" class="w-6/12" />
                <ConfirmExpenseItem
                  :item="data.food_transportation.fuel_and_maintenance.discretionary"
                  class="w-6/12"
                />
              </div>
            </div>
            <div class="md:flex mb-4">
              <div class="w-3/12" />
              <div class="md:w-5/12 text-main text-xss flex items-center">Public Transportation</div>
              <div class="flex md:w-4/12">
                <ConfirmExpenseItem :item="data.food_transportation.public_transportation.essential" class="w-6/12" />
                <ConfirmExpenseItem
                  :item="data.food_transportation.public_transportation.discretionary"
                  class="w-6/12"
                />
              </div>
            </div>
          </el-card>

          <!-- HEALTHCARE -->
          <el-card shadow="never" class="mb-5">
            <div class="md:flex mb-4">
              <div class="w-3/12 flex items-center text-sm font-semibold">Healthcare</div>
              <div class="flex pb-2 mt-5 md:hidden">
                <div class="w-6/12 text-gray03 text-xs md:text-center">ESSENTIAL</div>
                <div class="w-6/12 text-gray03 text-xs md:text-center">DISCRETIONARY</div>
              </div>
              <div class="md:w-5/12 text-main text-xss flex items-center">Health Insurance</div>
              <div class="flex md:w-4/12">
                <ConfirmExpenseItem :item="data.healthcare.health_insurance.essential" class="w-6/12" />
                <ConfirmExpenseItem :item="data.healthcare.health_insurance.discretionary" class="w-6/12" />
              </div>
            </div>
            <div class="md:flex mb-4">
              <div class="w-3/12" />
              <div class="md:w-5/12 text-main text-xss flex items-center">Medicare/Medigap</div>
              <div class="flex md:w-4/12">
                <ConfirmExpenseItem :item="data.healthcare.medicare_medigap.essential" class="w-6/12" />
                <ConfirmExpenseItem :item="data.healthcare.medicare_medigap.discretionary" class="w-6/12" />
              </div>
            </div>
            <div class="md:flex mb-4">
              <div class="w-3/12" />
              <div class="md:w-5/12 text-main text-xss flex items-center">Copays/Uncovered Medical Services</div>
              <div class="flex md:w-4/12">
                <ConfirmExpenseItem
                  :item="data.healthcare.copays_uncovered_medical_services.essential"
                  class="w-6/12"
                />
                <ConfirmExpenseItem
                  :item="data.healthcare.copays_uncovered_medical_services.discretionary"
                  class="w-6/12"
                />
              </div>
            </div>
            <div class="md:flex mb-4">
              <div class="w-3/12" />
              <div class="md:w-5/12 text-main text-xss flex items-center">Drugs & Medical Supplies</div>
              <div class="flex md:w-4/12">
                <ConfirmExpenseItem :item="data.healthcare.drugs_and_medical_supplies.essential" class="w-6/12" />
                <ConfirmExpenseItem :item="data.healthcare.drugs_and_medical_supplies.discretionary" class="w-6/12" />
              </div>
            </div>
          </el-card>

          <!-- PERSONAL -->
          <el-card shadow="never" class="mb-5">
            <div class="md:flex mb-4">
              <div class="md:w-3/12 flex items-center text-sm font-semibold">Personal Insurance</div>
              <div class="flex pb-2 mt-5 md:hidden">
                <div class="w-6/12 text-gray03 text-xs md:text-center">ESSENTIAL</div>
                <div class="w-6/12 text-gray03 text-xs md:text-center">DISCRETIONARY</div>
              </div>
              <div class="md:w-5/12 text-main text-xss flex items-center">Life/Other</div>
              <div class="flex md:w-4/12">
                <ConfirmExpenseItem :item="data.personal_insurance.life_other.essential" class="w-6/12" />
                <ConfirmExpenseItem :item="data.personal_insurance.life_other.discretionary" class="w-6/12" />
              </div>
            </div>
            <div class="md:flex mb-4">
              <div class="w-3/12" />
              <div class="md:w-5/12 text-main text-xss flex items-center">Long-Term Care</div>
              <div class="flex md:w-4/12">
                <ConfirmExpenseItem :item="data.personal_insurance.long_term_care.essential" class="w-6/12" />
                <ConfirmExpenseItem :item="data.personal_insurance.long_term_care.discretionary" class="w-6/12" />
              </div>
            </div>
            <div class="md:flex mb-4">
              <div class="md:w-3/12 flex items-center text-sm font-semibold">Personal Care</div>
              <div class="flex pb-2 mt-5 md:hidden">
                <div class="w-6/12 text-gray03 text-xs md:text-center">ESSENTIAL</div>
                <div class="w-6/12 text-gray03 text-xs md:text-center">DISCRETIONARY</div>
              </div>
              <div class="md:w-5/12 text-main text-xss flex items-center">Clothing</div>
              <div class="flex md:w-4/12">
                <ConfirmExpenseItem :item="data.personal_insurance.clothing.essential" class="w-6/12" />
                <ConfirmExpenseItem :item="data.personal_insurance.clothing.discretionary" class="w-6/12" />
              </div>
            </div>
            <div class="md:flex mb-4">
              <div class="w-3/12" />
              <div class="md:w-5/12 text-main text-xss flex items-center">Products & Services</div>
              <div class="flex md:w-4/12">
                <ConfirmExpenseItem :item="data.personal_insurance.product_and_services.essential" class="w-6/12" />
                <ConfirmExpenseItem :item="data.personal_insurance.product_and_services.discretionary" class="w-6/12" />
              </div>
            </div>
          </el-card>

          <!-- OTHER -->
          <el-card shadow="never" class="mb-5">
            <div class="md:flex mb-4">
              <div class="w-3/12" />
              <div class="flex pb-2 mt-5 md:hidden">
                <div class="w-6/12 text-gray03 text-xs md:text-center">ESSENTIAL</div>
                <div class="w-6/12 text-gray03 text-xs md:text-center">DISCRETIONARY</div>
              </div>
              <div class="md:w-5/12 text-main text-xss flex items-center">Entertainment</div>
              <div class="flex md:w-4/12">
                <ConfirmExpenseItem :item="data.entertainment.essential" class="w-6/12" />
                <ConfirmExpenseItem :item="data.entertainment.discretionary" class="w-6/12" />
              </div>
            </div>
            <div class="md:flex mb-4">
              <div class="w-3/12" />
              <div class="md:w-5/12 text-main text-xss flex items-center">Travel</div>
              <div class="flex md:w-4/12">
                <ConfirmExpenseItem :item="data.travel.essential" class="w-6/12" />
                <ConfirmExpenseItem :item="data.travel.discretionary" class="w-6/12" />
              </div>
            </div>
            <div class="md:flex mb-4">
              <div class="w-3/12" />
              <div class="md:w-5/12 text-main text-xss flex items-center">Hobbies</div>
              <div class="flex md:w-4/12">
                <ConfirmExpenseItem :item="data.hobbies.essential" class="w-6/12" />
                <ConfirmExpenseItem :item="data.hobbies.discretionary" class="w-6/12" />
              </div>
            </div>
            <div class="md:flex mb-4">
              <div class="w-3/12" />
              <div class="md:w-5/12 text-main text-xss flex items-center">Family Care/Education</div>
              <div class="flex md:w-4/12">
                <ConfirmExpenseItem :item="data.family_care_education.essential" class="w-6/12" />
                <ConfirmExpenseItem :item="data.family_care_education.discretionary" class="w-6/12" />
              </div>
            </div>
            <div class="md:flex mb-4">
              <div class="w-3/12" />
              <div class="md:w-5/12 text-main text-xss flex items-center">Income Taxes</div>
              <div class="flex md:w-4/12">
                <ConfirmExpenseItem :item="data.income_taxes.essential" class="w-6/12" />
                <ConfirmExpenseItem :item="data.income_taxes.discretionary" class="w-6/12" />
              </div>
            </div>
            <div class="md:flex mb-4">
              <div class="w-3/12" />
              <div class="md:w-5/12 text-main text-xss flex items-center">Charitable Contributions</div>
              <div class="flex md:w-4/12">
                <ConfirmExpenseItem :item="data.charitable_contributions.essential" class="w-6/12" />
                <ConfirmExpenseItem :item="data.charitable_contributions.discretionary" class="w-6/12" />
              </div>
            </div>
            <div class="md:flex mb-4">
              <div class="w-3/12" />
              <div class="md:w-5/12 text-main text-xss flex items-center">Other</div>
              <div class="flex md:w-4/12">
                <ConfirmExpenseItem :item="data.other.essential" class="w-6/12" />
                <ConfirmExpenseItem :item="data.other.discretionary" class="w-6/12" />
              </div>
            </div>
            <div class="md:flex mb-4">
              <div class="w-3/12" />
              <div class="md:w-5/12 text-main text-xss flex items-center">SUBTOTAL</div>
              <div class="w-6/12 md:w-2/12 text-sm font-semibold inline-flex">
                <span>{{ currencyFormat(data.subtotal.essential) }}</span>
              </div>
              <div class="w-6/12 md:w-2/12 text-sm font-semibold inline-flex">
                <span>{{ currencyFormat(data.subtotal.discretionary) }}</span>
              </div>
            </div>
          </el-card>
          <div class="md:flex md:justify-end text-sm font-semibold p-3">
            <div class="md:w-3/12">TOTAL MONTHLY EXPENSES</div>
            <div class="w-2/12">
              <span>{{ currencyFormat(data.total) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center items-center">
      <SwdSpinner large />
    </div>
  </div>
</template>
<script>
import { currencyFormat } from '@/utils/currencyFormat'
import { useRouter, useRoute } from 'vue-router'
import { useFetchMonthlyExpense } from '@/api/use-fetch-monthly-expense.js'

import ConfirmExpenseItem from '../Expense/ConfirmExpenseItem.vue'
export default {
  name: 'ConfirmationExpense',
  components: {
    ConfirmExpenseItem,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()

    const {
      isLoading: isLoadingExpense,
      isFetching: isFetchingExpense,
      data,
    } = useFetchMonthlyExpense({ id: route.params.id })

    const edit = () => {
      router.push({ name: 'client-expense-information', params: { id: route.params.id } })
    }

    return {
      currencyFormat,
      edit,
      isLoadingExpense,
      isFetchingExpense,
      data,
    }
  },
}
</script>
