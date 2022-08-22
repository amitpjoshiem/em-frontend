<template>
  <el-badge :value="count" :max="99" class="mr-8" :type="getType ? 'primary' : 'info'" :hidden="isLoading">
    <router-link :to="{ name: getLink }" class="text-main text-smm cursor-pointer" :class="{ active: getType }">
      All Households
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
    isLoading: {
      type: Boolean,
      required: true,
      default: false,
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
      if (getCurrentTypeUser.value === 'advisor' && getActiveTab.value === 'all') return true
      if (getCurrentTypeUser.value === 'admin' && getActiveTab.value === 'admin-all-list') return true
      if (getCurrentTypeUser.value === 'ceo' && getActiveTab.value === 'ceo-all-list') return true
      return false
    })

    const getLink = computed(() => {
      if (getCurrentTypeUser.value === 'advisor') return 'all'
      if (getCurrentTypeUser.value === 'admin') return 'admin-all-list'
      if (getCurrentTypeUser.value === 'ceo') return 'ceo-all-list'
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
  color: #83ccf0;
  border-bottom: 2px solid #83ccf0;
}
</style>
