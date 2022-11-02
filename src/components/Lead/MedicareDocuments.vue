<template>
  <SwdWrapper>
    <SwdSubHeader title="Upload Medicare Documents" />
    <LeadDocuments context="medicare_details" />
    <div class="flex justify-end my-8">
      <router-link :to="{ name: `lead/dashboard` }">
        <SwdButton info main>Back</SwdButton>
      </router-link>
    </div>
  </SwdWrapper>
</template>

<script>
import LeadDocuments from './Upload/LeadDocuments.vue'

export default {
  name: 'MedicareDocuments',
  components: {
    LeadDocuments,
  },
}
</script>
