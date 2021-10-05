<template>
  <div class="col-span-1 p-5 bg-widget-bg rounded-[10px]">
    <div class="flex justify-between items-center">
      <span class="text-smm font-medium">Pipe Line</span>
      <SwdNativeSelect :options="options" init-value="Past month" />
    </div>

    <div class="pt-6 flex justify-between">
      <div class="justify-between flex flex-col border border-widget-border rounded-[10px] pt-3 bg-white">
        <div class="flex text-small items-center justify-between px-2.5">
          <span class="text-gray03">Total AUM</span>
          <div class="flex rounded-md p-1 bg-color-green">
            <InlineSvg :src="IconUpArrow" class="mt-px" />
            <span class="text-white"> 123k </span>
          </div>
        </div>
        <span class="flex items-center justify-center text-xll font-medium"> $102M </span>
        <InlineSvg :src="IconTotal" />
      </div>

      <div class="justify-between flex flex-col border border-widget-border rounded-[10px] pt-3 bg-white">
        <div class="flex text-small items-center justify-between px-2.5">
          <span class="text-gray03">Members</span>
          <div class="flex rounded-md p-1 bg-color-green">
            <InlineSvg :src="IconUpArrow" class="mt-px" />
            <span class="text-white"> 13 </span>
          </div>
        </div>
        <span class="flex items-center justify-center text-xll font-medium"> 138 </span>
        <InlineSvg :src="IconMembers" />
      </div>
    </div>
  </div>
</template>

<script>
import IconTotal from '@/assets/svg/total.svg'
import IconMembers from '@/assets/svg/members.svg'
import IconUpArrow from '@/assets/svg/up-arrow.svg'
import IconPipeLineEmpty from '@/assets/svg/icon-pipe-line-empty.svg'

export default {
  name: 'PipeLine',
  setup() {
    return {
      IconTotal,
      IconMembers,
      IconUpArrow,
      IconPipeLineEmpty,
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
          title: 'Past year',
          command: 'year',
        },
        {
          title: 'Past month',
          command: 'month',
        },
        {
          title: 'Past quarter',
          command: 'quarter',
        },
      ],
      value: '',
    }
  },
}
</script>
