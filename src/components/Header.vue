<template>
  <div class="bg-widget-bg items-center pl-7 h-16 pr-5 flex justify-between">
    <InputSearch placeholder="Search householders" name="inputSearch" />
    <div class="flex items-center justify-end">
      <router-link :to="{ name: 'basic-information' }">
        <div
          class="
            h-9
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
      </router-link>

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
        <UserAction />
      </div>
    </div>
  </div>
</template>

<script>
import UserAction from '@/components/UserAction.vue'
export default {
  name: 'Header',
  components: {
    UserAction,
  },
}
</script>
