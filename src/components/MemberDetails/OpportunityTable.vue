<template>
  <div>
    <div class="border box-border color-main-gray rounded-lg h-[295px]">
      <div class="pt-5 pb-3 pl-5 flex justify-between px-5">
        <el-badge :value="getCount" :max="99" class="mr-8" :type="getCount ? 'primary' : 'info'" :hidden="isLoading">
          <SwdWidgetTitle text="Child Opportunities" />
        </el-badge>
        <SwdButton
          v-if="!$can('client', 'all') && !$can('support', 'all')"
          primary
          small
          @click="showModalAddChildOpportunity"
        >
          <InlineSvg :src="IconPlus" class="mr-1.5" />
          Add child opportunity
        </SwdButton>
      </div>
      <div class="flex h-8 bg-main-gray">
        <div class="w-8/24 title">Opportunity name</div>
        <div class="w-4/24 title">Amount</div>
        <div class="w-6/24 title">Stage</div>
        <div class="w-4/24 title">Close date</div>
        <div class="w-1/24 title" />
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
        <div v-else class="text-center text-main text-sm pt-20">No recently added opportunities</div>
      </div>
      <el-skeleton v-else :rows="2" animated class="w-full p-3" />
    </div>
    <ModalAddChildOpportunity />
  </div>
</template>

<script>
import IconPlus from '@/assets/svg/icon-plus.svg'
import OpportunityItem from '@/components/MemberDetails/OpportunityItem.vue'
import ModalAddChildOpportunity from '@/components/MemberDetails/ModalAddChildOpportunity.vue'
import { useRoute } from 'vue-router'
import { useOpportunityList } from '@/api/use-opportunity-list.js'
import { useUserProfile } from '@/api/use-user-profile.js'
import { useProspectDetails } from '@/api/use-prospect-details.js'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'OpportunityTable',
  components: {
    OpportunityItem,
    ModalAddChildOpportunity,
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const prospectId = route.params.id

    const { isLoading, isError, data } = useOpportunityList(prospectId)

    const { isLoading: isLoadingUserProfile, isError: isErrorUserProfile, data: userProfile } = useUserProfile()

    const { isLoading: isLoadingProspectDetails, isError: isErrorProspectDetails, data: member } = useProspectDetails()

    const getCount = computed(() => {
      return data.value?.length
    })

    const showModalAddChildOpportunity = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'addChildOpportunity',
        value: true,
      })
    }

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
      showModalAddChildOpportunity,
    }
  },
}
</script>

<style scoped>
.title {
  @apply text-small text-main flex items-center uppercase first:pl-2;
}
</style>
