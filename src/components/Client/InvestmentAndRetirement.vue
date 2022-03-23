<template>
  <div class="p-5">
    <SwdSubHeader title="Investment And Retirement" />
    <div class="p-5 mb-10 border border-input-border rounded-md">
      <SwdUpload
        :upload-data="{ collection: 'assets_consolidation_docs' }"
        :file-list="assetsConsolidationDocs.data"
        :show-file-list="true"
        :auto-upload="true"
        :show-file-block="true"
        @upload-success="handleSuccess"
        @upload-mounted="bindRef"
        @open-prewiev="openPrewiev"
        @remove-media="removeMedia"
      >
        <template #main>
          <div class="flex my-5">
            <el-button size="small" type="primary" class="mr-5">Click to upload</el-button>
            <div class="el-upload__tip">PDF files only</div>
          </div>
          <div v-if="!assetsConsolidationDocs.data.length" class="text-gray03 pb-5">No documents uploaded</div>
        </template>
      </SwdUpload>
    </div>
    <div class="flex justify-end">
      <el-button type="primary" plain disabled>Save</el-button>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import SwdUpload from '@/components/Global/SwdUpload.vue'

export default {
  name: 'InvestmentAndRetirement',
  components: {
    SwdUpload,
  },
  setup() {
    const upload = ref(null)
    const state = reactive({
      file: '',
      uploadRef: null,
      dialogVisible: false,
      previewUrl: '',
    })

    const assetsConsolidationDocs = reactive({
      data: [],
    })

    const bindRef = (ref) => {
      upload.value = ref.value
    }

    const removeMedia = () => {
      console.log('removeMedia')
    }

    const openPrewiev = () => {
      console.log('removeMedia')
    }

    const handleSuccess = async (res) => {
      console.log('res - ', res)
      console.log('handleSuccess')
    }

    return {
      state,
      removeMedia,
      openPrewiev,
      assetsConsolidationDocs,
      bindRef,
      handleSuccess,
    }
  },
}
</script>
