<template>
  <div class="text-xs pb-2.5">
    <div class="flex items-center">
      <div class="bg-activity h-[9px] w-[9px] rounded-full mb-[2px] mr-[8px]" />
      <span class="text-activity-item font-semibold">{{ item.data }}</span>
    </div>
    <div class="pt-px text-main">
      {{ item.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'LastActivity',
  props: {
    item: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  setup() {},
}
</script>
