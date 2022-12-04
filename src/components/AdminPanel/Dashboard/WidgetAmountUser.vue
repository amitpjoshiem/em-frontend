<template>
  <el-card v-loading="loading" class="w-3/12" shadow="always">
    <div class="flex flex-col justify-center items-center py-2">
      <el-icon color="#83ccf0" :size="30"><Avatar /></el-icon>
      <span class="font-semibold text-main py-4 text-center">{{ title }}</span>
      <span class="font-semibold text-main">
        {{ amount }}
      </span>
    </div>
  </el-card>
</template>

<script>
import { Avatar } from '@element-plus/icons-vue'

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
  setup() {},
}
</script>
