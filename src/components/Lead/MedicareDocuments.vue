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
        <router-link v-if="!isReadOnlyLead" :to="{ name: `lead/dashboard` }" class="w-1/12 ml-4">
          <SwdButton primary main :disabled="!isStepCompleated">Save</SwdButton>
        </router-link>
      </template>
    </div>
  </SwdWrapper>
</template>

<script>
import LeadDocuments from './Upload/LeadDocuments.vue'
import { useFetchClietsInfo } from '@/api/clients/use-fetch-clients-info'
import { computed } from 'vue'

export default {
  name: 'MedicareDocuments',
  components: {
    LeadDocuments,
  },
  setup() {
    const { isLoading: isLoadingInfo, data: clientsInfo } = useFetchClietsInfo()

    const isReadOnlyLead = computed(() => {
      return clientsInfo.value.readonly
    })

    const isStepCompleated = computed(() => {
      return clientsInfo.value.steps.medicare_details
    })

    return {
      isReadOnlyLead,
      clientsInfo,
      isLoadingInfo,
      isStepCompleated,
    }
  },
}
</script>
