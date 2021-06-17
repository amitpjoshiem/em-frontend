<template>
  <el-dropdown trigger="click">
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
      :class="{ 'border border-color-grey': border }"
    >
      <InlineSvg v-if="grey" :src="IconActionGray" />
      <InlineSvg v-else :src="IconAction" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <InlineSvg :src="IconDownload" />
          <span class="pl-2.5">Download as PDF</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <InlineSvg :src="IconShareGrey" />
          <span class="pl-2.5">Share as PDF</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script>
import IconAction from '@/assets/svg/icon-action.svg'
import IconActionGray from '@/assets/svg/icon-action-gray.svg'
import IconDownload from '@/assets/svg/icon-download.svg'
import IconShareGrey from '@/assets/svg/icon-share-grey.svg'
export default {
  name: 'DropDown',
  props: {
    border: {
      type: Boolean,
      require: false,
      default: false,
    },
    grey: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  setup() {
    return {
      IconAction,
      IconDownload,
      IconShareGrey,
      IconActionGray,
    }
  },
}
</script>

<style>
.el-dropdown-menu__item {
  display: flex;
  align-items: center;
}

.el-dropdown-menu__item:first-child {
  border-bottom: 1px solid #ebf0fa;
}
</style>
