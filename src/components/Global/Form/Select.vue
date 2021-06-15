<template>
  <div class="relative inline-block">
    <select
      class="
        pl-2.5
        pr-6
        text-xss
        placeholder-gray-600
        border border-input-border
        rounded
        appearance-none
        focus:shadow-outline
        w-[105px]
        h-[30px]
      "
      :class="{ 'w-[105px]': large, 'w-[55px]': small }"
    >
      <option
        v-for="(item, index) in options"
        :key="index"
        :label="item.label"
        :value="item.value"
      >
        {{ item }}
      </option>
    </select>
    <div
      class="
        absolute
        inset-y-0
        right-0
        flex
        items-center
        px-2
        pointer-events-none
      "
    >
      <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
        <path
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
          fill-rule="evenodd"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    options: {
      type: Array,
      require: true,
      default: () => [],
    },
    small: {
      type: Boolean,
      require: false,
      default: false,
    },
    large: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
}
</script>
