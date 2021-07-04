<template>
  <div class="pl-24 pt-11">
    <div class="flex items-center">
      <Avatar size="big" />
      <div class="text-main text-xl ml-12 font-semibold">My profile</div>
    </div>
    <div class="pt-12">
      <div class="flex items-center">
        <div class="text-xss text-title-gray w-2/12">Full name</div>
        <div class="text-main text-base mr-3">{{ user.fullName }}</div>
        <Dialog
          title="Change the name"
          options="changeName"
          @confirmDialog="handleConfirm"
        >
          <template #buttonDialog>
            <div class="flex items-center">
              <InlineSvg :src="IconPencil" class="mb-1" />
            </div>
          </template>
          <template #contentDialog>
            <InputText
              label="First Name"
              name="firstName"
              placeholder="Enter your first name"
              type="text"
            />
            <InputText
              label="Last Name"
              name="lastName"
              placeholder="Enter your last name"
              type="text"
            />
          </template>
        </Dialog>
      </div>
      <div class="flex items-center pt-11">
        <div class="text-xss text-title-gray w-2/12">{{ user.phone }}</div>
        <div class="text-main text-base mr-3">+12223334455</div>
        <Dialog
          title="New phone number"
          options="changePhoneNumber"
          @confirmDialog="handleConfirm"
        >
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
        <Dialog
          title="Change the email"
          options="changeEmail"
          @confirmDialog="handleConfirm"
        >
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
        <Dialog
          title="Change the name"
          options="changePassword"
          @confirmDialog="handleConfirm"
        >
          <template #buttonDialog>
            <div class="flex items-center">
              <InlineSvg :src="IconPencil" class="mb-1" />
            </div>
          </template>
          <template #contentDialog>
            <InputPassword
              label="password"
              name="password"
              placeholder="Enter your new password"
              type="password"
            />
            <InputPassword
              label="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your new password"
              type="password"
            />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script>
import IconPencil from '@/assets/svg/icon-pencil.svg'
import { useUser } from '@/components/Settings/DTO/user'

export default {
  setup() {
    const { data: user } = useUser()

    const actionsMap = {
      changeName: () => console.log('changeName'),
      changePhoneNumber: () => console.log('changePhoneNumber'),
      changePassword: () => console.log('changePassword'),
      changeEmail: () => console.log('changeEmail'),
    }

    const handleConfirm = (command) => {
      const actionHandler = actionsMap[command]
      actionHandler()
    }

    return {
      IconPencil,
      handleConfirm,
      user,
    }
  },
}
</script>
