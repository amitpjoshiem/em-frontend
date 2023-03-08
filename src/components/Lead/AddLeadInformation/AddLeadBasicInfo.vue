<template>
  <div class="lg:max-w-5xl lg:my-0 lg:mx-auto">
    <div v-if="!isFetchingMember && !isLoadingInfo" class="sm:p-5">
      <el-form ref="form" :model="ruleForm" :rules="rules" label-position="top" :disabled="isDisabledForm">
        <!-- GENERAL -->
        <div>
          <div class="flex items-center mb-5">
            <InlineSvg v-show="isFocusGeneral && !isDoneCurrentStep" :src="IconActive" />
            <InlineSvg v-show="!isFocusGeneral && !isDoneCurrentStep" :src="IconNotActive" />
            <InlineSvg v-show="isDoneCurrentStep" :src="IconDoneStep" />
            <div class="text-main text-xl font-semibold ml-2">General</div>
          </div>
          <div class="border border-main-gray rounded-lg p-5" :class="{ 'border-border-blue': isFocusGeneral }">
            <div>
              <div class="flex justify-between w-full sm:justify-start">
                <el-form-item label="Retired?" class="sm:mr-10">
                  <el-radio-group v-model="ruleForm.retired">
                    <el-radio :label="true">Yes</el-radio>
                    <el-radio :label="false">No</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="Spouse/Partner?">
                  <el-radio-group v-model="ruleForm.married" @change="changeMarried(ruleForm)">
                    <el-radio :label="true">Yes</el-radio>
                    <el-radio :label="false">No</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>

              <div class="sm:flex sm:flex-wrap">
                <el-form-item label="Name" prop="name" class="mb-3 lg:w-6/12 lg:pr-2 sm:w-6/12 sm:pr-2">
                  <el-input
                    v-model="ruleForm.name"
                    placeholder="Enter name"
                    @focus="focus('general')"
                    @blur="blur('general')"
                  />
                </el-form-item>
                <el-form-item label="E-mail" prop="email" class="mb-3 lg:w-6/12 lg:pl-2 sm:w-6/12 sm:pl-2">
                  <el-input
                    v-model.email="ruleForm.email"
                    placeholder="Enter e-mail"
                    @focus="focus('general')"
                    @blur="blur('general')"
                  />
                </el-form-item>
                <el-form-item prop="birthday" label="Date of birth" class="mb-3 lg:w-4/12 lg:pr-2 sm:w-6/12 sm:pr-2">
                  <el-date-picker
                    v-model="ruleForm.birthday"
                    type="date"
                    :placeholder="getPlaceholder"
                    format="MM/DD/YYYY"
                    value-format="MM/DD/YYYY"
                    @focus="focus('general')"
                    @blur="blur('general')"
                  />
                </el-form-item>

                <el-form-item label="Phone" prop="phone" class="mb-3 lg:w-4/12 lg:px-2 sm:w-6/12 sm:pl-2">
                  <el-input
                    v-model="ruleForm.phone"
                    v-maska="'(###) ###-####'"
                    placeholder="Enter phone number"
                    @focus="focus('general')"
                    @blur="blur('general')"
                  />
                </el-form-item>

                <div class="hidden mb-3 lg:w-4/12 lg:pl-2 lg:block sm:w-6/12">
                  <el-form-item v-if="ruleForm.retired" prop="retirement_date" label="Retirement date">
                    <el-date-picker
                      v-model="ruleForm.retirement_date"
                      type="date"
                      :placeholder="getPlaceholder"
                      format="MM/DD/YYYY"
                      value-format="MM/DD/YYYY"
                      @focus="focus('general')"
                      @blur="blur('general')"
                    />
                  </el-form-item>
                </div>

                <el-form-item label="Address" prop="address" class="mb-3 lg:w-3/12 lg:pr-2 sm:w-6/12 sm:pr-2">
                  <el-input
                    v-model="ruleForm.address"
                    placeholder="Enter address"
                    @focus="focus('general')"
                    @blur="blur('general')"
                  />
                </el-form-item>

                <el-form-item label="City" prop="city" class="mb-3 lg:w-3/12 lg:px-2 sm:w-6/12 sm:pl-2">
                  <el-input
                    v-model="ruleForm.city"
                    placeholder="Enter city"
                    @focus="focus('general')"
                    @blur="blur('general')"
                  />
                </el-form-item>

                <el-form-item label="State" prop="state" class="mb-3 lg:w-3/12 lg:px-2 sm:w-6/12 sm:pr-2">
                  <el-select v-model="ruleForm.state" filterable placeholder="Select" class="w-full">
                    <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>

                <el-form-item label="ZIP" prop="zip" class="mb-3 lg:w-3/12 lg:pl-2 sm:w-6/12 sm:pl-2">
                  <el-input
                    v-model="ruleForm.zip"
                    v-maska="'#####'"
                    placeholder="#####"
                    @focus="focus('general')"
                    @blur="blur('general')"
                  />
                </el-form-item>

                <div class="hidden mb-3 lg:w-4/12 lg:pl-2 lg:pr-0 lg:hidden sm:w-6/12 sm:pr-2 sm:block">
                  <el-form-item v-if="ruleForm.retired" prop="retirement_date" label="Retirement date">
                    <el-date-picker
                      v-if="ruleForm.spouse.retired"
                      type="date"
                      :placeholder="getPlaceholder"
                      format="MM/DD/YYYY"
                      value-format="MM/DD/YYYY"
                      @focus="focus('general')"
                      @blur="blur('general')"
                    />
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GENERAL -->

        <!-- Spouse -->
        <div v-if="ruleForm.married">
          <div class="flex items-center my-5">
            <InlineSvg v-show="isFocusSpouse && !isDoneCurrentStep" :src="IconActive" />
            <InlineSvg v-show="!isFocusSpouse && !isDoneCurrentStep" :src="IconNotActive" />
            <InlineSvg v-show="isDoneCurrentStep" :src="IconDoneStep" />
            <div class="text-main text-xl font-semibold ml-2">Spouse/Partner</div>
          </div>
          <div class="border border-main-gray rounded-lg p-5" :class="{ 'border-border-blue': isFocusSpouse }">
            <el-form-item label="Retired?" class="mb-4">
              <el-radio-group v-model="ruleForm.spouse.retired">
                <el-radio :label="true">Yes</el-radio>
                <el-radio :label="false">No</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="sm:flex sm:flex-wrap">
              <el-form-item
                label="First name"
                prop="spouse.first_name"
                class="mb-3 lg:w-6/12 lg:pr-2 sm:w-6/12 sm:pr-2"
              >
                <el-input
                  v-model="ruleForm.spouse.first_name"
                  placeholder="Enter spouse’s first name"
                  @focus="focus('spouse')"
                  @blur="blur('spouse')"
                />
              </el-form-item>
              <el-form-item label="Last name" prop="spouse.last_name" class="mb-3 lg:w-6/12 lg:pl-2 sm:w-6/12 sm:pl-2">
                <el-input
                  v-model="ruleForm.spouse.last_name"
                  placeholder="Enter spouse’s last name"
                  @focus="focus('spouse')"
                  @blur="blur('spouse')"
                />
              </el-form-item>
              <el-form-item label="E-mail" prop="spouse.email" class="mb-3 lg:w-6/12 lg:pr-2 sm:w-6/12 sm:pr-2">
                <el-input v-model.email="ruleForm.spouse.email" placeholder="Enter spouse’s e-mail" />
              </el-form-item>
              <el-form-item
                prop="spouse.birthday"
                label="Date of birth"
                class="mb-3 lg:w-3/12 lg:px-2 sm:w-6/12 sm:pl-2"
              >
                <el-date-picker
                  v-model="ruleForm.spouse.birthday"
                  type="date"
                  :placeholder="getPlaceholder"
                  format="MM/DD/YYYY"
                  value-format="MM/DD/YYYY"
                  @focus="focus('spouse')"
                  @blur="blur('spouse')"
                />
              </el-form-item>

              <el-form-item label="Phone" prop="spouse.phone" class="mb-3 lg:w-3/12 lg:pl-2 sm:w-6/12">
                <el-input
                  v-model="ruleForm.spouse.phone"
                  v-maska="'(###) ###-####'"
                  placeholder="Enter phone number"
                  inputmode="numeric"
                  @focus="focus('spouse')"
                  @blur="blur('spouse')"
                />
              </el-form-item>
              <el-form-item
                v-if="ruleForm.spouse.retired"
                prop="spouse.retirement_date"
                label="Retirement date"
                class="mb-3 lg:w-4/12 sm:w-6/12 sm:pl-2 lg:pl-0"
              >
                <el-date-picker
                  v-model="ruleForm.spouse.retirement_date"
                  type="date"
                  :placeholder="getPlaceholder"
                  format="MM/DD/YYYY"
                  value-format="MM/DD/YYYY"
                  @focus="focus('spouse')"
                  @blur="blur('spouse')"
                />
              </el-form-item>
            </div>
          </div>
        </div>
        <!-- Spouse -->

        <!-- Housing Information -->
        <div v-loading="isLoadingDeleteHouse">
          <div class="flex items-center my-5">
            <InlineSvg v-show="isFocusHouse && !isDoneCurrentStep" :src="IconActive" />
            <InlineSvg v-show="!isFocusHouse && !isDoneCurrentStep" :src="IconNotActive" />
            <InlineSvg v-show="isDoneCurrentStep" :src="IconDoneStep" />
            <div class="text-main text-xl font-semibold ml-2">Housing Information</div>
          </div>
          <div class="border border-main-gray rounded-lg p-5" :class="{ 'border-border-blue': isFocusHouse }">
            <div v-for="(house, indexHouse) in ruleForm.houses" :key="indexHouse">
              <el-form-item label="Type" class="mb-4">
                <el-radio-group v-model="house.type" @change="handleChange">
                  <el-radio label="own">Own</el-radio>
                  <el-radio label="rent">Rent</el-radio>
                  <el-radio label="family">Live with family</el-radio>
                </el-radio-group>
              </el-form-item>
              <div class="flex justify-between">
                <div class="sm:flex sm:flex-wrap sm:w-full">
                  <el-form-item
                    v-if="house.type !== 'rent'"
                    label="Market value"
                    :prop="'houses.' + indexHouse + '.market_value'"
                    class="mb-4 sm:w-8/24"
                  >
                    <SwdCurrencyInput
                      v-model="house.market_value"
                      :options="optionsCurrencyInput"
                      placeholder="$12345"
                      prepend
                      @focus="focus('house')"
                      @blur="blur('house')"
                    />
                  </el-form-item>
                  <el-form-item
                    label="Monthly payments"
                    :prop="'houses.' + indexHouse + '.monthly_payment'"
                    class="mb-4 sm:w-8/24 sm:px-2"
                  >
                    <SwdCurrencyInput
                      v-model="house.monthly_payment"
                      :options="optionsCurrencyInput"
                      placeholder="$12345"
                      prepend
                      @focus="focus('house')"
                      @blur="blur('house')"
                    />
                  </el-form-item>
                  <el-form-item
                    v-if="house.type !== 'rent'"
                    label="Remaining mortgage"
                    :prop="'houses.' + indexHouse + '.remaining_mortgage_amount'"
                    class="mb-4 sm:w-8/24 sm:pr-4"
                  >
                    <SwdCurrencyInput
                      v-model="house.remaining_mortgage_amount"
                      :options="optionsCurrencyInput"
                      prepend
                      @focus="focus('house')"
                      @blur="blur('house')"
                    />
                  </el-form-item>
                  <el-form-item
                    v-if="house.type === 'rent'"
                    label="Total monthly expences"
                    :prop="'houses.' + indexHouse + '.total_monthly_expenses'"
                    class="mb-4 sm:w-8/24 sm:pl-2"
                  >
                    <SwdCurrencyInput
                      v-model="house.total_monthly_expenses"
                      :options="optionsCurrencyInput"
                      placeholder="$12345"
                      prepend
                      @focus="focus('house')"
                      @blur="blur('house')"
                    />
                  </el-form-item>
                </div>
                <BtnRemoveHousing
                  :index="indexHouse"
                  :house="house"
                  :amount-houses="ruleForm.houses.length"
                  @handleRemoveHouse="handleRemoveHouse"
                />
              </div>
            </div>
            <div class="flex justify-end mt-2">
              <SwdButton primary main @click="addHousingInformation(ruleForm)">Add house</SwdButton>
            </div>
          </div>
        </div>
        <!-- Housing Information -->

        <!-- Employment history -->
        <div class="mt-5">
          <div class="flex items-center mb-5">
            <InlineSvg v-show="isFocusEmployment && !isDoneCurrentStep" :src="IconActive" />
            <InlineSvg v-show="!isFocusEmployment && !isDoneCurrentStep" :src="IconNotActive" />
            <InlineSvg v-show="isDoneCurrentStep" :src="IconDoneStep" />
            <div class="text-main text-xl font-semibold ml-2">Employment history</div>
          </div>

          <div class="border border-main-gray rounded-lg p-5" :class="{ 'border-border-blue': isFocusEmployment }">
            <div class="text-main text-xs uppercase my-2">Contact</div>
            <div v-for="(eh, index) in ruleForm.employment_history" :key="index" class="mb-2">
              <div class="sm:flex sm:flex-wrap">
                <el-form-item
                  :prop="'employment_history.' + index + '.company_name'"
                  label="Company name"
                  class="sm:w-4/12 mb-4"
                >
                  <el-input
                    v-model="eh.company_name"
                    placeholder="Enter company name"
                    @change="changeCompanyNameMember({ ruleForm, index })"
                    @focus="focus('employment')"
                    @blur="blur('employment')"
                  />
                </el-form-item>

                <el-form-item
                  v-if="!!ruleForm.employment_history[index].company_name.trim().length"
                  class="sm:w-4/12 sm:px-2 mb-4"
                  :prop="'employment_history.' + index + '.occupation'"
                  label="Occupation"
                >
                  <el-input
                    v-model="eh.occupation"
                    placeholder="Company occupation"
                    @focus="focus('employment')"
                    @blur="blur('employment')"
                  />
                </el-form-item>
                <el-form-item
                  v-if="!!ruleForm.employment_history[index].company_name.trim().length"
                  class="sm:w-2/12 mb-4"
                  :prop="'employment_history.' + index + '.years'"
                  label="Years"
                >
                  <el-input
                    v-model="eh.years"
                    placeholder="00"
                    inputmode="numeric"
                    type="number"
                    @focus="focus('employment')"
                    @blur="blur('employment')"
                  />
                </el-form-item>

                <el-form-item
                  v-if="!ruleForm.employment_history[index].company_name.trim().length"
                  label="Occupation"
                  class="sm:w-4/12 mb-4 sm:px-2"
                >
                  <el-input
                    placeholder="Company occupation"
                    :disabled="!ruleForm.employment_history[index].company_name.trim().length"
                  />
                </el-form-item>
                <el-form-item
                  v-if="!ruleForm.employment_history[index].company_name.trim().length"
                  label="Years"
                  class="sm:w-2/12 mb-4"
                >
                  <el-input
                    placeholder="00"
                    inputmode="numeric"
                    :disabled="!ruleForm.employment_history[index].company_name.trim().length"
                  />
                </el-form-item>

                <div class="sm:w-2/12 mt-[22px] text-right">
                  <el-button
                    v-if="
                      ruleForm.employment_history[index].company_name.trim().length &&
                      ruleForm.employment_history[index].occupation.trim().length &&
                      ruleForm.employment_history[index].years
                    "
                    type="danger"
                    :disabled="isLoadingDeleteEmployment || isLoadingUpdateMember"
                    :loading="isLoadingDeleteEmployment"
                    plain
                    @click="handleRemoveEmployment(index)"
                  >
                    Remove job
                  </el-button>
                </div>
              </div>
            </div>
            <div v-if="isShowAddJobOwnerBtn" class="flex justify-end mt-4">
              <SwdButton
                primary
                main
                :disabled="isLoadingUpdateMember || isDisabledForm"
                @click="addEmployment(ruleForm)"
              >
                Add job
              </SwdButton>
            </div>

            <div v-if="ruleForm.married" class="mt-5">
              <div class="text-main text-xs uppercase my-2">Spouse/Partner</div>
              <div v-for="(eh, index) in ruleForm.spouse.employment_history" :key="index" class="mb-2">
                <div class="sm:flex sm:flex-wrap">
                  <el-form-item
                    :prop="'spouse.employment_history.' + index + '.company_name'"
                    label="Company name"
                    class="sm:w-4/12 mb-4 pr-2"
                  >
                    <el-input
                      v-model="eh.company_name"
                      placeholder="Enter company name"
                      @change="changeCompanyNameSpouse({ ruleForm, index })"
                      @focus="focus('employment')"
                      @blur="blur('employment')"
                    />
                  </el-form-item>

                  <el-form-item
                    v-if="!!ruleForm.spouse.employment_history[index].company_name.trim().length"
                    class="sm:w-4/12 mb-4 px-2"
                    :prop="'spouse.employment_history.' + index + '.occupation'"
                    label="Occupation"
                  >
                    <el-input
                      v-model="eh.occupation"
                      placeholder="Company occupation"
                      @focus="focus('employment')"
                      @blur="blur('employment')"
                    />
                  </el-form-item>
                  <el-form-item
                    v-if="!!ruleForm.spouse.employment_history[index].company_name.trim().length"
                    class="sm:w-2/12 mb-4 pl-2"
                    :prop="'spouse.employment_history.' + index + '.years'"
                    label="Years"
                  >
                    <el-input
                      v-model="eh.years"
                      placeholder="00"
                      inputmode="numeric"
                      type="number"
                      @focus="focus('employment')"
                      @blur="blur('employment')"
                    />
                  </el-form-item>

                  <el-form-item
                    v-if="!ruleForm.spouse.employment_history[index].company_name.trim().length"
                    label="Occupation"
                    class="sm:w-4/12 mb-4 sm:px-2"
                  >
                    <el-input
                      placeholder="Company occupation"
                      :disabled="!ruleForm.spouse.employment_history[index].company_name.trim().length"
                    />
                  </el-form-item>
                  <el-form-item
                    v-if="!ruleForm.spouse.employment_history[index].company_name.trim().length"
                    label="Years"
                    class="sm:w-2/12 mb-4"
                  >
                    <el-input
                      placeholder="00"
                      inputmode="numeric"
                      :disabled="!ruleForm.spouse.employment_history[index].company_name.trim().length"
                    />
                  </el-form-item>
                  <div class="sm:w-2/12 mt-[22px] text-right">
                    <el-button
                      v-if="
                        ruleForm.spouse.employment_history[index].company_name.trim().length &&
                        ruleForm.spouse.employment_history[index].occupation.trim().length &&
                        ruleForm.spouse.employment_history[index].years
                      "
                      type="danger"
                      :disabled="isLoadingDeleteEmployment || isLoadingUpdateMember"
                      :loading="isLoadingDeleteEmployment"
                      plain
                      @click="handleRemoveEmploymentSpouse(index)"
                    >
                      Remove job
                    </el-button>
                  </div>
                </div>
              </div>
              <div class="flex justify-end mt-4">
                <SwdButton
                  v-if="isShowAddJobSpouseBtn"
                  primary
                  main
                  :disabled="isLoadingUpdateMember || isDisabledForm"
                  @click="addEmploymentSpouse(ruleForm)"
                >
                  Add job
                </SwdButton>
              </div>
            </div>
          </div>
        </div>
        <!-- Employment history -->

        <!-- Other -->
        <div class="my-5">
          <div class="flex items-center mb-5">
            <InlineSvg v-show="isFocusOther && !isDoneCurrentStep" :src="IconActive" />
            <InlineSvg v-show="!isFocusOther && !isDoneCurrentStep" :src="IconNotActive" />
            <InlineSvg v-show="isDoneCurrentStep" :src="IconDoneStep" />
            <div class="text-main text-xl font-semibold ml-2">Other</div>
          </div>
          <div class="border border-main-gray rounded-lg p-5" :class="{ 'border-border-blue': isFocusOther }">
            <!-- <MoreInfoAbout /> -->

            <el-form-item
              label="Have you watched us during the news on any channel? (If yes, Please specify the channel)"
              class="mb-4"
            >
              <el-radio-group v-model="ruleForm.is_watch">
                <el-radio :label="true">Yes</el-radio>
                <el-radio :label="false">No</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item v-if="ruleForm.is_watch" class="mb-4" prop="channels" label="Channels">
              <el-input
                v-model="ruleForm.channels"
                placeholder="Enter channel"
                @focus="focus('other')"
                @blur="blur('other')"
              />
            </el-form-item>

            <el-form-item label="I have saved the following amount for retirement" class="mb-4">
              <el-radio-group
                v-model="ruleForm.amount_for_retirement"
                class="flex sm:flex-wrap w-full"
                @change="handleChange"
              >
                <el-radio label="150000" class="w-full sm:w-6/12 lg:w-3/12 mr-0">$150,000 - $250,000</el-radio>
                <el-radio label="250000" class="w-full sm:w-6/12 lg:w-3/12 mr-0">$250,000 - $500,000</el-radio>
                <el-radio label="500000" class="w-full sm:w-6/12 lg:w-3/12 mr-0">$500,000 - $1,000,000</el-radio>
                <el-radio label="1000000" class="w-full sm:w-6/12 lg:w-3/12 mr-0">$1,000,000+</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="My biggest financial concerns are:" class="mb-4" prop="biggest_financial_concern">
              <el-input
                v-model="ruleForm.biggest_financial_concern"
                type="textarea"
                @focus="focus('general')"
                @blur="blur('general')"
              />
            </el-form-item>

            <el-form-item label="Risk tolerance?" class="my-5">
              <el-radio-group v-model="ruleForm.other.risk" @change="handleChange">
                <div class="flex flex-col sm:flex-row sm:flex-wrap">
                  <el-radio label="conservative" class="sm:w-3/12">Conservative</el-radio>
                  <el-radio label="moderate" class="sm:w-3/12">Moderate</el-radio>
                  <el-radio label="moderately_conservative" class="sm:w-3/12"> Moderately Conservative </el-radio>
                  <el-radio label="aggressive" class="sm:w-3/12">Aggressive</el-radio>
                  <el-radio label="moderately_aggressive" class="sm:w-3/12"> Moderately Aggressive </el-radio>
                </div>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Do you have any specific question to discuss?" prop="other.questions" class="mb-4">
              <el-input
                v-model="ruleForm.other.questions"
                type="textarea"
                @focus="focus('other')"
                @blur="blur('other')"
              />
            </el-form-item>
            <el-form-item label="What are your goals for Retirement?" prop="other.retirement" class="mb-4">
              <el-input
                v-model="ruleForm.other.retirement"
                type="textarea"
                @focus="focus('other')"
                @blur="blur('other')"
              />
            </el-form-item>
            <el-form-item label="What are your goals for Retirement money?" prop="other.retirement_money" class="mb-4">
              <el-input
                v-model="ruleForm.other.retirement_money"
                type="textarea"
                @focus="focus('other')"
                @blur="blur('other')"
              />
            </el-form-item>

            <el-form-item label="Are you currently working with an Advisor?" class="mb-4">
              <el-radio-group v-model="ruleForm.other.work_with_advisor" @change="handleChange">
                <el-radio :label="true">Yes</el-radio>
                <el-radio :label="false">No</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <!-- Other -->

        <div class="flex justify-end my-10">
          <router-link
            v-if="isReadOnlyLead"
            :to="{ name: `lead-assets-information`, params: { id: leadId } }"
            class="w-4/12"
          >
            <SwdButton primary main>Go to the assets &amp; income</SwdButton>
          </router-link>
          <SwdButton v-else primary main class="w-2/12" :disabled="isLoadingUpdateMember" @click="submitForm">
            <SwdSpinner v-show="isLoadingUpdateMember" class="mr-2" />
            Save
          </SwdButton>
        </div>
      </el-form>
    </div>
    <el-skeleton v-else :rows="10" animated />
    <ModalRestoreDraft @restoreDraft="restoreDraft" @deleteDraft="deleteDraft" />
  </div>
