<template>
  <div>
    <div class="border box-border color-light-gray rounded-lg">
      <div
        class="
          text-smm
          font-medium
          text-main
          py-5
          pl-5
          flex
          justify-between
          px-5
        "
      >
        <span>Opportunity details</span>
        <router-link :to="{ name: 'add-opportunity' }">
          <div
            class="
              h-9
              bg-color-grey
              rounded-md
              border-input-border border
              flex
              items-center
              justify-center
              text-primary text-xss
              cursor-pointer
            "
          >
            <span class="px-2">
              <InlineSvg :src="IconPlus" />
            </span>
            <div class="pr-2">Add opportunity</div>
          </div>
        </router-link>
      </div>
      <div class="flex h-12 bg-widget-bg">
        <div class="w-2/12 title">Opportunity name</div>
        <div class="w-2/12 title">Account name</div>
        <div class="w-2/12 title">Account owner</div>
        <div class="w-2/12 title">Amount</div>
        <div class="w-2/12 title">Stage</div>
        <div class="w-2/12 title">Close date</div>
      </div>

      <div class="flex h-12 border-b border-title-gray">
        <div class="w-2/12 item"></div>
        <div class="w-2/12 item"></div>
        <div class="w-2/12 item"></div>
        <div class="w-2/12 item"></div>
        <div class="w-2/12 item"></div>
        <div class="w-2/12 item"></div>
      </div>
      <div class="flex h-12 border-b border-title-gray">
        <div class="w-2/12 item"></div>
        <div class="w-2/12 item"></div>
        <div class="w-2/12 item"></div>
        <div class="w-2/12 item"></div>
        <div class="w-2/12 item"></div>
        <div class="w-2/12 item"></div>
      </div>
      <div class="flex h-12">
        <div class="w-2/12 item"></div>
        <div class="w-2/12 item"></div>
        <div class="w-2/12 item"></div>
        <div class="w-2/12 item"></div>
        <div class="w-2/12 item"></div>
        <div class="w-2/12 item"></div>
      </div>
    </div>
  </div>
</template>

<script>
import IconPlus from '@/assets/svg/icon-plus.svg'

export default {
  nsme: 'OpportunityTable',
  setup() {
    return {
      IconPlus,
    }
  },
}
</script>

<style scoped>
.title {
  @apply border-r border-b border-title-gray text-small text-gray03 flex items-center justify-center uppercase text-center last:border-r-0;
}

.item {
  @apply border-r  text-xs text-text-light-gray flex items-center justify-center uppercase text-center last:border-r-0;
}
</style>
