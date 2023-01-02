<template>
  <SwdWrapper>
    <SwdSubHeader title="Upload Medicare Documents" />
    <LeadDocuments context="medicare_details" />

    <div class="flex justify-end my-8">
      <SwdSpinner v-if="isLoadingInfo" />
      <template v-else>
        <router-link :to="{ name: `lead/dashboard` }" class="w-1/12">
          <SwdButton info main>Back</SwdButton>
        </router-link>
        <SwdButton primary main :disabled="!isStepCompleated || isLoadingUpdateSteps" class="ml-4" @click="saveStep">
          <SwdSpinner v-show="isLoadingUpdateSteps" class="mr-2" />
          Save
        </SwdButton>
      </template>
    </div>
  </SwdWrapper>
</template>

<script>
import LeadDocuments from './Upload/LeadDocuments.vue'
import { useFetchClietsInfo } from '@/api/clients/use-fetch-clients-info'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { updateStepsClients } from '@/api/vueQuery/clients/fetch-update-steps-clients'
import { useMutation, useQueryClient } from 'vue-query'

export default {
  name: 'MedicareDocuments',
  components: {
    LeadDocuments,
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const queryClient = useQueryClient()

    const { isLoading: isLoadingInfo, data: clientsInfo } = useFetchClietsInfo()
    const { isLoading: isLoadingUpdateSteps, mutateAsync: updateSteps } = useMutation(updateStepsClients)

    const isReadOnlyLead = computed(() => {
      return clientsInfo.value.readonly
    })

    const isStepCompleated = computed(() => {
      return store.state.globalComponents.uploadMedicareDocsStatus
    })

    const saveStep = async () => {
      const res = await updateSteps({ ['medicare_details']: store.state.globalComponents.uploadMedicareDocsStatus })
      if (!('error' in res)) {
        queryClient.invalidateQueries(['clients-info'])
        router.push({ name: `lead/dashboard` })
      }
    }

    return {
      isReadOnlyLead,
      clientsInfo,
      isLoadingInfo,
      isStepCompleated,
      saveStep,
      isLoadingUpdateSteps,
    }
  },
}
</script>
