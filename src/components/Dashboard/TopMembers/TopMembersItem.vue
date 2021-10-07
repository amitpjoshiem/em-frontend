<template>
  <div class="flex py-2">
    <div class="flex justify-center items-center w-1/12">
      <SwdAvatar :link="getAvatarUrl" size="small" />
    </div>
    <div class="text-xs text-main font-medium flex items-center w-3/12">
      {{ member.name }}
    </div>
    <div class="flex items-center w-3/12">
      <SwdTypeUserLabel class="text-xs" />
    </div>
    <div class="text-xs text-main font-medium flex items-center w-3/12">
      {{ member.stage }}
    </div>
    <div class="text-xs text-main font-medium flex items-center w-2/12">
      {{ currencyFormat(member.amount) }}
    </div>
  </div>
</template>

<script>
import IconProfitUp from '@/assets/svg/profit-up.svg'
import IconActionGray from '@/assets/svg/icon-action-gray.svg'
import { computed } from 'vue'
import { currencyFormat } from '@/utils/currencyFormat'

export default {
  name: 'TopMembersItem',
  components: {},
  props: {
    member: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  setup(props) {
    const getAvatarUrl = computed(() => {
      if (props.member.data?.avatar?.url) return props.member.data.avatar.url
      return ''
    })

    const actionsOptions = [
      {
        title: 'Basic Information',
        command: 'basic-information',
      },
      {
        title: 'Blueprint Report',
        command: 'blueprint-report',
      },
    ]
    return {
      IconProfitUp,
      actionsOptions,
      IconActionGray,
      getAvatarUrl,
      currencyFormat,
    }
  },
}
</script>
