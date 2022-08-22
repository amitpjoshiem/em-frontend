<template>
  <div class="w-full border border-color-grey box-border rounded-md p-5 h-[269px]">
    <div class="flex justify-between items-center text-smm font-semibold">
      <SwdWidgetTitle text="Fixed Annuity Index" />
      <SwdButton small class="mr-2" @click="more">More</SwdButton>
    </div>
    <el-skeleton v-if="isLoading" :rows="3" animated class="p-5" />

    <div v-else class="flex items-center justify-between">
      <WidgetFixedAnnuityItem :item="annuityIndex.data[0] ? annuityIndex.data[0] : {}" />
      <WidgetFixedAnnuityItem :item="annuityIndex.data[1] ? annuityIndex.data[1] : {}" />
      <WidgetFixedAnnuityItem :item="annuityIndex.data[2] ? annuityIndex.data[2] : {}" last-item />
    </div>
  </div>
</template>
<script>
import { useRouter, useRoute } from 'vue-router'
import { useAnnuityIndexLast } from '@/api/use-fetch-annuity-index-last.js'
import WidgetFixedAnnuityItem from '@/components/MemberDetails/WidgetFixedAnnuityItem.vue'

export default {
  name: 'WidgetFixedAnnuity',
  components: {
    WidgetFixedAnnuityItem,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()

    const { isLoading, isError, data: annuityIndex } = useAnnuityIndexLast(route.params.id)

    const more = () => {
      router.push({ name: 'annuity-index', params: { annuityId: route.params.id } })
    }

    return {
      more,
      isLoading,
      isError,
      annuityIndex,
    }
  },
}
</script>
