<template>
  <div class="flex h-12">
    <div class="w-2/12 item">{{ user.name }}</div>
    <div class="w-2/12 item">
      {{ prospect.firstName }} {{ prospect.lastName }}
    </div>
    <div class="w-2/12 item"></div>
    <div class="w-2/12 item">{{ user.amount }}</div>
    <div class="w-2/12 item">{{ user.stage_name }}</div>
    <div class="w-2/12 item">{{ user.close_date }}</div>
  </div>
</template>
<script>
export default {
  name: 'OpportunityItem',
  props: {
    user: {
      type: Object,
      required: true,
    },
    prospect: {
      type: Object,
      required: true,
    },
  },
}
</script>
