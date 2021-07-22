<template>
  <div class="flex flex-col">
    <span class="text-xss font-medium pb-1.5 text-main">{{ label }}</span>
    <el-date-picker
      v-model="value"
      type="date"
      :placeholder="getPlaceholder"
      format="YYYY/MM/DD"
      @change="changeHandler"
    >
    </el-date-picker>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'

import dayjs from 'dayjs'

export default defineComponent({
  name: 'DatePicker',
  props: {
    label: {
      type: String,
      required: false,
      default: '',
    },
    modelValue: {
      type: Date,
      default: function () {
        return new Date()
      },
    },
  },
  emits: ['update:value', 'update:modelValue'],

  setup(props, { emit }) {
    const value = ref('')
    const emitValue = (e) => {
      emit('update:value', e)
      emit('update:modelValue', e)
    }

    const getPlaceholder = computed(() => {
      return dayjs(new Date()).format('YYYY/MM/DD')
    })

    const changeHandler = (e) => {
      const date = dayjs(e).format('YYYY-MM-DD')
      emitValue(date)
    }

    return {
      value,
      changeHandler,
      getPlaceholder,
    }
  },
})
</script>
