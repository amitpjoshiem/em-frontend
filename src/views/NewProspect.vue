<template>
  <div class="p-5">
    <NewProspectHeader />
    <!-- <NewProspectSteps /> -->
    <NewProspectBasic />
  </div>
</template>

<script>
import NewProspectHeader from '@/components/NewProspect/NewProspectHeader.vue'
// import NewProspectSteps from '@/components/NewProspect/NewProspectSteps.vue'
import NewProspectBasic from '@/components/NewProspect/NewProspectBasic.vue'
export default {
  name: 'NewProspect',
  components: {
    NewProspectHeader,
    // NewProspectSteps,
    NewProspectBasic,
  },
}
</script>
