<template>
  <div class="flex items-center my-4">
    <SwdAvatar size="large" :link="prospect.avatar.url" />
    <SwdCropper :show-cropper="state.isShowCropper" :file="state.file.raw" @change="change" />
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
    <span class="text-main text-xl font-semibold ml-7">
      {{ prospect.name }}
    </span>
  </div>
</template>

<script>
import SwdCropper from '@/components/Global/SwdCropper.vue'
import SwdUpload from '@/components/Global/SwdUpload.vue'
import { computed, reactive, ref } from 'vue'
import { tokenStorage } from '@/api/api-client/TokenStorage'
import { useMutation, useQueryClient } from 'vue-query'
import { updateMembers } from '@/api/vueQuery/update-members'
import IconEditAvatar from '@/assets/svg/icon-edit-avatar.svg'
import { useRoute } from 'vue-router'

export default {
  name: 'MemberBasicInformationAvatar',
  components: {
    SwdCropper,
    SwdUpload,
  },
  props: {
    prospect: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  setup() {
    const route = useRoute()

    const id = route.params.id
    const upload = ref(null)
    const queryClient = useQueryClient()
    const { mutateAsync: updateMember } = useMutation(updateMembers)

    const state = reactive({
      isShowCropper: false,
      file: '',
      imgSrc: '',
      croppedFile: '',
      uploadRef: null,
    })

    const handleAvatarSuccess = async (res) => {
      const form = { uuids: [res.data.uuid] }
      await updateMember({ form, id })
      state.isShowCropper = false
      queryClient.invalidateQueries(['prospect'])
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
      state,
      handleAvatarSuccess,
      beforeAvatarUpload,
      headers,
      handleChange,
      change,
      bindRef,
      IconEditAvatar,
    }
  },
}
</script>
