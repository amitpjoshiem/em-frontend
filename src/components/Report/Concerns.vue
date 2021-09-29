<template>
  <div class="border border-color-grey rounded-lg mr-5 mt-5 p-5">
    <span>Concerns</span>
    <div class="flex justify-between pt-5">
      <div>
        <div class="flex text-xs text-main">
          <InlineSvg :src="IconCheckGreen" class="mt-[3px]" />
          <span class="ml-1.5"> High Fees</span>
        </div>
        <div class="flex pt-2 text-xs text-main">
          <InlineSvg :src="IconCheckGreen" class="mt-[3px]" />
          <span class="ml-1.5"> Extremely high market exposure</span>
        </div>
        <div class="flex pt-2 text-xs text-main">
          <InlineSvg :src="IconCheckGreen" class="mt-[3px]" />
          <span class="ml-1.5"> Simple</span>
        </div>
      </div>
      <div>
        <div class="flex text-xs text-main">
          <InlineSvg :src="IconCheckGreen" class="mt-[3px]" />
          <span class="ml-1.5"> Keep the money safe</span>
        </div>
        <div class="flex pt-2 text-xs text-main">
          <InlineSvg :src="IconCheckGreen" class="mt-[3px]" />
          <span class="ml-1.5"> Massive Overlap</span>
        </div>
        <div class="flex pt-2 text-xs text-main">
          <InlineSvg :src="IconCheckGreen" class="mt-[3px]" />
          <span class="ml-1.5"> Design, implement and monitoring income strategy</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconCheckGreen from '@/assets/svg/icon-check-green.svg'

export default {
  name: 'Concerns',
  setup() {
    return {
      IconCheckGreen,
    }
  },
}
</script>
