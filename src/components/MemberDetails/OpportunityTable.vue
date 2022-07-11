<template>
  <div>
    <div class="border box-border color-light-gray rounded-lg h-[269px]">
      <div class="pt-5 pb-3 pl-5 flex justify-between px-5">
        <el-badge :value="getCount" :max="99" class="mr-8" :type="getCount ? 'primary' : 'info'" :hidden="isLoading">
          <span class="text-main text-smm font-semibold">Child Opportunities</span>
        </el-badge>

        <router-link :to="{ name: 'add-opportunity', params: { id: prospectId } }">
          <div
            class="
              h-8
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
            <div class="pr-2">Add child opportunity</div>
          </div>
        </router-link>
      </div>
      <div class="flex h-8 bg-widget-bg">
        <div class="w-9/24 title">Opportunity name</div>
        <div class="w-4/24 title">Amount</div>
        <div class="w-6/24 title">Stage</div>
        <div class="w-4/24 title">Close date</div>
        <div class="w-1/24 title" />
      </div>
      <el-skeleton v-if="isLoading || isLoadingUserProfile || isLoadingProspectDetails" :rows="2" animated />
      <SwdErrorBlock v-else-if="isError || isErrorUserProfile || isErrorProspectDetails" />
      <div v-else-if="data && member && userProfile">
        <el-scrollbar v-if="data.length" height="155px">
          <OpportunityItem
            v-for="(user, index) in data"
            :key="index"
            :user="user"
            :prospect="member"
            :user-profile="userProfile"
            class="oportunity-item"
          >
            {{ user }}
          </OpportunityItem>
        </el-scrollbar>
        <div v-else class="text-center text-gray03 text-sm pt-20">No recently added opportunities</div>
      </div>
      <el-skeleton v-else :rows="2" animated class="w-full p-3" />
    </div>
  </div>
</template>

<script>
import IconPlus from '@/assets/svg/icon-plus.svg'
import { useRoute } from 'vue-router'
import OpportunityItem from '@/components/MemberDetails/OpportunityItem.vue'
import { useOpportunityList } from '@/api/use-opportunity-list.js'
import { useUserProfile } from '@/api/use-user-profile.js'
import { useProspectDetails } from '@/api/use-prospect-details.js'
import { computed } from 'vue'

export default {
  name: 'OpportunityTable',
  components: {
    OpportunityItem,
  },
  setup() {
    const route = useRoute()
    const prospectId = route.params.id

    const { isLoading, isError, data } = useOpportunityList(prospectId)

    const { isLoading: isLoadingUserProfile, isError: isErrorUserProfile, data: userProfile } = useUserProfile()

    const { isLoading: isLoadingProspectDetails, isError: isErrorProspectDetails, data: member } = useProspectDetails()

    const getCount = computed(() => {
      return data.value?.length
    })

    return {
      IconPlus,
      prospectId,
      isLoading,
      isError,
      data,
      isLoadingUserProfile,
      isErrorUserProfile,
      userProfile,
      isLoadingProspectDetails,
      isErrorProspectDetails,
      member,
      getCount,
    }
  },
}
</script>

<style scoped>
.title {
  @apply text-small text-gray03 flex items-center uppercase first:pl-2;
}

.oportunity-item {
  @apply mr-3 hover:bg-gray-200;
}
/* .title {
  @apply border-b border-title-gray text-small text-gray03 flex items-center uppercase first:pl-2;
}

.oportunity-item {
  @apply border-b border-title-gray mr-3;
} */
</style>
