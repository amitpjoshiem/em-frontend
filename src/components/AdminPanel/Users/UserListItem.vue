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
import { deleteAdminPanelUsers } from '@/api/vueQuery/admin-panel/delete-admin-panel-user'
import { createAdminPanelPassword } from '@/api/vueQuery/admin-panel/create-admin-panel-password'
import { useMutation, useQueryClient } from 'vue-query'
import { useAlert } from '@/utils/use-alert'
import { ElMessage, ElMessageBox } from 'element-plus'
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
    const queryClient = useQueryClient()

    const { mutateAsync: deleteUser } = useMutation(deleteAdminPanelUsers)
    const { mutateAsync: createPassword } = useMutation(createAdminPanelPassword)

    const getName = computed(() => {
      if (props.user.first_name && props.user.last_name) return props.user.first_name + ' ' + props.user.last_name
      return '-'
    })

    const getRole = computed(() => {
      if (props.user.roles[0].name === 'ceo') return 'CEO'
      return props.user.roles[0].name
    })

    const handleCommand = (command) => {
      if (command === 'profile') profileCommand()
      if (command === 'edit') console.log('edit')
      if (command === 'delete') deleteCommand()
      if (command === 'create-password') createPasswordCommand()
    }

    const deleteCommand = async () => {
      ElMessageBox.confirm('Are you sure to delete. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(async () => {
          const res = await deleteUser(props.user.id)
          if (!('error' in res)) {
            useAlert({
              title: 'Success',
              type: 'success',
              message: 'Delete completed',
            })
            queryClient.invalidateQueries(['admin-panel-users'])
          }
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    }

    const profileCommand = () => {
      store.commit('globalComponents/setEditUserId', props.user.id)
      store.commit('globalComponents/setShowModal', {
        destination: 'modalUserProfile',
        value: true,
      })
    }

    const createPasswordCommand = async () => {
      const res = await createPassword(props.user.id)
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Send create password success',
        })
      }
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
