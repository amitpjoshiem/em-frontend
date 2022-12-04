<template>
  <div class="w-[200px] mr-2">
    <router-link :to="{ name: `${route.meta.type}/ap-users` }">
      <el-card v-loading="loading" class="h-[180px]" shadow="always">
        <div class="flex flex-col justify-center items-center py-2 text-sm">
          <el-icon color="#83ccf0" :size="30"><Avatar /></el-icon>
          <span class="font-semibold text-main py-4 text-center">{{ title }}</span>
          <span class="font-semibold text-main">
            {{ amount }}
          </span>
        </div>
      </el-card>
    </router-link>
  </div>
</template>

<script>
import { Avatar } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

export default {
  name: 'WidgetAmountUser',
  components: {
    Avatar,
  },
  props: {
    title: {
      type: String,
      required: true,
      default: 'Users',
    },
    loading: {
      type: Boolean,
      required: true,
      default: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  setup() {
    const route = useRoute()
    return {
      route,
    }
  },
}
</script>
