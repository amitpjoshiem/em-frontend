<template>
  <div class="bg-primary">
    <el-aside width="200px" class="h-screen">
      <div class="cursor-pointer flex justify-center">
        <InlineSvg :src="IconLogo" />
      </div>
      <el-menu
        active-text-color="#fff"
        background-color="#042D52"
        class="el-menu-vertical-demo"
        :default-active="defaultActive"
        text-color="#677494"
      >
        <router-link :to="{ name: 'ap-dashboard' }">
          <el-menu-item index="1">
            <el-icon><DataAnalysis /></el-icon>
            <span>Dashboard</span>
          </el-menu-item>
        </router-link>

        <router-link :to="{ name: 'ap-users' }">
          <el-menu-item index="2">
            <el-icon><User /></el-icon>
            <span>Users</span>
          </el-menu-item>
        </router-link>

        <router-link :to="{ name: 'ap-companies' }">
          <el-menu-item index="3">
            <el-icon><OfficeBuilding /></el-icon>
            <span>Companies</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import { OfficeBuilding, DataAnalysis, User } from '@element-plus/icons-vue'
import IconLogo from '@/assets/svg/icon-logo.svg'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'Aside',

  components: {
    DataAnalysis,
    User,
    OfficeBuilding,
  },
  setup() {
    const route = useRoute()

    const defaultActive = ref('1')

    onMounted(() => {
      if (route.name === 'ap-dashboard') defaultActive.value = '1'
      if (route.name === 'ap-users') defaultActive.value = '2'
      if (route.name === 'ap-companies') defaultActive.value = '3'
    })

    return {
      defaultActive,
      IconLogo,
    }
  },
}
</script>
