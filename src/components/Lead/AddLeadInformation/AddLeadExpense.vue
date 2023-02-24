<template>
  <div v-if="!isLoading && !isLoadingInfo" class="lg:max-w-5xl lg:my-0 lg:mx-auto">
    <div class="hidden pb-2 mt-8 md:flex">
      <div class="md:w-8/12" />
      <div class="md:w-2/12 text-main text-xs">ESSENTIAL</div>
      <div class="md:w-2/12 text-main text-xs">DISCRETIONARY</div>
    </div>
    <el-form ref="form" :model="ruleForm" :disabled="isReadOnlyLead" :rules="rules">
      <div class="border border-main-gray rounded-lg p-5 mb-5" :class="{ 'border-border-blue': isFocusHousing }">
        <div class="flex items-center mb-5">
          <InlineSvg v-show="isFocusHousing && !isDoneCurrentStep" :src="IconActive" />
          <InlineSvg v-show="!isFocusHousing && !isDoneCurrentStep" :src="IconNotActive" />
          <InlineSvg v-show="isDoneCurrentStep" :src="IconDoneStep" />

          <div class="flex items-center text-sm font-semibold ml-2">Housing</div>
        </div>

        <div class="md:flex mb-4">
          <!-- HOUSING -->
          <div class="flex pb-2 mt-5 md:hidden">
            <div class="w-6/12 text-main text-xs text-center">ESSENTIAL</div>
            <div class="w-6/12 text-main text-xs text-center">DISCRETIONARY</div>
          </div>
          <div class="w-3/12" />
          <div class="md:w-5/12 text-main text-xss flex items-center">Mortgage/Rent/Fees</div>
          <el-form-item prop="housing.mortgage_rent_fees.essential" class="w-6/12 md:w-2/12 pr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.housing.mortgage_rent_fees.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('housing')"
              @blur="blur('housing')"
            />
          </el-form-item>
          <el-form-item prop="housing.mortgage_rent_fees.discretionary" class="w-6/12 md:w-2/12 pl-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.housing.mortgage_rent_fees.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('housing')"
              @blur="blur('housing')"
            />
          </el-form-item>
        </div>
        <div class="md:flex mb-4">
          <div class="w-3/12" />
          <div class="md:w-5/12 text-main text-xss flex items-center">Property Taxes & Insurance</div>
          <el-form-item prop="housing.property_taxes_and_insurance.essential" class="w-6/12 md:w-2/12 pr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.housing.property_taxes_and_insurance.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('housing')"
              @blur="blur('housing')"
            />
          </el-form-item>
          <el-form-item prop="housing.property_taxes_and_insurance.discretionary" class="w-6/12 md:w-2/12 pl-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.housing.property_taxes_and_insurance.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('housing')"
              @blur="blur('housing')"
            />
          </el-form-item>
        </div>
        <div class="md:flex mb-4">
          <div class="w-3/12" />
          <div class="md:w-5/12 text-main text-xss flex items-center">Utilities</div>
          <el-form-item prop="housing.utilities.essential" class="w-6/12 md:w-2/12 pr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.housing.utilities.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('housing')"
              @blur="blur('housing')"
            />
          </el-form-item>
          <el-form-item prop="housing.utilities.discretionary" class="w-6/12 md:w-2/12 pl-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.housing.utilities.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('housing')"
              @blur="blur('housing')"
            />
          </el-form-item>
        </div>
        <div class="md:flex mb-4">
          <div class="w-3/12" />
          <div class="md:w-5/12 text-main text-xss flex items-center">Household Improvement</div>
          <el-form-item prop="housing.household_improvement.essential" class="w-6/12 md:w-2/12 pr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.housing.household_improvement.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('housing')"
              @blur="blur('housing')"
            />
          </el-form-item>
          <el-form-item prop="housing.household_improvement.discretionary" class="w-6/12 md:w-2/12 pl-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.housing.household_improvement.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('housing')"
              @blur="blur('housing')"
            />
          </el-form-item>
        </div>
        <div class="md:flex mb-4">
          <div class="w-3/12" />
          <div class="md:w-5/12 text-main text-xss flex items-center">Household Maintenance</div>
          <el-form-item prop="housing.household_maintenance.essential" class="w-6/12 md:w-2/12 pr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.housing.household_maintenance.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('housing')"
              @blur="blur('housing')"
            />
          </el-form-item>
          <el-form-item prop="housing.household_maintenance.discretionary" class="w-6/12 md:w-2/12 pl-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.housing.household_maintenance.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('housing')"
              @blur="blur('housing')"
            />
          </el-form-item>
        </div>
      </div>

      <!-- FOOD TRANSPORTATION -->
      <div
        class="border border-main-gray rounded-lg p-5 mb-5"
        :class="{ 'border-border-blue': isFocusAtHome || isFocusTransportation }"
      >
        <div class="flex items-center mb-5">
          <InlineSvg v-show="isFocusAtHome && !isDoneCurrentStep" :src="IconActive" />
          <InlineSvg v-show="!isFocusAtHome && !isDoneCurrentStep" :src="IconNotActive" />
          <InlineSvg v-show="isDoneCurrentStep" :src="IconDoneStep" />
          <div class="flex items-center text-sm font-semibold ml-2">Food</div>
        </div>
        <div class="md:flex mb-4">
          <div class="flex pb-2 mt-5 md:hidden">
            <div class="w-6/12 text-main text-xs text-center">ESSENTIAL</div>
            <div class="w-6/12 text-main text-xs text-center">DISCRETIONARY</div>
          </div>
          <div class="w-3/12" />
          <div class="md:w-5/12 text-main text-xss flex items-center">At Home</div>
          <el-form-item prop="food_transportation.at_home.essential" class="w-6/12 md:w-2/12 pr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.food_transportation.at_home.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('at-home')"
              @blur="blur('at-home')"
            />
          </el-form-item>
          <el-form-item prop="food_transportation.at_home.discretionary" class="w-6/12 md:w-2/12 pl-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.food_transportation.at_home.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('at-home')"
              @blur="blur('at-home')"
            />
          </el-form-item>
        </div>
        <div class="md:flex mb-4">
          <div class="w-3/12" />
          <div class="md:w-5/12 text-main text-xss flex items-center">Dining Out</div>
          <el-form-item prop="food_transportation.dining_out.essential" class="w-6/12 md:w-2/12 pr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.food_transportation.dining_out.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('at-home')"
              @blur="blur('at-home')"
            />
          </el-form-item>
          <el-form-item prop="food_transportation.dining_out.discretionary" class="w-6/12 md:w-2/12 pl-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.food_transportation.dining_out.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('at-home')"
              @blur="blur('at-home')"
            />
          </el-form-item>
        </div>

        <div class="flex items-center mb-5">
          <InlineSvg v-show="isFocusTransportation && !isDoneCurrentStep" :src="IconActive" />
          <InlineSvg v-show="!isFocusTransportation && !isDoneCurrentStep" :src="IconNotActive" />
          <InlineSvg v-show="isDoneCurrentStep" :src="IconDoneStep" />
          <div class="flex items-center text-sm font-semibold ml-2">Transportation</div>
        </div>

        <div class="md:flex mb-4">
          <div class="w-3/12" />
          <div class="md:w-5/12 text-main text-xss flex items-center">Vehicle Purchases/Payments</div>
          <el-form-item
            prop="food_transportation.vehicle_purchases_payments.essential"
            class="w-6/12 md:w-2/12 pr-2 mb-3"
          >
            <SwdCurrencyInput
              v-model="ruleForm.food_transportation.vehicle_purchases_payments.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('trasportation')"
              @blur="blur('trasportation')"
            />
          </el-form-item>
          <el-form-item
            prop="food_transportation.vehicle_purchases_payments.discretionary"
            class="w-6/12 md:w-2/12 pl-2 mb-3"
          >
            <SwdCurrencyInput
              v-model="ruleForm.food_transportation.vehicle_purchases_payments.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('trasportation')"
              @blur="blur('trasportation')"
            />
          </el-form-item>
        </div>
        <div class="md:flex mb-4">
          <div class="w-3/12" />
          <div class="md:w-5/12 text-main text-xss flex items-center">Auto Insurance and Taxes</div>
          <el-form-item
            prop="food_transportation.auto_insurance_and_taxes.essential"
            class="w-6/12 md:w-2/12 pr-2 mb-3"
          >
            <SwdCurrencyInput
              v-model="ruleForm.food_transportation.auto_insurance_and_taxes.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('trasportation')"
              @blur="blur('trasportation')"
            />
          </el-form-item>
          <el-form-item
            prop="food_transportation.auto_insurance_and_taxes.discretionary"
            class="w-6/12 md:w-2/12 pl-2 mb-3"
          >
            <SwdCurrencyInput
              v-model="ruleForm.food_transportation.auto_insurance_and_taxes.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('trasportation')"
              @blur="blur('trasportation')"
            />
          </el-form-item>
        </div>
        <div class="md:flex mb-4">
          <div class="w-3/12" />
          <div class="md:w-5/12 text-main text-xss flex items-center">Fuel & Maintenance</div>
          <el-form-item prop="food_transportation.fuel_and_maintenance.essential" class="w-6/12 md:w-2/12 pr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.food_transportation.fuel_and_maintenance.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('trasportation')"
              @blur="blur('trasportation')"
            />
          </el-form-item>
          <el-form-item
            prop="food_transportation.fuel_and_maintenance.discretionary"
            class="w-6/12 md:w-2/12 pl-2 mb-3"
          >
            <SwdCurrencyInput
              v-model="ruleForm.food_transportation.fuel_and_maintenance.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('trasportation')"
              @blur="blur('trasportation')"
            />
          </el-form-item>
        </div>
        <div class="md:flex mb-4">
          <div class="w-3/12" />
          <div class="md:w-5/12 text-main text-xss flex items-center">Public Transportation</div>
          <el-form-item prop="food_transportation.public_transportation.essential" class="w-6/12 md:w-2/12 pr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.food_transportation.public_transportation.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('trasportation')"
              @blur="blur('trasportation')"
            />
          </el-form-item>
          <el-form-item
            prop="food_transportation.public_transportation.discretionary"
            class="w-6/12 md:w-2/12 pl-2 mb-3"
          >
            <SwdCurrencyInput
              v-model="ruleForm.food_transportation.public_transportation.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('trasportation')"
              @blur="blur('trasportation')"
            />
          </el-form-item>
        </div>
      </div>

      <!-- HEALTHCARE -->
      <div class="border border-main-gray rounded-lg p-5 mb-5" :class="{ 'border-border-blue': isFocusHealthcare }">
        <div class="flex items-center mb-5">
          <InlineSvg v-show="isFocusHealthcare && !isDoneCurrentStep" :src="IconActive" />
          <InlineSvg v-show="!isFocusHealthcare && !isDoneCurrentStep" :src="IconNotActive" />
          <InlineSvg v-show="isDoneCurrentStep" :src="IconDoneStep" />
          <div class="flex items-center text-sm font-semibold ml-2">Healthcare</div>
        </div>
        <div class="md:flex mb-4">
          <div class="w-3/12" />

          <div class="flex pb-2 mt-5 md:hidden">
            <div class="w-6/12 text-main text-xs text-center">ESSENTIAL</div>
            <div class="w-6/12 text-main text-xs text-center">DISCRETIONARY</div>
          </div>
          <div class="md:w-5/12 text-main text-xss flex items-center">Health Insurance</div>
          <el-form-item prop="healthcare.health_insurance.essential" class="w-6/12 md:w-2/12 pr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.healthcare.health_insurance.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('healthcare')"
              @blur="blur('healthcare')"
            />
          </el-form-item>
          <el-form-item prop="healthcare.health_insurance.discretionary" class="w-6/12 md:w-2/12 pl-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.healthcare.health_insurance.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('healthcare')"
              @blur="blur('healthcare')"
            />
          </el-form-item>
        </div>
        <div class="md:flex mb-4">
          <div class="w-3/12" />
          <div class="md:w-5/12 text-main text-xss flex items-center">Medicare/Medigap</div>
          <el-form-item prop="healthcare.medicare_medigap.essential" class="w-6/12 md:w-2/12 pr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.healthcare.medicare_medigap.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('healthcare')"
              @blur="blur('healthcare')"
            />
          </el-form-item>
          <el-form-item prop="healthcare.medicare_medigap.discretionary" class="w-6/12 md:w-2/12 pl-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.healthcare.medicare_medigap.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('healthcare')"
              @blur="blur('healthcare')"
            />
          </el-form-item>
        </div>
        <div class="md:flex mb-4">
          <div class="w-3/12" />
          <div class="md:w-5/12 text-main text-xss flex items-center">Copays/Uncovered Medical Services</div>
          <el-form-item
            prop="healthcare.copays_uncovered_medical_services.essential"
            class="w-6/12 md:w-2/12 pr-2 mb-3"
          >
            <SwdCurrencyInput
              v-model="ruleForm.healthcare.copays_uncovered_medical_services.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('healthcare')"
              @blur="blur('healthcare')"
            />
          </el-form-item>
          <el-form-item
            prop="healthcare.copays_uncovered_medical_services.discretionary"
            class="w-6/12 md:w-2/12 pl-2 mb-3"
          >
            <SwdCurrencyInput
              v-model="ruleForm.healthcare.copays_uncovered_medical_services.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('healthcare')"
              @blur="blur('healthcare')"
            />
          </el-form-item>
        </div>
        <div class="md:flex mb-4">
          <div class="w-3/12" />
          <div class="md:w-5/12 text-main text-xss flex items-center">Drugs & Medical Supplies</div>
          <el-form-item prop="healthcare.drugs_and_medical_supplies.essential" class="w-6/12 md:w-2/12 pr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.healthcare.drugs_and_medical_supplies.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('healthcare')"
              @blur="blur('healthcare')"
            />
          </el-form-item>
          <el-form-item prop="healthcare.drugs_and_medical_supplies.discretionary" class="w-6/12 md:w-2/12 pl-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.healthcare.drugs_and_medical_supplies.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('healthcare')"
              @blur="blur('healthcare')"
            />
          </el-form-item>
        </div>
      </div>

      <!-- PERSONAL -->
      <div
        class="border border-main-gray rounded-lg p-5 mb-5"
        :class="{ 'border-border-blue': isFocusPersonal || isFocusPersonalCare }"
      >
        <div class="flex items-center mb-5">
          <InlineSvg v-show="isFocusPersonal && !isDoneCurrentStep" :src="IconActive" />
          <InlineSvg v-show="!isFocusPersonal && !isDoneCurrentStep" :src="IconNotActive" />
          <InlineSvg v-show="isDoneCurrentStep" :src="IconDoneStep" />
          <div class="flex items-center text-sm font-semibold ml-2">Personal Insurance</div>
        </div>
        <div class="md:flex mb-4">
          <div class="w-3/12" />
          <div class="flex pb-2 mt-5 md:hidden">
            <div class="w-6/12 text-main text-xs text-center">ESSENTIAL</div>
            <div class="w-6/12 text-main text-xs text-center">DISCRETIONARY</div>
          </div>
          <div class="md:w-5/12 text-main text-xss flex items-center">Life/Other</div>
          <el-form-item prop="personal_insurance.life_other.essential" class="w-6/12 md:w-2/12 pr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.personal_insurance.life_other.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('personal')"
              @blur="blur('personal')"
            />
          </el-form-item>
          <el-form-item prop="personal_insurance.life_other.discretionary" class="w-6/12 md:w-2/12 pl-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.personal_insurance.life_other.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('personal')"
              @blur="blur('personal')"
            />
          </el-form-item>
        </div>
        <div class="md:flex mb-4">
          <div class="w-3/12" />
          <div class="md:w-5/12 text-main text-xss flex items-center">Long-Term Care</div>
          <el-form-item prop="personal_insurance.long_term_care.essential" class="w-6/12 md:w-2/12 pr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.personal_insurance.long_term_care.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('personal')"
              @blur="blur('personal')"
            />
          </el-form-item>
          <el-form-item prop="personal_insurance.long_term_care.discretionary" class="w-6/12 md:w-2/12 pl-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.personal_insurance.long_term_care.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('personal')"
              @blur="blur('personal')"
            />
          </el-form-item>
        </div>

        <div class="flex items-center mb-5">
          <InlineSvg v-show="isFocusPersonalCare && !isDoneCurrentStep" :src="IconActive" />
          <InlineSvg v-show="!isFocusPersonalCare && !isDoneCurrentStep" :src="IconNotActive" />
          <InlineSvg v-show="isDoneCurrentStep" :src="IconDoneStep" />
          <div class="flex items-center text-sm font-semibold ml-2">Personal Care</div>
        </div>

        <div class="md:flex mb-4">
          <div class="w-3/12" />
          <div class="flex pb-2 mt-5 md:hidden">
            <div class="w-6/12 text-main text-xs text-center">ESSENTIAL</div>
            <div class="w-6/12 text-main text-xs text-center">DISCRETIONARY</div>
          </div>
          <div class="md:w-5/12 text-main text-xss flex items-center">Clothing</div>
          <el-form-item prop="personal_insurance.clothing.essential" class="w-6/12 md:w-2/12 pr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.personal_insurance.clothing.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('personal-care')"
              @blur="blur('personal-care')"
            />
          </el-form-item>
          <el-form-item prop="personal_insurance.clothing.discretionary" class="w-6/12 md:w-2/12 pl-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.personal_insurance.clothing.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('personal-care')"
              @blur="blur('personal-care')"
            />
          </el-form-item>
        </div>
        <div class="md:flex mb-4">
          <div class="w-3/12" />
          <div class="md:w-5/12 text-main text-xss flex items-center">Products & Services</div>
          <el-form-item prop="personal_insurance.product_and_services.essential" class="w-6/12 md:w-2/12 pr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.personal_insurance.product_and_services.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('personal-care')"
              @blur="blur('personal-care')"
            />
          </el-form-item>
          <el-form-item prop="personal_insurance.product_and_services.discretionary" class="w-6/12 md:w-2/12 pl-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.personal_insurance.product_and_services.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('personal-care')"
              @blur="blur('personal-care')"
            />
          </el-form-item>
        </div>
      </div>

      <!-- OTHER -->
      <div class="border border-main-gray rounded-lg p-5 mb-5" :class="{ 'border-border-blue': isFocusOther }">
        <div class="md:flex mb-4">
          <div class="w-3/12" />
          <div class="flex pb-2 mt-5 md:hidden">
            <div class="w-6/12 text-main text-xs text-center">ESSENTIAL</div>
            <div class="w-6/12 text-main text-xs text-center">DISCRETIONARY</div>
          </div>
          <div class="md:w-5/12 text-main text-xss flex items-center">Entertainment</div>
          <el-form-item prop="entertainment.essential" class="w-6/12 md:w-2/12 pr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.entertainment.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('other')"
              @blur="blur('other')"
            />
          </el-form-item>
          <el-form-item prop="entertainment.discretionary" class="w-6/12 md:w-2/12 pl-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.entertainment.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('other')"
              @blur="blur('other')"
            />
          </el-form-item>
        </div>
        <div class="md:flex mb-4">
          <div class="w-3/12" />
          <div class="md:w-5/12 text-main text-xss flex items-center">Travel</div>
          <el-form-item prop="travel.essential" class="w-6/12 md:w-2/12 pr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.travel.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('other')"
              @blur="blur('other')"
            />
          </el-form-item>
          <el-form-item prop="travel.discretionary" class="w-6/12 md:w-2/12 pl-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.travel.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('other')"
              @blur="blur('other')"
            />
          </el-form-item>
        </div>
        <div class="md:flex mb-4">
          <div class="w-3/12" />
          <div class="md:w-5/12 text-main text-xss flex items-center">Hobbies</div>
          <el-form-item prop="hobbies.essential" class="w-6/12 md:w-2/12 pr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.hobbies.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('other')"
              @blur="blur('other')"
            />
          </el-form-item>
          <el-form-item prop="hobbies.discretionary" class="w-6/12 md:w-2/12 pl-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.hobbies.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('other')"
              @blur="blur('other')"
            />
          </el-form-item>
        </div>
        <div class="md:flex mb-4">
          <div class="w-3/12" />
          <div class="md:w-5/12 text-main text-xss flex items-center">Family Care/Education</div>
          <el-form-item prop="family_care_education.essential" class="w-6/12 md:w-2/12 pr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.family_care_education.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('other')"
              @blur="blur('other')"
            />
          </el-form-item>
          <el-form-item prop="family_care_education.discretionary" class="w-6/12 md:w-2/12 pl-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.family_care_education.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('other')"
              @blur="blur('other')"
            />
          </el-form-item>
        </div>
        <div class="md:flex mb-4">
          <div class="w-3/12" />
          <div class="md:w-5/12 text-main text-xss flex items-center">Income Taxes</div>
          <el-form-item prop="income_taxes.essential" class="w-6/12 md:w-2/12 pr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.income_taxes.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('other')"
              @blur="blur('other')"
            />
          </el-form-item>
          <el-form-item prop="income_taxes.discretionary" class="w-6/12 md:w-2/12 pl-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.income_taxes.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('other')"
              @blur="blur('other')"
            />
          </el-form-item>
        </div>
        <div class="md:flex mb-4">
          <div class="w-3/12" />
          <div class="md:w-5/12 text-main text-xss flex items-center">Charitable Contributions</div>
          <el-form-item prop="charitable_contributions.essential" class="w-6/12 md:w-2/12 pr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.charitable_contributions.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('other')"
              @blur="blur('other')"
            />
          </el-form-item>
          <el-form-item prop="charitable_contributions.discretionary" class="w-6/12 md:w-2/12 pl-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.charitable_contributions.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('other')"
              @blur="blur('other')"
            />
          </el-form-item>
        </div>
        <div class="md:flex mb-4">
          <div class="w-3/12" />
          <div class="md:w-5/12 text-main text-xss flex items-center">Other</div>
          <el-form-item prop="other.essential" class="w-6/12 md:w-2/12 pr-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.other.essential"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('other')"
              @blur="blur('other')"
            />
          </el-form-item>
          <el-form-item prop="other.discretionary" class="w-6/12 md:w-2/12 pl-2 mb-3">
            <SwdCurrencyInput
              v-model="ruleForm.other.discretionary"
              :options="optionsCurrencyInput"
              :disabled="isLoadingCreate"
              placeholder="$12345"
              prepend
              @focus="focus('other')"
              @blur="blur('other')"
            />
          </el-form-item>
        </div>
      </div>
      <div class="md:flex mb-4">
        <div class="w-3/12" />
        <div class="md:w-5/12 pl-2 text-main text-xss flex items-center">SUBTOTAL</div>
        <div class="w-6/12 md:w-2/12 text-sm font-semibold inline-flex">
          <SwdSpinner v-if="isLoadingCreate || isFetching" />
          <span v-else>{{ currencyFormat(ruleForm.subtotal.essential) }}</span>
        </div>
        <div class="w-6/12 md:w-2/12 text-sm font-semibold inline-flex">
          <SwdSpinner v-if="isLoadingCreate || isFetching" />
          <span v-else>{{ currencyFormat(ruleForm.subtotal.discretionary) }}</span>
        </div>
      </div>

      <div class="md:flex mb-4">
        <div class="w-3/12" />
        <div class="md:w-5/12 pl-2 text-main text-xss font-semibold flex items-center">TOTAL MONTHLY EXPENSES</div>
        <div class="w-6/12 md:w-2/12" />
        <div class="w-6/12 md:w-2/12 text-sm font-semibold inline-flex">
          <SwdSpinner v-if="isLoadingCreate || isFetching" />
          <span v-else>{{ currencyFormat(ruleForm.total) }}</span>
        </div>
      </div>

      <div class="flex justify-end my-10">
        <SwdButton info main class="mr-4" @click="backStep">Back</SwdButton>
        <SwdButton v-if="!isReadOnlyLead" primary main :disabled="isLoadingUpdateSteps" @click="save">
          <SwdSpinner v-show="isLoadingUpdateSteps" class="mr-2" />
          Save
        </SwdButton>
        <router-link v-else :to="{ name: `${route.meta.type}/dashboard` }" class="w-2/12">
          <SwdButton primary main>Dashboard</SwdButton>
        </router-link>
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
import { useFetchClietsInfo } from '@/api/clients/use-fetch-clients-info'
import { useMutation } from 'vue-query'
import { currencyFormat } from '@/utils/currencyFormat'
import { useAlert } from '@/utils/use-alert'
import { scrollTop } from '@/utils/scrollTop'
import { useExpenseInfoHooks } from '@/hooks/use-expense-info-hooks'
import { updateStepsClients } from '@/api/vueQuery/clients/fetch-update-steps-clients'
import { rules } from '@/validationRules/expenseRules.js'
import IconActive from '@/assets/svg/icon-active.svg'
import IconNotActive from '@/assets/svg/icon-not-active.svg'
import IconDoneStep from '@/assets/svg/icon-done-step.svg'

