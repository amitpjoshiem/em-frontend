<template>
  <div
    :disabled="disabled"
    :loading="loading"
    class="flex items-center justify-center rounded cursor-pointer"
    :class="{
      'opacity-60': disabled,
      'bg-primary': primary,
      'bg-main-gray': info,
      'h-[24px]': small,
    }"
  >
    <div
      class="flex items-center justify-center"
      :class="{
        'text-white': primary,
        'text-primary px-2.5': info,
        'text-xs px-2 py-1': small,
        'text-sm py-1.5 px-4': main,
        'hover:text-main-blue': !disabled,
        'cursor-not-allowed opacity-50': disabled,
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SwdButton',
  props: {
    disabled: {
      type: Boolean,
      require: false,
      default: false,
    },
    loading: {
      type: Boolean,
      require: false,
      default: false,
    },
    main: {
      type: Boolean,
      require: false,
      default: false,
    },
    small: {
      type: Boolean,
      require: false,
      default: false,
    },
    primary: {
      type: Boolean,
      require: false,
      default: false,
    },
    info: {
      type: Boolean,
      require: false,
      default: false,
    },
    text: {
      type: String,
      require: true,
      default: 'button',
    },
  },
})
</script>
