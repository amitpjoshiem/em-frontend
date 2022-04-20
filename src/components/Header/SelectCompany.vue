<template>
  <div>
    <el-select v-model="company" placeholder="Select" size="small" @change="changeCompany">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'SelectCompany',
  setup() {
    const company = ref('company_a')

    const options = [
      {
        value: 'Company A',
        label: 'company_a',
      },
      {
        value: 'Company B',
        label: 'company_b',
      },
      {
        value: 'Company C',
        label: 'company_c',
      },
    ]

    const changeCompany = () => {
      console.log('changeCompany', company.value)
    }

    return {
      company,
      options,
      changeCompany,
    }
  },
}
</script>
