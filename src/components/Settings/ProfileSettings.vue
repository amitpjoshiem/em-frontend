<template>
  <div v-if="!isLoadingUserProfile" class="pl-24 pt-11">
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
        <Dialog title="New phone number" confirm-action="changePhoneNumber">
          <template #buttonDialog>
            <div class="flex items-center">
              <InlineSvg :src="IconPencil" class="mb-1" />
            </div>
          </template>
          <template #contentDialog>
            <InputText
              label="Phone number"
              name="phoneNumber"
              placeholder="Enter your new phone number"
              type="text"
            />
          </template>
        </Dialog>
      </div>
      <div class="flex items-center pt-11">
        <div class="text-xss text-title-gray w-2/12">E-mail</div>
        <div class="text-main text-base mr-3">{{ user.email }}</div>
        <Dialog title="Change the email" confirm-action="changeEmail">
          <template #buttonDialog>
            <div class="flex items-center">
              <InlineSvg :src="IconPencil" class="mb-1" />
            </div>
          </template>
          <template #contentDialog>
            <InputText
              label="Email"
              name="email"
              placeholder="Enter your email"
              type="text"
            />
            <InputText
              label="Confirm Email"
              name="confirmEmail"
              placeholder="Confirm email"
              type="text"
            />
          </template>
        </Dialog>
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
    } = useUserProfile()

    return {
      IconPencil,
      user,
      isLoadingUserProfile,
      isErrorUserProfile,
    }
  },
}
</script>
