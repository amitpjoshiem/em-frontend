<template>
  <div class="relative bg-main-gray items-center h-16 flex px-3">
    <AdvisorHeader v-if="$can('advisor', 'all')" />
    <AdminCeoHeader v-if="$can('admin', 'all') || $can('ceo', 'all')" />
    <AssistantHeader v-if="$can('assistant', 'all')" />
    <SupportHeader v-if="$can('support', 'all')" />
    <LeadClientHeader v-if="$can('lead', 'all') || $can('client', 'all')" />
  </div>
</template>

<script>
import AdvisorHeader from '@/components/Header/RolesForHeader/AdvisorHeader.vue'
import SupportHeader from '@/components/Header/RolesForHeader/SupportHeader.vue'
import AdminCeoHeader from '@/components/Header/RolesForHeader/AdminCeoHeader.vue'
import AssistantHeader from '@/components/Header/RolesForHeader/AssistantHeader.vue'
import LeadClientHeader from '@/components/Header/RolesForHeader/LeadClientHeader.vue'

export default {
  name: 'Header',
  components: {
    AdvisorHeader,
    SupportHeader,
    AdminCeoHeader,
    AssistantHeader,
    LeadClientHeader,
  },
}
</script>
