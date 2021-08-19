<template>
  <SubHeader
    class="p-5"
    title="Prospect Details"
    back-page="prospect-details"
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

    <ProspectBasicInformationGeneral
      :prospect="prospect"
      :spouse="spouse.value"
      :employment-prospect="employmentProspect.value"
      :employment-spouse="employmentSpouse.value"
    />
    <ProspectHousingInformation :house="house.value" />
    <ProspectBasicInformationOther :other="other.value" />
  </div>
</template>
<script>
import ProspectBasicInformationGeneral from '@/components/ProspectBasicInformation/ProspectBasicInformationGeneral.vue'
import ProspectHousingInformation from '@/components/ProspectBasicInformation/ProspectHousingInformation.vue'
import ProspectBasicInformationOther from '@/components/ProspectBasicInformation/ProspectBasicInformationOther.vue'
import { useProspectDetails } from '@/api/use-prospect-details.js'
import { useRoute } from 'vue-router'

export default {
  name: 'ProspectBasicInformation',
  components: {
    ProspectBasicInformationGeneral,
    ProspectHousingInformation,
    ProspectBasicInformationOther,
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
    }
  },
}
</script>
