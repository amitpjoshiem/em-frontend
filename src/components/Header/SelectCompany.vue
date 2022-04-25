<template>
  <div>
    <el-select v-model="company" placeholder="Select" size="small" @change="changeCompany">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useFetchCompanies } from '@/api/use-fetch-companies'
import { useMutation, useQueryClient } from 'vue-query'
import { changeUser } from '@/api/vueQuery/change-user'

export default {
  name: 'SelectCompany',
  setup() {
    const store = useStore()
    const queryClient = useQueryClient()

    const company = ref()
    const options = ref([])

    const { isLoading, isError, data } = useFetchCompanies()
    const {
      mutateAsync: changeCompamy,
      isLoadingChangeUser,
      isError: isErrorChangeUser,
      isFetching: isFetchingChangeUser,
    } = useMutation(changeUser)

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

    const userId = computed(() => {
      return store.state.globalComponents.userId
    })

    const changeCompany = async () => {
      const data = {
        company_id: company.value,
      }
      changeCompamy({ form: data, id: userId.value })
        .then(() => {
          store.commit('globalComponents/setCurrentCompanyId', company.value)
          queryClient.refetchQueries()
          // queryClient.invalidateQueries()
        })
        .catch((error) => {
          console.error(error)
        })
    }

    return {
      company,
      options,
      changeCompany,

      isLoading,
      isError,
      data,
      changeCompamy,
      isLoadingChangeUser,
      isErrorChangeUser,
      isFetchingChangeUser,
    }
  },
}
</script>
