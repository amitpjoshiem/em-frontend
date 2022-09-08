<template>
  <div class="border-b border-color-grey flex h-14">
    <router-link :to="{ name: 'profile' }">
      <div class="p-5 text-sm text-main cursor-pointer" :class="{ active: getActiveTab === 'profile' }">
        Profile settings
      </div>
    </router-link>

    <router-link v-if="$can('advisor', 'all')" :to="{ name: 'information' }">
      <div class="p-5 text-sm text-main cursor-pointer" :class="{ active: getActiveTab === 'information' }">
        Information
      </div>
    </router-link>

    <router-link v-if="$can('advisor', 'all')" :to="{ name: 'partners' }">
      <div class="p-5 text-sm text-main cursor-pointer" :class="{ active: getActiveTab === 'partners' }">Partners</div>
    </router-link>

    <router-link :to="{ name: 'settings' }">
      <div class="p-5 text-sm text-main cursor-pointer" :class="{ active: getActiveTab === 'settings' }">Settings</div>
    </router-link>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'SettingsHeader',
  setup() {
    const route = useRoute()

    const getActiveTab = computed(() => {
      return route.name
    })

    return {
      getActiveTab,
    }
  },
}
</script>

<style scoped>
.active {
  border-bottom: 3px solid #83ccf0;
  color: #83ccf0;
  height: 57px;
}
</style>
