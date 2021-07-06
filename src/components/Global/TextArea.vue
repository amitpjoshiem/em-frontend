<template>
  <div>
    <span class="text-xss font-medium">{{ label }}</span>
    <el-input
      v-model="textarea"
      type="textarea"
      :placeholder="placeholder"
      :rows="rows"
      resize="none"
      show-word-limit
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'TextArea',
  props: {
    label: {
      type: String,
      required: false,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    rows: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  setup() {
    return {
      textarea: ref(''),
    }
  },
})
</script>
