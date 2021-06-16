<template>
  <div>
    <div class="flex items-center justify-between">
      <label class="label block text-sm text-main text-xss">{{ label }}</label>
    </div>
    <span v-show="showError">{{ errorMessage }}</span>
    <div class="relative">
      <input
        novalidate
        :name="name"
        :type="type"
        :value="formValue"
        :placeholder="placeholder"
        class="input w-full pb-[5px] pt-[5px] rounded-md justify-center"
        :class="{
          'pl-[20px]': type !== 'search',
          'pl-[32px]': type === 'search',
        }"
        @blur="handleBlur"
        @input="handleChange"
      />
      <span
        v-if="type === 'password'"
        class="absolute inset-y-0 right-0 flex items-center"
      >
        <button
          type="button"
          class="p-1 focus:outline-none focus:shadow-outline"
        >
          <InlineSvg :src="IconShowPass" />
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
  </div>
</template>

<script>
import IconShowPass from '@/assets/svg/icon-show-pass.svg'
import IconSearch from '@/assets/svg/icon-search.svg'
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
      return meta.touched && Boolean(errorMessage)
    })

    const handleChangeExtended = (e) => {
      emitValue(e)
      handleChange(e)
    }

    return {
      IconShowPass,
      IconSearch,
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
  border: 1px solid #d4ddeb;
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
