<template>
  <div class="border border-color-grey flex justify-between items-center p-5 mb-5 text-sm">
    <div class="flex">
      <img src="../../../assets/img/icon-excel.png" alt="excel" class="w-[50px] mr-5" />
      <div class="flex flex-col">
        <span>{{ item.filename }}</span>
        <span class="mt-1">{{ getTime }}</span>
      </div>
    </div>
    <el-button v-if="item.status === 'process'" type="primary" size="small" plain disabled>
      <div class="flex items-center">
        <SwdSpinner />
        <span class="pl-2">processing</span>
      </div>
    </el-button>
    <a
      v-if="item.status === 'success'"
      :href="item.media.url"
      download
      class="el-button el-button--primary el-button--mini is-plain"
    >
      download
    </a>
    <el-button v-if="item.status === 'error'" type="danger" size="small" plain disabled>error</el-button>
  </div>
</template>
<script>
import { computed } from 'vue'
import dayjs from 'dayjs'

export default {
  name: 'DocumentExportItem',
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  setup(props) {
    const getTime = computed(() => {
      return dayjs(props.created_at).format('MM/DD/YYYY')
    })

    return {
      getTime,
    }
  },
}
</script>
