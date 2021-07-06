<template>
  <div>
    <div class="flex items-center justify-between">
      <label
        v-if="label"
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
          no-shadow-ios
          input
          w-full
          py-[5px]
          border
          rounded-[6px]
          justify-center
          border-input-border
          px-[20px]
          focus:border-activity
          focus:shadow-shadow-input-activ
        "
        :class="inputClass"
        @blur="handleBlur"
        @input="handleChange"
      />
      <slot name="icon" :showError="showError" />
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
  inputTable:
    'border-0 outline-none focus:border-0 focus:shadow-none px-0 py-0',
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

<style>
.input::placeholder {
  color: #b2bccd;
  font-size: 13px;
}
</style>
