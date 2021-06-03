<template>
  <aside class="bg-primary min-h-screen flex flex-col w-[68px]">
    <img src="../assets/img/logo.png" />
    <div v-if="isAuth" class="flex flex-col pt-32 items-center flex-grow">
      <div
        class="
          flex
          justify-center
          items-center
          cursor-pointer
          w-full
          h-14
          active
        "
      >
        <img src="../assets/img/dashboard.png" />
      </div>
      <div
        class="item flex justify-center items-center cursor-pointer w-full h-14"
      >
        <img src="../assets/img/list.png" />
      </div>
      <div
        class="item flex justify-center items-center cursor-pointer w-full h-14"
      >
        <img src="../assets/img/activity.png" />
      </div>
      <div
        class="item flex justify-center items-center cursor-pointer w-full h-14"
      >
        <img src="../assets/img/statistics.png" />
      </div>
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    isAuth: (state) => state.auth.isAuth,
  }),
}
</script>

<style lang="css" scoped>
.active {
  background-color: rgba(103, 116, 148, 0.1);
}
.item:hover {
  background-color: rgba(103, 116, 148, 0.1);
}
</style>
