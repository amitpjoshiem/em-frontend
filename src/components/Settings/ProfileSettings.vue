<template>
  <div v-if="isFetched" class="pl-24 pt-11">
    <div class="flex items-center">
      <SwdCropper :show-cropper="state.isShowCropper" :file="state.file.raw" @change="change" />
      <SwdAvatar size="large" :link="user.avatar.url" />
      <SwdUpload
        :upload-data="{ collection: 'avatar' }"
        :upload-before-hook="beforeAvatarUpload"
        @upload-change="handleChange"
        @upload-success="handleAvatarSuccess"
        @upload-mounted="bindRef"
      >
        <template #main>
          <div class="relative bottom-[-14px] left-[-16px] cursor-pointer">
            <InlineSvg :src="IconEditAvatar" />
          </div>
        </template>
      </SwdUpload>
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
import SwdUpload from '@/components/Global/SwdUpload.vue'

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
    SwdUpload,
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
      uploadRef: null,
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

    const bindRef = (ref) => {
      upload.value = ref.value
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
      bindRef,
      uploadRef: state.uploadRef,
    }
  },
}
</script>
