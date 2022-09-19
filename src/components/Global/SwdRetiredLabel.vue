<template>
  <span
    v-if="retired"
    class="text-xxs text-orange-badge font-semibold bg-orange-bg rounded pr-2 pl-1 py-1"
    data-testid="type-member-basic-information-prospect-retired"
  >
    Retired
  </span>
  <span
    v-else
    data-testid="type-member-basic-information-prospect-not-retired"
    class="text-border-green text-xxs font-semibold bg-main-green rounded pr-2 pl-1 py-1"
  >
    Not Retired
  </span>
</template>

<script>
export default {
  name: 'SwdRetiredLabel',
  props: {
    retired: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  setup() {},
}
</script>
