<template>
  <div class="px-5">
    <HeaderDashboard />
    <ClientInformation />
  </div>
</template>

<script>
import HeaderDashboard from '@/components/Dashboard/HeaderDashboard.vue'
import ClientInformation from '@/components/Client/ClientInformation.vue'

export default {
  name: 'ClientDashboard',
  components: {
    HeaderDashboard,
    ClientInformation,
  },
}
</script>
