<template>
  <div>
    <img
      v-if="extension === 'pdf'"
      class="el-upload-list__item-thumbnail"
      src="../../assets/img/icon-new-pdf.png"
      alt="icon-pdf"
    />
    <img
      v-if="extension === 'png'"
      class="el-upload-list__item-thumbnail"
      src="../../assets/img/icon-png.png"
      alt="icon-png"
    />
    <img
      v-if="extension === 'jpg'"
      class="el-upload-list__item-thumbnail"
      src="../../assets/img/icon-jpg.png"
      alt="icon-jpg"
    />
    <img
      v-if="extension === 'jpeg'"
      class="el-upload-list__item-thumbnail"
      src="../../assets/img/icon-jpeg.png"
      alt="icon-jpeg"
    />
    <img
      v-if="extension === 'doc'"
      class="el-upload-list__item-thumbnail"
      src="../../assets/img/icon-doc.png"
      alt="icon-doc"
    />
    <img
      v-if="extension === 'docx'"
      class="el-upload-list__item-thumbnail"
      src="../../assets/img/icon-docx.png"
      alt="icon-docx"
    />
    <img
      v-if="extension === 'xls'"
      class="el-upload-list__item-thumbnail"
      src="../../assets/img/icon-xls.png"
      alt="icon-xls"
    />
    <img
      v-if="extension === 'xlsx'"
      class="el-upload-list__item-thumbnail"
      src="../../assets/img/icon-xlsx.png"
      alt="icon-xlsx"
    />
  </div>
</template>

<script>
export default {
  name: 'SwdThumbnail',
  props: {
    extension: {
      type: String,
      required: true,
      default: 'doc',
    },
  },
  setup() {},
}
</script>
