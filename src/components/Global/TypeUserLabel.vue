<template>
  <div>
    <span
      class="text-xss py-0.5 px-2 border border-opacity-50 rounded capitalize"
      :class="{
        'text-activity border-color-blue-border bg-color-light-blue': userType === 'prospect',
        'text-orange-badge border-orange-border bg-orange-bg': userType === 'client',
      }"
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
      default: 'prospect',
    },
  },
}
</script>
