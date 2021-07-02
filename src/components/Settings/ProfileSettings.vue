<template>
  <div class="pl-24 pt-11">
    <div class="flex items-center">
      <Avatar size="big" />
      <div class="text-main text-xl ml-12 font-semibold">My profile</div>
    </div>
    <div class="pt-12">
      <div class="flex items-center">
        <div class="text-xss text-title-gray w-2/12">Full name</div>
        <div class="text-main text-base mr-3">Adam Kelley</div>
        <InlineSvg :src="IconPencil" />
      </div>
      <div class="flex items-center pt-11">
        <div class="text-xss text-title-gray w-2/12">Phone</div>
        <div class="text-main text-base mr-3">+12223334455</div>
        <InlineSvg :src="IconPencil" />
      </div>
      <div class="flex items-center pt-11">
        <div class="text-xss text-title-gray w-2/12">E-mail</div>
        <div class="text-main text-base mr-3">rafaelcarpenter@mail.com</div>
        <InlineSvg :src="IconPencil" />
      </div>
      <div class="flex items-center pt-11">
        <div class="text-xss text-title-gray w-2/12">Password</div>
        <div class="text-main text-base mr-3">...............</div>
        <InlineSvg :src="IconPencil" />
      </div>
    </div>
  </div>
</template>

<script>
import IconPencil from '@/assets/svg/icon-pencil.svg'

export default {
  setup() {
    return {
      IconPencil,
    }
  },
}
</script>
