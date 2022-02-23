<template>
  <div class="el-input el-input--small el-input-group el-input-group--prepend" :class="{ 'is-disabled': disabled }">
    <div v-if="prepend" class="el-input-group__prepend">$</div>
    <input ref="inputRef" type="text" class="el-input__inner" :disabled="disabled" />
  </div>
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
    disabled: {
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
