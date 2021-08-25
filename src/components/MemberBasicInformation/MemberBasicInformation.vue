<template>
  <SubHeader
    class="p-5"
    :title="getTitle"
    back-page="member-details"
    back-page-title="Prospect details"
  />
  <el-skeleton v-if="isLoading" :rows="11" animated class="p-5" />

  <div v-else class="p-5">
    <div>
      <div class="flex items-center">
        <Avatar :size="'big'" :link="prospect.avatar" />
        <span class="text-main text-xl font-semibold ml-7">
          {{ prospect.name }}
        </span>
      </div>
    </div>

    <MemberBasicInformationGeneral
      :prospect="prospect"
      :spouse="spouse.value"
      :employment-prospect="employmentProspect.value"
      :employment-spouse="employmentSpouse.value"
    />
    <MemberHousingInformation :house="house.value" />
    <MemberBasicInformationOther :other="other.value" />
  </div>
</template>
<script>
import MemberBasicInformationGeneral from '@/components/MemberBasicInformation/MemberBasicInformationGeneral.vue'
import MemberHousingInformation from '@/components/MemberBasicInformation/MemberHousingInformation.vue'
import MemberBasicInformationOther from '@/components/MemberBasicInformation/MemberBasicInformationOther.vue'
import { useProspectDetails } from '@/api/use-prospect-details.js'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'MemberBasicInformation',
  components: {
    MemberBasicInformationGeneral,
    MemberHousingInformation,
    MemberBasicInformationOther,
  },
  setup() {
    const route = useRoute()
    const id = route.params.id

    const {
      isLoading,
      isError,
      data,
      house,
      spouse,
      employment,
      other,
      employmentProspect,
      employmentSpouse,
    } = useProspectDetails(id)

    const getTitle = computed(() => {
      if (data.value && data.value.type === 'prospect')
        return 'Prospect details'
      return 'Client details'
    })

    return {
      isLoading,
      isError,
      house,
      spouse,
      employment,
      other,
      prospect: data,
      employmentProspect,
      employmentSpouse,
      getTitle,
    }
  },
}
</script>
