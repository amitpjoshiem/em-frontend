<template>
  <div class="lg:max-w-5xl lg:my-0 lg:mx-auto">
    <div v-if="!isFetchingMember && !isLoadingInfo" class="sm:p-5">
      <el-form ref="form" :model="ruleForm" :rules="rules" label-position="top" :disabled="isReadOnlyLead">
        <!-- GENERAL -->
        <div class="p-5">
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
                <el-form-item label="Name" prop="name" class="sm:w-8/12 sm:pr-2 lg:w-6/12 lg:pr-2 mb-4">
                  <el-input
                    v-model="ruleForm.name"
                    placeholder="Enter name"
                    @focus="focus('general')"
                    @blur="blur('general')"
                  />
                </el-form-item>
                <el-form-item prop="birthday" label="Date of birth" class="sm:w-4/12 sm:pl-2 lg:w-3/12 lg:px-2 mb-4">
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

                <el-form-item label="E-mail" prop="email" class="sm:w-8/12 sm:pr-2 lg:w-3/12 lg:pl-2 mb-4">
                  <el-input
                    v-model.email="ruleForm.email"
                    placeholder="Enter e-mail"
                    @focus="focus('general')"
                    @blur="blur('general')"
                  />
                </el-form-item>

                <el-form-item
                  v-if="ruleForm.retired"
                  prop="retirement_date"
                  label="Retirement date"
                  class="sm:w-4/12 sm:pl-2 lg:w-3/12 mb-4 lg:pl-0 lg:pr-2"
                >
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

                <el-form-item
                  label="Phone"
                  prop="phone"
                  class="sm:w-6/12 sm:pr-2 lg:w-3/12 mb-4"
                  :class="{ 'sm:pr-2 lg:px-2': ruleForm.retired }"
                >
                  <el-input
                    v-model="ruleForm.phone"
                    v-maska="'(###) ###-####'"
                    placeholder="Enter phone number"
                    @focus="focus('general')"
                    @blur="blur('general')"
                  />
                </el-form-item>

                <el-form-item label="State" prop="state" class="sm:w-6/12 sm:pl-2 lg:w-3/12 lg:pl-0 lg:pr-2 mb-4">
                  <el-select v-model="ruleForm.state" filterable placeholder="Select">
                    <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>

                <el-form-item label="City" prop="city" class="sm:w-6/12 sm:pr-2 lg:w-3/12 lg:pl-2 mb-4">
                  <el-input
                    v-model="ruleForm.city"
                    placeholder="Enter city"
                    @focus="focus('general')"
                    @blur="blur('general')"
                  />
                </el-form-item>

                <el-form-item label="Address" prop="address" class="sm:w-6/12 sm:pl-2 lg:w-3/12 lg:pr-2 mb-4">
                  <el-input
                    v-model="ruleForm.address"
                    placeholder="Enter address"
                    @focus="focus('general')"
                    @blur="blur('general')"
                  />
                </el-form-item>

                <el-form-item
                  label="ZIP"
                  prop="zip"
                  class="sm:w-6/12 lg:w-3/12 mb-4"
                  :class="{ 'sm:pr-2 lg:px-2': ruleForm.retired }"
                >
                  <el-input
                    v-model="ruleForm.zip"
                    placeholder="#####"
                    inputmode="numeric"
                    maxlength="5"
                    @focus="focus('general')"
                    @blur="blur('general')"
                  />
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
        <!-- GENERAL -->

        <!-- Spouse -->
        <div v-if="ruleForm.married" class="p-5">
          <div class="flex items-center mb-5">
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
              <el-form-item label="Name" prop="spouse.name" class="sm:w-8/12 sm:pr-2 lg:w-6/12 lg:pr-2 mb-4">
                <el-input
                  v-model="ruleForm.spouse.name"
                  placeholder="Enter spouse’s name"
                  @focus="focus('spouse')"
                  @blur="blur('spouse')"
                />
              </el-form-item>
              <el-form-item
                prop="spouse.birthday"
                label="Date of birth"
                class="sm:w-4/12 sm:pl-2 lg:w-3/12 lg:px-2 mb-4"
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
              <el-form-item label="E-mail" prop="spouse.email" class="sm:w-6/12 sm:pr-2 lg:w-3/12 lg:pl-2 mb-4">
                <el-input v-model.email="ruleForm.spouse.email" placeholder="Enter spouse’s e-mail" />
              </el-form-item>
              <el-form-item
                v-if="ruleForm.spouse.retired"
                prop="spouse.retirement_date"
                label="Retirement date"
                class="sm:w-6/12 sm:pl-2 lg:w-3/12 mb-4 lg:pl-0 lg:pr-2"
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
              <el-form-item
                label="Phone"
                prop="spouse.phone"
                class="sm:w-6/12 lg:w-3/12 mb-4"
                :class="{ 'sm:pr-2 lg:px-2': ruleForm.retired }"
              >
                <el-input
                  v-model="ruleForm.spouse.phone"
                  v-maska="'(###) ###-####'"
                  placeholder="Enter spouse’s phone number"
                  inputmode="numeric"
                  @focus="focus('spouse')"
                  @blur="blur('spouse')"
                />
              </el-form-item>
            </div>
          </div>
        </div>
        <!-- Spouse -->

        <!-- Housing Information -->
        <div class="p-5">
          <div class="flex items-center mb-5">
            <InlineSvg v-show="isFocusHouse && !isDoneCurrentStep" :src="IconActive" />
            <InlineSvg v-show="!isFocusHouse && !isDoneCurrentStep" :src="IconNotActive" />
            <InlineSvg v-show="isDoneCurrentStep" :src="IconDoneStep" />
            <div class="text-main text-xl font-semibold ml-2">Housing Information</div>
          </div>
          <div class="border border-main-gray rounded-lg p-5" :class="{ 'border-border-blue': isFocusHouse }">
            <el-form-item label="Type" class="mb-4">
              <el-radio-group v-model="ruleForm.house.type">
                <el-radio label="own">Own</el-radio>
                <el-radio label="rent">Rent</el-radio>
                <el-radio label="family">Live with family</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="sm:flex sm:flex-wrap">
              <el-form-item
                v-if="ruleForm.house.type !== 'rent'"
                label="Market value"
                prop="house.market_value"
                class="mb-4 sm:w-4/12"
              >
                <SwdCurrencyInput
                  v-model="ruleForm.house.market_value"
                  :options="optionsCurrencyInput"
                  placeholder="$12345"
                  @focus="focus('house')"
                  @blur="blur('house')"
                />
              </el-form-item>
              <el-form-item
                v-if="ruleForm.house.type !== 'rent'"
                label="Monthly payments"
                prop="house.total_debt"
                class="mb-4 sm:w-4/12 sm:px-2"
              >
                <SwdCurrencyInput
                  v-model="ruleForm.house.total_debt"
                  :options="optionsCurrencyInput"
                  placeholder="$12345"
                  @focus="focus('house')"
                  @blur="blur('house')"
                />
              </el-form-item>
              <el-form-item
                v-if="ruleForm.house.type !== 'rent'"
                label="Remaining mortgage"
                prop="house.remaining_mortgage_amount"
                class="mb-4 sm:w-4/12"
              >
                <SwdCurrencyInput
                  v-model="ruleForm.house.remaining_mortgage_amount"
                  :options="optionsCurrencyInput"
                  @focus="focus('house')"
                  @blur="blur('house')"
                />
              </el-form-item>
              <el-form-item
                v-if="ruleForm.house.type === 'rent'"
                label="Monthly payments"
                prop="house.monthly_payment"
                class="mb-4 sm:w-4/12"
              >
                <SwdCurrencyInput
                  v-model="ruleForm.house.monthly_payment"
                  :options="optionsCurrencyInput"
                  placeholder="$12345"
                  @focus="focus('house')"
                  @blur="blur('house')"
                />
              </el-form-item>
              <el-form-item
                v-if="ruleForm.house.type === 'rent'"
                label="Total monthly expences"
                prop="house.total_monthly_expenses"
                class="mb-4 sm:w-4/12 sm:pl-2"
              >
                <SwdCurrencyInput
                  v-model="ruleForm.house.total_monthly_expenses"
                  :options="optionsCurrencyInput"
                  placeholder="$12345"
                  @focus="focus('house')"
                  @blur="blur('house')"
                />
              </el-form-item>
            </div>
          </div>
        </div>
        <!-- Housing Information -->

        <!-- Employment history -->
        <div class="p-5 mt-5">
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
                  class="sm:w-4/12 mb-4"
                  :prop="'employment_history.' + index + '.years'"
                  label="Years"
                >
                  <el-input
                    v-model="eh.years"
                    placeholder="00"
                    inputmode="numeric"
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
                  class="sm:w-4/12 mb-4"
                >
                  <el-input
                    placeholder="00"
                    inputmode="numeric"
                    :disabled="!ruleForm.employment_history[index].company_name.trim().length"
                  />
                </el-form-item>
              </div>
              <div class="flex justify-end mt-4">
                <SwdButton
                  v-if="index === ruleForm.employment_history.length - 1"
                  primary
                  main
                  :disabled="isLoadingUpdateMember || isReadOnlyLead"
                  @click="addEmployment(ruleForm)"
                >
                  Add job
                </SwdButton>
                <el-button v-else type="danger" plain @click="removeEmployment({ ruleForm, index })">
                  Remove job
                </el-button>
              </div>
            </div>

            <div v-if="ruleForm.married" class="mt-5">
              <div class="text-main text-xs uppercase my-2">Spouse/Partner</div>
              <div v-for="(eh, index) in ruleForm.spouse.employment_history" :key="index" class="mb-2">
                <div class="sm:flex sm:flex-wrap">
                  <el-form-item
                    :prop="'spouse.employment_history.' + index + '.company_name'"
                    label="Company name"
                    class="sm:w-4/12 mb-4"
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
                    class="sm:w-4/12 mb-4"
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
                    class="sm:w-4/12 mb-4"
                    :prop="'spouse.employment_history.' + index + '.years'"
                    label="Years"
                  >
                    <el-input
                      v-model="eh.years"
                      placeholder="00"
                      inputmode="numeric"
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
                    class="sm:w-4/12 mb-4"
                  >
                    <el-input
                      placeholder="00"
                      inputmode="numeric"
                      :disabled="!ruleForm.spouse.employment_history[index].company_name.trim().length"
                    />
                  </el-form-item>
                </div>
                <div class="flex justify-end mt-4">
                  <SwdButton
                    v-if="index === ruleForm.spouse.employment_history.length - 1"
                    primary
                    main
                    :disabled="isLoadingUpdateMember || isReadOnlyLead"
                    @click="addEmploymentSpouse(ruleForm)"
                  >
                    Add job
                  </SwdButton>
                  <el-button v-else type="danger" plain @click="removeEmploymentSpouse({ ruleForm, index })">
                    Remove job
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Employment history -->

        <!-- Other -->
        <div class="my-5 p-5">
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
              <el-radio-group v-model="ruleForm.amount_for_retirement" class="flex sm:flex-wrap w-full">
                <el-radio label="150000" class="w-full sm:w-6/12 lg:w-3/12 mr-0">$150,000 - $250,000</el-radio>
                <el-radio label="250000" class="w-full sm:w-6/12 lg:w-3/12 mr-0">$250,000 - $500,000</el-radio>
                <el-radio label="500000" class="w-full sm:w-6/12 lg:w-3/12 mr-0">$500,000 - $1,000,000</el-radio>
                <el-radio label="1000000" class="w-full sm:w-6/12 lg:w-3/12 mr-0">$1,000,000+</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="My biggest financial concerns are:" class="mb-4">
              <el-input
                v-model="ruleForm.biggest_financial_concern"
                type="textarea"
                @focus="focus('general')"
                @blur="blur('general')"
              />
            </el-form-item>

            <el-form-item label="Risk tolerance?" class="my-5">
              <el-radio-group v-model="ruleForm.other.risk">
                <div class="flex flex-col sm:flex-row sm:flex-wrap">
                  <el-radio label="conservative" class="sm:w-3/12">Conservative</el-radio>
                  <el-radio label="moderate" class="sm:w-3/12">Moderate</el-radio>
                  <el-radio label="moderately_conservative" class="sm:w-3/12"> Moderately Conservative </el-radio>
                  <el-radio label="aggressive" class="sm:w-3/12">Aggressive</el-radio>
                  <el-radio label="moderately_aggressive" class="sm:w-3/12"> Moderately Aggressive </el-radio>
                </div>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Do you have any specific question to discuss?" prop="questions" class="mb-4">
              <el-input
                v-model="ruleForm.other.questions"
                type="textarea"
                @focus="focus('other')"
                @blur="blur('other')"
              />
            </el-form-item>
            <el-form-item label="What are your goals for Retirement?" prop="retirement" class="mb-4">
              <el-input
                v-model="ruleForm.other.retirement"
                type="textarea"
                @focus="focus('other')"
                @blur="blur('other')"
              />
            </el-form-item>
            <el-form-item label="What are your goals for Retirement money?" prop="retirement_money" class="mb-4">
              <el-input
                v-model="ruleForm.other.retirement_money"
                type="textarea"
                @focus="focus('other')"
                @blur="blur('other')"
              />
            </el-form-item>

            <el-form-item label="Are you currently working with an Advisor?" class="mb-4">
              <el-radio-group v-model="ruleForm.other.work_with_advisor">
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
          <SwdButton
            v-else
            primary
            main
            class="w-2/12"
            :disabled="isLoadingUpdateMember"
            @click="submitForm('ruleForm')"
          >
            <SwdSpinner v-show="isLoadingUpdateMember" class="mr-2" />
            Save
          </SwdButton>
        </div>
      </el-form>
    </div>
    <el-skeleton v-else :rows="10" animated />
  </div>
