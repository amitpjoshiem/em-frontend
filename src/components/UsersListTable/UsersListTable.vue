<template>
  <el-table
    :data="usersList"
    style="width: 100%"
    row-class-name="row-class"
    cell-class-name="cell-class"
    header-cell-class-name="header-class"
    header-row-class-name="header-row-class"
    :default-sort="{ prop: 'created_at', order: 'descending' }"
    @sort-change="change"
  >
    <el-table-column prop="name" label="Name" min-width="240" sortable>
      <template #default="scope">
        <!-- <SwdAvatar /> -->
        <router-link
          :to="{
            name: scope.row.step ? 'member-details' : 'basic-information',
            params: { id: scope.row.id },
          }"
          class="pl-2.5 font-medium"
        >
          {{ scope.row.name }}
        </router-link>
      </template>
    </el-table-column>

    <el-table-column prop="created_at" label="createdAt" min-width="110" sortable>
      <template #default="scope">
        <span>{{ scope.row.createdAtFormatted }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Type" min-width="110">
      <template #default="scope">
        <SwdTypeUserLabel :user-type="scope.row.type" />
      </template>
    </el-table-column>
    <el-table-column label="Onboarding" min-width="130">
      <template #default="scope">
        <span>{{ scope.row.step }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="city" label="Location" min-width="170" />

    <el-table-column label="net worth" min-width="110">
      <SwdStubForText text="" plug="&mdash;" class="text-sm text-main font-semibold" />
    </el-table-column>

    <el-table-column label="" min-width="47">
      <template #default="scope">
        <SwdMemberActions :user="scope.row" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// import UsersListTableEmpty from '@/components/UsersListTable/UsersListTableEmpty.vue'
// import UserListItem from '@/components/UsersListTable/UserListItem.vue'
import { useStore } from 'vuex'

export default {
  name: 'UsersListTable',
  components: {
    // UsersListTableEmpty,
    // UserListItem,
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
  },
  setup() {
    const store = useStore()

    const change = (e) => {
      console.log('==============')
      // const { prop, order } = e
      // console.log('prop - ', prop)
      // console.log('order - ', order)
      console.log(e)
      const orderBy = e.prop
      const sortedBy = e.order === 'ascending' ? 'asc' : 'desc'
      store.commit('globalComponents/setSortMembers', {
        orderBy,
        sortedBy,
      })
    }
    return {
      change,
    }
  },

  computed: {
    getHeadlines() {
      return ['householder Name', 'Created on', 'type', 'Onboarding', 'location', 'net worth']
    },
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
