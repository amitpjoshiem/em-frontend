import { useQuery } from 'vue-query'
import { ClientReport } from '@/dto/ClientReport/ClientReport'
import { ClientReportYear } from '@/dto/ClientReport/ClientReportYear'
import { ClientReportSince } from '@/dto/ClientReport/ClientReportSince'
import { fetchClientReport } from './vueQuery/fetch-client-report'
import { dataFactory } from '@/utils/dataFactory'
import { reactive } from 'vue'

export const useClientReport = (id) => {
  let clientReport = reactive({})
  let clientReportYear = reactive({})
  let clientReportSince = reactive({})

  const queryKey = reactive(['clientReport', id])

  const query = useQuery(
    queryKey,
    () => {
      return fetchClientReport(id)
    },
    {
      select: (data) => {
        clientReportYear.value = dataFactory(ClientReportYear, data.data.current_year)
        clientReportSince.value = dataFactory(ClientReportSince, data.data.since_inception)
        return new ClientReport(data.data)
      },
    }
  )

  return {
    clientReport,
    clientReportYear,
    clientReportSince,
    ...query,
  }
}
