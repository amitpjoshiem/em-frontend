<template>
  <div v-if="!isFetchingMember">
    <el-form ref="form" :model="ruleForm" :rules="rules" label-position="top" :disabled="isDisabledForm">
      <!-- GENERAL -->
      <div class="border-b px-8 pb-5">
        <span class="text-main text-xl font-semibold">General</span>
        <div class="flex py-5">
          <el-form-item label="Retired?" class="mr-20">
            <el-radio-group v-model="ruleForm.retired">
              <el-radio :label="true">Yes</el-radio>
              <el-radio :label="false">No</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Spouse/Partner?">
            <el-radio-group v-model="ruleForm.married" @change="changeMarried">
              <el-radio :label="true">Yes</el-radio>
              <el-radio :label="false">No</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="flex">
          <el-form-item label="Account name" prop="name" class="w-8/12 pr-4">
            <el-input v-model="ruleForm.name" placeholder="Enter account name" @blur="changeInput" />
          </el-form-item>
          <el-form-item prop="birthday" label="Date of birth" class="w-4/12">
            <el-date-picker
              v-model="ruleForm.birthday"
              type="date"
              :placeholder="getPlaceholder"
              format="MM/DD/YYYY"
              value-format="MM/DD/YYYY"
              @change="changeInput"
            />
          </el-form-item>
        </div>

        <div class="flex mt-6">
          <el-form-item label="E-mail" prop="email" class="w-6/12">
            <el-input v-model.email="ruleForm.email" placeholder="Enter prospect’s e-mail" @blur="changeInput" />
          </el-form-item>

          <el-form-item label="Phone" prop="phone" class="w-4/12 px-5">
            <el-input
              v-model="ruleForm.phone"
              v-maska="'(###)###-####'"
              placeholder="Enter prospect’s phone number"
              @blur="changeInput"
            />
          </el-form-item>
          <el-form-item v-if="ruleForm.retired" prop="retirement_date" label="Retirement date" class="w-2/12">
            <el-date-picker
              v-model="ruleForm.retirement_date"
              type="date"
              :placeholder="getPlaceholder"
              format="MM/DD/YYYY"
              value-format="MM/DD/YYYY"
              @change="changeInput"
            />
          </el-form-item>
        </div>

        <div class="flex my-5">
          <el-form-item label="State" prop="state" class="w-5/12 pr-4">
            <el-select v-model="ruleForm.state" filterable placeholder="Select" class="w-full" @change="changeInput">
              <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>

          <el-form-item label="City" prop="city" class="w-5/12 pr-4">
            <el-input v-model="ruleForm.city" placeholder="Enter prospect’s city" @blur="changeInput" />
          </el-form-item>

          <el-form-item label="Address" prop="address" class="w-5/12 pr-4">
            <el-input v-model="ruleForm.address" placeholder="Enter prospect’s address" @blur="changeInput" />
          </el-form-item>

          <el-form-item label="ZIP" prop="zip" class="w-2/12">
            <el-input v-model="ruleForm.zip" v-maska="'#####'" placeholder="#####" @blur="changeInput" />
          </el-form-item>
        </div>
      </div>
      <!-- GENERAL -->

      <!-- Spouse -->
      <div v-if="ruleForm.married" class="px-8 border-b py-5">
        <span class="text-main text-xl font-semibold">Spouse/Partner</span>
        <div class="my-5">
          <el-form-item label="Retired?">
            <el-radio-group v-model="ruleForm.spouse.retired">
              <el-radio :label="true">Yes</el-radio>
              <el-radio :label="false">No</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="flex">
          <el-form-item label="First name" prop="spouse.first_name" class="w-5/12 pr-4">
            <el-input
              v-model="ruleForm.spouse.first_name"
              placeholder="Enter spouse’s first name"
              @blur="changeInput"
            />
          </el-form-item>
          <el-form-item label="Last name" prop="spouse.last_name" class="w-5/12 pr-4">
            <el-input v-model="ruleForm.spouse.last_name" placeholder="Enter spouse’s last name" @blur="changeInput" />
          </el-form-item>
          <el-form-item prop="spouse.birthday" label="Date of birth" class="w-2/12">
            <el-date-picker
              v-model="ruleForm.spouse.birthday"
              type="date"
              :placeholder="getPlaceholder"
              format="MM/DD/YYYY"
              value-format="MM/DD/YYYY"
              @change="changeInput"
            />
          </el-form-item>
        </div>
        <div class="flex my-5">
          <el-form-item label="E-mail" prop="spouse.email" class="w-5/12 pr-4">
            <el-input v-model.email="ruleForm.spouse.email" placeholder="Enter spouse’s e-mail" @blur="changeInput" />
          </el-form-item>

          <el-form-item label="Phone" prop="spouse.phone" class="w-5/12 pr-4">
            <el-input
              v-model="ruleForm.spouse.phone"
              v-maska="'(###)###-####'"
              placeholder="Enter phone number"
              inputmode="numeric"
              @blur="changeInput"
            />
          </el-form-item>
          <el-form-item
            v-if="ruleForm.spouse.retired"
            prop="spouse.retirement_date"
            label="Retirement date"
            class="w-2/12"
          >
            <el-date-picker
              v-model="ruleForm.spouse.retirement_date"
              type="date"
              :placeholder="getPlaceholder"
              format="MM/DD/YYYY"
              value-format="MM/DD/YYYY"
              @change="changeInput"
            />
          </el-form-item>
        </div>
      </div>
      <!-- Spouse -->

      <!-- Housing Information -->
      <div class="px-8 py-5 border-b">
        <span class="text-main text-xl font-semibold">Housing Information</span>
        <div class="flex pt-5">
          <el-form-item label="Type" class="w-5/12">
            <el-radio-group v-model="ruleForm.house.type" @change="changeInput">
              <el-radio label="own">Own</el-radio>
              <el-radio label="rent">Rent</el-radio>
              <el-radio label="family">Live with family</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="ruleForm.house.type !== 'rent'"
            label="Market value"
            prop="house.market_value"
            class="w-5/12 pr-4"
          >
            <SwdCurrencyInput
              v-model="ruleForm.house.market_value"
              :options="optionsCurrencyInput"
              placeholder="$12345"
              @blur="changeInput"
            />
          </el-form-item>
        </div>
        <div class="flex mt-5">
          <el-form-item label="Monthly payments" prop="house.monthly_payments" class="w-5/12 pr-4">
            <SwdCurrencyInput
              v-model="ruleForm.house.monthly_payments"
              :options="optionsCurrencyInput"
              placeholder="$12345"
              @blur="changeInput"
            />
          </el-form-item>
          <el-form-item
            v-if="ruleForm.house.type !== 'rent'"
            label="Remaining mortgage amount"
            prop="house.remaining_mortgage_amount"
            class="w-5/12 pr-4"
          >
            <SwdCurrencyInput
              v-model="ruleForm.house.remaining_mortgage_amount"
              :options="optionsCurrencyInput"
              placeholder="$12345"
              @blur="changeInput"
            />
          </el-form-item>
          <el-form-item
            v-if="ruleForm.house.type === 'rent'"
            label="Total monthly expences"
            prop="house.total_monthly_expenses"
            class="w-5/12 pr-4"
            @blur="changeInput"
          >
            <SwdCurrencyInput
              v-model="ruleForm.house.total_monthly_expenses"
              :options="optionsCurrencyInput"
              placeholder="$12345"
              @blur="changeInput"
            />
          </el-form-item>
        </div>
      </div>
      <!-- Housing Information -->

      <div class="px-8 mt-7 border-b">
        <span class="text-main text-xl font-semibold">Employment history</span>
        <div class="pt-5 pb-2">
          <span class="text-main text-xs uppercase font-semibold">Contact opportunity</span>
        </div>

        <el-form-item v-for="(eh, index) in ruleForm.employment_history" :key="index" class="mb-2">
          <el-form-item :prop="'employment_history.' + index + '.company_name'" label="Company name" class="w-4/12">
            <el-input
              v-model="eh.company_name"
              placeholder="Enter company name"
              @change="changeCompanyNameMember({ ruleForm, index })"
              @blur="changeInput"
            />
          </el-form-item>

          <template v-if="!!ruleForm.employment_history[index].company_name.trim().length">
            <el-form-item :prop="'employment_history.' + index + '.occupation'" label="Occupation" class="w-4/12 px-2">
              <el-input v-model="eh.occupation" placeholder="Company occupation" @blur="changeInput" />
            </el-form-item>
            <el-form-item
              v-if="ruleForm.employment_history[index].company_name.length"
              :prop="'employment_history.' + index + '.years'"
              label="Years"
              class="w-2/12"
            >
              <el-input v-model="eh.years" placeholder="00" inputmode="numeric" type="number" @blur="changeInput" />
            </el-form-item>
          </template>

          <template v-else>
            <el-form-item label="Occupation" class="w-4/12 px-2">
              <el-input
                placeholder="Company occupation"
                :disabled="!ruleForm.employment_history[index].company_name.trim().length"
              />
            </el-form-item>
            <el-form-item label="Years" class="w-2/12">
              <el-input
                placeholder="00"
                inputmode="numeric"
                :disabled="!ruleForm.employment_history[index].company_name.trim().length"
              />
            </el-form-item>
          </template>

          <div class="w-2/12 mt-[20px] text-right">
            <el-button
              v-if="
                ruleForm.employment_history[index].company_name.trim().length &&
                ruleForm.employment_history[index].occupation.trim().length &&
                ruleForm.employment_history[index].years
              "
              type="danger"
              :disabled="isLoadingDeleteEmploynent"
              :loading="isLoadingDeleteEmploynent"
              plain
              @click="handleRemoveEmployment(index)"
            >
              Remove job
            </el-button>
          </div>
        </el-form-item>

        <div v-if="isShowAddJobOwnerBtn" class="flex justify-end mb-5 mt-2">
          <SwdButton primary main @click="addEmployment(ruleForm)">Add job</SwdButton>
        </div>

        <div v-if="ruleForm.married" class="my-8">
          <div class="pb-2">
            <span class="text-main text-xs uppercase font-semibold">Spouse/Partner</span>
          </div>

          <el-form-item v-for="(eh, index) in ruleForm.spouse.employment_history" :key="index" class="mb-2">
            <el-form-item
              :prop="'spouse.employment_history.' + index + '.company_name'"
              label="Company name"
              class="w-4/12"
            >
              <el-input
                v-model="eh.company_name"
                placeholder="Enter company name"
                @change="changeCompanyNameSpouse({ ruleForm, index })"
                @blur="changeInput"
              />
            </el-form-item>

            <template v-if="ruleForm.spouse.employment_history[index].company_name.trim().length">
              <el-form-item
                :prop="'spouse.employment_history.' + index + '.occupation'"
                label="Occupation"
                class="w-4/12 px-2"
              >
                <el-input v-model="eh.occupation" placeholder="Company occupation" @blur="changeInput" />
              </el-form-item>
              <el-form-item :prop="'spouse.employment_history.' + index + '.years'" label="Years" class="w-2/12">
                <el-input v-model="eh.years" placeholder="00" inputmode="numeric" type="number" @blur="changeInput" />
              </el-form-item>
            </template>

            <template v-else>
              <el-form-item label="Occupation" class="w-4/12 px-2">
                <el-input
                  placeholder="Company occupation"
                  :disabled="!ruleForm.spouse.employment_history[index].company_name.trim().length"
                />
              </el-form-item>
              <el-form-item label="Years" class="w-2/12">
                <el-input
                  placeholder="00"
                  inputmode="numeric"
                  :disabled="!ruleForm.spouse.employment_history[index].company_name.trim().length"
                />
              </el-form-item>
            </template>
            <div class="w-2/12 mt-[20px] text-right">
              <el-button
                v-if="
                  ruleForm.spouse.employment_history[index].company_name.trim().length &&
                  ruleForm.spouse.employment_history[index].occupation.trim().length &&
                  ruleForm.spouse.employment_history[index].years
                "
                type="danger"
                plain
                :disabled="isLoadingDeleteEmploynent"
                :loading="isLoadingDeleteEmploynent"
                @click="handleRemoveEmploymentSpouse(index)"
              >
                Remove job
              </el-button>
            </div>
          </el-form-item>
          <div v-if="isShowAddJobSpouseBtn" class="flex justify-end mt-2">
            <SwdButton primary main @click="addEmploymentSpouse(ruleForm)">Add job</SwdButton>
          </div>
        </div>
      </div>

      <div class="px-8 my-5">
        <span class="text-main text-xl font-semibold">Other</span>
        <el-form-item label="Risk tolerance?" class="my-5">
          <el-radio-group v-model="ruleForm.other.risk" @change="changeInput">
            <el-radio label="conservative">Conservative</el-radio>
            <el-radio label="moderately_conservative"> Moderately Conservative </el-radio>
            <el-radio label="moderate">Moderate</el-radio>
            <el-radio label="moderately_aggressive"> Moderately Aggressive </el-radio>
            <el-radio label="aggressive">Aggressive</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="Does the opportunity have any specific questions to discuss?"
          prop="questions"
          class="mb-4"
        >
          <el-input v-model="ruleForm.other.questions" type="textarea" @blur="changeInput" />
        </el-form-item>
        <el-form-item label="Goal for retiretment" prop="retirement" class="mb-4">
          <el-input v-model="ruleForm.other.retirement" type="textarea" @blur="changeInput" />
        </el-form-item>
        <el-form-item label="Goal for retiretment money" prop="retirement_money" class="mb-4">
          <el-input v-model="ruleForm.other.retirement_money" type="textarea" @blur="changeInput" />
        </el-form-item>

        <el-form-item label="Does the opportunity currently work with the advisor?">
          <el-radio-group v-model="ruleForm.other.work_with_advisor" @change="changeInput">
            <el-radio :label="true">Yes</el-radio>
            <el-radio :label="false">No</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>

      <div class="flex justify-end my-10">
        <SwdButton primary main :disabled="isLoadingCreateMember || isLoadingUpdateMember" @click="submitForm()">
          <SwdSpinner v-show="isLoadingCreateMember || isLoadingUpdateMember" class="mr-2" />
          Go to the assets &amp; income
        </SwdButton>
      </div>
    </el-form>
  </div>
  <el-skeleton v-else :rows="10" animated />
  <ModalRestoreDraft @restoreDraft="restoreDraft" @deleteDraft="deleteDraft" />
