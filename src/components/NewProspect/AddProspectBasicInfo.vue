<template>
  <div>
    <el-form
      ref="form"
      :model="ruleForm"
      status-icon
      :rules="rules"
      class="demo-ruleForm"
      label-position="top"
    >
      <!-- GENERAL -->
      <div class="border-b px-16">
        <span class="text-main text-xl font-semibold">General</span>
        <div class="flex pt-5">
          <el-form-item label="Retired?" class="mr-20">
            <el-radio-group v-model="ruleForm.retired">
              <el-radio :label="true">Yes</el-radio>
              <el-radio :label="false">No</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Married?">
            <el-radio-group v-model="ruleForm.married">
              <el-radio :label="true">Yes</el-radio>
              <el-radio :label="false">No</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="flex">
          <el-form-item label="Name" prop="name" class="w-9/12 pr-5">
            <el-input
              v-model="ruleForm.name"
              placeholder="Enter prospect’s name"
            />
          </el-form-item>
          <el-form-item prop="birthday" label="Date of birth" class="w-3/12">
            <DatePicker v-model="ruleForm.birthday" />
          </el-form-item>
        </div>

        <div class="flex mt-6">
          <el-form-item label="E-mail" prop="email" class="w-5/12">
            <el-input
              v-model.email="ruleForm.email"
              placeholder="Enter prospect’s e-mail"
            />
          </el-form-item>

          <el-form-item label="Phone" prop="phone" class="w-5/12 px-5">
            <el-input
              v-model="ruleForm.phone"
              v-maska="'(###) ###-####'"
              placeholder="Enter prospect’s phone number"
            />
          </el-form-item>
          <el-form-item
            v-if="ruleForm.retired"
            prop="retirement_date"
            label="Retiretment date"
            class="w-2/12"
          >
            <DatePicker v-model="ruleForm.retirement_date" />
          </el-form-item>
        </div>

        <div class="flex my-5">
          <el-form-item label="Address" prop="address" class="w-5/12 pr-5">
            <el-input
              v-model="ruleForm.address"
              placeholder="Enter prospect’s address"
            />
          </el-form-item>

          <el-form-item label="City" prop="city" class="w-5/12 pr-5">
            <el-input
              v-model="ruleForm.city"
              placeholder="Enter prospect’s city"
            />
          </el-form-item>

          <el-form-item label="State" prop="state" class="w-5/12 pr-5">
            <el-input
              v-model="ruleForm.state"
              placeholder="Enter prospect’s state"
            />
          </el-form-item>

          <el-form-item label="ZIP" prop="zip" class="w-2/12">
            <el-input
              v-model="ruleForm.zip"
              placeholder="000000"
              type="number"
            />
          </el-form-item>
        </div>
      </div>
      <!-- GENERAL -->

      <!-- Spouse -->
      <div v-if="ruleForm.married" class="px-16 mt-7 border-b">
        <span class="text-main text-xl font-semibold">Spouse</span>
        <div class="mt-5">
          <el-form-item label="Retired?" class="mr-20">
            <el-radio-group v-model="ruleForm.spouse.retired">
              <el-radio :label="true">Yes</el-radio>
              <el-radio :label="false">No</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="flex">
          <el-form-item label="Name" prop="spouse.name" class="w-9/12 pr-5">
            <el-input
              v-model="ruleForm.spouse.name"
              placeholder="Enter spouse’s name"
            />
          </el-form-item>
          <el-form-item
            prop="spouse.birthday"
            label="Date of birth"
            class="w-3/12"
          >
            <DatePicker v-model="ruleForm.spouse.birthday" />
          </el-form-item>
        </div>
        <div class="flex my-5">
          <el-form-item label="E-mail" prop="spouse.email" class="w-5/12">
            <el-input
              v-model.email="ruleForm.spouse.email"
              placeholder="Enter spouse’s e-mail"
            />
          </el-form-item>

          <el-form-item label="Phone" prop="spouse.phone" class="w-5/12 px-5">
            <el-input
              v-model="ruleForm.spouse.phone"
              v-maska="'(###) ###-####'"
              placeholder="Enter spouse’s phone number"
            />
          </el-form-item>
          <el-form-item
            v-if="ruleForm.spouse.retired"
            prop="spouse.retirement_date"
            label="Retiretment date"
            class="w-2/12"
          >
            <DatePicker v-model="ruleForm.spouse.retirement_date" />
          </el-form-item>
        </div>
      </div>
      <!-- Spouse -->

      <!-- Housing Information -->
      <div class="px-16 mt-7 border-b">
        <span class="text-main text-xl font-semibold">Housing Information</span>
        <div class="flex pt-5">
          <el-form-item label="Type" class="w-5/12">
            <el-radio-group v-model="ruleForm.house.type">
              <el-radio label="own">Own</el-radio>
              <el-radio label="rent">Rent</el-radio>
              <el-radio label="family">Live with family</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="ruleForm.house.type !== 'rent'"
            label="Market value"
            prop="house.market_value"
            class="w-5/12 pr-5"
          >
            <el-input
              v-model="ruleForm.house.market_value"
              placeholder="$123000"
            />
          </el-form-item>
        </div>
        <div class="flex mt-5">
          <el-form-item
            v-if="ruleForm.house.type !== 'rent'"
            label="Total debt"
            prop="house.total_debt"
            class="w-5/12 pr-5"
          >
            <el-input
              v-model="ruleForm.house.total_debt"
              placeholder="$123000"
            />
          </el-form-item>
          <el-form-item
            v-if="ruleForm.house.type !== 'rent'"
            label="Remaining mortgage amount"
            prop="house.remaining_mortgage_amount"
            class="w-5/12 pr-5"
          >
            <el-input
              v-model="ruleForm.house.remaining_mortgage_amount"
              placeholder="$123000"
            />
          </el-form-item>
        </div>
        <div class="flex mb-5">
          <el-form-item
            v-if="ruleForm.house.type === 'rent'"
            label="Monthly payment"
            prop="house.monthly_payment"
            class="w-5/12 pr-5"
          >
            <el-input
              v-model="ruleForm.house.monthly_payment"
              placeholder="$123000"
            />
          </el-form-item>
          <el-form-item
            v-if="ruleForm.house.type === 'rent'"
            label="Total monthly expences"
            prop="house.total_monthly"
            class="w-5/12 pr-5"
          >
            <el-input
              v-model="ruleForm.house.total_monthly_expenses"
              placeholder="$123000"
            />
          </el-form-item>
        </div>
      </div>
      <!-- Housing Information -->

      <div class="px-16 mt-7 border-b">
        <span class="text-main text-xl font-semibold">Employment history</span>
        <div class="mt-5">
          <span class="text-gray03 text-xs">Contact prospect</span>
        </div>

        <el-form-item
          v-for="(eh, index) in ruleForm.employment_history"
          :key="index"
        >
          <el-form-item
            :prop="'employment_history.' + index + '.company_name'"
            label="Company name"
            class="w-full"
          >
            <el-input
              v-model="eh.company_name"
              placeholder="Enter company name"
            />
          </el-form-item>
          <el-form-item
            :prop="'employment_history.' + index + '.occupation'"
            label="Occupation"
            class="w-full px-5"
          >
            <el-input
              v-model="eh.occupation"
              placeholder="Company occupation"
            />
          </el-form-item>
          <el-form-item
            :prop="'employment_history.' + index + '.years'"
            label="Years"
            class="w-full"
          >
            <el-input v-model="eh.years" placeholder="00" />
          </el-form-item>
          <div>
            <div
              v-if="index === ruleForm.employment_history.length - 1"
              class="add-employment cursor-pointer"
              @click="addEmployment"
            >
              +
            </div>
            <div
              v-else
              class="add-employment cursor-pointer"
              @click="removeEmployment(index)"
            >
              -
            </div>
          </div>
        </el-form-item>

        <div v-if="ruleForm.married" class="mt-5">
          <span class="text-gray03 text-xs">Spouse</span>

          <el-form-item
            v-for="(eh, index) in ruleForm.spouse.employment_history"
            :key="index"
            class="mb-10"
          >
            <el-form-item
              :prop="'spouse.employment_history.' + index + '.company_name'"
              label="Company name"
              class="w-full"
            >
              <el-input
                v-model="eh.company_name"
                placeholder="Enter company name"
              />
            </el-form-item>
            <el-form-item
              :prop="'spouse.employment_history.' + index + '.occupation'"
              label="Occupation"
              class="w-full px-5"
            >
              <el-input
                v-model="eh.occupation"
                placeholder="Company occupation"
              />
            </el-form-item>
            <el-form-item
              :prop="'spouse.employment_history.' + index + '.years'"
              label="Years"
              class="w-full"
            >
              <el-input v-model="eh.years" placeholder="00" />
            </el-form-item>
            <div>
              <div
                v-if="index === ruleForm.spouse.employment_history.length - 1"
                class="add-employment cursor-pointer"
                @click="addEmploymentSpouse"
              >
                +
              </div>
              <div
                v-else
                class="add-employment cursor-pointer"
                @click="removeEmploymentSpouse(index)"
              >
                -
              </div>
            </div>
          </el-form-item>
        </div>
      </div>

      <div class="px-16 mt-7">
        <span class="text-main text-xl font-semibold">Other</span>
        <el-form-item label="Risk tolerance?" class="mt-6">
          <el-radio-group v-model="ruleForm.other.risk">
            <el-radio label="conservative">Conservative</el-radio>
            <el-radio label="moderately_conservative">
              Moderately Conservative
            </el-radio>
            <el-radio label="moderate">Moderate</el-radio>
            <el-radio label="moderately_aggressive">
              Moderately Aggressive
            </el-radio>
            <el-radio label="aggressive">Aggressive</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="Does the prospect have any specific questions to discuss?"
          prop="questions"
        >
          <el-input v-model="ruleForm.other.questions" type="textarea" />
        </el-form-item>
        <el-form-item label="Goal for retiretment" prop="retirement">
          <el-input v-model="ruleForm.other.retirement" type="textarea" />
        </el-form-item>
        <el-form-item
          label="Goal for retiretment money"
          prop="retirement_money"
        >
          <el-input v-model="ruleForm.other.retirement_money" type="textarea" />
        </el-form-item>

        <el-form-item
          label="Does the prospect currently work with the advisor?"
        >
          <el-radio-group v-model="ruleForm.other.work_with_advisor">
            <el-radio :label="true">Yes</el-radio>
            <el-radio :label="false">No</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>

      <div class="flex justify-end my-10">
        <el-button type="primary" @click="submitForm('ruleForm')">
          Go to the assets &amp; income
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref, onMounted, computed, watch } from 'vue'
import { createMembers } from '@/api/vueQuery/create-members'
import { updateMembers } from '@/api/vueQuery/update-members'
import { useMutation } from 'vue-query'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useAlert } from '@/utils/use-alert'
import { rules, employmentHistoryRule } from '@/validationRules/basicRules.js'
import { useRoute } from 'vue-router'
import { maska } from 'maska'
import { useFetchMember } from '@/api/use-fetch-member'
import { scrollTop } from '@/utils/scrollTop'
import { initialBasicInformation } from '@/components/NewProspect/initialState/basicInformation'

