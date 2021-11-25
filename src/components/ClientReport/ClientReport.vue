<template>
  <div v-if="!isLoading" class="p-5">
    <div class="pb-5 flex">
      <div class="w-3/12">
        <router-link :to="{ name: 'list-of-households' }">
          <BackButton text="Back" @click="$router.go(-1)" />
        </router-link>
      </div>

      <div class="w-6/12 text-center">
        <!-- <span class="text-title text-color-link font-semibold">{{ member.name }}</span> -->
        <span class="text-title text-main font-semibold"> Client report</span>
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

    <div class="flex w-full" data-pdf-region="client-report">
      <div class="w-6/12 mr-2">
        <CurrentYear v-for="item in clientReport.data.current_year" :key="item.id" :contract="item" />
      </div>
      <div class="w-6/12 ml-2">
        <SinceInception v-for="item in clientReport.data.since_inception" :key="item.id" :contract="item" />
      </div>
    </div>
    <TotalInfo />
  </div>
  <el-skeleton v-else :rows="rows" animated class="p-5" />
</template>
<script>
import { useRoute } from 'vue-router'
import { reactive, toRefs } from 'vue'
import CurrentYear from '@/components/ClientReport/CurrentYear.vue'
import SinceInception from '@/components/ClientReport/SinceInception.vue'
import TotalInfo from '@/components/ClientReport/TotalInfo.vue'

import { useClientReports } from '@/api/use-fetch-client-reports.js'

export default {
  name: 'ClientReport',
  components: {
    CurrentYear,
    SinceInception,
    TotalInfo,
  },
  setup() {
    const route = useRoute()

    const state = reactive({
      value: '',
    })

    const { isLoading, isError, data: clientReport } = useClientReports(route.params.id)

    return {
      isLoading,
      isError,
      clientReport,
      ...toRefs(state),
    }
  },
}
</script>
