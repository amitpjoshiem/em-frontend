<template>
  <div class="p-5">
    <SubHeader
      title="Employment history"
      back-page="prospect-basic-information"
      back-page-title="Prospect details"
    />
    <div v-if="!isLoading">
      <div class="flex mt-4">
        <div class="w-4/12"></div>
        <div class="w-4/12 text-sm text-gray03 font-semibold">OWNER</div>
        <div class="w-4/12 text-sm text-gray03 font-semibold">SPOUSE</div>
      </div>
      <div v-for="item in employment" :key="item.id">
        <EmploymentHistoryItem :elem="item" />
      </div>
    </div>
    <el-skeleton v-else :rows="5" animated class="p-5" />
  </div>
</template>
<script>
import { useEmploymentHistory } from '@/api/use-employment-history.js'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { employmentDetails } from '@/utils/employmentDetail'
import EmploymentHistoryItem from '@/components/EmploymentHistory/EmploymentHistoryItem.vue'

export default {
  name: 'EmploymentHistory',
  components: {
    EmploymentHistoryItem,
  },
  setup() {
    const route = useRoute()

    const id = route.params.id

    const { isLoading, isError, spouse, data } = useEmploymentHistory(id)

    const employment = computed(() => {
      return employmentDetails(data.value, spouse.value)
    })

    return {
      isLoading,
      isError,
      data,
      spouse,
      employment,
    }
  },
}
</script>
