<template>
  <div class="p-5">
    <SwdSubHeader title="Users" :with-back-btn="false">
      <template #add-user>
        <el-button type="primary" :icon="Edit" plain size="small" @click="openDialog">Add user</el-button>
      </template>
    </SwdSubHeader>
  </div>
  <UsersList />
</template>

<script>
import { Edit } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import UsersList from '@/components/AdminPanel/Users/UsersList'

export default {
  name: 'Users',
  components: {
    UsersList,
  },
  setup() {
    const store = useStore()

    const openDialog = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'modalAddNewUser',
        value: true,
      })
    }

    return {
      Edit,
      openDialog,
    }
  },
}
</script>
