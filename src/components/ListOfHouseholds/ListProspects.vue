<template>
  <div>
    <template v-if="!isLoading">
      <UsersListTable
        v-if="!isLoading"
        :items-header="itemsHeader"
        :users-list="data"
      />
      <div
        class="flex items-center justify-center border-t border-color-grey py-6"
      >
        <Pagination :options="pagination.value" @selectPage="handleSelect" />
      </div>
    </template>

    <el-skeleton v-else :rows="rows" animated class="p-5" />
  </div>
</template>

<script>
import { itemsHeader } from '@/components/ListOfHouseholds/itemsHeaderTable'
import UsersListTable from '@/components/UsersListTable/UsersListTable.vue'
import { useListHouseholders } from '@/api/use-list-householders.js'
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ListProspects',
  components: {
    UsersListTable,
  },
  setup() {
    const store = useStore()

    const dataListProspect = reactive({
      page: 1,
    })

    const { isLoading, isError, data, pagination } = useListHouseholders({
      type: 'prospect',
      page: dataListProspect,
    })

    const handleSelect = (page) => {
      dataListProspect.page = page
    }

    const rows = computed(
      () => store.state.globalComponents.itemsPerPage.values.dashboard
    )

    return {
      itemsHeader,
      isLoading,
      isError,
      data: data,
      pagination: pagination,
      handleSelect,
      rows,
    }
  },
}
</script>
