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

    <LastActivityItem
      v-for="(item, index) in lastActivity"
      :key="index"
      :item="item"
      :index="index"
      class="active-item"
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

<style scoped>
.active-item:not(:first-of-type) {
  border-top: 1px solid #ebf0fa;
  margin-left: -20px;
  margin-right: -20px;
  padding: 20px;
}
</style>
