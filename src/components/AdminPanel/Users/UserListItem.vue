<template>
  <div class="flex user-table text-sm text-main hover:bg-gray-100">
    <div class="table-item w-5/24">{{ getName }}</div>
    <div class="table-item w-6/24">{{ user.email }}</div>
    <div class="table-item w-3/24">{{ user.position }}</div>
    <div class="table-item w-3/24 capitalize">{{ getRole }}</div>
    <div class="table-item w-4/24 p-2">{{ user.company.name }}</div>
    <div class="table-item w-2/24">
      <div class="flex items-center justify-center">
        <el-icon v-if="user.is_email_confirmed" color="green">
          <Check />
        </el-icon>
        <el-icon v-else color="red">
          <Close />
        </el-icon>
      </div>
    </div>
    <div class="table-item w-1/24 p-2 flex items-center justify-center">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link" cursor-pointer>
          <el-icon>
            <Setting color="green" />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">Profile</el-dropdown-item>
            <el-dropdown-item command="edit">Edit</el-dropdown-item>
            <el-dropdown-item command="delete">Delete</el-dropdown-item>
            <el-dropdown-item command="create-password">Send Create Password</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { Check, Close, Setting } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'UserListItem',
  components: {
    Check,
    Close,
    Setting,
  },
  props: {
    user: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  setup(props) {
    const store = useStore()

    const getName = computed(() => {
      if (props.user.first_name && props.user.last_name) return props.user.first_name + ' ' + props.user.last_name
      return '-'
    })

    const getRole = computed(() => {
      if (props.user.roles[0].name === 'ceo') return 'CEO'
      return props.user.roles[0].name
    })

    const handleCommand = (command) => {
      if (command === 'profile') {
        store.commit('globalComponents/setEditUserId', props.user.id)
        store.commit('globalComponents/setShowModal', {
          destination: 'modalUserProfile',
          value: true,
        })
      }
      if (command === 'edit') console.log('edit')
      if (command === 'delete') console.log('delete')
      if (command === 'create-password') console.log('create-password')
    }

    return {
      getName,
      handleCommand,
      getRole,
    }
  },
}
</script>

<style>
.table-item {
  @apply p-2 flex items-center;
}
</style>
