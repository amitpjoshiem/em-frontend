<template>
  <DropDown :options="actionsOptions" :title="'Adam K.'" user-action />
</template>
<script>
export default {
  setup() {
    const actionsOptions = [
      {
        title: 'Profile settings',
        command: 'profile-settings',
      },
      {
        title: 'Logout',
        command: 'logout',
        isSemiBold: true,
      },
    ]

    return {
      actionsOptions,
    }
  },
}
</script>
