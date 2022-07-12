<template>
  <div class="w-full border border-color-grey box-border rounded-md p-5 h-[269px]">
    <div class="flex justify-between items-center text-smm font-semibold">
      <span class="text-main text-smm font-semibold">Fixed Annuity Index</span>
      <el-button size="small" @click="more">More</el-button>
    </div>
    <div class="flex items-center justify-between">
      <div class="w-4/12 flex items-center justify-center">
        <el-icon color="#042D52" :size="100"><Document /></el-icon>
        <div>
          <div class="text-main text-sm">Document name</div>
          <div class="text-main text-sm py-2">Insurance provider</div>
          <div class="text-main text-sm">01/01/2022</div>
        </div>
      </div>
      <div class="w-4/12">
        <el-empty />
      </div>
      <div class="w-4/12">
        <el-empty />
      </div>
    </div>
  </div>
</template>
<script>
import { Document } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'WidgetFixedAnnuity',
  components: {
    Document,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()

    const more = () => {
      router.push({ name: 'annuity-index', params: { id: route.params.id } })
    }

    return {
      more,
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
