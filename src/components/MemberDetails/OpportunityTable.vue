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
        <span>Child Opportunities</span>
        <router-link
          :to="{ name: 'add-opportunity', params: { id: prospectId } }"
        >
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

      <div v-if="!isLoading">
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

    const {
      isLoading: isLoadingUserProfile,
      isError: isErrorUserProfile,
      data: userProfile,
    } = useUserProfile()

    return {
      IconPlus,
      prospectId,
      isLoading,
      isError,
      data,
      isLoadingUserProfile,
      isErrorUserProfile,
      userProfile,
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
