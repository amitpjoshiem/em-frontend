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

export default {
  name: 'SelectCompany',
  setup() {
    const store = useStore()

    const company = ref()
    let options = []

    watchEffect(() => {
      if (store.state.globalComponents.companies.length) {
        options = store.state.globalComponents.companies.map((item) => {
          return {
            value: item.id,
            label: item.name,
          }
        })
      }
      // if (store.state.globalComponents.currentCompany) {
      //   company.value = store.state.globalComponents.currentCompany.name
      // }
    })

    const changeCompany = async () => {
      const data = store.state.globalComponents.companies.find((item) => {
        return item.id === company.value
      })
      store.commit('globalComponents/setCurrentCompany', data)
    }

    return {
      company,
      options,
      changeCompany,
    }
  },
}
</script>
