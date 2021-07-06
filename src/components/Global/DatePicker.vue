<template>
  <div class="flex flex-col">
    <span class="text-xss font-medium pb-1.5 text-main">{{ label }}</span>
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
