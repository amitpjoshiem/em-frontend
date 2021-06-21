<template>
  <div>
    <div v-if="label" class="flex items-center justify-between">
      <label class="label block text-sm text-main text-xss">{{ label }}</label>
    </div>
    <div class="relative">
      <input
        novalidate
        :name="name"
        :type="type"
        :value="formValue"
        :placeholder="placeholder"
        class="input w-full pb-[5px] pt-[5px] border rounded-md justify-center"
        :class="{
          'pl-[20px]': type !== 'search',
          'pl-[32px]': type === 'search',
          'border-color-error': showError,
          'border-input-border': !showError,
        }"
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
import { useField } from 'vee-validate'
import { computed } from 'vue'

export default {
  name: 'InputBasic',
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
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const emitValue = (e) => {
      emit('update:value', e.target.value)
    }

    const {
      value: formValue,
      errorMessage,
      handleChange,
      handleBlur,
      meta,
    } = useField(props.name, undefined, {
      validateOnValueUpdate: false,
      bails: true,
      initialValue: props.value,
    })

    const showError = computed(() => {
      return meta.touched && Boolean(errorMessage) && !meta.valid
    })

    const handleChangeExtended = (e) => {
      emitValue(e)
      handleChange(e)
    }

    return {
      formValue,
      errorMessage,
      handleChange: handleChangeExtended,
      handleBlur,
      showError,
      meta,
    }
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
