<template>
  <div
    class="
      relative
      inline-block
      text-left
      rounded
      py-2
      px-3
      cursor-pointer
      bg-white
    "
    :class="{ 'border border-color-grey': border }"
    @click="showBlock"
  >
    <div>
      <InlineSvg v-if="grey" :src="IconActionGray" />
      <InlineSvg v-else :src="IconAction" />
    </div>

    <div
      v-show="isShow"
      class="
        origin-top-right
        absolute
        -right-5
        mt-6
        w-56
        rounded-large
        shadow-lg
        bg-white
        focus:outline-none
        caret
      "
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
    >
      <ul>
        <li class="text-main px-4 py-4 text-sm flex">
          <InlineSvg :src="IconDownload" />
          <span class="pl-2.5">Download as PDF</span>
        </li>
        <li class="text-main px-4 py-4 text-sm flex border-t border-color-grey">
          <InlineSvg :src="IconShareGrey" />
          <span class="pl-2.5">Share as PDF</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import IconAction from '@/assets/svg/icon-action.svg'
import IconActionGray from '@/assets/svg/icon-action-gray.svg'
import IconDownload from '@/assets/svg/icon-download.svg'
import IconShareGrey from '@/assets/svg/icon-share-grey.svg'
export default {
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

  data() {
    return {
      isShow: false,
    }
  },

  methods: {
    showBlock() {
      this.isShow = !this.isShow
    },
  },
}
</script>

<style scoped>
.caret::before {
  content: '';
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 11.5px 13px 11.5px;
  border-color: transparent transparent #fff transparent;
  position: absolute;
  right: 22px;
  top: -13px;
}
</style>
