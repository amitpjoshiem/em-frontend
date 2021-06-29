<template>
  <div
    class="
      row-span-2
      col-span-1
      bg-widget-bg
      rounded-[10px]
      font-semibold
      pl-5
      pt-5
      pr-5
    "
  >
    <p class="text-smm text-main pb-2.5">Last Activity</p>

    <div v-if="!isEmptyDashboard">
      <LastActivityItem
        v-for="(item, index) in lastActivity"
        :key="index"
        :item="item"
        :index="index"
        class="active-item"
      />
    </div>
    <div
      v-if="isEmptyDashboard"
      class="flex flex-col justify-center items-center pb-8 pt-4"
    >
      <div
        class="
          w-14
          h-14
          rounded-full
          bg-color-grey
          items-center
          justify-center
          flex
        "
      >
        <InlineSvg :src="IconLastActivityEmpty" class="w-5" />
      </div>
      <span class="text-gray03 text-xss pt-3">No recently activity</span>
    </div>
  </div>
</template>
<script>
import LastActivityItem from '@/components/Dashboard/LastActivityItem.vue'
import IconLastActivityEmpty from '@/assets/svg/icon-last-activity-empty.svg'
import { useEmptyDashboard } from '@/utils/useEmptyDashboard'

export default {
  name: 'LastActivity',

  components: {
    LastActivityItem,
  },
  setup() {
    const isEmptyDashboard = useEmptyDashboard()

    return {
      IconLastActivityEmpty,
      isEmptyDashboard,
    }
  },
  data() {
    return {
      lastActivity: [
        {
          data: '5:07pm, today',
          text: 'You have share statistics to Carolyn Flores mail',
        },
        {
          data: '5:07pm, today',
          text: 'You have changed Norma Barnett profile info',
        },
      ],
    }
  },
}
</script>

<style scoped>
.active-item:not(:first-of-type) {
  border-top: 1px solid #ebf0fa;
  margin-left: -20px;
  margin-right: -20px;
  padding: 20px;
}
</style>
