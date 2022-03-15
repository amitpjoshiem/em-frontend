<template>
  <div>
    <div class="flex items-center pb-5" :class="{ 'justify-end': !isShowTitle, 'justify-between': isShowTitle }">
      <div v-if="isShowTitle" class="text-smm font-medium text-main">Asset Consolidations</div>
      <div class="flex">
        <ExportExcel />
        <el-button size="small" class="ml-2" @click="moreDocuments">More documents</el-button>
      </div>
    </div>

    <div v-if="!isLoading">
      <div v-for="(table, indexTable) in state" :key="table.id" class="mb-14">
        <HeaderTable :is-add-line="true" />
        <div v-for="(item, index) in table.assets_consolidations" :key="index" class="flex h-10">
          <template v-if="state[indexTable].assets_consolidations[index].id !== 'total'">
            <div class="w-6/24 item">
              <el-input
                v-model="state[indexTable].assets_consolidations[index].name"
                size="small"
                :disabled="isDisabledForm"
                @change="change({ indexTable, index })"
              />
            </div>
            <div class="w-2/24 item">{{ item.percent_of_holdings }}%</div>
            <div class="w-3/24 item amount">
              <el-input
                v-model="state[indexTable].assets_consolidations[index].amount"
                size="small"
                type="number"
                :disabled="isDisabledForm"
                @change="change({ indexTable, index })"
                @focus="focusInput('amount', indexTable, index)"
                @blur="blurInput"
              >
                <template v-if="focusElem === 'amount' + indexTable + index" #prepend>$</template>
              </el-input>
            </div>

            <div class="w-2/24 item" :class="{ invalidate: errors['management_expense_' + indexTable + index] }">
              <el-input
                v-model="state[indexTable].assets_consolidations[index].management_expense"
                :disabled="isDisabledForm"
                size="small"
                type="number"
                @change="
                  change({
                    indexTable,
                    index,
                    value: state[indexTable].assets_consolidations[index].management_expense,
                    title: 'Management Expense',
                    field: 'management_expense',
                  })
                "
                @focus="focusInput('management_expense', indexTable, index)"
                @blur="blurInput"
              >
                <template v-if="focusElem === 'management_expense' + indexTable + index" #prepend>%</template>
              </el-input>
            </div>

            <div class="w-2/24 item" :class="{ invalidate: errors['turnover_' + indexTable + index] }">
              <el-input
                v-model="state[indexTable].assets_consolidations[index].turnover"
                :disabled="isDisabledForm"
                size="small"
                type="number"
                @change="
                  change({
                    indexTable,
                    index,
                    value: state[indexTable].assets_consolidations[index].turnover,
                    title: 'Turnover',
                    field: 'turnover',
                  })
                "
                @focus="focusInput('turnover', indexTable, index)"
                @blur="blurInput"
              >
                <template v-if="focusElem === 'turnover' + indexTable + index" #prepend>%</template>
              </el-input>
            </div>

            <div class="w-2/24 item" :class="{ invalidate: errors['trading_cost_' + indexTable + index] }">
              <el-input
                v-model="state[indexTable].assets_consolidations[index].trading_cost"
                :disabled="isDisabledForm"
                size="small"
                type="number"
                @change="
                  change({
                    indexTable,
                    index,
                    value: state[indexTable].assets_consolidations[index].trading_cost,
                    title: 'Trading cost',
                    field: 'trading_cost',
                  })
                "
                @focus="focusInput('trading_cost', indexTable, index)"
                @blur="blurInput"
              >
                <template v-if="focusElem === 'trading_cost' + indexTable + index" #prepend>%</template>
              </el-input>
            </div>
            <div class="w-2/24 item" :class="{ invalidate: errors['wrap_fee_' + indexTable + index] }">
              <el-input
                v-model="state[indexTable].assets_consolidations[index].wrap_fee"
                :disabled="isDisabledForm"
                size="small"
                type="number"
                @change="
                  change({
                    indexTable,
                    index,
                    value: state[indexTable].assets_consolidations[index].wrap_fee,
                    title: 'Wrap Fee',
                    field: 'wrap_fee',
                  })
                "
                @focus="focusInput('wrap_fee', indexTable, index)"
                @blur="blurInput"
              >
                <template v-if="focusElem === 'wrap_fee' + indexTable + index" #prepend>%</template>
              </el-input>
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
          </template>
          <TotalTable
            v-else
            :total="state[indexTable].assets_consolidations[index]"
            :is-fetching="isDisabledForm"
            :is-add-line="true"
            @addTableLine="addTableLine(state[indexTable].table)"
          />
        </div>
      </div>

      <div class="mb-10">
        <HeaderTable />
        <TotalTable v-for="(item, index) in total.value.assets_consolidations" :key="index" :total="item" />
      </div>

      <div class="flex justify-end mb-10">
        <el-button type="primary" @click="addTable">Add table</el-button>
      </div>
    </div>
    <el-skeleton v-else :rows="10" animated class="p-5" />
  </div>
