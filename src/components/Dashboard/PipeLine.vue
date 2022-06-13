<template>
  <div class="p-5 bg-widget-bg rounded-lg">
    <div class="flex justify-between items-center">
      <router-link :to="{ name: getLink }" class="text-smm font-medium hover:text-activity">Pipe Line</router-link>
      <SwdSelectFilter destination="pipeLine" />
    </div>
    <el-skeleton v-if="isLoading" :rows="4" animated />
    <SwdErrorBlock v-else-if="isError" />
    <div v-else-if="pipeLine" class="pt-6 flex justify-between sm:mb-5 xl:mb-0">
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
            :class="{
              'bg-color-green': pipeLine.data.new_members,
              'bg-input-border': pipeLine.data.new_members === null,
            }"
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
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

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
    const store = useStore()

    const { isLoading, isFetching, isError, data: pipeLine, refetch } = useDashboardPipeLine()

    const getCurrentTypeUser = computed(() => {
      return store.state.globalComponents.currentTypeUser
    })

    const getLink = computed(() => {
      if (getCurrentTypeUser.value === 'advisor') return 'pipeline'
      if (getCurrentTypeUser.value === 'admin') return 'admin-pipeline'
      if (getCurrentTypeUser.value === 'ceo') return 'ceo-pipeline'
      return '404'
    })

    return {
      IconTotal,
      IconMembers,
      IconUpArrow,
      IconPipeLineEmpty,
      isLoading,
      isFetching,
      isError,
      pipeLine,
      refetch,
      currencyCompact,
      IconTotalGray,

      getLink,
    }
  },
}
</script>
