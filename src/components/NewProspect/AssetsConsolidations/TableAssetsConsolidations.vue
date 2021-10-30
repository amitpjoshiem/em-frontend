<template>
  <div class="border box-border color-light-gray rounded-lg">
    <div class="text-smm font-medium text-main py-5 pl-5">Prospect Asset Consolidations</div>
    <div class="flex h-12 bg-widget-bg">
      <div class="w-6/24 title">name</div>
      <div class="w-2/24 title">
        % of <br />
        Holdings
      </div>
      <div class="w-3/24 title">Amount</div>
      <div class="w-2/24 title">Management expence %</div>
      <div class="w-2/24 title">Turnover %</div>
      <div class="w-2/24 title">
        Trading <br />
        costs
      </div>
      <div class="w-2/24 title">Wrap Fee</div>
      <div class="w-2/24 title">
        Total cost <br />
        in %
      </div>
      <div class="w-3/24 title">
        Total cost <br />
        in $
      </div>
      <div class="w-1/24 title" />
    </div>

    <!-- Item table -->
    <div v-if="!isLoading">
      <div v-for="(item, index) in state" :key="index" class="flex h-10">
        <!-- name -->
        <div class="w-6/24 item">
          <el-input v-model="state[index].name" size="mini" @change="change(index)" />
        </div>
        <!-- HOLDINGS -->
        <div class="w-2/24 item">
          <span>{{ item.percent_of_holdings }}%</span>
        </div>
        <!-- AMOUNT -->
        <div class="w-3/24 item">
          <el-input v-model="state[index].amount" size="mini" type="number" @change="change(index)" />
        </div>
        <!-- MANAGEMENT EXPENCE -->
        <div class="w-2/24 item" :class="{ invalidate: errors['management_expense_' + index] }">
          <el-input
            v-model="state[index].management_expense"
            size="mini"
            type="number"
            @change="change(index, $event, 'management_expense', 'Management Expense')"
          />
        </div>
        <!-- TURNOVER -->
        <div class="w-2/24 item" :class="{ invalidate: errors['turnover_' + index] }">
          <el-input
            v-model="state[index].turnover"
            size="mini"
            type="number"
            @change="change(index, $event, 'turnover', 'Turnover')"
          />
        </div>
        <!-- TRADING COSTS -->
        <div class="w-2/24 item" :class="{ invalidate: errors['trading_cost_' + index] }">
          <el-input
            v-model="state[index].trading_cost"
            size="mini"
            type="number"
            @change="change(index, $event, 'trading_cost', 'Trading costs')"
          />
        </div>
        <!-- WRAP FEE -->
        <div class="w-2/24 item" :class="{ invalidate: errors['wrap_fee_' + index] }">
          <el-input
            v-model="state[index].wrap_fee"
            size="mini"
            type="number"
            @change="change(index, $event, 'wrap_fee', 'Wrap fee')"
          />
        </div>
        <!-- TOTAL COST IN % -->
        <div class="w-2/24 item">
          <span>{{ item.total_cost_percent }}%</span>
        </div>
        <!-- TOTAL COST IN $ -->
        <div class="w-3/24 item">
          <span>{{ currencyFormat(item.total_cost) }}</span>
        </div>
        <div class="w-1/24 item">
          <div class="w-[15px] h-[15px] cursor-pointer">
            <InlineSvg :src="IconDelete" @click="removeTableLine(item.id, index)" />
          </div>
        </div>
      </div>
    </div>

    <!-- TOTAL -->
    <div v-if="!isLoading" class="flex h-10">
      <div class="w-6/24 total">Totals</div>
      <div class="w-2/24 total">
        <span>{{ total.value.percent_of_holdings }}%</span>
      </div>
      <div class="w-3/24 total">
        <span>{{ currencyFormat(total.value.amount) }}</span>
      </div>
      <div class="w-2/24 total">
        <span>{{ total.value.management_expense }}%</span>
      </div>
      <div class="w-2/24 total">
        <span>{{ total.value.turnover }}%</span>
      </div>
      <div class="w-2/24 total">
        <span>{{ total.value.trading_cost }}%</span>
      </div>
      <div class="w-2/24 total">
        <span>{{ total.value.wrap_fee }}%</span>
      </div>
      <div class="w-2/24 total">
        <span>{{ total.value.total_cost_percent }}%</span>
      </div>
      <div class="w-3/24 total">
        <span>{{ currencyFormat(total.value.total_cost) }}</span>
      </div>
      <div class="w-1/24 total">
        <div class="w-[15px] h-[15px] cursor-pointer">
          <InlineSvg :src="IconAdd" @click="addTableLine" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, watchEffect } from 'vue'
