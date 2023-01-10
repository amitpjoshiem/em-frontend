<template>
  <div v-loading="isLoadingDelete" class="mb-5 w-[49%] h-[230px]">
    <div class="flex justify-between items-center bg-main-gray p-5 rounded-t">
      <div class="flex items-center">
        <span class="w-9 h-9 rounded-md flex justify-center items-center" :class="getClassTypeContract">
          <InlineSvg :src="IconCurrentYear" />
        </span>
        <router-link :to="{ name: `${route.meta.type}/contract-info`, params: { contract_id: contract.id } }">
          <span class="ml-4 text-main text-title font-semibold">Contract {{ contract.contract_number }}</span>
        </router-link>
      </div>
      <span class="text-xs text-main">issue date: {{ getIssueDate }}</span>
    </div>

    <div class="border border-t-0 border-color-grey flex justify-between px-4 py-2">
      <span class="text-main text-sm">Carrier</span>
      <span class="text-main text-sm font-semibold">{{ contract.carrier }}</span>
    </div>

    <div class="border border-t-0 border-color-grey flex justify-between px-4 py-2">
      <span class="text-main text-sm">Beginning Balance</span>
      <span class="text-main text-sm font-semibold">{{ currencyFormat(contract.current_year.beginning_balance) }}</span>
    </div>

    <div class="border border-t-0 border-color-grey flex justify-between px-4 py-2">
      <span class="text-main text-sm">Contract Value</span>
      <span class="text-main text-sm font-semibold">{{ currencyFormat(contract.current_year.contract_value) }}</span>
    </div>
    <div class="border border-t-0 border-color-grey flex justify-between px-4 py-3 rounded-b">
      <div class="flex items-center">
        <div>
          <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            icon="el-icon-info"
            icon-color="red"
            title="Are you sure to delete this?"
            @confirm="confirmEvent(contract.id)"
          >
            <template #reference>
              <el-icon v-if="contract.is_custom" color="red" class="cursor-pointer"><Delete /></el-icon>
            </template>
          </el-popconfirm>
        </div>
      </div>

      <div class="flex">
        <SwdButton primary small @click="genPdf">Generate PDF</SwdButton>
        <SwdButton class="ml-2" primary small @click="genExcel">Generate EXCEL</SwdButton>
        <SwdButton class="ml-2" primary small @click="moreAction">More info</SwdButton>
      </div>
    </div>
  </div>
</template>

<script>
import IconCurrentYear from '@/assets/svg/icon-current-year.svg'
import dayjs from 'dayjs'
import { currencyFormat } from '@/utils/currencyFormat'
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMutation } from 'vue-query'
import { generatePdfClientReports } from '@/api/vueQuery/generate-pdf-client-reports'
import { generateExcelClientReports } from '@/api/vueQuery/generate-excel-client-reports'
import { useStore } from 'vuex'
import { Delete } from '@element-plus/icons-vue'
import { deleteContract } from '@/api/vueQuery/delete-contract'
import { useAlert } from '@/utils/use-alert'

export default {
  name: 'ContractListItem',
  components: {
    Delete,
  },
  props: {
    contract: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  // TODO: temporary solution
  emits: ['refetch-list'],
  setup(props, { emit }) {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const isLoadingDelete = ref(false)

    const memberId = route.params.id

    const { mutateAsync: genPdfClientReports } = useMutation(generatePdfClientReports)
    const { mutateAsync: genExcelClientReports } = useMutation(generateExcelClientReports)
    const { mutateAsync: deleteReport } = useMutation(deleteContract)

    const getIssueDate = computed(() => {
      if (!props.contract.origination_date) return '---'
      return dayjs(props.contract.origination_date).format('MM/DD/YYYY')
    })

    const moreAction = () => {
      router.push({ name: `${route.meta.type}/contract-info`, params: { contract_id: props.contract.id } })
    }

    const genPdf = async () => {
      const data = {
        contracts: props.contract.id,
      }
      const res = await genPdfClientReports({ id: memberId, data })

      if (!('error' in res)) {
        succesExport()
      }
    }

    const genExcel = async () => {
      const data = {
        contracts: props.contract.id,
      }
      const res = await genExcelClientReports({ id: memberId, data })
      if (!('error' in res)) {
        succesExport()
      }
    }

    const succesExport = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'exportSucces',
        value: true,
      })

      store.commit('globalComponents/setPdfRegion', 'client-report')
      store.commit('globalComponents/setMemberId', memberId)
    }

    const confirmEvent = async (id) => {
      isLoadingDelete.value = true
      const res = await deleteReport(id)
      if (!('error' in res)) {
        await emit('refetch-list')
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Delete successfully',
        })
      }
    }

    const getClassTypeContract = computed(() => {
      if (props.contract.is_custom) return 'bg-main-orange'
      return 'bg-activity'
    })

    return {
      IconCurrentYear,
      currencyFormat,
      getIssueDate,
      moreAction,
      genPdf,
      genExcel,
      route,
      confirmEvent,
      isLoadingDelete,
      getClassTypeContract,
    }
  },
}
</script>
