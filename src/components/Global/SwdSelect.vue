<template>
  <div class="flex flex-col">
    <span v-if="label" class="label block text-main text-xss font-medium pb-2">
      {{ label }}
    </span>
    <el-select v-model="data.value" :size="size" @change="handleCommand()">
      <el-option v-for="item in options" :key="item.title" :label="item.title" :value="item.title" />
    </el-select>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'SwdSelect',
  props: {
    options: {
      type: Array,
      require: false,
      default: () => [],
    },
    size: {
      type: String,
      require: false,
      default: 'large',
    },
    initValue: {
      type: String,
      require: false,
      default: '',
    },
    label: {
      type: String,
      require: false,
      default: '',
    },
  },
  emits: ['select'],
  setup(props, { emit }) {
    const data = reactive({
      value: props.initValue,
    })

    const handleCommand = (command) => {
      data.value = command
      emit('select', command)
    }

    return {
      handleCommand,
      data,
    }
  },
}
</script>
