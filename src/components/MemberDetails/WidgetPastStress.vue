<template>
  <div class="w-8/24 border rounded-lg mr-5">
    <div class="p-5 flex flex-col h-full justify-between">
      <SwdWidgetTitle text="Past Stress Test Results" />
      <el-skeleton v-if="isLoading" :rows="2" animated class="p-5" />
      <SwdErrorBlock v-else-if="isError" />
      <div v-else-if="isAvailableCocument" class="flex flex-col">
        <div
          class="flex border-main-gray border rounded-md p-3 w-full mb-3.5 cursor-pointer"
          @click="openPrewiev(stressTestDocument.data[0].url)"
        >
          <div class="w-[35px] mr-2">
            <img class="el-upload-list__item-thumbnail" src="../../assets/img/icon-pdf.png" alt="" />
          </div>
          <div class="flex flex-col">
            <span class="text-xs">{{ stressTestDocument.data[0].name }}</span>
            <span class="text-xs">{{ stressTestDocument.data[0].created_at }}</span>
          </div>
        </div>
        <div
          v-if="stressTestDocument.data[1]"
          class="flex border-main-gray border rounded-md p-3 w-full mb-3.5 cursor-pointer"
          @click="openPrewiev(stressTestDocument.data[1].url)"
        >
          <div class="w-[35px] mr-2">
            <img class="el-upload-list__item-thumbnail" src="../../assets/img/icon-pdf.png" alt="" />
          </div>
          <div class="flex flex-col">
            <span class="text-xs">{{ stressTestDocument.data[1].name }}</span>
            <span class="text-xs">{{ stressTestDocument.data[1].created_at }}</span>
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col items-center justify-center">
        <div class="bg-main-gray rounded-full w-12 h-12 flex flex-col items-center justify-center mb-3">
          <InlineSvg :src="IconEmptyUsers" />
        </div>
        <p class="text-main text-sm">No recently added documents</p>
      </div>
      <SwdButton primary v-if="isAvailableCocument" small @click="moreActionStressTest">More</SwdButton>
      <SwdButton primary v-if="!isAvailableCocument" small class="mr-2" @click="moreActionStressTest">
        <InlineSvg :src="IconPlus" class="mr-1.5" />
        Add
      </SwdButton>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useFetchStressTest } from '@/api/use-fetch-stress-test.js'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import IconEmptyUsers from '@/assets/svg/icon-empty-users.svg'
import IconPlus from '@/assets/svg/icon-plus.svg'

export default {
  name: 'WidgetPastStress',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const id = route.params.id

    const { isLoading, isFetching, isError, data: stressTestDocument } = useFetchStressTest(id)

    const isAvailableCocument = computed(() => {
      return stressTestDocument.value?.data && stressTestDocument.value?.data?.length
    })

    const moreActionStressTest = () => {
      router.push({ name: 'past-stress-test', params: { id } })
    }

    const openPrewiev = (url) => {
      store.commit('globalComponents/setShowModal', {
        destination: 'prewievPdf',
        value: true,
      })
      store.commit('globalComponents/setPreviewUrlPdf', url)
    }

    return {
      isLoading,
      isFetching,
      isError,
      stressTestDocument,
      isAvailableCocument,
      moreActionStressTest,
      openPrewiev,
      IconEmptyUsers,
      IconPlus,
    }
  },
}
</script>