function setInitValue(ruleForm, member) {
  if (member?.value?.data) {
    ruleForm.name = member.value.data.name
    ruleForm.retired = member.value.data.retired
    ruleForm.married = member.value.data.married
    ruleForm.birthday = member.value.data.birthday
    ruleForm.retirement_date = member.value.data.retirement_date
    ruleForm.email = member.value.data.email
    ruleForm.address = member.value.data.address
    ruleForm.city = member.value.data.city
    ruleForm.state = member.value.data.state
    ruleForm.zip = member.value.data.zip
    ruleForm.phone = member.value.data.phone
    Object.assign(
      ruleForm.employment_history,
      member.value.data.employment_history.data
    )
    if (member.value.data.married) {
      ruleForm.spouse.name = member.value.data.spouse.data.name
      ruleForm.spouse.email = member.value.data.spouse.data.email
      ruleForm.spouse.birthday = member.value.data.spouse.data.birthday
      ruleForm.spouse.retired = member.value.data.spouse.data.retired
      ruleForm.spouse.retirement_date =
        member.value.data.spouse.data.retirement_date
      ruleForm.spouse.phone = member.value.data.spouse.data.phone
      Object.assign(
        ruleForm.spouse.employment_history,
        member.value.data.spouse.data.employment_history.data
      )
    }
    ruleForm.house.type = member.value.data.house.data.type
    ruleForm.house.market_value = member.value.data.house.data.market_value
    ruleForm.house.total_debt = member.value.data.house.data.total_debt
    ruleForm.house.remaining_mortgage_amount =
      member.value.data.house.data.remaining_mortgage_amount
    ruleForm.house.monthly_payment =
      member.value.data.house.data.monthly_payment
    ruleForm.house.total_monthly_expenses =
      member.value.data.house.data.total_monthly_expenses
    ruleForm.other.risk = member.value.data.house.data.risk || 'conservative'
    ruleForm.other.questions = member.value.data.house.data.questions
    ruleForm.other.retirement = member.value.data.house.data.retirement
    ruleForm.other.retirement_money =
      member.value.data.house.data.retirement_money
    ruleForm.other.work_with_advisor =
      member.value.data.house.data.work_with_advisor
  }
}

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
      mutateAsync: createMember,
      isLoading,
      isError,
      isFetching,
      data,
      error,
      refetch,
    } = useMutation(createMembers)

    const { mutateAsync: updateMember } = useMutation(updateMembers)

    const {
      response: member,
      error: errorMember,
      fetching: fetchingMember,
      getMember,
    } = useFetchMember(route.params.id)

    let memberId

    const ruleForm = reactive({
      retired: false,
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
        market_value: '',
        total_debt: '',
        remaining_mortgage_amount: '',
        monthly_payment: '',
        total_monthly_expenses: '',
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
      store.commit('newProspect/setStep', 1)
      scrollTop()
      if (route.params.id) {
        memberId = route.params.id
        await getMember()
        setInitValue(ruleForm, member)
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
              message: isUpdateMember.value
                ? 'Prospect update successfully'
                : 'Prospect created successfully',
            })
            store.commit('newProspect/setStep', step.value + 1)
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
        company_name: employmentHistoryRule.company_name,
        occupation: employmentHistoryRule.occupation,
        years: employmentHistoryRule.years,
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
        company_name: employmentHistoryRule.company_name,
        occupation: employmentHistoryRule.occupation,
        years: employmentHistoryRule.years,
      }
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
      isLoading,
      isError,
      isFetching,
      data,
      error,
      refetch,
      member,
      errorMember,
      fetchingMember,
      isUpdateMember,
    }
  },
}
</script>
