<template>
  <SwdWrapper>
    <SwdSubHeader title="Upload Property & Casualty Documents" />
    <LeadDocuments context="property_casualty" />

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
  name: 'PropertyCasualty',
  components: {
    LeadDocuments,
  },
  setup() {
    const { isLoading: isLoadingInfo, data: clientsInfo } = useFetchClietsInfo()

    const isReadOnlyLead = computed(() => {
      return clientsInfo.value.readonly
    })

    const isStepCompleated = computed(() => {
      return clientsInfo.value.steps.property_casualty
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
