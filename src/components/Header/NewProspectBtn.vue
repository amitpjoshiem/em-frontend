<template>
  <SwdButton primary small class="mr-2" @click="newLead">
    <InlineSvg :src="IconPlus" class="mr-1.5" />
    New prosp
  </SwdButton>
</template>

<script>
import IconPlus from '@/assets/svg/icon-plus.svg'
import { useStore } from 'vuex'

export default {
  name: 'NewProspectBtn',
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
