<template>
  <div class="p-5">
    <SettingsHeader />
    <!-- <NewProspectSteps /> -->
    <router-view />
  </div>
</template>

<script>
import SettingsHeader from '@/components/Settings/SettingsHeader.vue'
// import NewProspectSteps from '@/components/NewProspect/NewProspectSteps.vue'
export default {
  name: 'Settings',
  components: {
    SettingsHeader,
    // NewProspectSteps,
  },
}
</script>
