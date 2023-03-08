<template>
  <div class="p-2 sm:p-5 lg:max-w-5xl lg:my-0 lg:mx-auto lg:w-[960px]">
    <SwdSubHeader class="p-5" title="Basic information" />
    <el-skeleton v-if="isLoading" :rows="11" animated class="p-5" />
    <SwdErrorBlock v-else-if="isError" />
    <div v-else class="p-5">
      <MemberBasicInformationAvatar :prospect="prospect" />
      <MemberBasicInformationGeneral :prospect="prospect" :spouse="spouse.value" />
      <MemberBasicInformationEmployment
        :prospect="prospect"
        :employment-prospect="employmentProspect.value"
        :employment-spouse="employmentSpouse.value"
      />
      <MemberHousingInformation :houses="houses.value" />
      <MemberBasicInformationOther :other="other.value" />
    </div>
  </div>
</template>
<script>
import MemberBasicInformationGeneral from '@/components/MemberBasicInformation/MemberBasicInformationGeneral.vue'
import MemberHousingInformation from '@/components/MemberBasicInformation/MemberHousingInformation.vue'
import MemberBasicInformationEmployment from '@/components/MemberBasicInformation/MemberBasicInformationEmployment.vue'
import MemberBasicInformationOther from '@/components/MemberBasicInformation/MemberBasicInformationOther.vue'
import MemberBasicInformationAvatar from '@/components/MemberBasicInformation/MemberBasicInformationAvatar.vue'

import { useProspectDetails } from '@/api/use-prospect-details.js'
import { useRoute } from 'vue-router'

export default {
  name: 'MemberBasicInformation',
  components: {
    MemberBasicInformationGeneral,
    MemberHousingInformation,
    MemberBasicInformationEmployment,
    MemberBasicInformationOther,
    MemberBasicInformationAvatar,
  },
  setup() {
    const route = useRoute()

    const id = route.params.id

    const {
      isLoading,
      isError,
      data: prospect,
      houses,
      spouse,
      employment,
      other,
      employmentProspect,
      employmentSpouse,
    } = useProspectDetails(id)

    return {
      isLoading,
      isError,
      houses,
      spouse,
      employment,
      other,
      prospect,
      employmentProspect,
      employmentSpouse,
    }
  },
}
</script>
