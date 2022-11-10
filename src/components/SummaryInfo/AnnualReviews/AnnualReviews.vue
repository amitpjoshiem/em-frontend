<template>
  <div class="border border-border-blue rounded-md p-5 mb-4">
    <div class="flex items-center mb-5">
      <InlineSvg :src="IconDoneStep" />
      <div class="text-main text-xl font-semibold ml-2">Annual Reviews</div>
    </div>
    <div v-for="(item, index) in member.salesforce.annualReviews" :key="index">
      <AnnualReviewsItem :annual-item="item" />
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
    member: {
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
