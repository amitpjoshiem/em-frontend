<template>
  <div class="border border-color-grey rounded-large mt-5 mb-10">
    <ListOfHouseholdsHeader />
    <UsersListTable />
  </div>
</template>
<script>
import ListOfHouseholdsHeader from '@/components/Dashboard/ListOfHouseholdsHeader.vue'
import UsersListTable from '@/components/UsersListTable/UsersListTable.vue'
export default {
  components: {
    ListOfHouseholdsHeader,
    UsersListTable,
  },
}
</script>
