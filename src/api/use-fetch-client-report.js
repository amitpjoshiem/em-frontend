import { useQuery } from 'vue-query'
import { ClientReport } from '@/dto/ClientReport/ClientReport'
import { ClientReportYear } from '@/dto/ClientReport/ClientReportYear'
import { ClientReportSince } from '@/dto/ClientReport/ClientReportSince'
import { fetchClientReport } from './vueQuery/fetch-client-report'
import { dataFactory } from '@/utils/dataFactory'
import { reactive } from 'vue'

export const useClientReport = (id, options = {}) => {
  let clientReport = reactive({})
  const queryKey = reactive(['clientReport', id])

  const query = useQuery(
    queryKey,
    () => {
      return fetchClientReport(id)
    },
    {
      select: (data) => {
        clientReport = new ClientReport(data.data)
        clientReport.current_year = dataFactory(ClientReportYear, data.data.current_year)
        clientReport.since_inception = dataFactory(ClientReportSince, data.data.since_inception)
        return clientReport
      },
      ...options,
    }
  )

  return {
    clientReport,
    ...query,
  }
}
