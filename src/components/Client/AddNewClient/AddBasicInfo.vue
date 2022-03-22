<template>
  <div>
    <div v-if="!isFetchingMember" class="sm:p-5">
      <!-- <div v-if="isShowForm"> -->
      <el-form ref="form" :model="ruleForm" status-icon :rules="rules" label-position="top">
        <!-- GENERAL -->
        <div class="border-b pb-5">
          <div class="text-main text-xl font-semibold mb-5">General</div>
          <div>
            <div class="flex justify-between w-full sm:justify-start">
              <el-form-item label="Retired?" class="sm:mr-10">
                <el-radio-group v-model="ruleForm.retired">
                  <el-radio :label="true">Yes</el-radio>
                  <el-radio :label="false">No</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="Married?">
                <el-radio-group v-model="ruleForm.married" @change="changeMarried">
                  <el-radio :label="true">Yes</el-radio>
                  <el-radio :label="false">No</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>

            <div class="sm:flex sm:flex-wrap">
              <el-form-item label="Name" prop="name" class="sm:w-8/12 sm:pr-2 lg:w-6/12 lg:pr-2 mb-4">
                <el-input v-model="ruleForm.name" placeholder="Enter name" />
              </el-form-item>
              <el-form-item prop="birthday" label="Date of birth" class="sm:w-4/12 sm:pl-2 lg:w-3/12 lg:px-2 mb-4">
                <el-date-picker
                  v-model="ruleForm.birthday"
                  type="date"
                  :placeholder="getPlaceholder"
                  format="MM/DD/YYYY"
                  value-format="MM/DD/YYYY"
                />
              </el-form-item>

              <el-form-item label="E-mail" prop="email" class="sm:w-8/12 sm:pr-2 lg:w-3/12 lg:pl-2 mb-4">
                <el-input v-model.email="ruleForm.email" placeholder="Enter e-mail" />
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
                />
              </el-form-item>

              <el-form-item
                label="Phone"
                prop="phone"
                class="sm:w-6/12 lg:w-3/12 mb-4"
                :class="{ 'sm:pr-2 lg:px-2': ruleForm.retired }"
              >
                <el-input v-model="ruleForm.phone" v-maska="'(###) ###-####'" placeholder="Enter phone number" />
              </el-form-item>

              <el-form-item label="Address" prop="address" class="sm:w-6/12 sm:pl-2 lg:w-3/12 lg:pr-2 mb-4">
                <el-input v-model="ruleForm.address" placeholder="Enter address" />
              </el-form-item>

              <el-form-item label="City" prop="city" class="sm:w-6/12 sm:pr-2 lg:w-3/12 lg:pl-2 mb-4">
                <el-input v-model="ruleForm.city" placeholder="Enter city" />
              </el-form-item>

              <el-form-item label="State" prop="state" class="sm:w-6/12 sm:pl-2 lg:w-3/12 lg:pl-0 lg:pr-2 mb-4">
                <el-input v-model="ruleForm.state" placeholder="Enter state" />
              </el-form-item>

              <el-form-item
                label="ZIP"
                prop="zip"
                class="sm:w-6/12 lg:w-3/12 mb-4"
                :class="{ 'sm:pr-2 lg:px-2': ruleForm.retired }"
              >
                <el-input v-model="ruleForm.zip" placeholder="000000" inputmode="numeric" />
              </el-form-item>
            </div>
          </div>
        </div>
        <!-- GENERAL -->

        <!-- Spouse -->
        <div v-if="ruleForm.married" class="border-b pb-8">
          <div class="text-main text-xl font-semibold my-5">Spouse</div>
          <el-form-item label="Retired?" class="mb-4">
            <el-radio-group v-model="ruleForm.spouse.retired">
              <el-radio :label="true">Yes</el-radio>
              <el-radio :label="false">No</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="sm:flex sm:flex-wrap">
            <el-form-item label="Name" prop="spouse.name" class="sm:w-8/12 sm:pr-2 lg:w-6/12 lg:pr-2 mb-4">
              <el-input v-model="ruleForm.spouse.name" placeholder="Enter spouse’s name" />
            </el-form-item>
            <el-form-item prop="spouse.birthday" label="Date of birth" class="sm:w-4/12 sm:pl-2 lg:w-3/12 lg:px-2 mb-4">
              <el-date-picker
                v-model="ruleForm.spouse.birthday"
                type="date"
                :placeholder="getPlaceholder"
                format="MM/DD/YYYY"
                value-format="MM/DD/YYYY"
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
              />
            </el-form-item>
          </div>
        </div>
        <!-- Spouse -->

        <!-- Housing Information -->
        <div class="pb-8 border-b">
          <div class="text-main text-xl font-semibold my-5">Housing Information</div>
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
              />
            </el-form-item>
            <el-form-item
              v-if="ruleForm.house.type !== 'rent'"
              label="Total debt"
              prop="house.total_debt"
              class="mb-4 sm:w-4/12 sm:px-2"
            >
              <SwdCurrencyInput
                v-model="ruleForm.house.total_debt"
                :options="optionsCurrencyInput"
                placeholder="$12345"
              />
            </el-form-item>
            <el-form-item
              v-if="ruleForm.house.type !== 'rent'"
              label="Remaining mortgage"
              prop="house.remaining_mortgage_amount"
              class="mb-4 sm:w-4/12"
            >
              <SwdCurrencyInput v-model="ruleForm.house.remaining_mortgage_amount" :options="optionsCurrencyInput" />
            </el-form-item>
            <el-form-item
              v-if="ruleForm.house.type === 'rent'"
              label="Monthly payment"
              prop="house.monthly_payment"
              class="mb-4 sm:w-4/12"
            >
              <SwdCurrencyInput
                v-model="ruleForm.house.monthly_payment"
                :options="optionsCurrencyInput"
                placeholder="$12345"
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
              />
            </el-form-item>
          </div>
        </div>
        <!-- Housing Information -->

        <!-- Employment history -->
        <div class="pb-8 mt-5 border-b">
          <span class="text-main text-xl font-semibold">Employment history</span>
          <div class="text-gray03 text-xs uppercase my-2">Contact opportunity</div>

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
                  @change="changeCompanyNameMember(index)"
                />
              </el-form-item>

              <el-form-item
                v-if="!!ruleForm.employment_history[index].company_name.trim().length"
                class="sm:w-4/12 mb-4"
                :prop="'employment_history.' + index + '.occupation'"
                label="Occupation"
              >
                <el-input v-model="eh.occupation" placeholder="Company occupation" />
              </el-form-item>
              <el-form-item
                v-if="!!ruleForm.employment_history[index].company_name.trim().length"
                class="sm:w-4/12 mb-4"
                :prop="'employment_history.' + index + '.years'"
                label="Years"
              >
                <el-input v-model="eh.years" placeholder="00" inputmode="numeric" />
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
              <el-button
                v-if="index === ruleForm.employment_history.length - 1"
                type="primary"
                plain
                @click="addEmployment"
              >
                Add job
              </el-button>
              <el-button v-else type="danger" plain @click="removeEmployment(index)">Remove job</el-button>
            </div>
          </div>

          <div v-if="ruleForm.married" class="mt-5">
            <div class="text-gray03 text-xs uppercase my-2">Spouse</div>

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
                    @change="changeCompanyNameSpouse(index)"
                  />
                </el-form-item>

                <el-form-item
                  v-if="!!ruleForm.spouse.employment_history[index].company_name.trim().length"
                  class="sm:w-4/12 mb-4"
                  :prop="'spouse.employment_history.' + index + '.occupation'"
                  label="Occupation"
                >
                  <el-input v-model="eh.occupation" placeholder="Company occupation" />
                </el-form-item>
                <el-form-item
                  v-if="!!ruleForm.spouse.employment_history[index].company_name.trim().length"
                  class="sm:w-4/12 mb-4"
                  :prop="'spouse.employment_history.' + index + '.years'"
                  label="Years"
                >
                  <el-input v-model="eh.years" placeholder="00" inputmode="numeric" />
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
                <el-button
                  v-if="index === ruleForm.spouse.employment_history.length - 1"
                  type="primary"
                  plain
                  @click="addEmploymentSpouse"
                >
                  Add job
                </el-button>
                <el-button v-else type="danger" plain @click="removeEmploymentSpouse(index)">Remove job</el-button>
              </div>
            </div>
          </div>
        </div>
        <!-- Employment history -->

        <!-- Other -->
        <div class="my-5">
          <span class="text-main text-xl font-semibold">Other</span>
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
          <el-form-item
            label="Does the opportunity have any specific questions to discuss?"
            prop="questions"
            class="mb-4"
          >
            <el-input v-model="ruleForm.other.questions" type="textarea" />
          </el-form-item>
          <el-form-item label="Goal for retiretment" prop="retirement" class="mb-4">
            <el-input v-model="ruleForm.other.retirement" type="textarea" />
          </el-form-item>
          <el-form-item label="Goal for retiretment money" prop="retirement_money" class="mb-4">
            <el-input v-model="ruleForm.other.retirement_money" type="textarea" />
          </el-form-item>

          <el-form-item label="Does the opportunity currently work with the advisor?" class="mb-4">
            <el-radio-group v-model="ruleForm.other.work_with_advisor">
              <el-radio :label="true">Yes</el-radio>
              <el-radio :label="false">No</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <!-- Other -->

        <div class="flex justify-end my-10">
          <el-button
            type="primary"
            :disabled="isLoadingCreateMember || isLoadingUpdateMember"
            @click="submitForm('ruleForm')"
          >
            Go to the assets &amp; income
          </el-button>
        </div>
      </el-form>
    </div>
    <el-skeleton v-else :rows="10" animated />
  </div>
