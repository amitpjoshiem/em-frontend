<template>
  <div v-if="!isLoading">
    <div class="flex pb-2 mt-8">
      <div class="w-8/12" />
      <div class="w-2/12 text-main text-xs">ESSENTIAL</div>
      <div class="w-2/12 text-main text-xs">DISCRETIONARY</div>
    </div>
    <el-form ref="form" :model="ruleForm" :rules="rules">
      <el-card shadow="never" class="mb-5">
        <div class="flex mb-4">
          <!-- HOUSING -->
          <div class="w-3/12 flex items-center text-sm font-semibold">Housing</div>
          <div class="w-5/12 text-main text-xss flex items-center">Mortgage/Rent/Fees</div>
          <el-form-item prop="housing.mortgage_rent_fees.essential" class="w-2/12 mr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.housing.mortgage_rent_fees.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
          <el-form-item prop="housing.mortgage_rent_fees.discretionary" class="w-2/12 ml-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.housing.mortgage_rent_fees.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
        </div>
        <div class="flex mb-4">
          <div class="w-3/12" />
          <div class="w-5/12 text-main text-xss flex items-center">Property Taxes & Insurance</div>
          <el-form-item prop="housing.property_taxes_and_insurance.essential" class="w-2/12 mr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.housing.property_taxes_and_insurance.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
          <el-form-item prop="housing.property_taxes_and_insurance.discretionary" class="w-2/12 ml-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.housing.property_taxes_and_insurance.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
        </div>
        <div class="flex mb-4">
          <div class="w-3/12" />
          <div class="w-5/12 text-main text-xss flex items-center">Utilities</div>
          <el-form-item prop="housing.utilities.essential" class="w-2/12 mr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.housing.utilities.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
          <el-form-item prop="housing.utilities.discretionary" class="w-2/12 ml-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.housing.utilities.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
        </div>
        <div class="flex mb-4">
          <div class="w-3/12" />
          <div class="w-5/12 text-main text-xss flex items-center">Household Improvement</div>
          <el-form-item prop="housing.household_improvement.essential" class="w-2/12 mr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.housing.household_improvement.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
          <el-form-item prop="housing.household_improvement.discretionary" class="w-2/12 ml-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.housing.household_improvement.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
        </div>
        <div class="flex mb-4">
          <div class="w-3/12" />
          <div class="w-5/12 text-main text-xss flex items-center">Household Maintenance</div>
          <el-form-item prop="housing.household_maintenance.essential" class="w-2/12 mr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.housing.household_maintenance.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
          <el-form-item prop="housing.household_maintenance.discretionary" class="w-2/12 ml-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.housing.household_maintenance.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
        </div>
      </el-card>

      <!-- FOOD TRANSPORTATION -->
      <el-card shadow="never" class="mb-5">
        <div class="flex mb-4">
          <div class="w-3/12 flex items-center text-sm font-semibold">Food</div>
          <div class="w-5/12 text-main text-xss flex items-center">At Home</div>
          <el-form-item prop="food_transportation.at_home.essential" class="w-2/12 mr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.food_transportation.at_home.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
          <el-form-item prop="food_transportation.at_home.discretionary" class="w-2/12 ml-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.food_transportation.at_home.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
        </div>

        <div class="flex mb-4">
          <div class="w-3/12" />
          <div class="w-5/12 text-main text-xss flex items-center">Dining Out</div>
          <el-form-item prop="food_transportation.dining_out.essential" class="w-2/12 mr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.food_transportation.dining_out.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
          <el-form-item prop="food_transportation.dining_out.discretionary" class="w-2/12 ml-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.food_transportation.dining_out.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
        </div>
        <div class="flex mb-4">
          <div class="w-3/12 flex items-center text-sm font-semibold">Transportation</div>
          <div class="w-5/12 text-main text-xss flex items-center">Vehicle Purchases/Payments</div>
          <el-form-item prop="food_transportation.vehicle_purchases_payments.essential" class="w-2/12 mr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.food_transportation.vehicle_purchases_payments.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
          <el-form-item prop="food_transportation.vehicle_purchases_payments.discretionary" class="w-2/12 ml-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.food_transportation.vehicle_purchases_payments.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
        </div>
        <div class="flex mb-4">
          <div class="w-3/12" />
          <div class="w-5/12 text-main text-xss flex items-center">Auto Insurance and Taxes</div>
          <el-form-item prop="food_transportation.auto_insurance_and_taxes.essential" class="w-2/12 mr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.food_transportation.auto_insurance_and_taxes.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
          <el-form-item prop="food_transportation.auto_insurance_and_taxes.discretionary" class="w-2/12 ml-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.food_transportation.auto_insurance_and_taxes.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
        </div>
        <div class="flex mb-4">
          <div class="w-3/12" />
          <div class="w-5/12 text-main text-xss flex items-center">Fuel & Maintenance</div>
          <el-form-item prop="food_transportation.fuel_and_maintenance.essential" class="w-2/12 mr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.food_transportation.fuel_and_maintenance.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
          <el-form-item prop="food_transportation.fuel_and_maintenance.discretionary" class="w-2/12 ml-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.food_transportation.fuel_and_maintenance.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
        </div>
        <div class="flex mb-4">
          <div class="w-3/12" />
          <div class="w-5/12 text-main text-xss flex items-center">Public Transportation</div>
          <el-form-item prop="food_transportation.public_transportation.essential" class="w-2/12 mr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.food_transportation.public_transportation.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
          <el-form-item prop="food_transportation.public_transportation.discretionary" class="w-2/12 ml-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.food_transportation.public_transportation.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
        </div>
      </el-card>

      <!-- HEALTHCARE -->
      <el-card shadow="never" class="mb-5">
        <div class="flex mb-4">
          <div class="w-3/12 flex items-center text-sm font-semibold">Healthcare</div>
          <div class="w-5/12 text-main text-xss flex items-center">Health Insurance</div>
          <el-form-item prop="healthcare.health_insurance.essential" class="w-2/12 mr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.healthcare.health_insurance.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
          <el-form-item prop="healthcare.health_insurance.discretionary" class="w-2/12 ml-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.healthcare.health_insurance.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
        </div>
        <div class="flex mb-4">
          <div class="w-3/12" />
          <div class="w-5/12 text-main text-xss flex items-center">Medicare/Medigap</div>
          <el-form-item prop="healthcare.medicare_medigap.essential" class="w-2/12 mr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.healthcare.medicare_medigap.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
          <el-form-item prop="healthcare.medicare_medigap.discretionary" class="w-2/12 ml-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.healthcare.medicare_medigap.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
        </div>
        <div class="flex mb-4">
          <div class="w-3/12" />
          <div class="w-5/12 text-main text-xss flex items-center">Copays/Uncovered Medical Services</div>
          <el-form-item prop="healthcare.copays_uncovered_medical_services.essential" class="w-2/12 mr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.healthcare.copays_uncovered_medical_services.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
          <el-form-item prop="healthcare.copays_uncovered_medical_services.discretionary" class="w-2/12 ml-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.healthcare.copays_uncovered_medical_services.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
        </div>
        <div class="flex mb-4">
          <div class="w-3/12" />
          <div class="w-5/12 text-main text-xss flex items-center">Drugs & Medical Supplies</div>
          <el-form-item prop="healthcare.drugs_and_medical_supplies.essential" class="w-2/12 mr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.healthcare.drugs_and_medical_supplies.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
          <el-form-item prop="healthcare.drugs_and_medical_supplies.discretionary" class="w-2/12 ml-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.healthcare.drugs_and_medical_supplies.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
        </div>
      </el-card>

      <!-- PERSONAL -->
      <el-card shadow="never" class="mb-5">
        <div class="flex mb-4">
          <div class="w-3/12 flex items-center text-sm font-semibold">Personal Insurance</div>
          <div class="w-5/12 text-main text-xss flex items-center">Life/Other</div>
          <el-form-item prop="personal_insurance.life_other.essential" class="w-2/12 mr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.personal_insurance.life_other.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
          <el-form-item prop="personal_insurance.life_other.discretionary" class="w-2/12 ml-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.personal_insurance.life_other.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
        </div>
        <div class="flex mb-4">
          <div class="w-3/12" />
          <div class="w-5/12 text-main text-xss flex items-center">Long-Term Care</div>
          <el-form-item prop="personal_insurance.long_term_care.essential" class="w-2/12 mr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.personal_insurance.long_term_care.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
          <el-form-item prop="personal_insurance.long_term_care.discretionary" class="w-2/12 ml-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.personal_insurance.long_term_care.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
        </div>
        <div class="flex mb-4">
          <div class="w-3/12 flex items-center text-sm font-semibold">Personal Care</div>
          <div class="w-5/12 text-main text-xss flex items-center">Clothing</div>
          <el-form-item prop="personal_insurance.clothing.essential" class="w-2/12 mr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.personal_insurance.clothing.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
          <el-form-item prop="personal_insurance.clothing.discretionary" class="w-2/12 ml-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.personal_insurance.clothing.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
        </div>
        <div class="flex mb-4">
          <div class="w-3/12" />
          <div class="w-5/12 text-main text-xss flex items-center">Products & Services</div>
          <el-form-item prop="personal_insurance.product_and_services.essential" class="w-2/12 mr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.personal_insurance.product_and_services.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
          <el-form-item prop="personal_insurance.product_and_services.discretionary" class="w-2/12 ml-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.personal_insurance.product_and_services.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
        </div>
      </el-card>

      <!-- OTHER -->
      <el-card shadow="never" class="mb-5">
        <div class="flex mb-4">
          <div class="w-3/12" />
          <div class="w-5/12 text-main text-xss flex items-center">Entertainment</div>
          <el-form-item prop="entertainment.essential" class="w-2/12 mr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.entertainment.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
          <el-form-item prop="entertainment.discretionary" class="w-2/12 ml-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.entertainment.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
        </div>
        <div class="flex mb-4">
          <div class="w-3/12" />
          <div class="w-5/12 text-main text-xss flex items-center">Travel</div>
          <el-form-item prop="travel.essential" class="w-2/12 mr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.travel.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
          <el-form-item prop="travel.discretionary" class="w-2/12 ml-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.travel.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              @blur="change()"
            />
          </el-form-item>
        </div>
        <div class="flex mb-4">
          <div class="w-3/12" />
          <div class="w-5/12 text-main text-xss flex items-center">Hobbies</div>
          <el-form-item prop="hobbies.essential" class="w-2/12 mr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.hobbies.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
          <el-form-item prop="hobbies.discretionary" class="w-2/12 ml-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.hobbies.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
        </div>
        <div class="flex mb-4">
          <div class="w-3/12" />
          <div class="w-5/12 text-main text-xss flex items-center">Family Care/Education</div>
          <el-form-item prop="family_care_education.essential" class="w-2/12 mr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.family_care_education.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
          <el-form-item prop="family_care_education.discretionary" class="w-2/12 ml-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.family_care_education.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
        </div>
        <div class="flex mb-4">
          <div class="w-3/12" />
          <div class="w-5/12 text-main text-xss flex items-center">Income Taxes</div>
          <el-form-item prop="income_taxes.essential" class="w-2/12 mr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.income_taxes.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
          <el-form-item prop="income_taxes.discretionary" class="w-2/12 ml-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.income_taxes.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
        </div>
        <div class="flex mb-4">
          <div class="w-3/12" />
          <div class="w-5/12 text-main text-xss flex items-center">Charitable Contributions</div>
          <el-form-item prop="charitable_contributions.essential" class="w-2/12 mr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.charitable_contributions.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
          <el-form-item prop="charitable_contributions.discretionary" class="w-2/12 ml-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.charitable_contributions.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
        </div>
        <div class="flex mb-4">
          <div class="w-3/12" />
          <div class="w-5/12 text-main text-xss flex items-center">Other</div>
          <el-form-item prop="other.essential" class="w-2/12 mr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.other.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
          <el-form-item prop="other.discretionary" class="w-2/12 ml-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.other.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @blur="change()"
            />
          </el-form-item>
        </div>
        <div class="flex mb-4">
          <div class="w-3/12" />
          <div class="w-5/12 text-main text-xss flex items-center">SUBTOTAL</div>
          <div class="w-2/12 mr-2 text-sm font-semibold">
            <SwdSpinner v-if="isLoadingCreate || isFetching" />
            <span v-else>{{ currencyFormat(ruleForm.subtotal.essential) }}</span>
          </div>
          <div class="w-2/12 ml-2 text-sm font-semibold">
            <SwdSpinner v-if="isLoadingCreate || isFetching" />
            <span v-else>{{ currencyFormat(ruleForm.subtotal.discretionary) }}</span>
          </div>
        </div>
      </el-card>
      <div class="flex justify-end text-sm font-semibold mb-5">
        <div class="w-3/12">TOTAL MONTHLY EXPENSES</div>
        <div class="w-2/12">
          <SwdSpinner v-if="isLoadingCreate || isFetching" />
          <span v-else>{{ currencyFormat(ruleForm.total) }}</span>
        </div>
      </div>

      <div class="flex justify-end my-10">
        <div class="pr-3">
          <Button default-gray-btn text-btn="Back" @click="backStep" />
        </div>
        <SwdButton primary main @click="nextStep()"> Go to the assets accounts </SwdButton>
      </div>
    </el-form>
  </div>
  <el-skeleton v-else :rows="15" animated />
