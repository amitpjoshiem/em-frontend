<template>
  <div class="flex text-xs items-center text-center">
    <div class="w-9/24 item">
      <el-icon><User /></el-icon>
      <span class="pl-1">
        {{ user.name }}
      </span>
    </div>
    <div class="w-4/24 item">{{ currencyFormat(user.amount) }}</div>
    <div class="w-6/24 item">{{ user.stage }}</div>
    <div class="w-4/24 item">{{ user.closeDateFormatted }}</div>
    <div class="w-1/24 item">
      <SwdOpportunityItemActions :user="user" />
    </div>
  </div>
</template>
<script>
import { currencyFormat } from '@/utils/currencyFormat'
import { User } from '@element-plus/icons-vue'

export default {
  name: 'OpportunityItem',
  components: {
    User,
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
    return {
      currencyFormat,
    }
  },
}
</script>

<style scoped>
.item {
  @apply text-xs text-text-light-gray flex items-center h-8 text-left first:pl-2;
}
</style>
