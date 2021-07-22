<template>
  <el-select v-model="data.value" size="small" @change="handleCommand">
    <el-option
      v-for="item in options"
      :key="item.title"
      :label="item.title"
      :value="item.title"
    >
    </el-option>
  </el-select>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'MySelect',
  props: {
    options: {
      type: Array,
      require: false,
      default: () => [],
    },
  },
  emits: ['select'],
  setup(props, { emit }) {
    const data = reactive({
      value: 'All',
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
