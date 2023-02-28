<template>
  <div>
    <img
      v-if="getExtensions === 'pdf'"
      class="el-upload-list__item-thumbnail"
      src="../../assets/img/icon-new-pdf.png"
      alt="icon-pdf"
    />
    <img
      v-if="getExtensions === 'png'"
      class="el-upload-list__item-thumbnail"
      src="../../assets/img/icon-png.png"
      alt="icon-png"
    />
    <img
      v-if="getExtensions === 'jpg'"
      class="el-upload-list__item-thumbnail"
      src="../../assets/img/icon-jpg.png"
      alt="icon-jpg"
    />
    <img
      v-if="getExtensions === 'jpeg'"
      class="el-upload-list__item-thumbnail"
      src="../../assets/img/icon-jpeg.png"
      alt="icon-jpeg"
    />
    <img
      v-if="getExtensions === 'doc'"
      class="el-upload-list__item-thumbnail"
      src="../../assets/img/icon-doc.png"
      alt="icon-doc"
    />
    <img
      v-if="getExtensions === 'docx'"
      class="el-upload-list__item-thumbnail"
      src="../../assets/img/icon-docx.png"
      alt="icon-docx"
    />
    <img
      v-if="getExtensions === 'xls'"
      class="el-upload-list__item-thumbnail"
      src="../../assets/img/icon-xls.png"
      alt="icon-xls"
    />
    <img
      v-if="getExtensions === 'xlsx'"
      class="el-upload-list__item-thumbnail"
      src="../../assets/img/icon-xlsx.png"
      alt="icon-xlsx"
    />
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'SwdThumbnail',
  props: {
    extension: {
      type: String,
      required: true,
      default: 'doc',
    },
  },
  setup(props) {
    const getExtensions = computed(() => {
      return props.extension.toLowerCase()
    })

    return {
      getExtensions,
    }
  },
}
</script>
