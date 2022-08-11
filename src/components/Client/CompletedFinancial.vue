<template>
  <SwdWrapper>
    <NewClientHeader />
    <StepsClient />
    <router-view />
  </SwdWrapper>
</template>

<script>
import StepsClient from './StepsClient.vue'
import NewClientHeader from './AddNewClient/NewClientHeader.vue'
export default {
  name: 'CompletedFinancial',
  components: {
    StepsClient,
    NewClientHeader,
  },
  setup() {
    return {}
  },
}
</script>
