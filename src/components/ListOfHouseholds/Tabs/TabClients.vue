<template>
  <el-badge :value="count" :max="99" class="mr-8" :type="getType" :hidden="isLoading">
    <router-link
      :to="{ name: getLink }"
      class="text-main text-smm cursor-pointer"
      :class="{ active: getType === 'primary' }"
    >
      Clients
    </router-link>
  </el-badge>
</template>
<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'TabClients',
  props: {
    count: {
      type: Number,
      required: true,
      default: 0,
    },
    isLoading: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  setup() {
    const route = useRoute()

    const getActiveTab = computed(() => {
      return route.name
    })

    const getType = computed(() => {
      if (route.name === route.meta.type + '/clients') return 'primary'
      return 'info'
      // if (getCurrentTypeUser.value === 'advisor' && getActiveTab.value === 'clients') return true
      // if (getCurrentTypeUser.value === 'admin' && getActiveTab.value === 'admin-opportunities-list') return true
      // if (getCurrentTypeUser.value === 'ceo' && getActiveTab.value === 'ceo-clients-list') return true
      // return false
    })

    const getLink = computed(() => {
      return route.meta.type + '/clients'
      // if (getCurrentTypeUser.value === 'advisor') return 'clients'
      // if (getCurrentTypeUser.value === 'admin') return 'admin-clients-list'
      // if (getCurrentTypeUser.value === 'ceo') return 'ceo-clients-list'
      // return '404'
    })

    return {
      getActiveTab,
      getType,
      getLink,
    }
  },
}
</script>

<style scoped>
.active {
  color: #83ccf0;
  border-bottom: 2px solid #83ccf0;
}
</style>
