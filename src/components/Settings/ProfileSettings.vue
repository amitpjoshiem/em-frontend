<template>
  <div v-if="isFetched" class="pl-24 pt-11">
    <div class="flex items-center">
      <SwdAvatar size="large" />
      <!-- <div class="relative bottom-[-14px] left-[-16px] cursor-pointer" @click="newAvatar">
        <InlineSvg :src="IconEditAvatar" />
      </div> -->

      <el-upload
        class="avatar-uploader"
        action="https://wealtheze.com/api/v1/media"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <div class="relative bottom-[-14px] left-[-16px] cursor-pointer">
          <InlineSvg :src="IconEditAvatar" />
        </div>
      </el-upload>

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
import IconEditAvatar from '@/assets/svg/icon-edit-avatar.svg'

import { useUserProfile } from '@/api/use-user-profile.js'

import ChangePassword from '@/components/Settings/ChangePassword.vue'
import ChangeName from '@/components/Settings/ChangeName.vue'

export default {
  components: {
    ChangePassword,
    ChangeName,
  },
  setup() {
    const { isLoading: isLoadingUserProfile, isError: isErrorUserProfile, data: user, isFetched } = useUserProfile()

    const handleAvatarSuccess = (res, file) => {
      console.log('res', res)
      console.log('file', file)
      // this.imageUrl = URL.createObjectURL(file.raw)
    }

    const beforeAvatarUpload = (file) => {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('Avatar picture must be JPG format!')
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!')
      }
      return isJPG && isLt2M
    }

    return {
      IconPencil,
      IconEditAvatar,
      user,
      isLoadingUserProfile,
      isErrorUserProfile,
      isFetched,
      handleAvatarSuccess,
      beforeAvatarUpload,
    }
  },
}
</script>
