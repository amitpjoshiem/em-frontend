<template>
  <div v-if="!isLoading">
    <div>EmploymentHistory</div>
    <pre>
      {{ employment }}
    </pre>
  </div>
</template>
<script>
import { useEmploymentHistory } from '@/api/use-employment-history.js'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { employmentDetails } from '@/utils/employmentDetail'

export default {
  name: 'EmploymentHistory',
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
