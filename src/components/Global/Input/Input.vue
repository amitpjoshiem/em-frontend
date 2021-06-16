<template>
  <div>
    <div class="flex items-center justify-between">
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
      <span
        v-if="showIconInput"
        class="absolute inset-y-0 right-0 flex items-center"
      >
        <button
          type="button"
          class="p-1 focus:outline-none focus:shadow-outline"
        >
          <InlineSvg v-if="showError" :src="IconInputError" />
          <InlineSvg
            v-if="!showError && type === 'password'"
            :src="IconShowPass"
          />
        </button>
      </span>
      <span
        v-if="type === 'search'"
        class="absolute inset-y-0 left-0 flex items-center"
      >
        <button
          type="button"
          class="pl-[11px] focus:outline-none focus:shadow-outline"
        >
          <InlineSvg :src="IconSearch" />
        </button>
      </span>
    </div>
    <div class="text-color-error text-xss h-3.5 pt-1">
      {{ showError ? errorMessage : '' }}
    </div>
  </div>
</template>

<script>
import IconShowPass from '@/assets/svg/icon-show-pass.svg'
import IconSearch from '@/assets/svg/icon-search.svg'
import IconInputError from '@/assets/svg/icon-input-error.svg'
import { useField } from 'vee-validate'
import { computed } from 'vue'

export default {
  name: 'Input',
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
      required: true,
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

    const showIconInput = computed(() => {
      if (props.type === 'password' || showError) return true
      return false
    })

    const typeShowIconIput = computed(() => {
      if (!errorMessage && props.type == 'password') return 'IconShowPass'
      return 'IconInputError'
    })

    return {
      IconShowPass,
      IconSearch,
      formValue,
      IconInputError,
      errorMessage,
      handleChange: handleChangeExtended,
      handleBlur,
      showError,
      meta,
      showIconInput,
      typeShowIconIput,
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