</template>

<script>
import { reactive, watchEffect, ref, computed } from 'vue'
import { useAsetsConsolidationsMember } from '@/api/use-assets-consolidations-member.js'
import { updateMemberAssetsConsolidation } from '@/api/vueQuery/update-member-assets-consolidation'
import { createAssetsConsolidationRows } from '@/api/vueQuery/create-assets-consolidations-rows'
import { createAssetsConsolidationTables } from '@/api/vueQuery/create-assets-consolidations-tables'
import { deleteMemberAssetsConsolidation } from '@/api/vueQuery/delete-member-assets-consolidation'
import { useAlert } from '@/utils/use-alert'
import { currencyFormat } from '@/utils/currencyFormat'
import { useRoute, useRouter } from 'vue-router'
import { useMutation, useQueryClient } from 'vue-query'
import IconDelete from '@/assets/svg/icon-delete.svg'
import HeaderTable from '@/components/AssetsConsolidations/HeaderTable.vue'
import TotalTable from '@/components/AssetsConsolidations/TotalTable.vue'
import ExportExcel from '@/components/AssetsConsolidations/Export/ExportExcel.vue'

export default {
  name: 'TableAssetsConsolidations',
  components: {
    HeaderTable,
    TotalTable,
    ExportExcel,
  },
  props: {
    isShowTitle: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const queryClient = useQueryClient()
    const memberId = route.params.id
    const isLoadingUpdate = ref(false)
    const focusElem = ref(null)

    const { isLoading, isFetching, isError, data: assetsData, total } = useAsetsConsolidationsMember(memberId)
    const { mutateAsync: updateAssetsConsolidation } = useMutation(updateMemberAssetsConsolidation)
    const { mutateAsync: createAssetsConsolidationRow } = useMutation(createAssetsConsolidationRows)
    const { mutateAsync: createAssetsConsolidationTable } = useMutation(createAssetsConsolidationTables)
    const { mutateAsync: deleteAssetsConsolidation } = useMutation(deleteMemberAssetsConsolidation)

    const state = reactive([])
    const errors = reactive({})

    watchEffect(() => {
      if (isLoading.value === false) {
        Object.assign(state, JSON.parse(JSON.stringify(assetsData.value)))
      }
    })

    const change = async ({ indexTable, index, value = 0, title = '', field = '' }) => {
      const row = state[indexTable].assets_consolidations[index]
      const rowId = state[indexTable].assets_consolidations[index].id

      const valueNum = Number(value)
      if (valueNum < 0 || valueNum > 100) {
        errors[field + '_' + indexTable + index] = true
        useAlert({
          type: 'error',
          title: 'Error',
          message: `The ${title} must be between 0 and 100.`,
        })
        return
      }
      isLoadingUpdate.value = true
      const res = await updateAssetsConsolidation({ form: row, id: rowId })
      if (!('error' in res)) {
        for (var key in errors) {
          delete errors[key]
        }
        queryClient.invalidateQueries(['AsetsConsolidationsMember', memberId])
      }
      isLoadingUpdate.value = false
    }

    const addTableLine = async (tableId) => {
      const res = await createAssetsConsolidationRow({ memberId, tableId })
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

    const focusInput = (name, indexTable, index) => {
      focusElem.value = name + indexTable + index
    }

    const blurInput = () => {
      focusElem.value = null
    }

    const moreDocuments = () => {
      router.push({ name: 'document-export', params: { id: memberId } })
    }

    const addTable = async () => {
      const res = await createAssetsConsolidationTable(memberId)
      if (!('error' in res)) {
        queryClient.invalidateQueries(['AsetsConsolidationsMember', memberId])
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
      IconDelete,
      addTableLine,
      isLoadingUpdate,
      confirmEvent,
      isDisabledForm,
      memberId,
      focusInput,
      focusElem,
      blurInput,
      moreDocuments,
      addTable,
    }
  },
}
</script>

<style scoped>
.item {
  @apply text-xs text-text-light-gray flex items-center justify-center uppercase text-center;
  @apply border-title-gray border-b border-r first:border-l;
}
</style>

<style>
.item .el-input-group__prepend {
  border: none;
  border-radius: 0;
  height: 39px;
  padding-left: 1px;
  padding-right: 1px;
}

.amount .el-input-group__prepend {
  padding-left: 3px;
  padding-right: 3px;
}
</style>
