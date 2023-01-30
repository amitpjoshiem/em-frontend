<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    class="cursor-pointer bg-white rounded flex justify-center items-center border border-color-grey px-[6px] py-[6px]"
    @click="showInfo"
  >
    <el-icon>
      <InfoFilled color="#66B6FF" />
    </el-icon>
  </div>

  <el-dialog v-model="dialogVisible" title="Info" :width="getModalWidth" :fullscreen="getFullScreenModal">
    <el-scrollbar v-loading="isFetching" class="pr-[15px]">
      <div v-if="!isFetching && data" class="text-main">
        <div v-if="data.url" class="mb-4">
          <div class="border rounded-md p-5">
            <video controls style="width: 100%; height: 100%">
              <source :src="data.url" type="video/mp4" />
            </video>
          </div>
        </div>
        <div v-if="data.text">
          <div class="border rounded-md p-5">
            <div class="help-text-content" v-html="data.text" />
          </div>
        </div>
      </div>
    </el-scrollbar>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Close</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { InfoFilled } from '@element-plus/icons-vue'
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useFetchClientsHelp } from '@/api/use-fetch-clients-help.js'
import { useStore } from 'vuex'
import { useBreakpoints } from '@/hooks/use-breakpoints'

export default {
  name: 'SwdInfoBtn',
  components: {
    InfoFilled,
  },

  setup() {
    const route = useRoute()
    const store = useStore()
    const dialogVisible = ref(false)
    const { screenType } = useBreakpoints()

    const { isLoading, data, refetch, isFetching } = useFetchClientsHelp({ enabled: false })

    watchEffect(() => {
      if (dialogVisible.value) getFetchData()
    })

    const getFetchData = async () => {
      if (route.name === 'lead-basic-information') {
        await store.commit('globalComponents/setPageClientsHelp', 'prospect_basic')
      }
      if (route.name === 'lead-assets-information') {
        await store.commit('globalComponents/setPageClientsHelp', 'prospect_assets_income')
      }
      if (route.name === 'lead-expense-information') {
        await store.commit('globalComponents/setPageClientsHelp', 'prospect_monthly_expenses')
      }
      refetch.value()
    }

    const showInfo = () => {
      dialogVisible.value = true
    }

    const getModalWidth = computed(() => {
      if (screenType.value === 'lg') return '70%'
      if (screenType.value === 'md') return '70%'
      return '100%'
    })

    const getFullScreenModal = computed(() => {
      if (screenType.value === 'xs') return true
      return false
    })

    return {
      showInfo,
      dialogVisible,
      route,
      isLoading,
      data,
      refetch,
      isFetching,
      getModalWidth,
      getFullScreenModal,
    }
  },
}
</script>
