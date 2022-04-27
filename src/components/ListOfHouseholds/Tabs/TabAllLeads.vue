<template>
  <el-badge :value="count" :max="99" class="mr-8" :type="getType ? 'primary' : 'info'">
    <router-link :to="{ name: getLink }" class="text-gray03 text-smm cursor-pointer" :class="{ active: getType }">
      All Leads
    </router-link>
  </el-badge>
</template>
<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'TabAllLeads',
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
      if (getCurrentTypeUser.value === 'advisor' && getActiveTab.value === 'list-all-leads') return true
      return false
    })

    const getLink = computed(() => {
      if (getCurrentTypeUser.value === 'advisor') return 'list-all-leads'
      return '/'
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
