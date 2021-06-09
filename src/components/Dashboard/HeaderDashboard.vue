<template>
  <div class="flex pt-5 pb-5 justify-between">
    <div class="text-2xl font-semibold">
      <span>Welcome, Adam!</span>
    </div>
    <ShareBtn />
  </div>
</template>
<script>
import ShareBtn from '@/components/Button/ShareBtn.vue'
export default {
  name: 'PipeLine',
  components: {
    ShareBtn,
  },
}
</script>
