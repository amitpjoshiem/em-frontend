<template>
  <div class="p-5 flex justify-between">
    <span>List of Households</span>
    <div class="flex items-center">
      <ItemsPerPage />
      <Select large />
      <DropDown class="ml-2" :options="actionsOptions">
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
              border border-color-grey
            "
          >
            <InlineSvg :src="IconAction" />
          </span>
        </template>
      </DropDown>
    </div>
  </div>
</template>
<script>
import IconAction from '@/assets/svg/icon-action.svg'

export default {
  name: 'ListOfHouseholdsHeader',
  setup() {
    const actionsOptions = [
      {
        title: 'Item 1',
        command: 'item-1',
      },
      {
        title: 'Item 2',
        command: 'item2',
      },
    ]
    return {
      actionsOptions,
      IconAction,
    }
  },
}
</script>
