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
    <el-table-column prop="name" label="Name" min-width="230" sortable>
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
        <span class="text-main text-xss">{{ scope.row.createdAtFormatted }}</span>
      </template>
    </el-table-column>

    <el-table-column v-if="!isLead" label="Type" min-width="110">
      <template #default="scope">
        <SwdTypeUserLabel :user-type="scope.row.type" class="text-xss" />
      </template>
    </el-table-column>

    <el-table-column label="Onboarding" prop="step" min-width="130" sortable>
      <template #default="scope">
        <SwdLinearProgress :percentage="scope.row.onboarding" :show-text="true" />
      </template>
    </el-table-column>

    <el-table-column prop="city" label="Location" min-width="170" class="text-xss">
      <template #default="scope">
        <div class="text-xss">{{ scope.row.city }}</div>
        <div class="text-xss">{{ scope.row.state }}</div>
      </template>
    </el-table-column>

    <el-table-column v-if="!isLead" label="net worth" min-width="95">
      <SwdStubForText text="" plug="&mdash;" class="text-xss text-main font-semibold" />
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
import SwdLinearProgress from '@/components/Global/SwdLinearProgress.vue'
import UserListName from '@/components/UsersListTable/UserListName.vue'

export default {
  name: 'UsersListTable',
  components: {
    UserListName,
    SwdLinearProgress,
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
  background-color: #e9e9e9 !important;
  height: 24px !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  color: #282828;
  font-size: 9px;
  text-transform: uppercase;
}
</style>
