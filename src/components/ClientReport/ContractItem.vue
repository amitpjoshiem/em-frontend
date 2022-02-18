<template>
  <div class="mb-5 w-[49%]">
    <div class="flex justify-between items-center bg-widget-bg p-5 rounded-t">
      <div class="flex items-center">
        <span class="w-9 h-9 rounded-md flex justify-center items-center bg-activity">
          <InlineSvg :src="IconCurrentYear" />
        </span>
        <router-link :to="{ name: 'contract-info', params: { id: contract.id } }">
          <span class="ml-4 text-main text-title font-semibold">Contract {{ contract.contract_number }}</span>
        </router-link>
      </div>
      <span class="text-xs text-gray03">issue date: {{ getIssueDate }}</span>
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
      <span class="text-main text-sm font-semibold">{{ currencyFormat(contract.current_year.current_value) }}</span>
    </div>
    <div class="border border-t-0 border-color-grey flex justify-end px-4 py-2">
      <el-button size="small" type="primary" plain @click="genPdf">Generate PDF</el-button>
      <el-button size="small" type="success" plain @click="genExcel">Generate EXCEL</el-button>
      <el-button size="small" type="info" plain @click="moreAction">More info</el-button>
    </div>
  </div>
</template>

<script>
import IconCurrentYear from '@/assets/svg/icon-current-year.svg'
import { currencyFormat } from '@/utils/currencyFormat'
import { computed } from 'vue'
import dayjs from 'dayjs'
import { useRouter, useRoute } from 'vue-router'
import { useMutation } from 'vue-query'
import { generatePdfClientReports } from '@/api/vueQuery/generate-pdf-client-reports'
import { generateExcelClientReports } from '@/api/vueQuery/generate-excel-client-reports'
import { useStore } from 'vuex'

export default {
  name: 'ContractItem',

  props: {
    contract: {
      type: Object,
      require: true,
      default: () => {},
    },
  },

  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const memberId = route.params.id

    const { mutateAsync: genPdfClientReports } = useMutation(generatePdfClientReports)
    const { mutateAsync: genExcelClientReports } = useMutation(generateExcelClientReports)

    const getIssueDate = computed(() => {
      return dayjs(props.contract.origination_date).format('MM/DD/YYYY')
    })

    const moreAction = () => {
      router.push({ name: 'contract-info', params: { id: props.contract.id } })
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

    return {
      IconCurrentYear,
      currencyFormat,
      getIssueDate,
      moreAction,
      genPdf,
      genExcel,
    }
  },
}
</script>
