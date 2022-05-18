<template>
  <div
    class="
      h-[30px]
      bg-color-grey
      rounded-md
      border-input-border border
      flex
      items-center
      justify-center
      text-primary text-xss
      cursor-pointer
      mr-5
    "
    @click="newLead"
  >
    <span class="px-2">
      <InlineSvg :src="IconPlus" />
    </span>
    <div class="pr-2">Add new lead</div>
  </div>
</template>

<script>
import IconPlus from '@/assets/svg/icon-plus.svg'
import { useStore } from 'vuex'

export default {
  name: 'NewLeadBtn',
  setup() {
    const store = useStore()

    const newLead = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'newLead',
        value: true,
      })
    }
    return {
      IconPlus,
      newLead,
    }
  },
}
</script>
