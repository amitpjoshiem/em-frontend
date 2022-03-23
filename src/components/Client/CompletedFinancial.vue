<template>
  <div class="p-5">
    <NewClientHeader />
    <StepsClient />
    <router-view />
  </div>
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
