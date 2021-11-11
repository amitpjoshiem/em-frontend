<template>
  <div class="w-8/24 border rounded-lg mr-5">
    <div v-if="!isLoading" class="p-5 flex flex-col h-full justify-between">
      <div class="text-main text-smm font-semibold mb-3">Past Stress Test Results</div>
      <div v-if="isAvailableCocument" class="flex flex-col">
        <div
          class="flex border-input-border border rounded-md p-3 w-full mb-3.5 cursor-pointer"
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
          class="flex border-input-border border rounded-md p-3 w-full mb-3.5 cursor-pointer"
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
      <div v-else class="text-gray03 text-sm text-center">No recently added documents</div>
      <Button
        small-btn-gray
        text-semi-bold
        wide-btn
        :text-btn="isAvailableCocument ? 'More' : 'Add'"
        @click="moreActionStressTest"
      />
    </div>
    <el-skeleton v-else :rows="5" animated class="p-5" />
    <PrewiewPdfModal v-if="state.dialogVisible" :pdf-url="state.previewUrl" />
  </div>
</template>

<script>
import { computed, reactive, watchEffect } from 'vue'
import { useFetchStressTest } from '@/api/use-fetch-stress-test.js'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import PrewiewPdfModal from '@/components/NewProspect/StressTestResult/PrewievPdfModal.vue'

export default {
  name: 'WidgetPastStress',
  components: {
    PrewiewPdfModal,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const id = route.params.id

    const { isLoading, isFetching, isError, data: stressTestDocument } = useFetchStressTest(id)

    const state = reactive({
      dialogVisible: false,
      previewUrl: '',
    })

    const isAvailableCocument = computed(() => {
      return stressTestDocument.value.data && stressTestDocument.value.data.length
    })

    const moreActionStressTest = () => {
      router.push({ name: 'past-stress-test', params: { id } })
    }

    const openPrewiev = (pdfUrl) => {
      state.dialogVisible = true
      state.previewUrl = pdfUrl
      store.commit('globalComponents/setShowModal', {
        destination: 'prewievPdf',
        value: true,
      })
    }

    watchEffect(() => {
      state.dialogVisible = store.state.globalComponents.dialog.showDialog.prewievPdf
    })

    return {
      isLoading,
      isFetching,
      isError,
      stressTestDocument,
      isAvailableCocument,
      moreActionStressTest,
      openPrewiev,
      state,
    }
  },
}
</script>
