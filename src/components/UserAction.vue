<template>
  <el-dropdown trigger="click" class="ml-2" @command="handleCommand">
    <div class="flex items-center">
      <span class="text-main mx-2">Adam K.</span>
      <InlineSvg :src="IconUserAction" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="a">
          <span>Profile settings</span>
        </el-dropdown-item>
        <el-dropdown-item command="b">
          <span>Notifications settings</span>
        </el-dropdown-item>
        <el-dropdown-item command="c">
          <span>Integrations</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span>Information</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span class="font-semibold">Log out</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script>
import IconUserAction from '@/assets/svg/icon-user-action.svg'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const handleCommand = (command) => {
      console.log('command - ', command)
    }
    return {
      IconUserAction,
      handleCommand,
    }
  },
})
</script>

<style>
.el-dropdown-menu__item {
  display: flex;
  align-items: center;
  color: #424450;
}

.el-dropdown-menu__item:not(:last-child) {
  border-bottom: 1px solid #ebf0fa;
}
</style>
