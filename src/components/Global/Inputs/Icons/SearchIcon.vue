<template>
  <span class="absolute inset-y-0 left-0 flex items-center">
    <button type="button" class="pl-[11px] focus:outline-none focus:shadow-outline">
      <InlineSvg :src="IconSearch" />
    </button>
  </span>
</template>

<script>
import IconSearch from '@/assets/svg/icon-search.svg'
export default {
  name: 'SearchInputIcon',
  setup() {
    return { IconSearch }
  },
}
</script>
