<template>
  <SwdWrapper>
    <SwdSubHeader title="Upload Property & Casualty Documents" />
    <LeadDocuments context="property_casualty" />
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
  name: 'PropertyCasualty',
  components: {
    LeadDocuments,
  },
}
</script>
