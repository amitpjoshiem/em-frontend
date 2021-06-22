<template>
  <div class="grid grid-cols-12 pt-4">
    <div class="col-span-1 flex justify-center items-center">
      <Avatar :size="'small'" />
    </div>
    <div class="col-span-3 text-xs text-main font-semibold flex items-center">
      {{ user.name }}
    </div>
    <div class="col-span-2 flex justify-center items-center">
      <TypeUserLabel />
    </div>
    <div class="col-span-2 text-main text-xs flex items-center">
      <InlineSvg :src="IconProfitUp" />
      <span class="pl-2">{{ user.profit }}</span>
    </div>
    <div class="col-span-1 text-xs text-main flex justify-center items-center">
      <CircularProgress :percentage="user.progress" />
      <span class="pl-2">{{ user.progress }}%</span>
    </div>
    <div
      class="
        col-span-2
        text-main text-xs
        font-semibold
        flex
        justify-center
        items-center
      "
    >
      ${{ user.balance }}
    </div>
    <div class="col-span-1 flex justify-center items-center">
      <DropDown :options="actionsOptions">
        <template #titleDropDown>
          <span
            class="
              cursor-pointer
              bg-white
              rounded
              flex
              justify-center
              items-center
              py-2
              px-3
            "
          >
            <InlineSvg :src="IconActionGray" />
          </span>
        </template>
      </DropDown>
    </div>
  </div>
</template>

<script>
import IconProfitUp from '@/assets/svg/profit-up.svg'
import IconActionGray from '@/assets/svg/icon-action-gray.svg'

import { User } from '@/components/Dashboard/DTO/usersList.js'

export default {
  name: 'AssetsUsersItem',
  props: {
    user: {
      type: User,
      require: true,
      default: () => {},
    },
  },
  setup() {
    const actionsOptions = [
      {
        title: 'Basic Information',
        command: 'basic-information',
      },
      {
        title: 'Blueprint Report',
        command: 'blueprint-report',
      },
    ]
    return {
      IconProfitUp,
      actionsOptions,
      IconActionGray,
    }
  },
}
</script>
