<template>
  <div class="flex text-xs items-center text-center">
    <div class="w-8/24 item">
      <el-icon><User /></el-icon>
      <span class="pl-1 whitespace-nowrap overflow-hidden overflow-ellipsis">
        {{ user.name }}
      </span>
    </div>
    <div class="w-4/24 item">{{ currencyFormat(user.amount) }}</div>
    <div class="w-6/24 item">{{ user.stage }}</div>
    <div class="w-4/24 item">{{ user.closeDateFormatted }}</div>
    <div class="w-1/24 item">
      <SwdOpportunityItemActions :user="user" />
    </div>
    <div class="w-1/24 item" @click="editOpportunity">
      <el-icon color="green" class="cursor-pointer">
        <EditPen />
      </el-icon>
    </div>
  </div>
</template>
<script>
import { currencyFormat } from '@/utils/currencyFormat'
import { User } from '@element-plus/icons-vue'
import { EditPen } from '@element-plus/icons-vue'
import { useStore } from 'vuex'

export default {
  name: 'OpportunityItem',
  components: {
    User,
    EditPen,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    prospect: {
      type: Object,
      required: true,
    },
    userProfile: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const store = useStore()

    const editOpportunity = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'addChildOpportunity',
        value: true,
      })
    }

    return {
      currencyFormat,
      editOpportunity,
    }
  },
}
</script>

<style scoped>
.item {
  @apply text-xs text-main flex items-center h-8 text-left first:pl-2;
}
</style>
