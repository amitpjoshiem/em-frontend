<template>
  <div v-if="!isLoading" class="p-5">
    <div class="pb-5 flex">
      <div class="w-3/12">
        <router-link :to="{ name: 'list-of-households' }">
          <BackButton text="Back" @click="$router.go(-1)" />
        </router-link>
      </div>

      <div class="w-6/12 text-center">
        <span class="text-title text-color-link font-semibold">{{ member.name }}</span>
        <span class="text-title text-main font-semibold">Client report</span>
      </div>

      <div class="flex items-center w-4/12">
        <div class="mr-2">
          <el-date-picker
            v-model="value"
            type="daterange"
            start-placeholder="Start date"
            end-placeholder="End date"
            size="small"
          />
        </div>
        <ShareBtn pdf-region="client-report" />
      </div>
    </div>

    <div data-pdf-region="client-report">
      <div class="flex mb-5">
        <CurrentYear />
        <SinceInception />
      </div>
      <div class="flex mb-5">
        <CurrentYear />
        <SinceInception />
      </div>
      <div class="flex mb-5">
        <CurrentYear />
        <SinceInception />
      </div>
    </div>
    <TotalInfo />
  </div>
  <el-skeleton v-else :rows="rows" animated class="p-5" />
</template>
<script>
import { useClientReport } from '@/api/use-client-report.js'
import { useRoute } from 'vue-router'
import { reactive, toRefs } from 'vue'
import CurrentYear from '@/components/ClientReport/CurrentYear.vue'
import SinceInception from '@/components/ClientReport/SinceInception.vue'
import TotalInfo from '@/components/ClientReport/TotalInfo.vue'

export default {
  name: 'ClientReport',
  components: {
    CurrentYear,
    SinceInception,
    TotalInfo,
  },
  setup() {
    const route = useRoute()
    const id = route.params.id

    const state = reactive({
      value: '',
    })

    const { isLoading, isError, data: member, spouse } = useClientReport(id)

    return {
      isLoading,
      isError,
      member,
      spouse,
      ...toRefs(state),
    }
  },
}
</script>
