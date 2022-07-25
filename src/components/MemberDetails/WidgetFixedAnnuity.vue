<template>
  <div class="w-full border border-color-grey box-border rounded-md p-5 h-[269px]">
    <div class="flex justify-between items-center text-smm font-semibold">
      <span class="text-main text-smm font-semibold mb-2">Fixed Annuity Index</span>
      <el-button size="small" @click="more">More</el-button>
    </div>
    <el-skeleton v-if="isLoading" :rows="3" animated class="p-5" />

    <div v-else class="flex items-center justify-between">
      <div
        v-if="annuityIndex.data[0]"
        class="w-4/12 flex items-center justify-between border-r border-input-border p-10"
      >
        <el-icon color="#042D52" :size="100"><Document /></el-icon>
        <div>
          <div class="text-main text-sm">{{ annuityIndex.data[0].name }}</div>
          <div class="text-main text-sm py-2">{{ annuityIndex.data[0].insurance_provider }}</div>
          <div class="text-main text-sm">{{ dayjs(annuityIndex.data[0].created_at).format('MM/DD/YYYY') }}</div>
        </div>
      </div>
      <div v-else class="w-4/12 border-r border-input-border">
        <el-empty />
      </div>
      <div
        v-if="annuityIndex.data[1]"
        class="w-4/12 flex items-center justify-between border-r border-input-border p-10"
      >
        <el-icon color="#042D52" :size="100"><Document /></el-icon>
        <div>
          <div class="text-main text-sm">{{ annuityIndex.data[1].name }}</div>
          <div class="text-main text-sm py-2">{{ annuityIndex.data[1].insurance_provider }}</div>
          <div class="text-main text-sm">{{ dayjs(annuityIndex.data[1].created_at).format('MM/DD/YYYY') }}</div>
        </div>
      </div>
      <div v-else class="w-4/12 border-r border-input-border">
        <el-empty />
      </div>
      <div v-if="annuityIndex.data[2]" class="w-4/12 flex items-center justify-between p-10">
        <el-icon color="#042D52" :size="100"><Document /></el-icon>
        <div>
          <div class="text-main text-sm">{{ annuityIndex.data[2].name }}</div>
          <div class="text-main text-sm py-2">{{ annuityIndex.data[2].insurance_provider }}</div>
          <div class="text-main text-sm">{{ dayjs(annuityIndex.data[2].created_at).format('MM/DD/YYYY') }}</div>
        </div>
      </div>
      <div v-else class="w-4/12">
        <el-empty />
      </div>
    </div>
  </div>
</template>
<script>
import { Document } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { useAnnuityIndexLast } from '@/api/use-fetch-annuity-index-last.js'
import dayjs from 'dayjs'

export default {
  name: 'WidgetFixedAnnuity',
  components: {
    Document,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()

    const { isLoading, isError, data: annuityIndex } = useAnnuityIndexLast(route.params.id)

    const more = () => {
      router.push({ name: 'annuity-index', params: { annuityId: route.params.id } })
    }

    return {
      more,
      dayjs,
      isLoading,
      isError,
      annuityIndex,
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
