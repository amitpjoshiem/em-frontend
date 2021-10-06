<template>
  <div v-if="!isLoading" class="col-span-1 p-5 bg-widget-bg rounded-[10px]">
    <div class="flex justify-between items-center">
      <span class="text-smm font-medium">Pipe Line</span>
      <SwdSelectFilter />
    </div>
    <div class="pt-6 flex justify-between">
      <div class="justify-between flex flex-col border border-widget-border rounded-[10px] pt-3 bg-white">
        <div class="flex text-small items-center justify-between px-2.5">
          <span class="text-gray03">Total AUM</span>
          <div class="flex rounded-md p-1 bg-color-green">
            <InlineSvg :src="IconUpArrow" class="mt-px" />
            <span class="text-white"> {{ getTotalNewAmount }} </span>
          </div>
        </div>
        <span class="flex items-center justify-center text-xll font-medium"> {{ getTotalAmount }} </span>
        <InlineSvg :src="IconTotal" />
      </div>

      <div class="justify-between flex flex-col border border-widget-border rounded-[10px] pt-3 bg-white">
        <div class="flex text-small items-center justify-between px-2.5">
          <span class="text-gray03">Members</span>
          <div class="flex rounded-md p-1 bg-color-green">
            <InlineSvg :src="IconUpArrow" class="mt-px" />
            <span class="text-white"> {{ pipeLine.data.new_members }} </span>
          </div>
        </div>
        <span class="flex items-center justify-center text-xll font-medium"> {{ pipeLine.data.members }} </span>
        <InlineSvg :src="IconMembers" />
      </div>
    </div>
  </div>
  <el-skeleton v-else :rows="5" animated />
</template>

<script>
import IconTotal from '@/assets/svg/total.svg'
import IconMembers from '@/assets/svg/members.svg'
import IconUpArrow from '@/assets/svg/up-arrow.svg'
import IconPipeLineEmpty from '@/assets/svg/icon-pipe-line-empty.svg'
import { computed } from 'vue'

import { useDashboardPipeLine } from '@/api/use-dashboard-pipeline.js'

export default {
  name: 'PipeLine',
  setup() {
    const { isLoading, isError, data: pipeLine, refetch } = useDashboardPipeLine()

    const getTotalAmount = computed(() => {
      if (pipeLine.value.data.aum > 1000000000) return Math.round(pipeLine.value.data.aum / 1000000000) + 'B'
      if (pipeLine.value.data.aum > 1000000) return Math.round(pipeLine.value.data.aum / 1000000) + 'M'
      if (pipeLine.value.data.aum > 1000) return Math.round(pipeLine.value.data.aum / 1000) + 'K'
      return pipeLine.value.data.aum
    })

    const getTotalNewAmount = computed(() => {
      if (pipeLine.value.data.new_aum > 1000000000) return Math.round(pipeLine.value.data.aum / 1000000000) + 'B'
      if (pipeLine.value.data.new_aum > 1000000) return Math.round(pipeLine.value.data.aum / 1000000) + 'M'
      if (pipeLine.value.data.new_aum > 1000) return Math.round(pipeLine.value.data.aum / 1000) + 'K'
      return pipeLine.value.data.new_aum
    })

    return {
      IconTotal,
      IconMembers,
      IconUpArrow,
      IconPipeLineEmpty,
      isLoading,
      isError,
      pipeLine,
      refetch,
      getTotalAmount,
      getTotalNewAmount,
    }
  },
}
</script>
