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
        <SwdButton primary main :disabled="!isStepCompleated" class="ml-4" @click="saveStep">Save</SwdButton>
      </template>
    </div>
  </SwdWrapper>
</template>

<script>
import LeadDocuments from './Upload/LeadDocuments.vue'
import { useFetchClietsInfo } from '@/api/clients/use-fetch-clients-info'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'PropertyCasualty',
  components: {
    LeadDocuments,
  },
  setup() {
    const router = useRouter()
    const { isLoading: isLoadingInfo, data: clientsInfo } = useFetchClietsInfo()

    const isReadOnlyLead = computed(() => {
      return clientsInfo.value.readonly
    })

    const isStepCompleated = computed(() => {
      return clientsInfo.value.steps.property_casualty
    })

    const saveStep = () => {
      if (isStepCompleated.value) router.push({ name: `lead/dashboard` })
    }

    return {
      isReadOnlyLead,
      clientsInfo,
      isLoadingInfo,
      isStepCompleated,
      saveStep,
    }
  },
}
</script>
