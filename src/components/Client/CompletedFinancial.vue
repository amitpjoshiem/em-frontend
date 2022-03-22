<template>
  <div class="p-5 lg:max-w-5xl lg:my-0 lg:mx-auto">
    <SwdSubHeader title="Completed Financial" />
    <StepsClient />
    <router-view />
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
