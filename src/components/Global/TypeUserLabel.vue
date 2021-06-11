<template>
  <div>
    <span
      class="
        text-activity text-xss
        py-0.5
        px-2
        bg-color-light-blue
        border border-color-blue-border border-opacity-50
        rounded
      "
    >
      {{ userType }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'TypeUserLabel',
  props: {
    userType: {
      type: String,
      require: true,
      default: 'Prospect',
    },
  },
}
</script>
