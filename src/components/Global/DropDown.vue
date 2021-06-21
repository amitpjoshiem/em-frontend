<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <div class="flex items-center">
      <div v-if="userAction" class="flex items-center">
        <span class="px-2 py-2">{{ title }}</span>
        <InlineSvg :src="IconUserAction" />
      </div>
      <div v-if="elementAction">
        <span
          class="
            cursor-pointer
            bg-white
            rounded
            flex
            justify-center
            items-center
            py-2
            px-3
          "
          :class="{ 'border border-color-grey': withBorder }"
        >
          <InlineSvg :src="computedIconAction" />
        </span>
      </div>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(item, index) in options"
          :key="index"
          :command="item.command"
        >
          <span :class="{ 'font-semibold': item.isSemiBold }">{{
            item.title
          }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { computed } from 'vue'
import IconAction from '@/assets/svg/icon-action.svg'
import IconActionGray from '@/assets/svg/icon-action-gray.svg'
import IconDownload from '@/assets/svg/icon-download.svg'
import IconShareGrey from '@/assets/svg/icon-share-grey.svg'
import IconUserAction from '@/assets/svg/icon-user-action.svg'
import { useLogout } from '@/api/use-logout'

export default {
  name: 'DropDown',
  props: {
    options: {
      type: Array,
      require: false,
      default: () => [],
    },
    title: {
      type: String,
      require: false,
      default: '',
    },
    elementAction: {
      type: Boolean,
      require: false,
      default: false,
    },
    userAction: {
      type: Boolean,
      require: false,
      default: false,
    },
    iconGray: {
      type: Boolean,
      require: false,
      default: false,
    },
    iconAction: {
      type: Boolean,
      require: false,
      default: false,
    },
    withBorder: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  setup(props) {
    const { error, fetching, logout } = useLogout()

    const profileClickHandler = () => {
      console.log('profile-settings')
    }
    const logOutHandler = () => {
      console.log('LOGOUT')
      logout()
    }
    const actionsMap = {
      'profile-settings': profileClickHandler,
      logout: logOutHandler,
      default: (c) =>
        console.error('There are no related handlers for command - ', c),
    }
    const handleCommand = (command) => {
      const handler = actionsMap[command] ?? actionsMap['default']
      handler(command)
    }

    const computedIconAction = computed(() => {
      if (props.iconAction) return IconAction
      return IconActionGray
    })

    return {
      handleCommand,
      computedIconAction,
      IconAction,
      IconDownload,
      IconShareGrey,
      IconActionGray,
      IconUserAction,
      fetching,
      error,
    }
  },
}
</script>
