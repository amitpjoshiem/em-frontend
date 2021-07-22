<template>
  <div>
    <span class="text-xss font-medium text text-main">{{ labelGroup }}</span>
    <el-radio-group v-model="radio" @change="changeHandler">
      <el-radio :label="true">Yes</el-radio>
      <el-radio :label="false">No</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'RadioBoolean',
  props: {
    labelGroup: {
      type: String,
      required: false,
      default: '',
    },
    modelValue: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  emits: ['update:value', 'update:modelValue'],
  setup(props, { emit }) {
    const radio = ref(false)

    const emitValue = () => {
      // TODO: false - temporary solutions for demo
      emit('update:value', false)
      emit('update:modelValue', false)
    }

    const changeHandler = (e) => {
      emitValue(Boolean(e))
    }
    return { radio, changeHandler }
  },
}
</script>
