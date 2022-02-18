<template>
  <div class="flex">
    <img v-if="type === 'excel'" src="../../../assets/img/icon-excel.png" alt="excel" class="w-[50px] mr-5" />
    <img v-else src="../../../assets/img/icon-pdf.png" alt="excel" class="w-[50px] mr-5" />
    <div class="flex flex-col justify-center">
      <span>{{ fileName }}</span>
      <span class="mt-1">{{ getTime }}</span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import dayjs from 'dayjs'

export default {
  name: 'ItemHeader',
  props: {
    fileName: {
      type: String,
      require: true,
      default: '',
    },
    createdAt: {
      type: String,
      require: true,
      default: '',
    },
    type: {
      type: String,
      require: true,
      default: '',
    },
  },
  setup(props) {
    const getTime = computed(() => {
      return dayjs(props.createdAt).format('MM/DD/YYYY')
    })

    return {
      getTime,
    }
  },
}
</script>
