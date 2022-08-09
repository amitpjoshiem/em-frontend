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
        <UserListName :user="scope.row" />
      </template>
    </el-table-column>

    <el-table-column v-if="isLead" label="E-mail" min-width="195">
      <template #default="scope">
        {{ scope.row.email }}
      </template>
    </el-table-column>

    <el-table-column prop="created_at" label="created At" min-width="110">
      <template #default="scope">
        <span class="text-xss">{{ scope.row.createdAtFormatted }}</span>
      </template>
    </el-table-column>

    <el-table-column v-if="!isLead" label="Type" min-width="125">
      <template #default="scope">
        <SwdTypeUserLabel :user-type="scope.row.type" class="text-xss" />
      </template>
    </el-table-column>

    <el-table-column label="Stage" prop="Stage" min-width="180">
      <template #default="scope">
        <SwdStubForText :text="scope.row.salesforce.stage" plug="&mdash;" class="text-xss text-main" />
      </template>
    </el-table-column>

    <el-table-column prop="investment_size" label="Total Investment Size" min-width="180" class="text-xss">
      <template #default="scope">
        <SwdStubForText
          :text="scope.row.salesforce.investment_size"
          plug="&mdash;"
          class="text-xss text-main font-semibold"
        />
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
import UserListName from '@/components/UsersListTable/UserListName.vue'

export default {
  name: 'OpportunityListTable',
  components: {
    UserListName,
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
