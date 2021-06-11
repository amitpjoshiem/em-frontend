<template>
  <div class="grid grid-cols-12">
    <div class="col-span-1">
      <Avatar :size="'small'" />
    </div>
    <div class="col-span-4 text-xs text-main font-semibold">
      {{ user.name }}
    </div>
    <div class="col-span-2">
      <TypeUserLabel />
    </div>
    <div class="col-span-2 text-main text-xs flex">
      <InlineSvg :src="IconProfitUp" />
      {{ user.profit }}
    </div>
    <div class="col-span-1 flex text-xs text-main">
      <CircularProgress :percentage="user.progress" />
      <span>{{ user.progress }}%</span>
    </div>
    <div class="col-span-1 text-main text-xs font-semibold">
      ${{ user.balance }}
    </div>
    <div class="col-span-1">
      <ActionBtn grey />
    </div>
  </div>
</template>

<script>
import IconProfitUp from '@/assets/svg/profit-up.svg'

export default {
  name: 'AssetsUsersItem',
  props: {
    user: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  setup() {
    return {
      IconProfitUp,
    }
  },
}
</script>
