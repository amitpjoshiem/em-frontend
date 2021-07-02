<template>
  <div>
    <SettingsHeader />
    <router-view />
  </div>
</template>

<script>
import SettingsHeader from '@/components/Settings/SettingsHeader.vue'
export default {
  name: 'Settings',
  components: {
    SettingsHeader,
  },
  setup() {},
}
</script>

<style scoped>
.active {
  border-bottom: 3px solid #66b6ff;
  height: 57px;
}
</style>
