<template>
  <div class="border border-color-grey box-border rounded-l-md py-5 px-3">
    <router-link
      :to="{ name: 'asset-allocation-details', params: { id: memberId } }"
      class="text-main text-smm font-semibold cursor-pointer"
    >
      <span class="text-main text-smm font-semibold">Asset Allocation</span>
    </router-link>
    <div v-if="!isLoading" class="flex pt-8">
      <AssetsChart :values="ruleForm" />
      <div class="flex ml-4">
        <div class="flex flex-col justify-center mr-3">
          <div class="bg-dark-blue-charts w-2 h-2 rounded-full" />
          <div class="bg-activity w-2 h-2 rounded-full my-9" />
          <div class="bg-color-error w-2 h-2 rounded-full" />
        </div>
        <div class="flex flex-col justify-center text-main text-xs mr-3">
          <div>Liquidity</div>
          <div class="my-7">Growth</div>
          <div>Income</div>
        </div>
        <div class="flex flex-col justify-center text-main text-xs font-medium">
          <el-form ref="form" :model="ruleForm" status-icon size="small">
            <el-form-item>
              <SwdCurrencyInput
                v-model="ruleForm.liquidity"
                :options="optionsCurrencyInput"
                prepend
                :disabled="isLoadingCreate"
                placeholder="$12345"
                size="small"
                @change="change()"
              />
            </el-form-item>
            <el-form-item class="mt-4">
              <SwdCurrencyInput
                v-model="ruleForm.growth"
                :options="optionsCurrencyInput"
                prepend
                :disabled="isLoadingCreate"
                placeholder="$12345"
                size="small"
                @change="change()"
              />
            </el-form-item>
            <el-form-item class="mt-4">
              <SwdCurrencyInput
                v-model="ruleForm.income"
                :options="optionsCurrencyInput"
                prepend
                :disabled="isLoadingCreate"
                placeholder="$12345"
                size="small"
                @change="change()"
              />
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <el-skeleton v-else :rows="4" animated />
  </div>
</template>

<script>
import AssetsChart from '@/components/MemberDetails/Chart/AssetsChart.vue'
import IconAction from '@/assets/svg/icon-action.svg'
import { currencyFormat } from '@/utils/currencyFormat'
import { useRoute } from 'vue-router'
import { reactive, ref, watchEffect } from 'vue'
import { useFetchMemberDetailsAssets } from '@/api/use-fetch-member-details-assets.js'
import { createMemberDetailsAssets } from '@/api/vueQuery/create-member-details-assets'
import { useQueryClient } from 'vue-query'
import { useMutation } from 'vue-query'

export default {
  name: 'AssetsAllocation',
  components: {
    AssetsChart,
  },
  setup() {
    const form = ref(null)
    const route = useRoute()
    const memberId = route.params.id
    const queryClient = useQueryClient()

    const optionsCurrencyInput = {
      currency: 'USD',
      locale: 'en-US',
      currencyDisplay: 'hidden',
      precision: 2,
    }

    const { isLoading, isFetching, isError, data: assetsData } = useFetchMemberDetailsAssets(memberId)

    const {
      mutateAsync: create,
      isLoading: isLoadingCreate,
      isError: isErrorCreate,
      isFetching: isFetchingCreate,
      data: dataCreate,
    } = useMutation(createMemberDetailsAssets)

    const ruleForm = reactive({
      growth: '',
      income: '',
      liquidity: '',
      total: 0,
    })

    const change = async () => {
      const res = await create({ id: memberId, ruleForm })
      if (!('error' in res)) {
        queryClient.invalidateQueries(['member/assetAllocation'])
        Object.assign(ruleForm, res.data)
      }
    }

    watchEffect(() => {
      if (isLoading.value === false) {
        Object.assign(ruleForm, assetsData.value)
      }
    })

    return {
      currencyFormat,
      IconAction,
      memberId,
      ruleForm,
      form,
      change,
      assetsData,
      isError,
      isLoading,
      isFetching,
      create,
      isLoadingCreate,
      isErrorCreate,
      isFetchingCreate,
      dataCreate,
      optionsCurrencyInput,
    }
  },
}
</script>
