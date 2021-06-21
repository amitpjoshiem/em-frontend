<template>
  <div>
    <div class="flex items-center justify-between">
      <label
        class="label block text-main text-xss font-semibold pb-2"
        :class="labelClass"
        >{{ label }}</label
      >
    </div>
    <div class="relative">
      <input
        v-maska="mask"
        novalidate
        :name="name"
        :type="type"
        :value="formValue"
        :placeholder="placeholder"
        class="
          input
          w-full
          pb-[5px]
          pt-[5px]
          border
          rounded-md
          justify-center
          border-input-border
          px-[20px]
        "
        :class="inputClass"
        @blur="handleBlur"
        @input="handleChange"
      />
      <slot name="icon" :showError="showError"></slot>
    </div>
    <div class="text-color-error text-xss h-3.5 pt-1">
      {{ showError ? errorMessage : '' }}
    </div>
  </div>
</template>

<script>
import { maska } from 'maska'
import { ref } from 'vue'

const labelVariants = {
  gray: 'text-gray03',
  default: 'text-main',
}

const inputVariants = {
  search: 'pl-[32px]',
  error: 'border-color-error',
}

export default {
  name: 'InputText',
  directives: { maska },
  inheritAttrs: false,
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: false,
      default: undefined,
    },
    labelVariant: {
      type: String,
      required: false,
      default: 'default',
      validator(value) {
        return ['gray', 'default'].includes(value)
      },
    },
    mask: {
      type: String,
      required: false,
      default: '',
    },
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const formValue = ref(props.value)
    const handleChangeExtended = (e) => {
      formValue.value = e.target.value
      emit('update:value', e.target.value)
    }

    return {
      formValue,
      errorMessage: undefined,
      handleChange: handleChangeExtended,
      handleBlur: () => null,
      showError: false,
    }
  },
  computed: {
    labelClass() {
      return labelVariants[this.labelVariant] ?? labelVariants['default']
    },
    inputClass() {
      const error = this.showError && 'error'

      return [error, this.type]
        .map((field) => inputVariants[field])
        .filter(Boolean)
        .join(' ')
    },
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.input {
  box-shadow: 0px 0px 1.5px rgba(102, 182, 255, 0.6);
  &::placeholder {
    color: #b2bccd;
    font-size: 13px;
    font-family: 'Eina04';
  }
  &:focus {
    border: 1px solid #66b6ff;
    box-shadow: 0px 0px 1.5px rgba(102, 182, 255, 0.6);
  }
}
</style>
