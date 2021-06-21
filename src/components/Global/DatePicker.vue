<template>
  <div class="flex flex-col">
    <span class="text-xss font-semibold pb-1.5 text-main">{{ label }}</span>
    <el-date-picker
      v-model="value2"
      type="date"
      placeholder="2021-06-18"
      format="YYYY-MM-DD"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  props: {
    label: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      value2: '',
    }
  },
}
</script>

<style lang="css" scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.el-input--prefix .el-input__inner {
  padding-left: 20px;
  padding-right: 0;
}
.el-input__prefix {
  display: none;
}
.el-input__inner {
  height: 36px;
}
</style>
