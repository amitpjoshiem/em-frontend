<template>
  <div class="p-5">
    <SwdSubHeader title="Completed Financial" />
    <StepsClient />

    <!-- <el-steps :active="active" finish-status="success">
      <el-step title="Step 1" />
      <el-step title="Step 2" />
      <el-step title="Step 3" />
    </el-steps> -->

    <!-- <AddProspectBasicInfo v-if="active === 1" /> -->

    <div class="flex justify-end p-5">
      <el-button v-if="active !== 3" @click="next">Next step</el-button>
      <el-button v-if="active === 3" type="primary" plain>Save</el-button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
// import AddProspectBasicInfo from '../NewProspect/AddProspectBasicInfo.vue'
import StepsClient from './StepsClient.vue'
export default {
  name: 'CompletedFinancial',
  components: {
    // AddProspectBasicInfo,
    StepsClient,
  },
  setup() {
    const active = ref(0)

    const next = () => {
      if (active.value++ > 2) active.value = 0
    }

    return {
      active,
      next,
    }
  },
}
</script>
