<template>
  <el-select v-model="company" placeholder="Select" size="small" @change="changeCompany">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script>
import { useFetchCompanies } from '@/api/use-fetch-companies'
import { watchEffect, ref, computed } from 'vue'
import { useStore } from 'vuex'

import { useMutation } from 'vue-query'
import { changeUser } from '@/api/vueQuery/change-user'
import { useAlert } from '@/utils/use-alert'

export default {
  name: 'ChangeCompany',
  props: {
    defaultCompany: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  setup(props) {
    const store = useStore()
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
        company.value = props.defaultCompany.name
      }
    })

    const userId = computed(() => {
      return store.state.globalComponents.userId
    })

    const changeCompany = async () => {
      const data = {
        company_id: company.value,
      }
      changeCompamy({ form: data, id: userId.value }).then(() => {
        store.commit('globalComponents/setCurrentCompanyId', data.company_id)

        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Change default company successfully.',
        })
      })
    }

    return {
      options,
      company,
      isLoading,
      isError,
      data,
      changeCompany,

      changeCompamy,
      isLoadingChangeUser,
      isErrorChangeUser,
      isFetchingChangeUser,
    }
  },
}
</script>
