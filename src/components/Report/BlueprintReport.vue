<template>
  <SwdSubHeader title="Blueprint report" class="p-5" with-share-btn region="blue-report" />
  <div v-if="!isLoadingMember" class="p-5">
    <div class="flex" data-pdf-region="blue-report">
      <div class="w-7/12">
        <div class="flex">
          <WidgetReport :member="member" />
          <IncomeGoal :member="member" />
        </div>
        <NetWorth />
        <Concerns />
      </div>
      <MonthlyIncome />
    </div>
    <NotesMember :notes="member.notes" />
  </div>
  <el-skeleton v-else :rows="10" animated class="p-5" />
</template>

<script>
import WidgetReport from '@/components/Report/WidgetReport.vue'
import IncomeGoal from '@/components/Report/IncomeGoal.vue'
import NetWorth from '@/components/Report/NetWorth.vue'
import Concerns from '@/components/Report/Concerns.vue'
import MonthlyIncome from '@/components/Report/MonthlyIncome.vue'
import NotesMember from '@/components/Report/NotesMember.vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useFetchMember } from '@/api/use-fetch-member'

export default {
  name: 'BlueprintReport',
  components: {
    IncomeGoal,
    NetWorth,
    WidgetReport,
    Concerns,
    MonthlyIncome,
    NotesMember,
  },

  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const { isLoading: isLoadingMember, data: member } = useFetchMember({ id: route.params.id })

    const step = computed(() => store.state.newProspect.step)

    const back = () => {
      store.commit('newProspect/setStep', step.value - 1)
      router.push({ name: 'stresstest' })
    }

    return {
      back,
      member,
      isLoadingMember,
    }
  },
}
</script>
