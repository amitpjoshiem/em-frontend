<template>
  <div>
    <el-select v-model="company" placeholder="Select" size="small" @change="changeCompany">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useFetchCompanies } from '@/api/use-fetch-companies'

export default {
  name: 'SelectCompany',
  setup() {
    const store = useStore()

    const company = ref()
    const options = ref([])

    const { isLoading, isError, data } = useFetchCompanies()

    watchEffect(() => {
      if (!isLoading.value) {
        options.value = data.value.data.map((item) => {
          return {
            value: item.id,
            label: item.name,
          }
        })
        const currentCompany = data.value.data.find((item) => item.id === store.state.globalComponents.currentCompanyId)
        company.value = currentCompany.name
      }
    })

    const changeCompany = async () => {
      store.commit('globalComponents/setCurrentCompanyId', company.value)
    }

    return {
      company,
      options,
      changeCompany,

      isLoading,
      isError,
      data,
    }
  },
}
</script>
