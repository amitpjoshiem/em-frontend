<template>
  <div>
    <div class="flex items-center justify-between">
      <label
        class="label block text-main text-xss font-semibold pb-2"
        :class="labelGray ? 'text-gray03' : 'text-main'"
        >{{ label }}</label
      >
    </div>
    <div class="relative">
      <input
        v-maska="getMask"
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
import { maska } from 'maska'
export default {
  name: 'Input',
  directives: { maska },
  props: {
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    type: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
      default: '',
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
    isMask: {
      type: Boolean,
      required: false,
      default: false,
    },
    labelGray: {
      type: Boolean,
      required: false,
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
    const getMask = computed(() => {
      if (props.isMask) return '(###) ###-####'
      return ''
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
      getMask,
    }
  },
  methods: {},
}
</script>

<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
.input {
  &::placeholder {
    color: #b2bccd;
    font-size: 13px;
  }
  &:focus {
    outline: none;
    border: 1px solid #66b6ff;
    box-shadow: 0px 0px 1.5px rgba(102, 182, 255, 0.6);
  }
  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  &[type='number'] {
    -moz-appearance: textfield;
  }
}
</style>
