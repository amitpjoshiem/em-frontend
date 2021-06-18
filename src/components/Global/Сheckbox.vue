<template>
  <el-checkbox v-model="checked">Option</el-checkbox>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Checkbox',
  setup() {
    const checked = ref(true)
    return {
      checked,
    }
  },
})
</script>
