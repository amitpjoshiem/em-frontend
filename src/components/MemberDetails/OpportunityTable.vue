<template>
  <div>
    <div class="border box-border color-light-gray rounded-lg">
      <div class="text-smm font-medium text-main py-5 pl-5 flex justify-between px-5">
        <span>Child Opportunities</span>
        <router-link :to="{ name: 'add-opportunity', params: { id: prospectId } }">
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
        <div class="w-8/24 title">Opportunity name</div>
        <div class="w-4/24 title">Account name</div>
        <div class="w-4/24 title">Amount</div>
        <div class="w-4/24 title">Stage</div>
        <div class="w-3/24 title">Close date</div>
        <div class="w-1/24 title" />
      </div>

      <div v-if="!isLoading">
        <template v-if="data.length">
          <OpportunityItem
            v-for="(user, index) in data"
            :key="index"
            :user="user"
            :prospect="prospect"
            :user-profile="userProfile"
            class="oportunity-item"
          >
            {{ user }}
          </OpportunityItem>
        </template>
        <div v-else class="text-center py-2">
          <span class="text-main text-sm"> No recently added opportunities </span>
        </div>
      </div>
      <el-skeleton v-else :rows="6" animated class="w-full p-3" />
    </div>
  </div>
</template>

<script>
import IconPlus from '@/assets/svg/icon-plus.svg'
import { useRoute } from 'vue-router'
import OpportunityItem from '@/components/MemberDetails/OpportunityItem.vue'
import { useOpportunityList } from '@/api/use-opportunity-list.js'
import { useUserProfile } from '@/api/use-user-profile.js'
import { isEmptyObject } from '@/utils/use-empty-object'

export default {
  name: 'OpportunityTable',
  components: {
    OpportunityItem,
  },
  props: {
    prospect: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const route = useRoute()
    const prospectId = route.params.id

    const { isLoading, isError, data } = useOpportunityList(prospectId)

    const { isLoading: isLoadingUserProfile, isError: isErrorUserProfile, data: userProfile } = useUserProfile()

    return {
      IconPlus,
      prospectId,
      isLoading,
      isError,
      data,
      isLoadingUserProfile,
      isErrorUserProfile,
      userProfile,
      isEmptyObject,
    }
  },
}
</script>

<style scoped>
.title {
  @apply border-r border-b border-title-gray text-small text-gray03 flex items-center justify-center uppercase text-center last:border-r-0;
}

.oportunity-item {
  @apply border-b border-title-gray last:border-b-0;
}
</style>
