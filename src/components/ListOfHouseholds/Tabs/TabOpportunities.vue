<template>
  <el-badge :value="count" :max="99" class="mr-8" :type="getType ? 'primary' : 'info'">
    <router-link :to="{ name: getLink }" class="text-gray03 text-smm cursor-pointer" :class="{ active: getType }">
      Opportunities
    </router-link>
  </el-badge>
</template>
<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'TabOpportunities',
  props: {
    count: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  setup() {
    const route = useRoute()
    const store = useStore()

    const getActiveTab = computed(() => {
      return route.name
    })

    const getCurrentTypeUser = computed(() => {
      return store.state.globalComponents.currentTypeUser
    })

    const getType = computed(() => {
      if (getCurrentTypeUser.value === 'advisor' && getActiveTab.value === 'opportunities') return true
      if (getCurrentTypeUser.value === 'admin' && getActiveTab.value === 'admin-opportunities-list') return true
      if (getCurrentTypeUser.value === 'ceo' && getActiveTab.value === 'ceo-opportunities-list') return true
      return false
    })

    const getLink = computed(() => {
      if (getCurrentTypeUser.value === 'advisor') return 'opportunities'
      if (getCurrentTypeUser.value === 'admin') return 'admin-opportunities-list'
      if (getCurrentTypeUser.value === 'ceo') return 'ceo-opportunities-list'
      return '404'
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
  color: #66b6ff;
  border-bottom: 2px solid #66b6ff;
}
</style>
