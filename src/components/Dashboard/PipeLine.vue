<template>
  <div v-if="!isLoading" class="p-5 bg-widget-bg rounded-lg">
    <div class="flex justify-between items-center">
      <span class="text-smm font-medium">Pipe Line</span>
      <SwdSelectFilter destination="pipeLine" />
    </div>
    <div class="pt-6 flex justify-between mb-5">
      <div class="justify-between flex flex-col border border-widget-border rounded-lg pt-3 bg-white w-5/12">
        <div class="flex text-small items-center justify-between px-2.5">
          <span class="text-gray03">Total AUM</span>
          <div
            class="flex rounded-md p-1"
            :class="{ 'bg-color-green': pipeLine.data.new_aum, 'bg-input-border': pipeLine.data.new_aum === null }"
          >
            <InlineSvg v-if="pipeLine.data.new_aum !== null" :src="IconUpArrow" class="mt-[2px] mr-px" />
            <span class="text-white ml-px font-semibold"> ${{ currencyCompact(pipeLine.data.new_aum) }} </span>
          </div>
        </div>
        <span class="flex items-center justify-center text-xll font-medium">
          ${{ currencyCompact(pipeLine.data.aum) }}
        </span>
        <InlineSvg v-if="pipeLine.data.aum === null" :src="IconTotalGray" />
        <InlineSvg v-else :src="IconTotal" />
      </div>

      <div class="justify-between flex flex-col border border-widget-border rounded-lg pt-3 bg-white w-5/12">
        <div class="flex text-small items-center justify-between px-2.5">
          <span class="text-gray03">Members</span>
          <div
            class="flex rounded-md p-1"
            :class="{ 'bg-color-green': pipeLine.data.new_aum, 'bg-input-border': pipeLine.data.new_aum === null }"
          >
            <InlineSvg :src="IconUpArrow" class="mt-[2px]" />
            <span class="text-white ml-px font-semibold"> {{ pipeLine.data.new_members }} </span>
          </div>
        </div>
        <span class="flex items-center justify-center text-xll font-medium"> {{ pipeLine.data.members }} </span>
        <div class="-ml-px">
          <InlineSvg v-if="pipeLine.data.members" :src="IconMembers" />
          <InlineSvg v-else :src="IconTotalGray" />
        </div>
      </div>
    </div>
  </div>
  <el-skeleton v-else :rows="5" animated />
</template>

<script>
import IconTotal from '@/assets/svg/total.svg'
import IconTotalGray from '@/assets/svg/total-gray.svg'
import IconMembers from '@/assets/svg/members.svg'
import IconUpArrow from '@/assets/svg/up-arrow.svg'
import IconPipeLineEmpty from '@/assets/svg/icon-pipe-line-empty.svg'
import { currencyCompact } from '@/utils/currencyCompactFormat'
import { useDashboardPipeLine } from '@/api/use-dashboard-pipeline.js'

export default {
  name: 'PipeLine',
  setup() {
    const { isLoading, isError, data: pipeLine, refetch } = useDashboardPipeLine()

    return {
      IconTotal,
      IconMembers,
      IconUpArrow,
      IconPipeLineEmpty,
      isLoading,
      isError,
      pipeLine,
      refetch,
      currencyCompact,
      IconTotalGray,
    }
  },
}
</script>
