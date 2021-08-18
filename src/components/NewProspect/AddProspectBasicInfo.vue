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
          <el-form-item label="First name" prop="firstName" class="w-5/12">
            <el-input
              v-model="ruleForm.firstName"
              placeholder="Enter prospect’s first name"
            />
          </el-form-item>

          <el-form-item label="Last name" prop="lastName" class="w-5/12 px-5">
            <el-input
              v-model="ruleForm.lastName"
              placeholder="Enter prospect’s last name"
            />
          </el-form-item>
          <el-form-item prop="birthdate" label="Date of birth" class="w-2/12">
            <el-date-picker
              v-model="ruleForm.birthdate"
              type="date"
              placeholder="Pick a date"
              style="width: 100%"
            />
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
              placeholder="Enter prospect’s phone number"
            />
          </el-form-item>
          <el-form-item
            v-if="ruleForm.retired"
            prop="retiretment"
            label="Retiretment date"
            class="w-2/12"
          >
            <el-date-picker
              v-model="ruleForm.retirement_date"
              type="date"
              placeholder="Pick a date"
            />
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
            <el-input v-model="ruleForm.zip" placeholder="000000" />
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
          <el-form-item
            label="First name"
            prop="spouse.firstName"
            class="w-5/12"
          >
            <el-input
              v-model="ruleForm.spouse.firstName"
              placeholder="Enter spouse’s first name"
            />
          </el-form-item>

          <el-form-item
            label="Last name"
            prop="spouse.lastName"
            class="w-5/12 px-5"
          >
            <el-input
              v-model="ruleForm.spouse.lastName"
              placeholder="Enter spouse’s last name"
            />
          </el-form-item>
          <el-form-item
            prop="spouse.birthdate"
            label="Date of birth"
            class="w-2/12"
          >
            <el-date-picker
              v-model="ruleForm.spouse.birthdate"
              type="date"
              placeholder="Pick a date"
              style="width: 100%"
            />
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
              placeholder="Enter spouse’s phone number"
            />
          </el-form-item>
          <el-form-item
            v-if="ruleForm.spouse.retired"
            prop="spouse.retiretment"
            label="Retiretment date"
            class="w-2/12"
          >
            <el-date-picker
              v-model="ruleForm.retirement_date"
              type="date"
              placeholder="Pick a date"
            />
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
            prop="house.totalDebt"
            class="w-5/12 pr-5"
          >
            <el-input
              v-model="ruleForm.house.total_debt"
              type="number"
              placeholder="$123000"
            />
          </el-form-item>
          <el-form-item
            v-if="ruleForm.house.type !== 'rent'"
            label="Remaining mortgage amount"
            prop="house.remaining"
            class="w-5/12 pr-5"
          >
            <el-input
              v-model="ruleForm.house.remaining_mortgage_amount"
              type="number"
              placeholder="$123000"
            />
          </el-form-item>
        </div>
        <div class="flex mb-5">
          <el-form-item
            v-if="ruleForm.house.type === 'rent'"
            label="Monthly payment"
            prop="house.monthlyPayment"
            class="w-5/12 pr-5"
          >
            <el-input
              v-model="ruleForm.house.monthly_payment"
              type="number"
              placeholder="$123000"
            />
          </el-form-item>
          <el-form-item
            v-if="ruleForm.house.type === 'rent'"
            label="Total monthly expences"
            prop="house.totalMonthly"
            class="w-5/12 pr-5"
          >
            <el-input
              v-model="ruleForm.house.total_monthly_expenses"
              type="number"
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
          v-for="(eh, index) in ruleForm.employmentHistory"
          :key="index"
        >
          <el-form-item
            :prop="'employmentHistory.' + index + '.company_name'"
            label="Company name"
            class="w-full"
          >
            <el-input v-model="eh.company_name" />
          </el-form-item>
          <el-form-item
            :prop="'employmentHistory.' + index + '.occupation'"
            label="Occupation"
            class="w-full px-5"
          >
            <el-input v-model="eh.occupation" />
          </el-form-item>
          <el-form-item
            :prop="'employmentHistory.' + index + '.years'"
            label="Years"
            class="w-full"
          >
            <el-input v-model="eh.years" />
          </el-form-item>
          <div>
            <div
              v-if="index === ruleForm.employmentHistory.length - 1"
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

        <div class="mt-5">
          <span class="text-gray03 text-xs">Spouse</span>
        </div>

        <el-form-item
          v-for="(eh, index) in ruleForm.spouse.employmentHistory"
          :key="index"
          class="mb-10"
        >
          <el-form-item
            :prop="'spouse.employmentHistory.' + index + '.company_name'"
            label="Company name"
            class="w-full"
          >
            <el-input v-model="eh.company_name" />
          </el-form-item>
          <el-form-item
            :prop="'spouse.employmentHistory.' + index + '.occupation'"
            label="Occupation"
            class="w-full px-5"
          >
            <el-input v-model="eh.occupation" />
          </el-form-item>
          <el-form-item
            :prop="'spouse.employmentHistory.' + index + '.years'"
            label="Years"
            class="w-full"
          >
            <el-input v-model="eh.years" />
          </el-form-item>
          <div>
            <div
              v-if="index === ruleForm.spouse.employmentHistory.length - 1"
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

      <el-form-item class="mt-20">
        <el-button type="primary" @click="submitForm('ruleForm')">
          Submit
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'

