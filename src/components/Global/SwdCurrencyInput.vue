<template>
  <div
    class="el-input"
    :class="{
      'is-disabled': disabled,
      'el-input--small': size === 'small',
      'el-input-group el-input-group--prepend': prepend,
    }"
  >
    <div v-if="prepend" class="el-input-group__prepend">$</div>
    <input ref="inputRef" type="text" class="el-input__inner" :disabled="disabled" :placeholder="placeholder" />
  </div>
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input'
export default {
  name: 'SwdCurrencyInput',
  props: {
    modelValue: {
      type: [Number, String, Object],
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
    const { inputRef, formattedValue } = useCurrencyInput(props.options)
    return { inputRef, formattedValue }
  },
}
</script>
