<template>
  <div class="flex items-center">
    <SwdAvatar />
    <router-link
      :to="{
        name: step ? 'member-details' : 'basic-information',
        params: { id: id },
      }"
      class="pl-2.5 text-main text-xss font-semibold"
    >
      {{ name }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'UserListName',
  props: {
    step: {
      type: Number,
      require: true,
      default: 0,
    },
    id: {
      type: String,
      require: true,
      default: '',
    },
    name: {
      type: String,
      require: true,
      default: '',
    },
  },
  setup() {},
}
</script>
