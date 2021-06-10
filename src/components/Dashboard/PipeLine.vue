<template>
  <div class="col-span-1 p-5 bg-widget-bg rounded-[10px]">
    <div class="flex justify-between items-center">
      <span class="text-smm font-semibold">Pipe Line</span>
      <div class="flex">
        <Select :options="options" />
        <ActionBtn border class="ml-2.5" />
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
          w-[118px]
          h-[126px]
        "
      >
        <div class="flex text-small items-center justify-between px-2.5">
          <span class="text-gray03">Total AUM</span>
          <div class="flex bg-color-green rounded-md p-1">
            <InlineSvg :src="IconUpArrow" class="mt-px" />
            <span class="text-white"> 123k </span>
          </div>
        </div>
        <span class="flex items-center justify-center text-xll font-semibold">
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
          w-[118px]
          h-[126px]
        "
      >
        <div class="flex text-small items-center justify-between px-2.5">
          <span class="text-gray03">Members</span>
          <div class="flex bg-color-green rounded-md p-1">
            <InlineSvg :src="IconUpArrow" class="mt-px" />
            <span class="text-white"> 13 </span>
          </div>
        </div>
        <span class="flex items-center justify-center text-xll font-semibold">
          138
        </span>
        <InlineSvg :src="IconMembers" />
      </div>
    </div>
  </div>
</template>

<script>
import ActionBtn from '@/components/Button/ActionBtn.vue'
import Select from '@/components/Global/Form/Select.vue'
import IconTotal from '@/assets/svg/total.svg'
import IconMembers from '@/assets/svg/members.svg'
import IconUpArrow from '@/assets/svg/up-arrow.svg'

export default {
  name: 'PipeLine',
  components: {
    ActionBtn,
    Select,
  },
  setup() {
    return {
      IconTotal,
      IconMembers,
      IconUpArrow,
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
