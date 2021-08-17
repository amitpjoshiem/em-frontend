<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="form"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="Password" prop="pass">
      <el-input
        type="password"
        v-model="ruleForm.pass"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="Confirm" prop="checkPass">
      <el-input
        type="password"
        v-model="ruleForm.checkPass"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="Age" prop="age">
      <el-input v-model.number="ruleForm.age"></el-input>
    </el-form-item>
    <el-form-item
      v-for="(domain, index) in ruleForm.domains"
      :label="'Domain' + index"
      :key="domain.key"
      :prop="'domains.' + index + '.value'"
    >
      <el-input v-model="domain.value"></el-input
      ><el-button @click.prevent="removeDomain(domain)">Delete</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >Submit</el-button
      >
      <el-button @click="resetForm('ruleForm')">Reset</el-button>
      <el-button @click="addDomain">New domain</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, ref } from 'vue'
export default {
  name: 'TestProspect',
  setup() {
    const form = ref(null)
    const ruleForm = reactive({
      pass: '',
      checkPass: '',
      age: '',
      domains: [
        {
          key: 1,
          value: '',
        },
      ],
    })
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== ruleForm.pass) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }
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
      checkPass: [{ validator: validatePass2, trigger: 'blur' }],
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