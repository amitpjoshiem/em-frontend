<template>
  <div class="border-b border-color-grey flex h-14">
    <router-link :to="{ name: 'profile' }">
      <div class="p-5 active text-sm text-gray03 cursor-pointer">
        Profile settings
      </div>
    </router-link>

    <router-link :to="{ name: 'notifications' }">
      <div class="p-5 text-sm text-gray03 cursor-pointer">
        Notifications settings
      </div>
    </router-link>

    <router-link :to="{ name: 'information' }">
      <div class="p-5 text-sm text-gray03 cursor-pointer">Information</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'SettingsHeader',
}
</script>
