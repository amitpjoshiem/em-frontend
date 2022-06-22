<template>
  <div class="flex user-table text-sm text-main hover:bg-gray-100">
    <div class="table-item w-4/24 p-2">{{ user.name }}</div>
    <div class="table-item w-5/24 p-2">{{ user.email }}</div>
    <div class="table-item w-3/24 p-2">{{ user.position }}</div>
    <div class="table-item w-3/24 p-2">{{ user.phone }}</div>
    <div class="table-item w-2/24 p-2">{{ user.npm }}</div>
    <div class="table-item w-2/24 p-2">{{ user.role }}</div>
    <div class="table-item w-2/24 p-2">{{ user.company }}</div>
    <div class="table-item w-2/24 p-2">
      <div class="flex items-center justify-center">
        <el-icon v-if="user.verified" color="green">
          <Check />
        </el-icon>
        <el-icon v-else color="red">
          <Close />
        </el-icon>
      </div>
    </div>
    <div class="table-item w-1/24 p-2 flex items-center justify-center cursor-pointer">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <el-icon>
            <Setting color="green" />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { Check, Close, Setting } from '@element-plus/icons-vue'

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
  setup() {},
}
</script>

<style>
.table-item {
  @apply border-r first:border-l;
}
</style>
