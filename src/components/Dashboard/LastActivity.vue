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
    <span class="text-smm text-main">Last Activity</span>

    <LastActivityItem
      v-for="(item, index) in lastActivity"
      :key="index"
      :item="item"
      :index="index"
    />
  </div>
</template>
<script>
import LastActivityItem from '@/components/Dashboard/LastActivityItem.vue'
export default {
  name: 'LastActivity',

  components: {
    LastActivityItem,
  },
  setup() {},
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
