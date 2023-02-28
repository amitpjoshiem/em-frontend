<template>
  <div class="border border-color-grey rounded-lg mr-5 mt-5 py-8 px-5">
    <span class="text-main text-smm font-semibold">Concerns</span>
    <div v-if="!isFetching">
      <el-checkbox v-model="state.high_fees" label="High Fees" size="small" @change="change()" />
      <el-checkbox
        v-model="state.extremely_high_market_exposure"
        label="Extremely high market exposure"
        size="small"
        @change="change()"
      />
      <el-checkbox
        v-model="state.design_implement_monitoring_income_strategy"
        label="Design, implement and monitoring income strategy"
        size="small"
        @change="change()"
      />
      <el-checkbox v-model="state.keep_the_money_safe" label="Keep the money safe" size="small" @change="change()" />
      <el-checkbox v-model="state.massive_overlap" label="Massive Overlap" size="small" @change="change()" />
      <el-checkbox v-model="state.simple" label="Simple" size="small" @change="change()" />
    </div>
    <el-skeleton v-else :rows="3" animated />
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

    const { isLoading, isError, data, isFetching } = useFetchConcernsBlueReport(id)

    const {
      mutateAsync: create,
      isLoading: isLoadingCreate,
      isError: isErrorCreate,
      isFetching: isFetchingCreate,
      data: dataCreate,
    } = useMutation(createConcernsBlueReport)

    const state = reactive({})

    watch(
      isLoading,
      (newValue, oldValue) => {
        if (newValue !== oldValue && newValue === false) {
          Object.assign(state, data.value)
        }
      },
      { immediate: true }
    )

    const change = async () => {
      await create({ id, data: state })
      useAlert({
        title: 'Success',
        type: 'success',
        message: 'Update successfully.',
      })
    }

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
      isFetching,
      change,
    }
  },
}
</script>
