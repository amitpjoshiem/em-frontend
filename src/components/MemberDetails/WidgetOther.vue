<template>
  <div class="px-3 pt-4 pb-4 border border-color-grey box-border rounded-r-md border-l-0 w-6/24">
    <div class="flex justify-between items-center text-smm font-semibold">
      <span class="text-main">Other</span>
      <el-button size="small" @click="showMore">More</el-button>
    </div>
    <div class="text-xs pt-3">
      <div class="border-input-border border rounded-md p-2 w-full my-2">
        <p class="text-gray03 mb-[2px]">Risk level:</p>
        <p class="font-semibold" data-testid="widjet-other-risk">{{ other.value.risk }}</p>
      </div>
      <div class="border-input-border border rounded-md p-2 w-full mb-2 flex flex-col">
        <span class="text-gray03 mb-[2px]">Goal for retirement:</span>
        <span class="font-semibold" data-testid="widjet-other-retirement">{{ getText(other.value.retirement) }}</span>
      </div>
      <div class="border-input-border border rounded-md p-2 w-full">
        <p class="text-gray03 mb-[2px]">Goal for retirement money:</p>
        <p
          class="font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis"
          data-testid="widjet-other-retirement-money"
        >
          {{ getText(other.value.retirementMoney) }}
        </p>
      </div>
    </div>
  </div>
  <ModalMemberDetailsOther :other="other" />
</template>

<script>
import ModalMemberDetailsOther from './ModalMemberDetailsOther.vue'
import { useStore } from 'vuex'

export default {
  name: 'WidgetOther',
  components: {
    ModalMemberDetailsOther,
  },
  props: {
    other: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  setup() {
    const store = useStore()

    const getText = (text) => {
      if (text && text.length > 28) return text.slice(0, 28) + '...'
      return text
    }

    const showMore = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'moreOtherInfo',
        value: true,
      })
    }

    return {
      getText,
      showMore,
    }
  },
}
</script>
