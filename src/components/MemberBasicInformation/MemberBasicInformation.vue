<template>
  <SwdSubHeader class="p-5" :title="getTitle" />
  <el-skeleton v-if="isLoading" :rows="11" animated class="p-5" />
  <div v-else class="p-5">
    <div>
      <div class="flex items-center">
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
    </div>

    <MemberBasicInformationGeneral :prospect="prospect" :spouse="spouse.value" />
    <MemberBasicInformationEmployment
      :prospect="prospect"
      :employment-prospect="employmentProspect.value"
      :employment-spouse="employmentSpouse.value"
    />
    <MemberHousingInformation :house="house.value" />
    <MemberBasicInformationOther :other="other.value" />
  </div>
</template>
<script>
import MemberBasicInformationGeneral from '@/components/MemberBasicInformation/MemberBasicInformationGeneral.vue'
import MemberHousingInformation from '@/components/MemberBasicInformation/MemberHousingInformation.vue'
import MemberBasicInformationEmployment from '@/components/MemberBasicInformation/MemberBasicInformationEmployment.vue'
import MemberBasicInformationOther from '@/components/MemberBasicInformation/MemberBasicInformationOther.vue'
import SwdCropper from '@/components/Global/SwdCropper.vue'
import SwdUpload from '@/components/Global/SwdUpload.vue'
import IconEditAvatar from '@/assets/svg/icon-edit-avatar.svg'
import { useProspectDetails } from '@/api/use-prospect-details.js'
import { useRoute } from 'vue-router'
import { computed, reactive, ref } from 'vue'
import { tokenStorage } from '@/api/api-client/TokenStorage'
import { useMutation, useQueryClient } from 'vue-query'
import { updateMembers } from '@/api/vueQuery/update-members'

export default {
  name: 'MemberBasicInformation',
  components: {
    MemberBasicInformationGeneral,
    MemberHousingInformation,
    MemberBasicInformationEmployment,
    MemberBasicInformationOther,
    SwdCropper,
    SwdUpload,
  },
  setup() {
    const route = useRoute()
    const id = route.params.id
    const upload = ref(null)
    const queryClient = useQueryClient()

    const state = reactive({
      isShowCropper: false,
      file: '',
      imgSrc: '',
      croppedFile: '',
      uploadRef: null,
    })

    const { isLoading, isError, data, house, spouse, employment, other, employmentProspect, employmentSpouse } =
      useProspectDetails(id)
    const { mutateAsync: updateMember } = useMutation(updateMembers)

    const getTitle = computed(() => {
      if (data.value && data.value.type === 'prospect') return 'Opportunity details'
      return 'Client details'
    })

    const handleAvatarSuccess = async (res) => {
      const form = { uuids: [res.data.uuid] }
      await updateMember({ form, id })
      state.isShowCropper = false
      queryClient.invalidateQueries(['member'])
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
      isLoading,
      isError,
      house,
      spouse,
      employment,
      other,
      prospect: data,
      employmentProspect,
      employmentSpouse,
      getTitle,
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
