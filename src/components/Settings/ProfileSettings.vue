<template>
  <div v-if="isFetched" class="pl-24 pt-11">
    <div class="flex items-center">
      <Avatar size="big" />
      <div class="text-main text-xl ml-12 font-medium">My profile</div>
    </div>
    <div class="pt-12">
      <div class="flex items-center">
        <div class="text-xss text-title-gray w-2/12">Full name</div>
        <div class="text-main text-base mr-3">{{ user.userFullName }}</div>
        <ChangeName />
      </div>
      <div class="flex items-center pt-11">
        <div class="text-xss text-title-gray w-2/12">Phone</div>
        <div class="text-main text-base mr-3">+12223334455</div>
      </div>
      <div class="flex items-center pt-11">
        <div class="text-xss text-title-gray w-2/12">E-mail</div>
        <div class="text-main text-base mr-3">{{ user.email }}</div>
      </div>
      <div class="flex items-center pt-11">
        <div class="text-xss text-title-gray w-2/12">Password</div>
        <div class="text-main text-base mr-3">...............</div>
        <ChangePassword />
      </div>
    </div>
  </div>
</template>

<script>
import IconPencil from '@/assets/svg/icon-pencil.svg'
import { useUserProfile } from '@/api/use-user-profile.js'

import ChangePassword from '@/components/Settings/ChangePassword.vue'
import ChangeName from '@/components/Settings/ChangeName.vue'

export default {
  components: {
    ChangePassword,
    ChangeName,
  },
  setup() {
    const {
      isLoading: isLoadingUserProfile,
      isError: isErrorUserProfile,
      data: user,
      isFetched,
    } = useUserProfile()

    return {
      IconPencil,
      user,
      isLoadingUserProfile,
      isErrorUserProfile,
      isFetched,
    }
  },
}
</script>
