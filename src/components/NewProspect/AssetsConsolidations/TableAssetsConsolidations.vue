<template>
  <div class="border box-border color-light-gray rounded-lg">
    <div class="flex justify-between items-center p-5">
      <div class="text-smm font-medium text-main">Asset Consolidations</div>
      <div class="flex">
        <ExportExcel />
        <router-link :to="{ name: 'document-export', params: { id: memberId } }" class="pl-3">
          <el-button size="mini">More documents</el-button>
        </router-link>
      </div>
    </div>

    <div v-if="!isLoading">
      <HeaderTable />
      <div v-for="(item, index) in state" :key="index" class="flex h-10">
        <div class="w-6/24 item">
          <el-input v-model="state[index].name" size="mini" :disabled="isDisabledForm" @change="change(index)" />
        </div>
        <div class="w-2/24 item">{{ item.percent_of_holdings }}%</div>
        <div class="w-3/24 item">
          <el-input
            v-model="state[index].amount"
            size="mini"
            type="number"
            :disabled="isDisabledForm"
            @change="change(index)"
          />
        </div>
        <div class="w-2/24 item" :class="{ invalidate: errors['management_expense_' + index] }">
          <el-input
            v-model="state[index].management_expense"
            :disabled="isDisabledForm"
            size="mini"
            type="number"
            @change="change(index, $event, 'management_expense', 'Management Expense')"
          />
        </div>
        <div class="w-2/24 item" :class="{ invalidate: errors['turnover_' + index] }">
          <el-input
            v-model="state[index].turnover"
            :disabled="isDisabledForm"
            size="mini"
            type="number"
            @change="change(index, $event, 'turnover', 'Turnover')"
          />
        </div>
        <div class="w-2/24 item" :class="{ invalidate: errors['trading_cost_' + index] }">
          <el-input
            v-model="state[index].trading_cost"
            :disabled="isDisabledForm"
            size="mini"
            type="number"
            @change="change(index, $event, 'trading_cost', 'Trading costs')"
          />
        </div>
        <div class="w-2/24 item" :class="{ invalidate: errors['wrap_fee_' + index] }">
          <el-input
            v-model="state[index].wrap_fee"
            :disabled="isDisabledForm"
            size="mini"
            type="number"
            @change="change(index, $event, 'wrap_fee', 'Wrap fee')"
          />
        </div>
        <div class="w-2/24 item">
          <span>{{ item.total_cost_percent }}%</span>
        </div>
        <div class="w-3/24 item">
          {{ currencyFormat(item.total_cost) }}
        </div>
        <div class="w-1/24 item">
          <div class="w-[15px] h-[15px] cursor-pointer">
            <el-popconfirm
              confirm-button-text="Yes"
              cancel-button-text="No"
              icon="el-icon-info"
              icon-color="red"
              title="Are you sure to delete this?"
              @confirm="confirmEvent(item.id, index)"
            >
              <template #reference>
                <span>
                  <InlineSvg :src="IconDelete" />
                </span>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </div>
      <TotalTable :total="total" :is-fetching="isDisabledForm" @addTableLine="addTableLine" />
    </div>
    <el-skeleton v-else :rows="10" animated class="p-5" />
  </div>
</template>

<script>
import { reactive, watchEffect, ref, computed } from 'vue'
import { useAsetsConsolidationsMember } from '@/api/use-assets-consolidations-member.js'
import { updateMemberAssetsConsolidation } from '@/api/vueQuery/update-member-assets-consolidation'
import { createMemberAssetsConsolidation } from '@/api/vueQuery/create-member-assets-consolidation'
import { deleteMemberAssetsConsolidation } from '@/api/vueQuery/delete-member-assets-consolidation'
import { useAlert } from '@/utils/use-alert'
import { currencyFormat } from '@/utils/currencyFormat'
import { useRoute } from 'vue-router'
import { useMutation, useQueryClient } from 'vue-query'
import IconDelete from '@/assets/svg/icon-delete.svg'
import HeaderTable from '@/components/NewProspect/AssetsConsolidations/HeaderTable.vue'
import TotalTable from '@/components/NewProspect/AssetsConsolidations/TotalTable.vue'
import ExportExcel from '@/components/NewProspect/AssetsConsolidations/ExportExcel.vue'

export default {
  name: 'TableAssetsConsolidations',
  components: {
    HeaderTable,
    TotalTable,
    ExportExcel,
  },
  setup() {
    const route = useRoute()
    const queryClient = useQueryClient()
    const memberId = route.params.id
    const isLoadingUpdate = ref(false)

    const { isLoading, isFetching, isError, data: assetsData, total } = useAsetsConsolidationsMember(memberId)
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

      isLoadingUpdate.value = true
      const res = await updateAssetsConsolidation({ form: state[index], id: state[index].id })
      if (!('error' in res)) {
        for (var key in errors) {
          delete errors[key]
        }
        queryClient.invalidateQueries(['AsetsConsolidationsMember', memberId])
      }
      isLoadingUpdate.value = false
    }

    const addTableLine = async () => {
      const res = await createAssetsConsolidation(memberId)
      if (!('error' in res)) {
        queryClient.invalidateQueries(['AsetsConsolidationsMember', memberId])
      }
    }

    const confirmEvent = async (idAssetsConsolidation, index) => {
      const res = await deleteAssetsConsolidation(idAssetsConsolidation)
      if (!('error' in res)) {
        state.splice(index, 1)
        queryClient.invalidateQueries(['AsetsConsolidationsMember', memberId])
      }
    }

    const isDisabledForm = computed(() => {
      return isLoadingUpdate.value || isFetching.value
    })

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
      IconDelete,
      addTableLine,
      isLoadingUpdate,
      confirmEvent,
      isDisabledForm,
      memberId,
    }
  },
}
</script>

<style scoped>
.item {
  @apply border-r border-b border-title-gray text-xs text-text-light-gray flex items-center justify-center uppercase text-center last:border-r-0;
}
</style>