</template>

<script>
import { reactive, ref, onMounted, computed, watch, watchEffect } from 'vue'
import { createMembers } from '@/api/vueQuery/create-members'
import { updateMembers } from '@/api/vueQuery/update-members'
import { useMutation } from 'vue-query'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useAlert } from '@/utils/use-alert'
import { rules, employmentHistoryRule } from '@/validationRules/basicRules.js'
import { maska } from 'maska'
import { scrollTop } from '@/utils/scrollTop'
import { initialBasicInformation } from '@/components/NewProspect/initialState/basicInformation'
import dayjs from 'dayjs'
import IconAdd from '@/assets/svg/icon-add.svg'
import IconDelete from '@/assets/svg/icon-delete.svg'
import { useSalesForceAuth } from '@/api/use-sales-force-auth.js'
import { useFetchMember } from '@/api/use-fetch-member.js'

// function setInitValue(ruleForm, member) {
//   if (member?.value?.id) {
//     ruleForm.retired = member.value.retired
//     ruleForm.married = member.value.married
//     ruleForm.name = member.value.name
//     if (member.value.birthday) ruleForm.birthday = dayjs(member.value.birthday).format('MM/DD/YYYY')
//     if (member.value.retirement_date) ruleForm.birthday = dayjs(member.value.retirement_date).format('MM/DD/YYYY')
//     ruleForm.email = member.value.email
//     ruleForm.address = member.value.address
//     ruleForm.city = member.value.city
//     ruleForm.state = member.value.state
//     ruleForm.zip = member.value.zip
//     ruleForm.phone = member.value.phone

