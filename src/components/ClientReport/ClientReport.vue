<template>
  <div v-if="!isLoading" class="p-5">
    <SubHeader
      title="Progress report"
      back-page="list-of-households"
      back-page-title="List of households"
    />
    <pre>
        {{ data }}
    </pre>
    <pre>
        {{ spouse }}
    </pre>
  </div>
  <el-skeleton v-else :rows="rows" animated class="p-5" />
</template>
<script>
import { useClientReport } from '@/api/use-client-report.js'
import { useRoute } from 'vue-router'

export default {
  name: 'ClientReport',
  setup() {
    const route = useRoute()
    const id = route.params.id

    const { isLoading, isError, data, spouse } = useClientReport(id)

    return {
      isLoading,
      isError,
      data,
      spouse,
    }
  },
}
</script>