</template>

<script>
import { reactive, ref, onMounted, computed, watch } from 'vue'
import { updateMembers } from '@/api/vueQuery/update-members'
import { useFetchClietsInfo } from '@/api/clients/use-fetch-clients-info'
import { useFetchMember } from '@/api/use-fetch-member.js'
import { useMutation } from 'vue-query'
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import { useStore } from 'vuex'
import { useAlert } from '@/utils/use-alert'
import { rules } from '@/validationRules/basicRules.js'
import { maska } from 'maska'
import { scrollTop } from '@/utils/scrollTop'
import { useBasicInfoHooks } from '@/hooks/use-basic-info-hooks'
import { useStateHook } from '@/hooks/use-state-hook'
import { cloneDeep, isEqual } from 'lodash-es'
import { ElMessageBox, ElNotification } from 'element-plus'
import { useWindowScrollTo } from '@/hooks/use-window-scroll'
import { deleteEmploymentHistory } from '@/api/vueQuery/delete-employment-history'
import { deleteHousingInformation } from '@/api/vueQuery/delete-housing-information'
import IconActive from '@/assets/svg/icon-active.svg'
import IconNotActive from '@/assets/svg/icon-not-active.svg'
import IconDoneStep from '@/assets/svg/icon-done-step.svg'
import IconAdd from '@/assets/svg/icon-add.svg'
import IconDelete from '@/assets/svg/icon-delete.svg'
import ModalRestoreDraft from '@/components/NewProspect/Draft/ModalRestoreDraft'
import BtnRemoveHousing from '../../NewProspect/BtnRemoveHousing.vue'

