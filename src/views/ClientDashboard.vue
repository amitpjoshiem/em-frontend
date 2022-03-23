<template>
  <div class="px-5">
    <HeaderDashboardClient />
    <ClientInformation />
  </div>
</template>

<script>
import HeaderDashboardClient from '@/components/Client/HeaderDashboardClient.vue'
import ClientInformation from '@/components/Client/ClientInformation.vue'

export default {
  name: 'ClientDashboard',
  components: {
    HeaderDashboardClient,
    ClientInformation,
  },
}
</script>
