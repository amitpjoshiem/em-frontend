<template>
  <SwdNativeSelect :options="actions" :init-value="initValue" @select="handleSelectFilter" />
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'SwdSelectFilter',
  props: {
    actionsItemsPerPage: {
      type: Array,
      require: true,
      default: () => [],
    },
    destination: {
      type: String,
      require: true,
      default: 'pipeLine',
    },
  },
  setup(props) {
    const store = useStore()

    const initValue = computed(() => store.state.globalComponents.selectFilter.values[props.destination])

    const actions = computed(() => store.state.globalComponents.selectFilter.options)

    const handleSelectFilter = (command) => {
      store.commit('globalComponents/setDestinationSelectFilter', {
        destination: props.destination,
        value: command,
      })
    }

    return {
      handleSelectFilter,
      initValue,
      actions,
    }
  },
}
</script>
