<template>
  <div class="border border-border-blue rounded-md p-5 mb-4">
    <div class="flex items-center mb-5">
      <InlineSvg :src="IconDoneStep" />
      <div class="text-main text-xl font-semibold ml-2">Annual Reviews</div>
    </div>
    <div v-if="!annualReviews.length" class="text-center">
      <p class="text-main text-xss mt-3">No recently added annual reviews</p>
    </div>
    <div v-for="(item, index) in annualReviews" :key="index">
      <AnnualReviewsItem :annual-item="item" />
      <el-divider v-if="annualReviews.length > 1 && index !== annualReviews.length - 1" border-style="dashed" />
    </div>
  </div>
</template>

<script>
import IconDoneStep from '@/assets/svg/icon-done-step.svg'
import AnnualReviewsItem from './AnnualReviewsItem.vue'

export default {
  name: 'AnnualReviewsInfo',
  components: {
    AnnualReviewsItem,
  },
  props: {
    annualReviews: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  setup() {
    return {
      IconDoneStep,
    }
  },
}
</script>
