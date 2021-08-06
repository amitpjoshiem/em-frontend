<template>
  <div class="col-span-1 p-5 bg-widget-bg rounded-[10px]">
    <div class="flex justify-between items-center">
      <span class="text-smm font-medium">Pipe Line</span>
      <div class="flex">
        <Select :options="options" large />
        <DropDown class="ml-2.5" :options="actionsOptions">
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

    <div class="pt-6 flex justify-between">
      <div
        class="
          justify-between
          flex flex-col
          border border-widget-border
          rounded-[10px]
          pt-3
          bg-white
        "
      >
        <div class="flex text-small items-center justify-between px-2.5">
          <span class="text-gray03">Total AUM</span>
          <div class="flex rounded-md p-1 bg-input-border bg-color-green">
            <InlineSvg :src="IconUpArrow" class="mt-px" />
            <span class="text-white"> 123k </span>
          </div>
        </div>
        <span class="flex items-center justify-center text-xll font-medium">
          $102M
        </span>
        <InlineSvg :src="IconTotal" />
      </div>

      <div
        class="
          justify-between
          flex flex-col
          border border-widget-border
          rounded-[10px]
          pt-3
          bg-white
        "
      >
        <div class="flex text-small items-center justify-between px-2.5">
          <span class="text-gray03">Members</span>
          <div class="flex rounded-md p-1 bg-color-green">
            <InlineSvg :src="IconUpArrow" class="mt-px" />
            <span class="text-white"> 13 </span>
          </div>
        </div>
        <span class="flex items-center justify-center text-xll font-medium">
          138
        </span>
        <InlineSvg :src="IconMembers" />
      </div>
    </div>
  </div>
</template>

<script>
import IconTotal from '@/assets/svg/total.svg'
import IconMembers from '@/assets/svg/members.svg'
import IconUpArrow from '@/assets/svg/up-arrow.svg'
import IconAction from '@/assets/svg/icon-action.svg'
import IconPipeLineEmpty from '@/assets/svg/icon-pipe-line-empty.svg'

export default {
  name: 'PipeLine',
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
      IconTotal,
      IconMembers,
      IconUpArrow,
      IconPipeLineEmpty,
      actionsOptions,
      IconAction,
    }
  },
  data() {
    return {
      pipeLineData: {
        data: [
          {
            type: 'total',
          },
          {
            type: 'members',
          },
        ],
      },
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
