<template>
  <div>
    <div class="flex items-center justify-between">
      <label class="label block text-sm text-main text-xss">{{ label }}</label>
    </div>
    <div class="relative">
      <input
        :type="type"
        :value="value"
        :placeholder="placeholder"
        class="input w-full pb-[5px] pt-[5px] rounded-md justify-center"
        :class="{
          'pl-[20px]': type !== 'search',
          'pl-[32px]': type === 'search',
        }"
        @input="emitValue"
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
    value: {
      type: String,
      required: false,
      default: '',
    },
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const emitValue = (event) => {
      emit('update:value', event.target.value)
    }
    return {
      emitValue,
      IconShowPass,
      IconSearch,
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