export default {
  name: 'AddLeadExpense',
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const form = ref()
    const isFocusHousing = ref(false)
    const isFocusAtHome = ref(false)
    const isFocusTransportation = ref(false)
    const isFocusHealthcare = ref(false)
    const isFocusPersonal = ref(false)
    const isFocusPersonalCare = ref(false)
    const isFocusOther = ref(false)

    const step = computed(() => store.state.newClient.step)
    let memberId

    const { isLoading, isFetching, data, refetch } = useFetchMonthlyExpense({ id: route.params.id }, { enabled: false })
    const { isLoading: isLoadingInfo, data: clientsInfo } = useFetchClietsInfo()
    const { mutateAsync: updateExpense, isLoading: isLoadingCreate } = useMutation(createMonthlyExpenses)
    const { isLoading: isLoadingUpdateSteps, mutateAsync: updateSteps } = useMutation(updateStepsClients)

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
      store.commit('newClient/setStep', 3)
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
      store.commit('newClient/setStep', step.value - 1)
      router.push({ name: 'lead-assets-information', params: { id: memberId } })
    }

    const handleChange = async () => {
      form.value.validate(async (valid) => {
        if (valid) {
          const res = await updateExpense({ id: memberId, data: ruleForm })

          if (!('error' in res)) {
            setInitValue(ruleForm, res.data)
          }
        }
      })
    }

    const save = async () => {
      const res = await updateSteps({ completed_financial_fact_finder: 'completed' })

      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Information updated successfully.',
        })
        router.push({
          name: 'lead/dashboard',
        })
      }
    }

    const isDoneCurrentStep = computed(() => {
      return clientsInfo.value.steps.completed_financial_fact_finder
    })

    const focus = (type) => {
      if (type === 'housing') isFocusHousing.value = true
      if (type === 'at-home') isFocusAtHome.value = true
      if (type === 'trasportation') isFocusTransportation.value = true
      if (type === 'healthcare') isFocusHealthcare.value = true
      if (type === 'personal') isFocusPersonal.value = true
      if (type === 'personal-care') isFocusPersonalCare.value = true
      if (type === 'other') isFocusOther.value = true
    }

    const blur = (type) => {
      handleChange()
      if (type === 'housing') isFocusHousing.value = false
      if (type === 'at-home') isFocusAtHome.value = false
      if (type === 'trasportation') isFocusTransportation.value = false
      if (type === 'healthcare') isFocusHealthcare.value = false
      if (type === 'personal') isFocusPersonal.value = false
      if (type === 'personal-care') isFocusPersonalCare.value = false
      if (type === 'other') isFocusOther.value = false
    }

    const isReadOnlyLead = computed(() => {
      return clientsInfo.value.readonly
    })

    return {
      backStep,
      ruleForm,
      form,
      optionsCurrencyInput,
      handleChange,
      isLoading,
      isFetching,
      data,
      isLoadingCreate,
      currencyFormat,
      save,
      isLoadingUpdateSteps,
      IconActive,
      IconNotActive,
      IconDoneStep,
      focus,
      blur,
      isFocusHousing,
      isFocusAtHome,
      isFocusTransportation,
      isFocusHealthcare,
      isFocusPersonal,
      isFocusPersonalCare,
      isFocusOther,
      isLoadingInfo,
      isDoneCurrentStep,
      isReadOnlyLead,
      route,
      rules,
    }
  },
}
</script>
