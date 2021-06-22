<template>
  <div class="flex justify-between items-center">
    <span class="text-smm font-semibold">Assets</span>
    <div class="flex items-center">
      <Select :options="options" large />
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
  name: 'AssetsHeader',
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
      {
        title: 'Item 3',
        command: 'item3',
      },
    ]
    return {
      actionsOptions,
      IconAction,
    }
  },
  data() {
    return {
      options: [
        {
          value: 'Option1',
          label: 'Past month',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
      ],
      value: '',
    }
  },
}
</script>
