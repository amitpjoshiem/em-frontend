<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <div class="flex items-center">
      <slot name="titleDropDown" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(item, index) in options" :key="index" :command="item.command">
          <span :class="item.class">{{ item.title }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
export default {
  name: 'SwdDropDown',
  props: {
    options: {
      type: Array,
      require: false,
      default: () => [],
    },
  },
  emits: ['select'],
  setup(_, { emit }) {
    const handleCommand = (command) => {
      emit('select', command)
    }

    return {
      handleCommand,
    }
  },
}
</script>
