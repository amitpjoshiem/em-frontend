<template>
  <div class="common-layout">
    <el-container>
      <Aside />
      <el-container>
        <!-- <el-header>Header</el-header> -->
        <el-header>
          <Header />
        </el-header>

        <div class="h-full">
          <router-view />
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from '@/components/AdminPanel/Aside/Aside.vue'
import Header from '@/components/AdminPanel/Header.vue'

export default {
  name: 'AdminPanelHome',
  components: {
    Aside,
    Header,
  },
  setup() {},
}
</script>