import { useAsetsConsolidationsMember } from '@/api/use-assets-consolidations-member.js'
import { updateMemberAssetsConsolidation } from '@/api/vueQuery/update-member-assets-consolidation'
import { createMemberAssetsConsolidation } from '@/api/vueQuery/create-member-assets-consolidation'
import { deleteMemberAssetsConsolidation } from '@/api/vueQuery/delete-member-assets-consolidation'
import { useAlert } from '@/utils/use-alert'
import { currencyFormat } from '@/utils/currencyFormat'

import { useRoute } from 'vue-router'
import { useMutation, useQueryClient } from 'vue-query'

import IconAdd from '@/assets/svg/icon-add.svg'
import IconDelete from '@/assets/svg/icon-delete.svg'

export default {
  name: 'TableAssetsConsolidations',
  setup() {
    const route = useRoute()
    const queryClient = useQueryClient()
    const id = route.params.id

    const { isLoading, isFetching, isError, data: assetsData, total } = useAsetsConsolidationsMember(id)
    const { mutateAsync: updateAssetsConsolidation } = useMutation(updateMemberAssetsConsolidation)
    const { mutateAsync: createAssetsConsolidation } = useMutation(createMemberAssetsConsolidation)
    const { mutateAsync: deleteAssetsConsolidation } = useMutation(deleteMemberAssetsConsolidation)

    const state = reactive([])
    const errors = reactive({})

    watchEffect(() => {
      if (isLoading.value === false) {
        Object.assign(state, assetsData.value)
      }
    })

    const change = async (index, value = 0, field = '', title = '') => {
      const valueNum = Number(value)
      if (valueNum < 0 || valueNum > 100) {
        errors[field + '_' + index] = true
        useAlert({
          type: 'error',
          title: 'Error',
          message: `The ${title} must be between 0 and 100.`,
        })
        return
      }
      const res = await updateAssetsConsolidation({ form: state[index], id: state[index].id })
      if (!('error' in res)) {
        for (var key in errors) {
          delete errors[key]
        }
        queryClient.invalidateQueries(['AsetsConsolidationsMember', id])
      }
    }

    const addTableLine = async () => {
      const res = await createAssetsConsolidation(id)
      if (!('error' in res)) {
        queryClient.invalidateQueries(['AsetsConsolidationsMember', id])
      }
    }

    const removeTableLine = async (idAssetsConsolidation, index) => {
      const res = await deleteAssetsConsolidation(idAssetsConsolidation)
      if (!('error' in res)) {
        state.splice(index, 1)
      }
    }

    return {
      state,
      change,
      isLoading,
      isFetching,
      isError,
      assetsData,
      currencyFormat,
      total,
      errors,
      IconAdd,
      IconDelete,

      addTableLine,
      removeTableLine,
    }
  },
}
</script>

<style scoped>
.title {
  @apply border-r border-b border-title-gray text-small text-gray03 flex items-center justify-center uppercase text-center last:border-r-0;
}

.item {
  @apply border-r border-b border-title-gray text-xs text-text-light-gray flex items-center justify-center uppercase text-center last:border-r-0;
}

.total {
  @apply border-r border-title-gray bg-color-grey text-xs font-medium text-main flex items-center justify-center text-center last:border-r-0 last:bg-white;
}
</style>

<style>
.item .el-input .el-input__inner {
  border-style: none;
  text-align: center;
}

.invalidate .el-input .el-input__inner {
  color: red;
  font-weight: 600;
}

.item .hover-row .el-input .el-input__inner {
  border-style: solid;
}
</style>