</template>

<script>
import { reactive, ref, onMounted, computed, watchEffect } from 'vue'
import { updateMembers } from '@/api/vueQuery/update-members'
import { useFetchClietsInfo } from '@/api/clients/use-fetch-clients-info'
import { useFetchMember } from '@/api/use-fetch-member.js'
import { useMutation } from 'vue-query'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useAlert } from '@/utils/use-alert'
import { rules } from '@/validationRules/basicRules.js'
import { maska } from 'maska'
import { scrollTop } from '@/utils/scrollTop'
import { useBasicInfoHooks } from '@/hooks/use-basic-info-hooks'
import { useStateHook } from '@/hooks/use-state-hook'
import IconActive from '@/assets/svg/icon-active.svg'
import IconNotActive from '@/assets/svg/icon-not-active.svg'
import IconDoneStep from '@/assets/svg/icon-done-step.svg'
import IconAdd from '@/assets/svg/icon-add.svg'
import IconDelete from '@/assets/svg/icon-delete.svg'

export default {
  name: 'AddLeadBasicInfo',
  directives: { maska },
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

    const { stateList } = useStateHook()

    const { isLoading: isLoadingUpdateMember, mutateAsync: updateMember } = useMutation(updateMembers)

    const {
      isFetching: isFetchingMember,
      data: member,
      refetch: refetchMember,
    } = useFetchMember({ id: route.params.id }, { enabled: false })

    const { isLoading: isLoadingInfo, data: clientsInfo } = useFetchClietsInfo()

    const {
      setInitValue,
      addEmployment,
      addEmploymentSpouse,
      removeEmployment,
      changeCompanyNameMember,
      changeCompanyNameSpouse,
      removeEmploymentSpouse,
      getPlaceholder,
      optionsCurrencyInput,
      changeMarried,
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
        name: '',
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
      house: {
        type: 'own',
        market_value: null,
        monthly_payments: null,
        remaining_mortgage_amount: null,
        monthly_payment: null,
        total_monthly_expenses: null,
      },
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

    watchEffect(() => {
      if (isFetchingMember.value === false) setInitValue(ruleForm, member)
    })

    const submitForm = async () => {
      form.value.validate(async (valid) => {
        if (valid) {
          const res = await updateMember({ form: ruleForm, id: route.params.id })
          if (!('error' in res)) {
            useAlert({
              title: 'Success',
              type: 'success',
              message: 'Information updated successfully',
            })
            store.commit('newClient/setStep', step.value + 1)
            router.push({
              name: 'lead-assets-information',
              params: { id: route.params.id },
            })
          }
        } else {
          return false
        }
      })
    }

    const isDoneCurrentStep = computed(() => {
      return clientsInfo.value.steps.completed_financial_fact_finder
    })

    const isReadOnlyLead = computed(() => {
      return clientsInfo.value.readonly
    })

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
    }

    return {
      ruleForm,
      rules,
      form,
      submitForm,
      removeEmployment,
      addEmployment,
      addEmploymentSpouse,
      removeEmploymentSpouse,
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
      isReadOnlyLead,
      leadId,
      stateList,
    }
  },
}
</script>
