<template>
  <div class="p-5 flex w-full">
    <div
      class="
        border-b-2 border-gray-500
        flex-grow
        text-center text-xs
        active-step
      "
    >
      1. Basic
    </div>
    <div class="border-b-2 border-gray-500 flex-grow text-center text-xs">
      2. assets
    </div>
    <div class="border-b-2 border-gray-500 flex-grow text-center text-xs">
      3. Assets Accounts
    </div>
    <div class="border-b-2 border-gray-500 flex-grow text-center text-xs">
      4. Assets Consolidations
    </div>
    <div class="border-b-2 border-gray-500 flex-grow text-center text-xs">
      5. Stress Test
    </div>
  </div>
</template>
<script>
export default {
  name: 'NewProspectSteps',
}
</script>

<style>
.active-step {
  border-bottom: 2px solid #66b6ff;
}
.active-step:after {
  content: '';
  width: 9px;
  height: 9px;
  background-color: red;
  position: absolute;
}
</style>