export default {
  name: 'AddProspectBasicInfo',
  setup() {
    const form = ref(null)
    const ruleForm = reactive({
      retired: false,
      married: true,
      firstName: '',
      lastName: '',
      birthdate: '',
      retirement_date: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      spouse: {
        first_name: '',
        last_name: '',
        email: '',
        birthday: '',
        retired: false,
        retirement_date: '',
        phone: '',
        employmentHistory: [
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
      employmentHistory: [
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

    const submitForm = () => {
      form.value.validate((valid) => {
        if (valid) {
          console.log('RILE FORM', ruleForm)

          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

    const removeEmployment = (index) => {
      ruleForm.employmentHistory.splice(index, 1)
    }

    const removeEmploymentSpouse = (index) => {
      ruleForm.spouse.employmentHistory.splice(index, 1)
    }

    const employmentHistoryRule = {
      company_name: {
        required: true,
        message: 'Company name can not be null',
        trigger: 'blur',
      },
      occupation: {
        required: true,
        message: 'Occupation can not be null',
        trigger: 'blur',
      },
      years: {
        required: true,
        message: 'Years can not be null',
        trigger: 'blur',
      },
    }

    const addEmployment = () => {
      const length = ruleForm.employmentHistory.length
      ruleForm.employmentHistory.push({
        company_name: '',
        occupation: '',
        years: '',
      })
      rules.employmentHistory[length] = {
        company_name: employmentHistoryRule.company_name,
        occupation: employmentHistoryRule.occupation,
        years: employmentHistoryRule.years,
      }
    }

    const addEmploymentSpouse = () => {
      const length = ruleForm.spouse.employmentHistory.length
      ruleForm.spouse.employmentHistory.push({
        company_name: '',
        occupation: '',
        years: '',
      })
      rules.spouse.employmentHistory[length] = {
        company_name: employmentHistoryRule.company_name,
        occupation: employmentHistoryRule.occupation,
        years: employmentHistoryRule.years,
      }
    }

    const validateNumber = (rule, value, callback) => {
      if (!value) {
        callback(new Error('The field cannot be empty'))
      }
      if (isNaN(value)) {
        callback(new Error('Data is not a number'))
      } else {
        callback()
      }
    }

    const rules = {
      firstName: [
        {
          required: true,
          message: 'Please input Activity name',
          trigger: 'blur',
        },
        { min: 2, message: 'Length should be min 2', trigger: 'blur' },
      ],
      lastName: [
        {
          required: true,
          message: 'Please input Activity name',
          trigger: 'blur',
        },
        { min: 2, message: 'Length should be 2', trigger: 'blur' },
      ],
      email: [{ type: 'string', required: true, message: 'Please email' }],
      phone: [{ type: 'string', required: true, message: 'Please phone' }],
      birthdate: [
        {
          type: 'date',
          required: true,
          message: 'Please pick a date',
          trigger: 'change',
        },
      ],
      retiretment: [
        {
          type: 'date',
          required: true,
          message: 'Please pick a date',
          trigger: 'change',
        },
      ],

      address: [
        {
          required: true,
          message: 'Please input address',
          trigger: 'blur',
        },
        { trigger: 'blur' },
      ],

      city: [
        {
          required: true,
          message: 'Please input city',
          trigger: 'blur',
        },
        { trigger: 'blur' },
      ],

      state: [
        {
          required: true,
          message: 'Please input state',
          trigger: 'blur',
        },
        { trigger: 'blur' },
      ],

      zip: [
        {
          required: true,
          message: 'Please ZIP',
          trigger: 'blur',
        },
        { trigger: 'blur' },
      ],
      spouse: {
        firstName: [
          {
            required: true,
            message: 'Please input spouse first name',
            trigger: 'blur',
          },
          { min: 2, message: 'Length should be min 2', trigger: 'blur' },
        ],
        lastName: [
          {
            required: true,
            message: 'Please input spouse last name',
            trigger: 'blur',
          },
          { min: 2, message: 'Length should be 2', trigger: 'blur' },
        ],
        birthdate: [
          {
            type: 'date',
            required: true,
            message: 'Please pick a date',
            trigger: 'change',
          },
        ],
        email: [
          { type: 'string', required: true, message: 'Please spouse email' },
        ],
        phone: [
          { type: 'string', required: true, message: 'Please spouse phone' },
        ],
        employmentHistory: [
          {
            company_name: [
              {
                type: 'string',
                required: true,
                message: 'Please spouse email',
              },
            ],
            occupation: [
              {
                type: 'string',
                required: true,
                message: 'Please spouse email',
              },
            ],
            years: [
              {
                type: 'string',
                required: true,
                message: 'Please spouse email',
              },
            ],
          },
        ],
      },
      house: {
        market_value: [
          {
            validator: validateNumber,
            trigger: 'blur',
            required: true,
          },
        ],
        totalDebt: [
          {
            validator: validateNumber,
            trigger: 'blur',
            required: true,
          },
        ],
        remaining: [
          {
            validator: validateNumber,
            trigger: 'blur',
            required: true,
          },
        ],
        monthlyPayment: [
          {
            validator: validateNumber,
            trigger: 'blur',
            required: true,
          },
        ],
        totalMonthly: [
          {
            validator: validateNumber,
            trigger: 'blur',
            required: true,
          },
        ],
      },

      employmentHistory: [
        {
          company_name: [
            {
              type: 'string',
              required: true,
              message: 'Please spouse email',
            },
          ],
          occupation: [
            {
              type: 'string',
              required: true,
              message: 'Please spouse email',
            },
          ],
          years: [
            {
              type: 'string',
              required: true,
              message: 'Please spouse email',
            },
          ],
        },
      ],
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
    }
  },
}
</script>
