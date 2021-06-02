<template>
  <div class="flex w-full">
    <SideBar />
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
import SideBar from '@/components/SideBar.vue'

export default {
  name: 'Login',
  components: {
    LoginForm,
    SideBar,
  },
}
</script>
