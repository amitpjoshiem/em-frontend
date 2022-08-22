<template>
  <el-badge :value="count" :max="99" class="mr-8" :type="getType ? 'primary' : 'info'" :hidden="isLoading">
    <router-link
      :to="{ name: 'list-deactivated-leads' }"
      class="text-main text-smm cursor-pointer"
      :class="{ active: getType }"
    >
      Deactivated Leads
    </router-link>
  </el-badge>
</template>
<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'TabDeactivatedLeads',
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
      if (getCurrentTypeUser.value === 'advisor' && getActiveTab.value === 'list-deactivated-leads') return true
      return false
    })

    return {
      getActiveTab,
      getType,
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
