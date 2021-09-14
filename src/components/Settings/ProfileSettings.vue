<template>
  <div v-if="isFetched" class="pl-24 pt-11">
    <div class="flex items-center">
      <vue-cropper v-if="state.isShowCropper" ref="cropper" :src="state.imgSrc" :aspect-ratio="1 / 1" />
      <el-button type="primary" @click="cropImage">Primary</el-button>
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
        :data="{ collection: 'avatar', file: state.file }"
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
import { useUserProfile } from '@/api/use-user-profile.js'
import ChangePassword from '@/components/Settings/ChangePassword.vue'
import ChangeName from '@/components/Settings/ChangeName.vue'
import { tokenStorage } from '@/api/api-client/TokenStorage'
import { computed, reactive, ref } from 'vue'
import { updateUserAvatar } from '@/api/vueQuery/update-user-avatar'
import { useMutation, useQueryClient } from 'vue-query'

import VueCropper from 'vue-cropperjs'

export default {
  components: {
    ChangePassword,
    ChangeName,
    VueCropper,
  },
  setup() {
    const { isLoading: isLoadingUserProfile, isError: isErrorUserProfile, data: user, isFetched } = useUserProfile()
    const { mutateAsync: updateUser } = useMutation(updateUserAvatar)
    const queryClient = useQueryClient()

    const state = reactive({
      isShowCropper: false,
      file: '',
      imgSrc: '',
    })

    const cropper = ref(null)
    const upload = ref(null)

    const handleAvatarSuccess = async (res) => {
      const form = { uuids: [res.data.uuid] }
      await updateUser({ form, id: user.value.id })
      queryClient.invalidateQueries(['users'])
    }

    const beforeAvatarUpload = () => {
      return Promise.resolve(state.file)
    }

    const headers = computed(() => {
      const token = tokenStorage.getByKey('access_token')
      return { Authorization: `Bearer ${token}` }
    })

    const handleChange = (file) => {
      setImage(file.raw)
      state.isShowCropper = true
    }

    const setImage = (file) => {
      if (typeof FileReader === 'function') {
        const reader = new FileReader()
        reader.onload = (event) => {
          state.imgSrc = event.target.result
          cropper.value.replace(event.target.result)
        }
        reader.readAsDataURL(file)
      } else {
        alert('Sorry, FileReader API not supported')
      }
    }

    const cropImage = () => {
      cropper.value.getCroppedCanvas().toBlob((blob) => {
        state.file = new File([blob], 'avatar.png')
        upload.value.submit()
      })
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
      setImage,
      cropper,
      cropImage,
      upload,
    }
  },
}
</script>
