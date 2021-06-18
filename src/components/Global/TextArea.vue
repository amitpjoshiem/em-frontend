<template>
  <el-input
    v-model="textarea"
    type="textarea"
    :autosize="{ minRows: 2, maxRows: 4 }"
    placeholder="Please input"
  >
  </el-input>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'TextArea',
  setup() {
    return {
      textarea1: ref(''),
    }
  },
})
</script>
