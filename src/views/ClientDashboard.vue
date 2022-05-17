<template>
  <div>
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
