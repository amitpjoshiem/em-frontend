<template>
  <div>
    <SettingsHeader />
    <router-view />
  </div>
</template>

<script>
import SettingsHeader from '@/components/Settings/SettingsHeader.vue'
export default {
  name: 'SettingsApp',
  components: {
    SettingsHeader,
  },
  setup() {},
}
</script>
