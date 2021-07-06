<template>
  <div class="flex pt-5 pb-5 justify-between">
    <div class="text-2xl font-medium">
      <span>{{ clientWidth }}</span>
      <span>Welcome, Adam!</span>
    </div>
    <ShareBtn />
  </div>
</template>
<script>
export default {
  name: 'PipeLine',
  setup() {
    console.log(document.documentElement.clientWidth)
    const clientWidth = document.documentElement.clientWidth
    return { clientWidth }
  },
}
</script>
