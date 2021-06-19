<template>
  <div class="flex justify-between">
    <router-link :to="{ name: 'dashboard' }">
      <BackButton />
    </router-link>
    <span class="text-title text-main font-semibold">Basic information</span>
    <router-link :to="{ name: 'dashboard' }">
      <NextButton />
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'NewProspectHeader',
}
</script>
