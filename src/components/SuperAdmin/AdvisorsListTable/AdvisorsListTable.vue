<template>
  <el-table
    :data="usersList"
    style="width: 100%"
    row-class-name="row-class"
    cell-class-name="cell-class"
    header-cell-class-name="header-class"
    header-row-class-name="header-row-class"
    :default-sort="getDefaultSort"
    empty-text="No recently added opportunity"
    @sort-change="change"
  >
    <el-table-column prop="name" label="Name" min-width="240" sortable>
      <template #default="scope">
        <AdvisorsListName :advisor="scope.row" />
      </template>
    </el-table-column>

    <el-table-column label="E-mail" min-width="195">
      <template #default="scope">
        {{ scope.row.email }}
      </template>
    </el-table-column>

    <el-table-column prop="city" label="Position" min-width="170" class="text-xss">
      <template #default="scope">
        <SwdStubForText :text="scope.row.position" plug="&mdash;" class="text-main" />
      </template>
    </el-table-column>

    <el-table-column min-width="55">
      <template #default="scope">
        <SwdLeadActions v-if="scope.row.type === 'lead'" :user="scope.row" />
        <SwdMemberActions v-else :user="scope.row" class="border rounded" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { computed } from 'vue-demi'
import { useStore } from 'vuex'
import AdvisorsListName from '@/components/SuperAdmin/AdvisorsListTable/AdvisorsListName.vue'

export default {
  name: 'AdvisorsListTable',
  components: {
    AdvisorsListName,
  },
  props: {
    itemsHeader: {
      type: Array,
      require: true,
      default: () => [],
    },
    usersList: {
      type: Array,
      require: true,
      default: () => [],
    },
    isLead: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  setup() {
    const store = useStore()

    const change = (e) => {
      const orderBy = e.prop
      const sortedBy = e.order
      store.commit('globalComponents/setSortMembers', {
        orderBy,
        sortedBy,
      })
    }

    const getDefaultSort = computed(() => {
      return {
        prop: store.state.globalComponents.sortMembers.orderBy,
        order: store.state.globalComponents.sortMembers.sortedBy,
      }
    })

    return {
      change,
      getDefaultSort,
    }
  },
}
</script>

<style>
.header-class {
  background-color: #f2f5fa !important;
  height: 24px !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  color: #aab5cf;
  font-size: 10px;
  text-transform: uppercase;
}
</style>
