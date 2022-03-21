<template>
  <div class="p-5">
    <SwdSubHeader title="Completed Financial" />
    <StepsClient />
    <router-view />
    <div class="flex justify-end p-5">
      <el-button v-if="active !== 3" @click="next">Next step</el-button>
      <el-button v-if="active === 3" type="primary" plain>Save</el-button>
    </div>
  </div>
</template>

<script>
import StepsClient from './StepsClient.vue'
export default {
  name: 'CompletedFinancial',
  components: {
    StepsClient,
  },
  setup() {
    return {}
  },
}
</script>
