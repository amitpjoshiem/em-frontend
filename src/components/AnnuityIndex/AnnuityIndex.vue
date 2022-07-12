<template>
  <div class="p-5">
    <SwdSubHeader title="Fixed Index Annuity" />
    <el-row :gutter="20">
      <el-col :span="12">
        <AnnuityIndexItem />
      </el-col>
      <el-col :span="12">
        <AnnuityIndexItem />
      </el-col>
      <el-col :span="12">
        <AnnuityIndexItem />
      </el-col>
      <el-col :span="12">
        <AnnuityIndexItem />
      </el-col>
      <el-col :span="12">
        <AnnuityIndexItem />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import AnnuityIndexItem from '@/components/AnnuityIndex/AnnuityIndexItem.vue'

export default {
  name: 'AnnuityIndex',
  components: {
    AnnuityIndexItem,
  },
  setup() {},
}
</script>