</template>

<script>
import { reactive, ref, onMounted, computed, watch } from 'vue'
import { useMutation } from 'vue-query'
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import { useStore } from 'vuex'
import { createMembers } from '@/api/vueQuery/create-members'
import { updateMembers } from '@/api/vueQuery/update-members'
import { useFetchMember } from '@/api/use-fetch-member.js'
import { deleteEmploymentHistory } from '@/api/vueQuery/delete-employment-history'
import { rules } from '@/validationRules/basicRules.js'
import { maska } from 'maska'
import { initialBasicInformation } from '@/components/NewProspect/initialState/basicInformation'
import { useBasicInfoHooks } from '@/hooks/use-basic-info-hooks'
import { scrollTop } from '@/utils/scrollTop'
import { useAlert } from '@/utils/use-alert'
import { useStateHook } from '@/hooks/use-state-hook'
import { ElMessageBox, ElNotification } from 'element-plus'
import { isEqual } from 'lodash-es'
import { useWindowScrollTo } from '@/hooks/use-window-scroll'
import ModalRestoreDraft from './Draft/ModalRestoreDraft.vue'

export default {
  name: 'AddProspectBasicInfo',
  directives: { maska },
  components: {
    ModalRestoreDraft,
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const form = ref(null)
    const route = useRoute()
    const step = computed(() => store.state.newProspect.step)
    const isUpdateMember = computed(() => !!route.params.id)

    const { stateList } = useStateHook()
    const { scrollTo } = useWindowScrollTo()

    const { mutateAsync: createMember, isLoading: isLoadingCreateMember } = useMutation(createMembers)
    const { isLoading: isLoadingUpdateMember, mutateAsync: updateMember } = useMutation(updateMembers)
    const { isLoading: isLoadingDeleteEmploynent, mutateAsync: deleteEmployment } = useMutation(deleteEmploymentHistory)

    const {
      isFetching: isFetchingMember,
      data: member,
      refetch: refetchMember,
    } = useFetchMember({ id: route.params.id }, { enabled: false })

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
    } = useBasicInfoHooks()

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
        last_name: '',
        first_name: '',
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
        remaining_mortgage_amount: null,
        monthly_payments: null,
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
      store.commit('newProspect/setStep', 1)
      scrollTop()
      if (route.params.id) {
        memberId = route.params.id
        refetchMember.value()
      }
      if (store.state.draft.prospectBasicDraft !== null && !route.params.id) {
        store.commit('globalComponents/setShowModal', {
          destination: 'restoreDraft',
          value: true,
        })
      }
    })

    onBeforeRouteLeave((to, from, next) => {
      if (!isUpdateMember.value && !isEqual(ruleForm, initialBasicInformation) && to.name !== 'assets-information') {
        ElMessageBox.confirm('You have unsaved changes. Do you want to save it as a draft?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        })
          .then(() => {
            store.commit('draft/setProspectBasicDraft', ruleForm)
            next()
          })
          .catch(() => {
            next()
          })
      } else {
        next()
      }
    })

    const resetState = () => {
      Object.assign(ruleForm, initialBasicInformation)
    }

    watch(
      isFetchingMember,
      (newValue, oldValue) => {
        if (newValue === false && oldValue === true) {
          setInitValue(ruleForm, member.value)
          setInitRules(ruleForm)
        }
      },
      { immediate: true }
    )

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
              message: isUpdateMember.value ? 'Opportunity update successfully.' : 'Opportunity created successfully.',
            })
            store.commit('newProspect/setStep', step.value + 1)
            router.push({
              name: 'assets-information',
              params: { id: res.data.id },
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

    const restoreDraft = () => {
      Object.assign(ruleForm, JSON.parse(JSON.stringify(store.state.draft.prospectBasicDraft)))
    }

    const deleteDraft = () => {
      store.commit('draft/setProspectBasicDraft', null)
    }

    const changeInput = async () => {
      if (isUpdateMember.value) {
        form.value.validate(async (valid) => {
          if (valid) {
            const res = await updateMember({ form: ruleForm, id: memberId })
            if (!('error' in res)) {
              showSuccessMessage()
            }
          }
        })
      }
    }

    const isDisabledForm = computed(() => {
      return isLoadingUpdateMember.value
    })

    const handleRemoveEmployment = async (index) => {
      if (ruleForm.employment_history[index].id) {
        const res = await deleteEmployment(ruleForm.employment_history[index].id)
        if (!('error' in res)) {
          removeMemberEmployment(index)
          showSuccessMessage()
        }
      } else {
        removeMemberEmployment(index)
      }
    }

    const removeMemberEmployment = (index) => {
      ruleForm.employment_history.splice(index, 1)
      if (!ruleForm.employment_history.length) {
        ruleForm.employment_history.push({
          company_name: '',
          occupation: '',
          years: '',
        })
      }
    }

    const handleRemoveEmploymentSpouse = async (index) => {
      if (ruleForm.spouse.employment_history[index].id) {
        const res = await deleteEmployment(ruleForm.spouse.employment_history[index].id)
        if (!('error' in res)) {
          removeSpouseEmployment(index)
          showSuccessMessage()
        }
      } else {
        removeSpouseEmployment(index)
      }
    }

    const removeSpouseEmployment = (index) => {
      ruleForm.spouse.employment_history.splice(index, 1)
      if (!ruleForm.spouse.employment_history.length) {
        ruleForm.spouse.employment_history.push({
          company_name: '',
          occupation: '',
          years: '',
        })
      }
    }

    const showSuccessMessage = () => {
      useAlert({
        title: 'Success',
        type: 'success',
        message: 'Update successfully.',
      })
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

    return {
      ruleForm,
      rules,
      form,
      submitForm,
      addEmployment,
      addEmploymentSpouse,
      isLoadingCreateMember,
      isLoadingUpdateMember,
      getPlaceholder,
      changeMarried,
      changeCompanyNameMember,
      changeCompanyNameSpouse,
      optionsCurrencyInput,
      isFetchingMember,
      member,
      stateList,
      restoreDraft,
      deleteDraft,
      changeInput,
      isDisabledForm,
      handleRemoveEmployment,
      handleRemoveEmploymentSpouse,
      isShowAddJobOwnerBtn,
      isShowAddJobSpouseBtn,
      isLoadingDeleteEmploynent,
    }
  },
}
</script>
