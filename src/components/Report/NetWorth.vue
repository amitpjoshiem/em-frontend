<template>
  <div class="border border-color-grey rounded-lg mr-5 mt-5 p-5">
    <span class="text-main text-smm font-semibold">Net Worth</span>
    <div v-if="isFetched" class="flex mt-5">
      <div class="w-8/12">
        <el-form ref="form" :model="ruleForm" status-icon size="mini">
          <div class="flex justify-center items-center">
            <div class="bg-dark-blue-charts w-2 h-2 rounded-full mr-1" />
            <div class="text-main text-xss w-4/12">Liquid</div>
            <el-form-item class="w-5/12">
              <el-input v-model="ruleForm.liquid.amount" placeholder="$12345" type="number" @change="change()">
                <template #prepend>$</template>
              </el-input>
            </el-form-item>
            <div class="text-main text-xss font-semibold w-2/12 pl-2">
              <SwdSpinner v-if="isFetching" />
              <span v-else>
                {{ percentFormat(ruleForm.liquid.percent / 100) }}
              </span>
            </div>
          </div>
          <div class="flex justify-center items-center my-2">
            <div class="bg-activity w-2 h-2 rounded-full mr-1" />
            <div class="text-main text-xss w-4/12">Market</div>
            <el-form-item class="w-5/12">
              <el-input v-model="ruleForm.market.amount" placeholder="$12345" type="number" @change="change()">
                <template #prepend>$</template>
              </el-input>
            </el-form-item>
            <div class="text-main text-xss font-semibold w-2/12 pl-2">
              <SwdSpinner v-if="isFetching" />
              <span v-else>
                {{ percentFormat(ruleForm.market.percent / 100) }}
              </span>
            </div>
          </div>
          <div class="flex justify-center items-center">
            <div class="bg-color-error w-2 h-2 rounded-full mr-1" />
            <div class="text-main text-xss w-4/12">Income safe</div>
            <el-form-item class="w-5/12">
              <el-input v-model="ruleForm.income_safe.amount" placeholder="$12345" type="number" @change="change()">
                <template #prepend>$</template>
              </el-input>
            </el-form-item>
            <div class="text-main text-xss font-semibold w-2/12 pl-2">
              <SwdSpinner v-if="isFetching" />
              <span v-else>
                {{ percentFormat(ruleForm.income_safe.percent / 100) }}
              </span>
            </div>
          </div>
        </el-form>
      </div>
      <div class="w-4/12 flex justify-center items-center -mt-11">
        <NetWorthChart :values="netWorth.data" />
      </div>
    </div>
    <el-skeleton v-else :rows="3" animated />
  </div>
</template>

<script>
import NetWorthChart from '@/components/NewProspect/Chart/NetWorthChart.vue'
import { reactive, ref, watchEffect } from 'vue'
import { useMutation } from 'vue-query'
import { useQueryClient } from 'vue-query'
import { useRoute } from 'vue-router'
import { percentFormat } from '@/utils/percentFormat'

import { useFetchNetWorth } from '@/api/use-fetch-net-worth.js'
import { createNetWorth } from '@/api/vueQuery/create-net-worth'

function setInitValue(ruleForm, data) {
  ruleForm.market.amount = data.market.amount !== null ? data.market.amount : ''
  ruleForm.liquid.amount = data.liquid.amount !== null ? data.liquid.amount : ''
  ruleForm.income_safe.amount = data.income_safe.amount !== null ? data.income_safe.amount : ''
  ruleForm.market.percent = data.market.percent !== null ? data.market.percent : ''
  ruleForm.liquid.percent = data.liquid.percent !== null ? data.liquid.percent : ''
  ruleForm.income_safe.percent = data.income_safe.percent !== null ? data.income_safe.percent : ''
  ruleForm.total = data.total
}

function setPercentageValue(ruleForm, data) {
  ruleForm.market.percent = data.market.percent !== null ? data.market.percent : ''
  ruleForm.liquid.percent = data.liquid.percent !== null ? data.liquid.percent : ''
  ruleForm.income_safe.percent = data.income_safe.percent !== null ? data.income_safe.percent : ''
}

export default {
  name: 'NetWorth',
  components: {
    NetWorthChart,
  },

  setup() {
    const form = ref(null)
    const queryClient = useQueryClient()
    const route = useRoute()

    const memberId = route.params.id

    const { isLoading, isFetching, isFetched, isError, data: netWorth } = useFetchNetWorth(memberId)

    const {
      mutateAsync: create,
      isLoading: isLoadingCreate,
      isError: isErrorCreate,
      isFetching: isFetchingCreate,
      data: dataCreate,
    } = useMutation(createNetWorth)

    const ruleForm = reactive({
      market: {
        percent: '',
        amount: '',
      },
      liquid: {
        percent: '',
        amount: '',
      },
      income_safe: {
        percent: '',
        amount: '',
      },
      total: 0,
    })

    watchEffect(() => {
      if (isLoading.value === false) {
        setInitValue(ruleForm, netWorth.value.data)
      }
    })

    const change = async () => {
      const data = {
        market: ruleForm.market.amount,
        liquid: ruleForm.liquid.amount,
        income_safe: ruleForm.income_safe.amount,
      }
      const res = await create({ id: memberId, data })
      if (!('error' in res)) {
        queryClient.invalidateQueries(['blueprint/netWorth'])
        setPercentageValue(ruleForm, netWorth.value.data)
      }
    }

    return {
      ruleForm,
      form,
      change,
      netWorth,
      isFetching,
      isLoading,
      isError,
      isFetched,

      create,
      isLoadingCreate,
      isErrorCreate,
      isFetchingCreate,
      dataCreate,
      percentFormat,
    }
  },
}
</script>
