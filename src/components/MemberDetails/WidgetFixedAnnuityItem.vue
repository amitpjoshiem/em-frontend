<template>
  <div v-if="item.id" class="w-4/12 border-r border-input-border px-10 pt-10 flex items-center flex-col">
    <div class="flex items-center justify-between pb-5">
      <el-icon color="#042D52" :size="100"><Document /></el-icon>
      <div>
        <div class="text-main text-sm">{{ item.name }}</div>
        <div class="text-main text-sm py-2">{{ item.insurance_provider }}</div>
        <div class="text-main text-sm">{{ dayjs(item.created_at).format('MM/DD/YYYY') }}</div>
      </div>
    </div>
    <el-button size="small" type="primary" plain @click="open">Open</el-button>
  </div>
  <div v-else class="w-4/12 border-r border-input-border">
    <el-empty />
  </div>
</template>
<script>
import { Document } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

export default {
  name: 'WidgetFixedAnnuityItem',
  components: {
    Document,
  },
  props: {
    item: {
      type: Object,
      require: false,
      default: () => {},
    },
  },
  setup(props) {
    const router = useRouter()

    const open = () => {
      router.push({ name: 'annuity-index-details', params: { annuityId: props.item.id } })
    }

    return {
      open,
      dayjs,
    }
  },
}
</script>

<style>
.el-empty {
  padding: 0;
}
.el-empty__description {
  display: none;
}
</style>