export default {
  name: 'AddLeadBasicInfo',
  directives: { maska },
  components: {
    ModalRestoreDraft,
    BtnRemoveHousing,
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const form = ref(null)
    const route = useRoute()
    const step = computed(() => store.state.newClient.step)
    const leadId = route.params.id

    const isFocusGeneral = ref(false)
    const isFocusSpouse = ref(false)
    const isFocusHouse = ref(false)
    const isFocusEmployment = ref(false)
    const isFocusOther = ref(false)
    const initRuleForm = ref({})

    const { stateList } = useStateHook()
    const { scrollTo } = useWindowScrollTo()

    const {
      isFetching: isFetchingMember,
      data: member,
      refetch: refetchMember,
    } = useFetchMember({ id: route.params.id }, { enabled: false })
    const { isLoading: isLoadingInfo, data: clientsInfo } = useFetchClietsInfo()

    const { isLoading: isLoadingDeleteEmployment, mutateAsync: deleteEmployment } = useMutation(deleteEmploymentHistory)
    const { isLoading: isLoadingUpdateMember, mutateAsync: updateMember } = useMutation(updateMembers)
    const { isLoading: isLoadingDeleteHouse, mutateAsync: deleteHouse } = useMutation(deleteHousingInformation)

    const {
      setInitValue,
      addEmployment,
      addEmploymentSpouse,
      changeCompanyNameMember,
      changeCompanyNameSpouse,
      getPlaceholder,
      optionsCurrencyInput,
      changeMarried,
      setInitRules,
      removeEmployment,
      removeEmploymentSpouse,
      addHousingInformation,
    } = useBasicInfoHooks()

    const ruleForm = reactive({
      retired: false,
      married: false,
      name: '',
      birthday: '',
      retirement_date: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      amount_for_retirement: '150000',
      biggest_financial_concern: '',
      is_watch: false,
      channels: '',
      spouse: {
        first_name: '',
        last_name: '',
        email: '',
        birthday: '',
        retired: false,
        retirement_date: '',
        phone: '',
        employment_history: [
          {
            company_name: '',
            occupation: '',
            years: '',
          },
        ],
      },
      houses: [
        {
          type: 'own',
          market_value: null,
          remaining_mortgage_amount: null,
          monthly_payment: null,
          total_monthly_expenses: null,
        },
      ],
      employment_history: [
        {
          company_name: '',
          occupation: '',
          years: '',
        },
      ],
      other: {
        risk: 'conservative',
        questions: '',
        retirement: '',
        retirement_money: '',
        work_with_advisor: true,
      },
    })

    onMounted(async () => {
      store.commit('newClient/setStep', 1)
      scrollTop()
      if (route.params.id) {
        refetchMember.value()
      }
    })

    watch(
      isFetchingMember,
      (newValue, oldValue) => {
        if (newValue === false && oldValue === true) {
          setInitValue(ruleForm, member.value)
          setInitRules(ruleForm)
          initRuleForm.value = cloneDeep(ruleForm)
        }
        if (
          newValue === false &&
          oldValue === true &&
          member.value.step === 'default' &&
          store.state.draft.leadBasicDraft
        ) {
          store.commit('globalComponents/setShowModal', {
            destination: 'restoreDraft',
            value: true,
          })
        }
      },
      { immediate: true }
    )

    onBeforeRouteLeave((to, from, next) => {
      if (
        member.value.step === 'default' &&
        !isEqual(ruleForm, initRuleForm.value) &&
        to.name !== 'lead-assets-information'
      ) {
        ElMessageBox.confirm('You have unsaved changes. Do you want to save it as a draft?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        })
          .then(() => {
            store.commit('draft/setLeadBasicDraft', ruleForm)
            next()
          })
          .catch(() => {
            next()
          })
      } else {
        next()
      }
    })

    const submitForm = async () => {
      form.value.validate(async (valid) => {
        if (valid) {
          const res = await updateMember({ form: ruleForm, id: route.params.id })
          if (!('error' in res)) {
            deleteDraft()
            useAlert({
              title: 'Success',
              type: 'success',
              message: 'Information updated successfully.',
            })
            store.commit('newClient/setStep', step.value + 1)
            router.push({
              name: 'lead-assets-information',
              params: { id: route.params.id },
            })
          }
        } else {
          ElNotification({
            title: 'Error',
            message: 'Please enter all required information.',
            type: 'error',
            dangerouslyUseHTMLString: true,
          })
          scrollTo()
          return false
        }
      })
    }

    const isDoneCurrentStep = computed(() => {
      return clientsInfo.value.steps.completed_financial_fact_finder
    })

    const restoreDraft = () => {
      Object.assign(ruleForm, JSON.parse(JSON.stringify(store.state.draft.leadBasicDraft)))
      deleteDraft()
    }

    const deleteDraft = () => {
      store.commit('draft/setLeadBasicDraft', null)
    }

    const isReadOnlyLead = computed(() => {
      return clientsInfo.value.readonly
    })

    const isDisabledForm = computed(() => {
      return isLoadingUpdateMember.value || clientsInfo.value.readonly
    })

    const handleChange = async () => {
      if (member.value.step !== 'default') {
        form.value.validate(async (valid) => {
          if (valid) {
            const res = await updateMember({ form: ruleForm, id: leadId })
            if (!('error' in res)) {
              setInitValue(ruleForm, res.data)
              showSuccessMessage()
            }
          }
        })
      }
    }

    const handleRemoveEmployment = async (index) => {
      if (member.value.step !== 'default') {
        ElMessageBox.confirm('Are you sure to delete this?', 'Info', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }).then(async () => {
          const res = await deleteEmployment(ruleForm.employment_history[index].id)
          if (!('error' in res)) {
            removeEmployment({ ruleForm, index })
            showSuccessMessage()
          }
        })
      } else {
        removeEmployment({ ruleForm, index })
      }
    }

    const handleRemoveEmploymentSpouse = async (index) => {
      if (member.value.step !== 'default') {
        ElMessageBox.confirm('Are you sure to delete this?', 'Info', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }).then(async () => {
          const res = await deleteEmployment(ruleForm.spouse.employment_history[index].id)
          if (!('error' in res)) {
            removeEmploymentSpouse({ ruleForm, index })
            showSuccessMessage()
          }
        })
      } else {
        removeEmploymentSpouse({ ruleForm, index })
      }
    }

    const showSuccessMessage = () => {
      useAlert({
        title: 'Success',
        type: 'success',
        message: 'Update successfully.',
      })
    }

    const focus = (type) => {
      if (type === 'general') isFocusGeneral.value = true
      if (type === 'spouse') isFocusSpouse.value = true
      if (type === 'house') isFocusHouse.value = true
      if (type === 'employment') isFocusEmployment.value = true
      if (type === 'other') isFocusOther.value = true
    }

    const blur = (type) => {
      if (type === 'general') isFocusGeneral.value = false
      if (type === 'spouse') isFocusSpouse.value = false
      if (type === 'house') isFocusHouse.value = false
      if (type === 'employment') isFocusEmployment.value = false
      if (type === 'other') isFocusOther.value = false
      handleChange()
    }

    const isShowAddJobOwnerBtn = computed(() => {
      const index = ruleForm.employment_history.length - 1
      if (
        ruleForm.employment_history[index].company_name &&
        ruleForm.employment_history[index].occupation &&
        ruleForm.employment_history[index].years
      ) {
        return true
      }

      return false
    })

    const isShowAddJobSpouseBtn = computed(() => {
      const index = ruleForm.spouse.employment_history.length - 1

      if (
        ruleForm.spouse.employment_history[index].company_name &&
        ruleForm.spouse.employment_history[index].occupation &&
        ruleForm.spouse.employment_history[index].years
      ) {
        return true
      }

      return false
    })

    const removeHousingInformation = (index) => {
      ruleForm.houses.splice(index, 1)
      if (!ruleForm.houses.length) {
        ruleForm.houses.push({
          type: 'own',
          market_value: null,
          remaining_mortgage_amount: null,
          monthly_payment: null,
          total_monthly_expenses: null,
        })
      }
    }

    const handleRemoveHouse = async (index) => {
      if (ruleForm.houses[index].id) {
        const res = await deleteHouse(ruleForm.houses[index].id)
        if (!('error' in res)) {
          removeHousingInformation(index)
          showSuccessMessage()
        }
      } else {
        removeHousingInformation(index)
      }
    }

    return {
      ruleForm,
      rules,
      form,
      submitForm,
      addEmployment,
      addEmploymentSpouse,
      isLoadingUpdateMember,
      IconAdd,
      IconDelete,
      getPlaceholder,
      changeMarried,
      changeCompanyNameMember,
      changeCompanyNameSpouse,
      optionsCurrencyInput,
      isFetchingMember,
      member,
      IconActive,
      IconNotActive,
      IconDoneStep,
      isFocusGeneral,
      isFocusSpouse,
      isFocusHouse,
      isFocusEmployment,
      isFocusOther,
      isLoadingInfo,
      isDoneCurrentStep,
      focus,
      blur,
      isDisabledForm,
      leadId,
      stateList,
      restoreDraft,
      deleteDraft,
      handleChange,
      isReadOnlyLead,
      handleRemoveEmployment,
      handleRemoveEmploymentSpouse,
      isShowAddJobOwnerBtn,
      isShowAddJobSpouseBtn,
      isLoadingDeleteEmployment,
      handleRemoveHouse,
      isLoadingDeleteHouse,
      addHousingInformation,
    }
  },
}
</script>
