<template>
  <div class="bg-widget-bg items-center pl-7 h-16 pr-5 flex justify-between">
    <SwdRemoteSearch />
    <div class="flex items-center justify-end">
      <div
        class="
          h-9
          bg-color-grey
          rounded-md
          border-input-border border
          flex
          items-center
          justify-center
          text-primary text-xss
          cursor-pointer
          mr-5
        "
        @click="newProspect"
      >
        <span class="px-2">
          <InlineSvg :src="IconPlus" />
        </span>
        <div class="pr-2">Add new</div>
      </div>

      <div class="border-l border-color-grey h-16" />
      <div>
        <img class="h-[13px] pr-5 pl-5 cursor-pointer" src="../assets/img/notifications.png" />
      </div>
      <div class="border-l border-color-grey h-16" />
      <div class="flex items-center justify-center pl-5 cursor-pointer">
        <SwdAvatar />
        <UserAction />
      </div>
    </div>
  </div>
</template>

<script>
import UserAction from '@/components/UserAction.vue'
import SwdRemoteSearch from '@/components/Global/SwdRemoteSearch.vue'
import IconPlus from '@/assets/svg/icon-plus.svg'
import { ElMessageBox } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'Header',
  components: {
    UserAction,
    SwdRemoteSearch,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const newProspect = () => {
      if (
        ['basic-information', 'assets-information', 'assetsacount', 'assetsconsolidations', 'stresstest'].includes(
          route.name
        )
      ) {
        ElMessageBox.confirm('Are you sure you want to exit? All the unsaved changes will be lost', 'Info', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'info',
        })
          .then(() => {
            router.push({ name: 'basic-information' })
          })
          .catch(() => {})
      } else {
        router.push({ name: 'basic-information' })
      }
    }

    return {
      IconPlus,
      newProspect,
    }
  },
}
</script>
