<template>
  <div class="p-5">
    <NewProspectHeader />
    <NewProspectSteps />
  </div>
</template>

<script>
import NewProspectHeader from '@/components/NewProspect/NewProspectHeader.vue'
import NewProspectSteps from '@/components/NewProspect/NewProspectSteps.vue'
export default {
  name: 'NewProspect',
  components: {
    NewProspectHeader,
    NewProspectSteps,
  },
}
</script>
