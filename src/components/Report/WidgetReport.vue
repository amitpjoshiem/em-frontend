<template>
  <div v-if="member" class="w-7/12 bg-main-gray rounded-lg">
    <div class="border-b">
      <div class="flex p-5">
        <SwdAvatar :link="getAvatarUrl" />
        <div class="flex flex-col ml-2">
          <span class="text-sm text-main font-medium">{{ member.name }}</span>
          <span class="text-small text-activity-item font-medium uppercase"> {{ getTitle }} </span>
        </div>
      </div>
    </div>
    <div class="flex p-5 items-center">
      <InlineSvg :src="IconRedRisk" />
      <span class="ml-2 text-xs text-main">Red risk</span>
    </div>
    <div class="flex pl-5 items-center">
      <InlineSvg :src="IconOpenSafety" />
      <span class="ml-2 text-xs text-main">Open-safety</span>
    </div>
    <div class="flex p-5 items-center">
      <InlineSvg :src="IconBlueCash" />
      <span class="ml-2 text-xs text-main">Blue-cash liquidity</span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import IconRedRisk from '@/assets/svg/icon-red-risk.svg'
import IconOpenSafety from '@/assets/svg/icon-open-safety.svg'
import IconBlueCash from '@/assets/svg/icon-blue-cash.svg'

export default {
  name: 'WidgetReport',
  props: {
    member: {
      type: Object,
      require: false,
      default: () => {},
    },
  },
  setup(props) {
    const getAvatarUrl = computed(() => {
      if (props.member.avatar?.url) return props.member.avatar.url
      return ''
    })

    const getTitle = computed(() => {
      if (props.member.type === 'prospect') return 'Opportunity'
      return 'Client'
    })

    return {
      getAvatarUrl,
      IconRedRisk,
      IconOpenSafety,
      IconBlueCash,
      getTitle,
    }
  },
}
</script>
