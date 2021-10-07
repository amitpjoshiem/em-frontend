<template>
  <div class="flex py-2">
    <div class="flex justify-center items-center w-1/12">
      <SwdAvatar :link="getAvatarUrl" size="small" />
    </div>
    <div class="text-xs text-main font-medium flex items-center w-3/12">
      {{ member.name }}
    </div>
    <div class="flex justify-center items-center w-2/12">
      <SwdTypeUserLabel />
    </div>
    <div class="text-xs text-main font-medium flex items-center w-3/12">
      {{ member.stage }}
    </div>
    <div class="text-xs text-main font-medium flex items-center w-2/12">
      {{ member.amount }}
    </div>
    <div class="col-span-1 flex justify-center items-center w-1/12">
      <SwdDropDown :options="actionsOptions">
        <template #titleDropDown>
          <span class="cursor-pointer bg-white rounded flex justify-center items-center py-1 px-2 border">
            <InlineSvg :src="IconActionGray" />
          </span>
        </template>
      </SwdDropDown>
    </div>
  </div>
</template>

<script>
import IconProfitUp from '@/assets/svg/profit-up.svg'
import IconActionGray from '@/assets/svg/icon-action-gray.svg'
import { computed } from 'vue'

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
    }
  },
}
</script>
