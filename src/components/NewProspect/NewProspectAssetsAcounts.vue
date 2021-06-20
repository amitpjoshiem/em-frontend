<template>
  <div class="px-20">
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
  </div>
</template>

<script>
import IconFilePorfolio from '@/assets/svg/icon-file-portfolio.svg'

export default {
  setup() {
    return {
      IconFilePorfolio,
    }
  },
}
</script>
