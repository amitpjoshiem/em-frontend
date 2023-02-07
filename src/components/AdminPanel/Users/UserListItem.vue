<template>
  <div
    v-loading="user.status === 'processing'"
    class="flex user-table text-xss text-main hover:bg-gray-200"
    :class="{ 'bg-gray-200 opacity-50': user.is_deleted && currentStatusFilter !== 'only' }"
  >
    <div class="table-item w-5/24">{{ getName }}</div>
    <div class="table-item w-6/24">
      <a class="w-6/12 pl-2 text-activity" href="mailto:{{user.email}}">{{ user.email }}</a>
    </div>
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
            <el-dropdown-item v-if="!user.is_deleted" command="edit">Edit</el-dropdown-item>
            <el-dropdown-item v-if="isShowDeleteBtn" command="delete">Delete</el-dropdown-item>
            <el-dropdown-item v-if="user.is_deleted" command="restore">Restore</el-dropdown-item>
            <el-dropdown-item v-if="!user.is_email_confirmed && !user.is_deleted" command="create-password">
              Send Create Password
            </el-dropdown-item>
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
import { createAdminPanelPassword } from '@/api/vueQuery/admin-panel/create-admin-panel-password'
import { restoreAdminPanelUser } from '@/api/vueQuery/admin-panel/restore-admin-panel-user'
import { useMutation, useQueryClient } from 'vue-query'
import { useAlert } from '@/utils/use-alert'
import { ElMessageBox } from 'element-plus'

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

    const { mutateAsync: createPassword } = useMutation(createAdminPanelPassword)
    const { mutateAsync: restoreUser } = useMutation(restoreAdminPanelUser)

    const getName = computed(() => {
      if (props.user.first_name && props.user.last_name) return props.user.first_name + ' ' + props.user.last_name
      return '-'
    })

    const getRole = computed(() => {
      if (props.user.roles[0].name === 'ceo') return 'CEO'
      return props.user.roles[0].name
    })

    const isShowDeleteBtn = computed(() => {
      return !props.user.is_deleted && !props.user.roles[0].name !== 'ceo' && !props.user.roles[0].name !== 'admin'
    })

    const currentStatusFilter = computed(() => store.state.adminPanelUsers.filterStatusAdminPanel)

    const handleCommand = (command) => {
      if (command === 'profile') profileCommand()
      if (command === 'edit') editedUserCommand()
      if (command === 'delete') deleteCommand()
      if (command === 'create-password') createPasswordCommand()
      if (command === 'restore') restoreCommand()
    }

    const deleteCommand = async () => {
      store.commit('adminPanelUsers/setShowModal', {
        destination: 'modalDeleteUser',
        value: true,
      })
      store.commit('adminPanelUsers/setDeleteUser', props.user)
    }

    const profileCommand = () => {
      store.commit('adminPanelUsers/setProfileUserId', props.user.id)
      store.commit('adminPanelUsers/setShowModal', {
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
          message: 'Send create password success.',
        })
      }
    }

    const editedUserCommand = () => {
      store.commit('adminPanelUsers/setEditUser', props.user)
      store.commit('adminPanelUsers/setShowModal', {
        destination: 'modalAddNewUser',
        value: true,
      })
    }

    const restoreCommand = async () => {
      ElMessageBox.confirm('Are you sure to restore the user?', 'Restore', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'info',
      })
        .then(async () => {
          const res = await restoreUser(props.user.id)
          if (!('error' in res)) {
            useAlert({
              title: 'Success',
              type: 'success',
              message: 'Restore user success.',
            })
            queryClient.invalidateQueries(['admin-panel-users'])
          }
        })
        .catch(() => {})
    }

    return {
      getName,
      handleCommand,
      getRole,
      restoreCommand,
      currentStatusFilter,
      isShowDeleteBtn,
    }
  },
}
</script>

<style>
.table-item {
  @apply p-2 flex items-center;
}
</style>
