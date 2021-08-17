<template>
  <div class="px-16">
    <el-form
      ref="form"
      :model="ruleForm"
      status-icon
      :rules="rules"
      class="demo-ruleForm"
      label-position="top"
    >
      <div class="pb-5">General</div>
      <el-form-item label="Resources">
        <el-radio-group v-model="ruleForm.retired">
          <el-radio :label="true">Yes</el-radio>
          <el-radio :label="false">No</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Age" prop="age">
        <el-input v-model.number="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item
        v-for="(domain, index) in ruleForm.domains"
        :key="domain.key"
        :label="'Domain' + index"
        :prop="'domains.' + index + '.value'"
      >
        <el-input v-model="domain.value" />
        <el-button @click.prevent="removeDomain(domain)">Delete</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">
          Submit
        </el-button>
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
        <el-button @click="addDomain">New domain</el-button>
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
      age: '',
      retired: false,
      domains: [
        {
          key: 1,
          value: '',
        },
      ],
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
    const resetForm = () => {
      form.value.resetFields()
    }
    const removeDomain = (item) => {
      var index = ruleForm.domains.indexOf(item)
      if (index !== -1) {
        ruleForm.domains.splice(index, 1)
      }
    }

    const domainRule = [
      { required: true, message: 'domain can not be null', trigger: 'blur' },
    ]
    const addDomain = () => {
      const length = ruleForm.domains.length
      ruleForm.domains.push({
        key: Date.now(),
        value: '',
      })
      rules['domains.' + length + '.value'] = domainRule
    }

    const rules = {
      pass: [
        {
          required: true,
          message: 'Please input password',
          trigger: 'blur',
        },
        {
          min: 2,
          max: 6,
          message: 'Length should be 3 to 5',
          trigger: 'blur',
        },
      ],
      age: [
        {
          type: 'number',
          required: true,
          message: 'Please input age',
          trigger: 'blur',
        },
        {
          type: 'number',
          min: 18,
          message: 'The age must not be less then 18',
          trigger: 'blur',
        },
      ],
      'domains.0.value': domainRule,
    }

    return {
      ruleForm,
      rules,
      form,
      submitForm,
      resetForm,
      removeDomain,
      addDomain,
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
</style>
