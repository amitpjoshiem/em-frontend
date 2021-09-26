<template>
  <div class="flex flex-col">
    <span v-if="label" class="label block text-main text-xss font-medium pb-2 w-">
      {{ label }}
    </span>
    <select
      v-model="data.value"
      :class="selectClass"
      class="styled-select border rounded-md border-input-border text-main text-xss px-2 py-1 bg-white"
      @change="handleCommand($event)"
    >
      <option v-for="(item, index) in options" :key="index" :value="item.title">{{ item.title }}</option>
    </select>
  </div>
</template>
<script>
import { reactive, computed } from 'vue'

export default {
  name: 'SwdNativeSelect',
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
      validator: (value) => {
        return ['large', 'medium', 'small'].includes(value)
      },
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

    const handleCommand = (e) => {
      data.value = e.target.value
      emit('select', e.target.value)
    }

    const selectClassMap = {
      large: 'w-28',
      medium: 'w-24',
      small: 'w-14',
    }

    const selectClass = computed(() => {
      return selectClassMap[props.size]
    })

    return {
      handleCommand,
      data,
      selectClass,
    }
  },
}
</script>

<style>
.styled-select {
  height: 30px;
}
</style>
