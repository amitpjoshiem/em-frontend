<template>
  <div class="border-b border-color-grey flex h-14">
    <router-link :to="{ name: 'profile' }">
      <div class="p-5 text-sm text-gray03 cursor-pointer" :class="{ active: getActiveTab === 'profile' }">
        Profile settings
      </div>
    </router-link>

    <router-link :to="{ name: 'notifications' }">
      <div class="p-5 text-sm text-gray03 cursor-pointer" :class="{ active: getActiveTab === 'notifications' }">
        Notifications settings
      </div>
    </router-link>

    <router-link :to="{ name: 'information' }">
      <div class="p-5 text-sm text-gray03 cursor-pointer" :class="{ active: getActiveTab === 'information' }">
        Information
      </div>
    </router-link>
    <router-link :to="{ name: '2fa' }">
      <div class="p-5 text-sm text-gray03 cursor-pointer" :class="{ active: getActiveTab === '2fa' }">
        Two step authentication
      </div>
    </router-link>
    <router-link :to="{ name: 'salesforce' }">
      <div class="p-5 text-sm text-gray03 cursor-pointer" :class="{ active: getActiveTab === 'salesforce' }">
        Salesforce
      </div>
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
  border-bottom: 3px solid #66b6ff;
  color: #66b6ff;
  height: 57px;
}
</style>
