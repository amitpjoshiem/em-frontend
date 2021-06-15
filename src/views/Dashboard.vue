<template>
  <div class="container px-5">
    <HeaderDashboard />
    <div class="flex">
      <Assets class="w-2/3" />
      <div class="w-1/3 flex flex-col justify-between">
        <PipeLine />
        <LastActivity />
      </div>
    </div>
  </div>
</template>

<script>
// import { onMounted } from 'vue'
import PipeLine from '@/components/Dashboard/PipeLine.vue'
import HeaderDashboard from '@/components/Dashboard/HeaderDashboard.vue'
import LastActivity from '@/components/Dashboard/LastActivity.vue'
import Assets from '@/components/Dashboard/Assets.vue'

// import { useFetch } from '@/api/use-fetch'

export default {
  name: 'Dashboard',
  components: {
    PipeLine,
    LastActivity,
    Assets,
    HeaderDashboard,
  },
  setup() {
    // const { response, error, fetching, fetchData } = useFetch('/users/profile')
    // onMounted(() => {
    //   fetchData()
    // })
    // return { response, error, fetching }
  },
}
</script>
