<template>
  <el-date-picker
    v-model="value"
    type="date"
    :placeholder="getPlaceholder"
    format="MM/DD/YYYY"
    @change="changeHandler"
  />
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'SwdDatePicker',
  props: {
    modelValue: {
      type: String,
      default: '',
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
      return dayjs(new Date()).format('MM/DD/YYYY')
    })

    const changeHandler = (e) => {
      const date = dayjs(e).format('MM/DD/YYYY')
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