//     if (member.value.employment_history.length)
//       Object.assign(ruleForm.employment_history, JSON.parse(JSON.stringify(member.value.employment_history)))

//     if (member.value.married) {
//       Object.assign(ruleForm.spouse, JSON.parse(JSON.stringify(member.value.spouse)))
//       ruleForm.spouse.birthday = dayjs(member.value.spouse.birthday).format('MM/DD/YYYY')
//       ruleForm.spouse.retirement_date = dayjs(member.value.spouse.retirement_date).format('MM/DD/YYYY')
//     }

//     if (member.value.house.type) Object.assign(ruleForm.house, JSON.parse(JSON.stringify(member.value.house)))

//     if (member.value.other.id) Object.assign(ruleForm.other, JSON.parse(JSON.stringify(member.value.other)))
//   }
// }

export default {
  name: 'AddProspectBasicInfo',
  directives: { maska },
  setup() {
    const router = useRouter()
    const store = useStore()
    const form = ref(null)
    const route = useRoute()
    const step = computed(() => store.state.newProspect.step)
    const isUpdateMember = computed(() => !!route.params.id)

    const {
      isLoading: isLoadingStatusSfAcc,
      fetching: fetchingStatusSfAcc,
      isError: isErrorStatusSfAcc,
      data: statusSfAcc,
    } = useSalesForceAuth()

    const {
      mutateAsync: createMember,
      isLoading: isLoadingCreateMember,
      isError,
      isFetching,
      data,
      error,
      refetch,
    } = useMutation(createMembers)

    const { isLoading: isLoadingUpdateMember, mutateAsync: updateMember } = useMutation(updateMembers)

    const {
      isFetching: isFetchingMember,
      data: member,
      refetch: refetchMember,
    } = useFetchMember({ id: route.params.id }, { enabled: false })

    let memberId

    const ruleForm = reactive({
      retired: true,
      married: true,
      name: '',
      birthday: '',
      retirement_date: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      spouse: {
        name: '',
        email: '',
        birthday: '',
        retired: true,
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
        total_debt: null,
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

    const optionsCurrencyInput = {
      currency: 'USD',
      locale: 'en-US',
      currencyDisplay: 'hidden',
      precision: 2,
    }

    onMounted(async () => {
      store.commit('newClient/setStep', 1)
      scrollTop()
      if (route.params.id) {
        memberId = route.params.id
        // refetchMember.value()
      }
    })

    watchEffect(() => {
      if (isFetchingMember.value === false) {
        // setInitValue(ruleForm, member)
      }
    })

    const resetState = () => {
      Object.assign(ruleForm, initialBasicInformation)
    }

    watch(isUpdateMember, (newValue, oldValue) => {
      if (newValue !== oldValue && newValue === false) {
        resetState()
      }
    })

    const submitForm = async () => {
      form.value.validate(async (valid) => {
        if (valid) {
          let res
          if (isUpdateMember.value) {
            res = await updateMember({ form: ruleForm, id: memberId })
          } else {
            res = await createMember(ruleForm)
          }
          if (!('error' in res)) {
            useAlert({
              title: 'Success',
              type: 'success',
              message: isUpdateMember.value ? 'Opportunity update successfully' : 'Opportunity created successfully',
            })
            store.commit('newClient/setStep', step.value + 1)
            router.push({
              name: 'assets-information',
              params: { id: res.data.id },
            })
          }
        } else {
          return false
        }
      })
    }

    const removeEmployment = (index) => {
      ruleForm.employment_history.splice(index, 1)
    }

    const removeEmploymentSpouse = (index) => {
      ruleForm.spouse.employment_history.splice(index, 1)
    }

    const addEmployment = () => {
      const length = ruleForm.employment_history.length
      ruleForm.employment_history.push({
        company_name: '',
        occupation: '',
        years: '',
      })
      rules.employment_history[length] = {
        company_name: [employmentHistoryRule.company_name],
        occupation: [employmentHistoryRule.occupation],
        years: [employmentHistoryRule.years],
      }
    }

    const addEmploymentSpouse = () => {
      const length = ruleForm.spouse.employment_history.length
      ruleForm.spouse.employment_history.push({
        company_name: '',
        occupation: '',
        years: '',
      })
      rules.spouse.employment_history[length] = {
        company_name: [employmentHistoryRule.company_name],
        occupation: [employmentHistoryRule.occupation],
        years: [employmentHistoryRule.years],
      }
    }

    const getPlaceholder = computed(() => {
      return dayjs(new Date()).format('MM/DD/YYYY')
    })

    const changeMarried = () => {
      if (ruleForm.married && !ruleForm.spouse.length) {
        ruleForm.spouse = {
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
        }
      }
    }

    const changeCompanyNameMember = (index) => {
      if (ruleForm.employment_history[index].company_name.trim().length) {
        rules.employment_history[index].occupation[0].required = true
        rules.employment_history[index].years[0].required = true
      } else {
        rules.employment_history[index].occupation[0].required = false
        rules.employment_history[index].years[0].required = false
      }
    }

    const changeCompanyNameSpouse = (index) => {
      if (ruleForm.spouse.employment_history[index].company_name.length) {
        rules.spouse.employment_history[index].occupation[0].required = true
        rules.spouse.employment_history[index].years[0].required = true
      } else {
        rules.spouse.employment_history[index].occupation[0].required = false
        rules.spouse.employment_history[index].years[0].required = false
      }
    }

    // const isShowForm = computed(() => {
    //   return statusSfAcc.value.auth || (!statusSfAcc.value.auth && route.params.id)
    // })

    const goPartnerSettings = () => {
      router.push({ name: 'partners' })
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
      isLoadingCreateMember,
      isLoadingUpdateMember,
      isError,
      isFetching,
      data,
      error,
      refetch,
      isUpdateMember,
      IconAdd,
      IconDelete,
      getPlaceholder,
      changeMarried,
      changeCompanyNameMember,
      changeCompanyNameSpouse,
      isLoadingStatusSfAcc,
      isErrorStatusSfAcc,
      statusSfAcc,
      // isShowForm,
      fetchingStatusSfAcc,
      goPartnerSettings,
      optionsCurrencyInput,
      isFetchingMember,
      member,
      refetchMember,
    }
  },
}
</script>
