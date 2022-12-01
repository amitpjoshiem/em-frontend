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
        <div class="text-main text-base mr-3">{{ userFullName }}</div>
        <ChangeName />
      </div>
      <div v-if="$can('ceo', 'all')" class="flex items-center pt-11">
        <div class="text-xss text-title-gray w-2/12">Default Company</div>
        <ChangeCompany :default-company="user.company" />
      </div>
      <div v-if="$can('advisor', 'all')" class="flex items-center pt-11">
        <div class="text-xss text-title-gray w-2/12">Position</div>
        <div class="text-main text-base mr-3">{{ user.position ? user.position : 'Position not added' }}</div>
      </div>
      <div v-if="$can('advisor', 'all')" class="flex items-center pt-11">
        <div class="text-xss text-title-gray w-2/12">NPN</div>
        <div class="text-main text-base mr-3">{{ user.npn ? user.npn : 'NPN not added' }}</div>
      </div>
      <div class="flex items-center pt-11">
        <div class="text-xss text-title-gray w-2/12">Phone</div>
        <div class="text-main text-base mr-3">{{ user.phone ? user.phone : 'Phone number not added' }}</div>
        <div v-if="user.phone" class="mr-2" :class="getClassStatusPhone">
          {{ user.phone_status }}
        </div>
        <!-- <ChangePhone /> -->
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
  <el-skeleton v-else :rows="10" animated class="p-5" />
</template>

<script>
import IconPencil from '@/assets/svg/icon-pencil.svg'
import IconEditAvatar from '@/assets/svg/icon-edit-avatar.svg'
import ChangePassword from '@/components/Settings/ChangePassword.vue'
import ChangeName from '@/components/Settings/ChangeName.vue'
// import ChangePhone from '@/components/Settings/ChangePhone.vue'
import ChangeCompany from '@/components/Settings/ChangeCompany.vue'
import SwdCropper from '@/components/Global/SwdCropper.vue'
import SwdUpload from '@/components/Global/SwdUpload.vue'

import { useUserProfile } from '@/api/use-user-profile.js'
import { computed, reactive, ref } from 'vue'
import { updateUserAvatar } from '@/api/vueQuery/update-user-avatar'
import { useMutation, useQueryClient } from 'vue-query'
import { useAlert } from '@/utils/use-alert'

export default {
  name: 'ProfileSettings',
  components: {
    ChangePassword,
    ChangeName,
    // ChangePhone,
    SwdCropper,
    SwdUpload,
    ChangeCompany,
  },
  setup() {
    const { isError: isErrorUserProfile, data: user, isFetched } = useUserProfile()
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
      useAlert({
        title: 'Success',
        type: 'success',
        message: 'Avatar image changed successfully',
      })
    }

    const beforeAvatarUpload = () => {
      return Promise.resolve(state.croppedFile)
    }

    const userFullName = computed(() => {
      const lastName = user.value.lastName !== null ? user.value.lastName : '...'
      const firstName = user.value.firstName !== null ? user.value.firstName : '...'
      return firstName + ' ' + lastName
    })

    const handleChange = (file) => {
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        useAlert({
          type: 'error',
          title: 'Error',
          message: 'Avatar image size can not exceed 5MB!',
        })
        return
      }
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

    const getClassStatusPhone = computed(() => {
      if (user.value.phone_status === 'expired') return 'text-red-500'
      return 'text-green-500'
    })

    return {
      IconPencil,
      IconEditAvatar,
      user,
      isErrorUserProfile,
      isFetched,
      handleAvatarSuccess,
      beforeAvatarUpload,
      state,
      handleChange,
      upload,
      change,
      bindRef,
      uploadRef: state.uploadRef,
      userFullName,
      getClassStatusPhone,
    }
  },
}
</script>
