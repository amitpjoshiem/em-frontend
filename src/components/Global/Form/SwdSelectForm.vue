<template>
  <div class="flex flex-col">
    <span v-if="label" class="label block text-main text-xss font-medium pb-2">
      {{ label }}
    </span>
    <el-select v-model="value" :size="size" @change="changeHandler">
      <el-option v-for="item in options" :key="item.title" :label="item.title" :value="item.title"> </el-option>
    </el-select>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'SwdSelectForm',
  props: {
    options: {
      type: Array,
      require: false,
      default: () => [],
    },
    label: {
      type: String,
      required: false,
      default: '',
    },
    modelValue: {
      type: String,
      required: false,
      default: '',
    },
    size: {
      type: String,
      require: false,
      default: 'large',
    },
  },
  emits: ['update:value', 'update:modelValue'],

  setup(_, { emit }) {
    const value = ref('')
    const emitValue = (e) => {
      emit('update:value', e)
      emit('update:modelValue', e)
    }

    const changeHandler = (e) => {
      emitValue(e)
    }

    return {
      value,
      changeHandler,
    }
  },
})
</script>
