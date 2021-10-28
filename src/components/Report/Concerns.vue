<template>
  <div class="border border-color-grey rounded-lg mr-5 mt-5 p-5">
    <span class="text-main text-smm font-semibold">Concerns</span>
    <div class="flex">
      <div class="flex flex-col">
        <el-checkbox v-model="state.high_fees" label="High Fees" />
        <el-checkbox v-model="state.extremely_high_market_exposure" label="Extremely high market exposure" />
        <el-checkbox
          v-model="state.design_implement_monitoring_income_strategy"
          label="Design, implement and monitoring income strategy"
        />
      </div>
      <div class="flex flex-col ml-2">
        <el-checkbox v-model="state.keep_the_money_safe" label="Keep the money safe" />
        <el-checkbox v-model="state.massive_overlap" label="Massive Overlap" />
        <el-checkbox v-model="state.simple" label="Simple" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, watch } from 'vue'
import { useAlert } from '@/utils/use-alert'
import { useRoute } from 'vue-router'
import { useFetchConcernsBlueReport } from '@/api/use-fetch-concerns-blue-report.js'
import { createConcernsBlueReport } from '@/api/vueQuery/create-concerns-blue-report'
import { useMutation } from 'vue-query'

export default {
  name: 'Concerns',
  setup() {
    const route = useRoute()
    const id = route.params.id
    const { isLoading, isError, data } = useFetchConcernsBlueReport(id)
    const {
      mutateAsync: create,
      isLoading: isLoadingCreate,
      isError: isErrorCreate,
      isFetching: isFetchingCreate,
      data: dataCreate,
    } = useMutation(createConcernsBlueReport)

    const state = reactive({ ...data.value })

    watch(
      () => state,
      async () => {
        await create({ id, data: state })
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Update successfully',
        })
      },
      { deep: true }
    )

    return {
      state,
      isLoading,
      isError,
      data,
      create,
      isLoadingCreate,
      isErrorCreate,
      isFetchingCreate,
      dataCreate,
    }
  },
}
</script>
