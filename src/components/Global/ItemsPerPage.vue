<template>
  <div class="mr-2.5 flex items-center">
    <span class="text-xss text-text-gray mr-1.5">Items per page</span>
    <div class="w-16">
      <SwdSelect
        :options="actions"
        size="small"
        :init-value="initValue"
        @select="handleItemsPerPage"
      />
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ItemsPerPage',
  props: {
    actionsItemsPerPage: {
      type: Array,
      require: true,
      default: () => [],
    },
    destination: {
      type: String,
      require: true,
      default: 'defaultItemsPerPage',
    },
  },
  setup(props) {
    const store = useStore()

    const initValue = computed(
      () => store.state.globalComponents.itemsPerPage.values[props.destination]
    )

    const actions = computed(
      () => store.state.globalComponents.itemsPerPage.options
    )

    const handleItemsPerPage = (command) => {
      store.commit('globalComponents/setDestinationItemsPerPage', {
        destination: props.destination,
        value: command,
      })
    }

    return {
      handleItemsPerPage,
      initValue,
      actions,
    }
  },
}
</script>
