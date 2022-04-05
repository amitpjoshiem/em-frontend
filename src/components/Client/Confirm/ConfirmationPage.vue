<template>
  <div class="p-2 sm:p-5 lg:max-w-5xl lg:my-0 lg:mx-auto">
    <SwdSubHeader title="Confirmation Information" class="mt-2" />
    <el-collapse v-model="activeNames" accordion @change="handleChange">
      <el-collapse-item title="Basic" name="basic">
        <ConfirmationInformation />
      </el-collapse-item>

      <el-collapse-item title="Assets &amp; Income" name="assets">
        <ConfirmationAssets v-if="activeNames === 'assets'" />
      </el-collapse-item>

      <el-collapse-item title="Expense" name="expense">
        <div v-if="isFetchingExpense && activeNames === 'expense'" class="flex justify-center items-center">
          <SwdSpinner large />
        </div>
        <ConfirmationExpense v-if="!isFetchingExpense && activeNames === 'expense'" :data="dataExpense" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { ref } from 'vue'

import ConfirmationInformation from './ConfirmationBasic.vue'
import ConfirmationExpense from './ConfirmationExpense.vue'
import ConfirmationAssets from './Assets/ConfirmationAssets.vue'

import { useFetchMonthlyExpense } from '@/api/use-fetch-monthly-expense.js'

import { useRoute } from 'vue-router'

export default {
  name: 'ConfirmationPage',
  components: {
    ConfirmationInformation,
    ConfirmationExpense,
    ConfirmationAssets,
  },
  setup() {
    const route = useRoute()

    const activeNames = ref(['basic'])

    const {
      isLoading: isLoadingExpense,
      isFetching: isFetchingExpense,
      data: dataExpense,
      refetch: refetchExpense,
    } = useFetchMonthlyExpense({ id: route.params.id }, { enabled: false })

    const handleChange = (val) => {
      if (val === 'expense') {
        refetchExpense.value()
      }
    }

    return {
      activeNames,
      handleChange,

      isLoadingExpense,
      isFetchingExpense,
      dataExpense,
    }
  },
}
</script>
