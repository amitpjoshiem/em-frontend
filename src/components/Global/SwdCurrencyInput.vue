<template>
  <el-input ref="inputRef" v-model="formattedValue" :placeholder="placeholder" :size="size" :disabled="disabled">
    <template v-if="prepend" #prepend>$</template>
  </el-input>
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input'
import { watch } from 'vue'
export default {
  name: 'SwdCurrencyInput',
  props: {
    modelValue: {
      type: [Number],
      require: false,
      default: null,
    },
    options: {
      type: Object,
      require: true,
      default: () => {},
    },
    prepend: {
      type: Boolean,
      require: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      require: false,
      default: false,
    },
    size: {
      type: String,
      require: false,
      default: 'default',
    },
    placeholder: {
      type: String,
      require: false,
      default: '$12345',
    },
  },
  setup(props) {
    const { inputRef, formattedValue, setValue } = useCurrencyInput(props.options)

    watch(
      () => props.modelValue,
      (value) => {
        setValue(value)
      }
    )

    return { inputRef, formattedValue }
  },
}
</script>
