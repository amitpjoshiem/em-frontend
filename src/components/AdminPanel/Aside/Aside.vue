<template>
  <div class="bg-primary">
    <el-aside width="150px" class="h-screen">
      <div class="cursor-pointer flex justify-center">
        <InlineSvg :src="IconLogo" />
      </div>
      <el-menu
        active-text-color="#fff"
        background-color="#073763"
        class="el-menu-vertical-demo"
        :default-active="defaultActive"
        text-color="#677494"
      >
        <router-link :to="{ name: `${route.meta.type}/ap-dashboard` }">
          <el-menu-item index="1">
            <el-icon><DataAnalysis /></el-icon>
            <span>Dashboard</span>
          </el-menu-item>
        </router-link>

        <router-link :to="{ name: `${route.meta.type}/ap-users` }">
          <el-menu-item index="2">
            <el-icon><User /></el-icon>

            <span>Users</span>
          </el-menu-item>
        </router-link>

        <router-link v-if="$can('ceo', 'all')" :to="{ name: `${route.meta.type}/ap-companies` }">
          <el-menu-item index="3">
            <el-icon><OfficeBuilding /></el-icon>
            <span>Companies</span>
          </el-menu-item>
        </router-link>

        <router-link :to="{ name: `${route.meta.type}/ap-help` }">
          <el-menu-item index="4">
            <el-icon><Help /></el-icon>
            <span>Help</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import { OfficeBuilding, DataAnalysis, User, Help } from '@element-plus/icons-vue'
import IconLogo from '@/assets/svg/icon-logo.svg'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'Aside',

  components: {
    DataAnalysis,
    User,
    OfficeBuilding,
    Help,
  },
  setup() {
    const route = useRoute()
    const defaultActive = ref('1')

    onMounted(() => {
      if (route.name === `${route.meta.type}/ap-dashboard`) defaultActive.value = '1'
      if (route.name === `${route.meta.type}/ap-users`) defaultActive.value = '2'
      if (route.name === `${route.meta.type}/ap-companies`) defaultActive.value = '3'
      if (route.name === `${route.meta.type}/ap-help`) defaultActive.value = '4'
    })

    return {
      defaultActive,
      IconLogo,
      route,
    }
  },
}
</script>
