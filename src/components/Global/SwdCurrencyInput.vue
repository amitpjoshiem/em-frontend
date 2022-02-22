<template>
  <el-input ref="inputRef" :model-value="formattedValue">
    <template v-if="prepend" #prepend>$</template>
  </el-input>
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input'
export default {
  name: 'SwdCurrencyInput',
  props: {
    modelValue: {
      type: [Number, String],
      require: false,
      default: '',
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
  },
  setup(props) {
    const { inputRef, formattedValue } = useCurrencyInput(props.options)
    return { inputRef, formattedValue }
  },
}
</script>
