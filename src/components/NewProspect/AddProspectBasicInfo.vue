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
            prop="spouseFirstName"
            class="w-5/12"
          >
            <el-input
              v-model="ruleForm.spouse.firstName"
              placeholder="Enter spouse’s first name"
            />
          </el-form-item>

          <el-form-item
            label="Last name"
            prop="spouseLastName"
            class="w-5/12 px-5"
          >
            <el-input
              v-model="ruleForm.spouse.lastName"
              placeholder="Enter spouse’s last name"
            />
          </el-form-item>
          <el-form-item
            prop="spouseBirthdate"
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
          <el-form-item label="E-mail" prop="spouseEmail" class="w-5/12">
            <el-input
              v-model.email="ruleForm.spouse.email"
              placeholder="Enter spouse’s e-mail"
            />
          </el-form-item>

          <el-form-item label="Phone" prop="spousePhone" class="w-5/12 px-5">
            <el-input
              v-model="ruleForm.spouse.phone"
              placeholder="Enter spouse’s phone number"
            />
          </el-form-item>
          <el-form-item
            v-if="ruleForm.spouse.retired"
            prop="spouseRetiretment"
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
            prop="marketValue"
            class="w-5/12 pr-5"
          >
            <el-input
              v-model="ruleForm.house.market_value"
              type="number"
              placeholder="$123000"
            />
          </el-form-item>
        </div>
        <div class="flex mt-5">
          <el-form-item
            v-if="ruleForm.house.type !== 'rent'"
            label="Total debt"
            prop="totalDebt"
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
            prop="remaining"
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
            prop="monthlyPayment"
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
            prop="totalMonthly"
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

      <div class="px-16 mt-7">
        <span class="text-main text-xl font-semibold">Employment history</span>
      </div>

      <!-- <el-form-item
        v-for="(domain, index) in ruleForm.domains"
        :key="domain.key"
        :label="'Domain' + index"
        :prop="'domains.' + index + '.value'"
      >
        <el-input v-model="domain.value" />
        <el-button @click.prevent="removeDomain(domain)">Delete</el-button>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">
          Submit
        </el-button>
        <!-- <el-button @click="addDomain">New domain</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref } from 'vue-demi'
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
      },
      house: {
        type: 'own',
        market_value: '',
        total_debt: '',
        remaining_mortgage_amount: '',
        monthly_payment: '',
        total_monthly_expenses: '',
      },
      // domains: [
      //   {
      //     key: 1,
      //     value: '',
      //   },
      // ],
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

    // const removeDomain = (item) => {
    //   var index = ruleForm.domains.indexOf(item)
    //   if (index !== -1) {
    //     ruleForm.domains.splice(index, 1)
    //   }
    // }

    // const domainRule = [
    //   { required: true, message: 'domain can not be null', trigger: 'blur' },
    // ]
    // const addDomain = () => {
    //   const length = ruleForm.domains.length
    //   ruleForm.domains.push({
    //     key: Date.now(),
    //     value: '',
    //   })
    //   rules['domains.' + length + '.value'] = domainRule
    // }

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
      spouseFirstName: [
        {
          required: true,
          message: 'Please input spouse first name',
          trigger: 'blur',
        },
        { min: 2, message: 'Length should be min 2', trigger: 'blur' },
      ],
      spouseLastName: [
        {
          required: true,
          message: 'Please input spouse last name',
          trigger: 'blur',
        },
        { min: 2, message: 'Length should be 2', trigger: 'blur' },
      ],
      spouseBirthdate: [
        {
          type: 'date',
          required: true,
          message: 'Please pick a date',
          trigger: 'change',
        },
      ],
      spouseEmail: [
        { type: 'string', required: true, message: 'Please spouse email' },
      ],
      spousePhone: [
        { type: 'string', required: true, message: 'Please spouse phone' },
      ],
      marketValue: [
        {
          type: 'number',
          required: true,
          message: 'Please input market value',
          trigger: 'blur',
        },
      ],
      totalDebt: [
        {
          type: 'number',
          required: true,
          message: 'Please input total debt',
          trigger: 'blur',
        },
      ],
      remaining: [
        {
          type: 'number',
          required: true,
          message: 'Please input remaining mortgage amount',
          trigger: 'blur',
        },
      ],
      monthlyPayment: [
        {
          type: 'number',
          required: true,
          message: 'Please input remaining monthly payment',
          trigger: 'blur',
        },
      ],
      totalMonthly: [
        {
          type: 'number',
          required: true,
          message: 'Please input total monthly expenses',
          trigger: 'blur',
        },
      ],
      // 'domains.0.value': domainRule,
    }

    return {
      ruleForm,
      rules,
      form,
      submitForm,
      // removeDomain,
      // addDomain,
    }
  },
}
</script>

<style>
.el-form-item__label {
  line-height: normal;
  padding-bottom: 8px;
  color: #424450;
  font-size: 13px;
  font-weight: 500;
}

.el-input__inner::placeholder {
  font-size: 13px;
  color: #aab5cf;
}

/* Chrome, Safari, Edge, Opera */
.el-input__inner::-webkit-outer-spin-button,
.el-input__inner::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
.el-input__inner[type='number'] {
  -moz-appearance: textfield;
}
</style>
