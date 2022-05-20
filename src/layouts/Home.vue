<template>
  <div></div>
</template>
<script>
import { useStore } from 'vuex'
import { useRoutRedirect } from '@/hooks/use-rout-redirect'

export default {
  name: 'Home',
  setup() {
    const store = useStore()
    const { routRedirect } = useRoutRedirect()
    const role = store.state.globalComponents.role

    if (store.state.auth.isAuth && role) routRedirect(role)
  },
}
</script>
