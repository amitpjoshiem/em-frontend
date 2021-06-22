<template>
  <div class="px-20 flex flex-col justify-between h-full">
    <div class="">
      <div class="flex">
        <Button
          class="mr-5"
          text-btn="Link an account"
          witch-icon
          icon-type="lock"
          default-link-btn
        />
        <Button
          class="ml-5"
          text-btn="Upload a file"
          witch-icon
          icon-type="upload"
          transparent-btn
        />
      </div>
      <div
        v-if="!isLinkAcount"
        class="
          flex flex-col
          justify-center
          items-center
          border
          bored-input-border
          w-full
          h-48
          mt-5
        "
      >
        <div
          class="
            bg-widget-bg
            w-20
            h-20
            rounded-full
            flex
            justify-center
            items-center
          "
        >
          <InlineSvg :src="IconFilePorfolio" />
        </div>
        <div class="text-gray03 text-sm text-center pt-3">
          <p>Add account with assets or upload</p>
          <p>a file with portfolio</p>
        </div>
      </div>

      <div v-if="isLinkAcount" class="mt-7">
        <div class="flex border-b border-color-grey pb-1.5">
          <span class="w-5/12 text-small text-gray03 uppercase">name</span>
          <span class="w-2/12 text-small text-gray03 uppercase"
            >Account type</span
          >
          <span class="w-2/12 text-small text-gray03 uppercase"
            >Organization</span
          >
          <span class="w-2/12 text-small text-gray03 uppercase">Net worth</span>
          <span class="w-1/12" />
        </div>
        <div
          v-for="(item, index) in linkAccount"
          :key="index"
          class="flex py-4 border-b border-color-grey"
        >
          <span class="w-5/12 text-sm text-main font-semibold">{{
            item.name
          }}</span>
          <span class="w-2/12 text-sm text-main">{{ item.accountType }}</span>
          <span class="w-2/12 text-sm text-main">{{ item.accountType }}</span>
          <span class="w-2/12 text-sm text-main font-semibold">{{
            item.netWorth
          }}</span>
          <span class="w-1/12 flex justify-end">
            <InlineSvg :src="IconDeleteLink" />
          </span>
        </div>
      </div>
    </div>

    <div class="flex justify-end my-6">
      <div class="pr-3">
        <Button default-gray-btn text-btn="Back" @click="backStep" />
      </div>

      <div>
        <Button
          default-blue-btn
          text-btn="Go to the assets &amp; income"
          @click="saveStep"
        />
      </div>
    </div>
  </div>
</template>

<script>
import IconFilePorfolio from '@/assets/svg/icon-file-portfolio.svg'
import { useLinkAccount } from '@/components/NewProspect/DTO/linkAccount'
import IconDeleteLink from '@/assets/svg/icon-delete-link.svg'

import { useRouter } from 'vue-router'

export default {
  name: 'AssetsAccounts',
  setup() {
    const router = useRouter()

    const { data: linkAccount } = useLinkAccount()

    const saveStep = () => {
      router.push({ name: 'assetsacount' })
    }

    const backStep = () => {
      router.push({ name: 'basic-information' })
    }

    return {
      IconFilePorfolio,
      linkAccount,
      IconDeleteLink,
      saveStep,
      backStep,
    }
  },
  data() {
    return {
      isLinkAcount: true,
    }
  },
}
</script>
