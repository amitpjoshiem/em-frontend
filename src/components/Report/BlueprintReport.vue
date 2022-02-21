<template>
  <SwdSubHeader title="Blueprint report" class="p-5" with-share-btn region="blue-report" />
  <div class="p-5">
    <div class="flex" data-pdf-region="blue-report">
      <div class="w-7/12">
        <div v-if="!fetchingMember" class="flex">
          <WidgetReport :member="member.data" />
          <IncomeGoal :member="member.data" />
        </div>
        <el-skeleton v-else :rows="3" animated class="p-5" />
        <NetWorth />
        <Concerns />
      </div>
      <MonthlyIncome />
    </div>
    <NotesMember :notes="member.data?.notes" />
  </div>
  <el-skeleton v-show="fetchingMember" :rows="10" animated class="p-5" />
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
import { computed, onMounted } from 'vue'
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

    const step = computed(() => store.state.newProspect.step)

    const back = () => {
      store.commit('newProspect/setStep', step.value - 1)
      router.push({ name: 'stresstest' })
    }

    onMounted(async () => {
      await getMember()
    })

    const {
      response: member,
      error: errorMember,
      fetching: fetchingMember,
      getMember,
    } = useFetchMember(route.params.id)

    return {
      back,
      member,
      errorMember,
      fetchingMember,
    }
  },
}
</script>
