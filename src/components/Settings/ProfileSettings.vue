<template>
  <div v-if="isFetched" class="pl-24 pt-11">
    <div class="flex items-center">
      <SwdCropper :show-cropper="state.isShowCropper" :file="state.file.raw" @change="change" />
      <SwdAvatar size="large" :link="user.avatar.url" />
      <el-upload
        ref="upload"
        class="avatar-uploader"
        action="https://wealtheze.com/api/v1/media"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        with-credentials
        :headers="headers"
        :data="{ collection: 'avatar' }"
        :on-change="handleChange"
        :auto-upload="false"
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
import ChangePassword from '@/components/Settings/ChangePassword.vue'
import ChangeName from '@/components/Settings/ChangeName.vue'
import SwdCropper from '@/components/Global/SwdCropper.vue'

import { useUserProfile } from '@/api/use-user-profile.js'
import { tokenStorage } from '@/api/api-client/TokenStorage'
import { computed, reactive, ref } from 'vue'
import { updateUserAvatar } from '@/api/vueQuery/update-user-avatar'
import { useMutation, useQueryClient } from 'vue-query'

export default {
  components: {
    ChangePassword,
    ChangeName,
    SwdCropper,
  },
  setup() {
    const { isLoading: isLoadingUserProfile, isError: isErrorUserProfile, data: user, isFetched } = useUserProfile()
    const { mutateAsync: updateUser } = useMutation(updateUserAvatar)
    const queryClient = useQueryClient()
    const upload = ref(null)

    const state = reactive({
      isShowCropper: false,
      file: '',
      imgSrc: '',
      croppedFile: '',
    })

    const handleAvatarSuccess = async (res) => {
      const form = { uuids: [res.data.uuid] }
      await updateUser({ form, id: user.value.id })
      state.isShowCropper = false
      queryClient.invalidateQueries(['users'])
    }

    const beforeAvatarUpload = () => {
      return Promise.resolve(state.croppedFile)
    }

    const headers = computed(() => {
      const token = tokenStorage.getByKey('access_token')
      return { Authorization: `Bearer ${token}` }
    })

    const handleChange = (file) => {
      state.file = file
      state.isShowCropper = true
    }

    const change = (file) => {
      state.croppedFile = file
      upload.value.submit()
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
      headers,
      state,
      handleChange,
      upload,
      change,
    }
  },
}
</script>
