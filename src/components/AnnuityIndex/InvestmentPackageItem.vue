<template>
  <el-card class="mb-4">
    <div class="flex justify-between">
      <div class="mb-4 text-main font-semibold">Certificate: A</div>
      <div>
        <el-tag type="success" class="mr-4">
          <el-icon><EditPen /></el-icon>
          Client
        </el-tag>
        <el-tag type="danger">
          <el-icon><EditPen /></el-icon>
          Advisor
        </el-tag>
      </div>
    </div>
    <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      list-type="picture"
    >
      <el-button type="primary" plain size="small">Click to upload</el-button>
      <template #tip>
        <div class="el-upload__tip">pdf files with a size less than 10Mb</div>
      </template>
    </el-upload>
    <div class="flex justify-end">
      <el-button type="info" size="small" plain>Send</el-button>
      <el-button type="primary" size="small" plain>Sign</el-button>
    </div>
  </el-card>
</template>

<script>
import { ref } from 'vue'
import { EditPen } from '@element-plus/icons-vue'

export default {
  name: 'InvestmentPackageItem',
  components: {
    EditPen,
  },
  setup() {
    const fileList = ref([])
    return {
      fileList,
    }
  },
}
</script>
