<template>
  <div class="grid grid-cols-8">
    <div class="col-span-1">
      <Avatar :src="user.avatar" />
    </div>
    <div class="col-span-2 text-xs text-main font-semibold">
      {{ user.name }}
    </div>
    <div class="col-span-1">
      {{ user.type }}
    </div>
    <div class="col-span-1">
      {{ user.profit }}
    </div>
    <div class="col-span-1">
      {{ user.progress }}
    </div>
    <div class="col-span-1">
      {{ user.balance }}
    </div>
    <div class="col-span-1">
      <ActionBtn grey />
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar.vue'
import ActionBtn from '@/components/Button/ActionBtn.vue'

export default {
  name: 'AssetsUsersItem',
  components: {
    Avatar,
    ActionBtn,
  },
  props: {
    user: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
}
</script>
