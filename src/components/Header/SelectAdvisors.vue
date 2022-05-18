<template>
  <el-select
    v-model="currentAdvisor"
    class="m-2"
    placeholder="Select"
    :disabled="isLoading"
    size="small"
    @change="changeAdvisor"
  >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>
<script>
import { ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useFetchAssistentAdvisors } from '@/api/use-fetch-assistent-advisors.js'
import { useQueryClient } from 'vue-query'

export default {
  name: 'SelectAdvisors',
  setup() {
    const store = useStore()
    const queryClient = useQueryClient()

    const currentAdvisor = ref('')
    const options = ref([])

    const { isLoading, isError, data, isFetched } = useFetchAssistentAdvisors()

    watchEffect(() => {
      if (!isLoading.value) {
        currentAdvisor.value = store.state.globalComponents.advisorId
        options.value = data.value.data.map((item) => {
          return {
            value: item.id,
            label: item.username,
          }
        })
      }
    })

    const changeAdvisor = async () => {
      store.commit('globalComponents/setAdvisorId', currentAdvisor.value)
      queryClient.refetchQueries()
    }

    return {
      currentAdvisor,
      options,
      isLoading,
      isError,
      data,
      isFetched,
      changeAdvisor,
    }
  },
}
</script>