</template>
<script>
import { onMounted, computed, reactive, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useFetchMonthlyExpense } from '@/api/use-fetch-monthly-expense.js'
import { createMonthlyExpenses } from '@/api/vueQuery/create-monthly-expenses'
import { useMutation } from 'vue-query'
import { currencyFormat } from '@/utils/currencyFormat'
import { useAlert } from '@/utils/use-alert'
import { scrollTop } from '@/utils/scrollTop'
import { useExpenseInfoHooks } from '@/hooks/use-expense-info-hooks'
import { rules } from '@/validationRules/expenseRules.js'

export default {
  name: 'AddProspectExpense',
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const form = ref()

    const step = computed(() => store.state.newProspect.step)
    let memberId

    const { isLoading, isFetching, data, refetch } = useFetchMonthlyExpense({ id: route.params.id }, { enabled: false })
    const { mutateAsync: create, isLoading: isLoadingCreate } = useMutation(createMonthlyExpenses)

    const { setInitValue, optionsCurrencyInput } = useExpenseInfoHooks()

    const ruleForm = reactive({
      housing: {
        mortgage_rent_fees: {
          essential: null,
          discretionary: null,
        },
        property_taxes_and_insurance: {
          essential: null,
          discretionary: null,
        },
        utilities: {
          essential: null,
          discretionary: null,
        },
        household_improvement: {
          essential: null,
          discretionary: null,
        },
        household_maintenance: {
          essential: null,
          discretionary: null,
        },
      },
      food_transportation: {
        at_home: {
          essential: null,
          discretionary: null,
        },
        dining_out: {
          essential: null,
          discretionary: null,
        },
        vehicle_purchases_payments: {
          essential: null,
          discretionary: null,
        },
        auto_insurance_and_taxes: {
          essential: null,
          discretionary: null,
        },
        fuel_and_maintenance: {
          essential: null,
          discretionary: null,
        },
        public_transportation: {
          essential: null,
          discretionary: null,
        },
      },
      healthcare: {
        health_insurance: {
          essential: null,
          discretionary: null,
        },
        medicare_medigap: {
          essential: null,
          discretionary: null,
        },
        copays_uncovered_medical_services: {
          essential: null,
          discretionary: null,
        },
        drugs_and_medical_supplies: {
          essential: null,
          discretionary: null,
        },
      },
      personal_insurance: {
        life_other: {
          essential: null,
          discretionary: null,
        },
        long_term_care: {
          essential: null,
          discretionary: null,
        },
        clothing: {
          essential: null,
          discretionary: null,
        },
        product_and_services: {
          essential: null,
          discretionary: null,
        },
      },
      entertainment: {
        essential: null,
        discretionary: null,
      },
      travel: {
        essential: null,
        discretionary: null,
      },
      hobbies: {
        essential: null,
        discretionary: null,
      },
      family_care_education: {
        essential: null,
        discretionary: null,
      },
      income_taxes: {
        essential: null,
        discretionary: null,
      },
      charitable_contributions: {
        essential: null,
        discretionary: null,
      },
      other: {
        essential: null,
        discretionary: null,
      },
      total: null,
      subtotal: {
        essential: null,
        discretionary: null,
      },
    })

    onMounted(async () => {
      store.commit('newProspect/setStep', 3)
      scrollTop()
      if (route.params.id) {
        memberId = route.params.id
        refetch.value()
      }
    })

    watchEffect(() => {
      if (isLoading.value === false) {
        setInitValue(ruleForm, data.value)
      }
    })

    const backStep = () => {
      store.commit('newProspect/setStep', step.value - null)
      router.push({ name: 'assets-information', params: { id: memberId } })
    }

    const change = async () => {
      form.value.validate(async (valid) => {
        if (valid) {
          const res = await create({ id: memberId, data: ruleForm })

          if (!('error' in res)) {
            setInitValue(ruleForm, res.data)
          }
        }
      })
    }

    const nextStep = async () => {
      const res = await create({ id: memberId, data: {} })

      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Opportunity update successfully.',
        })
        store.commit('newProspect/setStep', step.value + 1)
        router.push({
          name: 'assets-account',
          params: { id: memberId },
        })
      }
    }

    return {
      backStep,
      ruleForm,
      form,
      optionsCurrencyInput,
      change,
      isLoading,
      isFetching,
      data,
      isLoadingCreate,
      currencyFormat,
      nextStep,
      rules,
    }
  },
}
</script>
