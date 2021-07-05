<template>
  <aside class="bg-primary min-h-screen flex flex-col w-[68px]">
    <router-link :to="{ name: 'dashboard' }">
      <img src="../assets/img/logo.png" />
    </router-link>

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
      <router-link
        :to="{ name: 'list-of-households' }"
        class="item flex justify-center items-center cursor-pointer w-full h-14"
      >
        <InlineSvg :src="IconList" />
      </router-link>
      <router-link
        :to="{ name: 'list-of-households' }"
        class="item flex justify-center items-center cursor-pointer w-full h-14"
      >
        <InlineSvg :src="IconAssets" />
      </router-link>
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
import { useStore } from 'vuex'
import { computed } from 'vue'
import IconList from '@/assets/svg/icon-list.svg'
import IconAssets from '@/assets/svg/icon-assets.svg'

export default {
  setup() {
    const store = useStore()

    const isAuth = computed(() => {
      return store.state.auth.isAuth
    })
    return {
      IconList,
      IconAssets,
      isAuth,
    }
  },
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
