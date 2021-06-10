<template>
  <div
    class="
      grid grid-cols-4
      gap-4
      header
      bg-widget-bg
      items-center
      pl-[30px]
      h-16
      pr-5
    "
  >
    <div class="col-span-2">
      <Search />
    </div>
    <div class="flex items-center col-span-2 justify-end">
      <div
        class="
          h-[36px]
          bg-color-grey
          rounded-md
          border-input-border border
          flex
          items-center
          justify-center
          text-primary text-xss
          cursor-pointer
          mr-5
        "
      >
        <img class="h-[13px] pr-3 pl-[10px]" src="../assets/img/plus.png" />
        <div class="pr-2">Add new</div>
      </div>
      <div class="border-l border-color-grey h-16" />
      <div>
        <img
          class="h-[13px] pr-5 pl-5 cursor-pointer"
          src="../assets/img/notifications.png"
        />
      </div>
      <div class="border-l border-color-grey h-16" />
      <div class="flex items-center justify-center pl-5 cursor-pointer">
        <Avatar />
        <span class="text-main pl-2">Adam K.</span>
        <img class="w-[8px] ml-[11px]" src="../assets/img/icon-up.png" />
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Global/Input/Search.vue'
export default {
  name: 'Header',
  components: {
    Search,
  },
}
</script>
