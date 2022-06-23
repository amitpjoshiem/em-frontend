<template>
  <div class="flex user-table text-sm text-main hover:bg-gray-100">
    <div class="table-item w-11/24 p-2">{{ company.name }}</div>
    <div class="table-item w-11/24 p-2">{{ company.domain }}</div>

    <div class="table-item w-2/24 p-2 flex items-center justify-center">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link" cursor-pointer>
          <el-icon>
            <Setting color="green" />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="edit">Edit</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { Setting } from '@element-plus/icons-vue'

export default {
  name: 'CompaniesListItem',
  components: {
    Setting,
  },
  props: {
    company: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  setup() {
    const handleCommand = (command) => {
      if (command === 'edit') console.log('edit')
    }

    return {
      handleCommand,
    }
  },
}
</script>

<style>
.table-item {
  @apply border-r first:border-l;
}
</style>
