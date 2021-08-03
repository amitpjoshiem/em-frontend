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
import { useListHouseholders } from '@/api/use-list-householders.js'
import UsersListTable from '@/components/UsersListTable/UsersListTable.vue'
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ListClients',
  components: {
    UsersListTable,
  },
  setup() {
    const store = useStore()

    const dataListClient = reactive({
      page: 1,
    })

    const { isLoading, isError, data, pagination } = useListHouseholders({
      type: 'client',
      page: dataListClient,
    })

    const rows = computed(
      () => store.state.globalComponents.itemsPerPage.values.dashboard
    )

    const handleSelect = (page) => {
      dataListClient.page = page
    }

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
