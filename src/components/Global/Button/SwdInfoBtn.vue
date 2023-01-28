<template>
  <div
    class="cursor-pointer bg-white rounded flex justify-center items-center border border-color-grey px-[6px] py-[6px]"
    @click="showInfo"
  >
    <el-icon>
      <InfoFilled color="#66B6FF" />
    </el-icon>
  </div>

  <el-dialog v-model="dialogVisible" title="Info" width="70%">
    <el-scrollbar v-loading="isFetching" height="500px" class="pr-[15px]">
      <div v-if="!isFetching && data" class="text-main">
        <div v-if="data.text" class="mb-4">
          <div class="border rounded-md p-5">
            {{ data.text }}
          </div>
        </div>
        <div v-if="data.url" class="h-[400px]">
          <div class="border rounded-md p-5">
            <video controls style="width: 100%; height: 100%">
              <source :src="data.url" type="video/mp4" />
            </video>
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
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useFetchClientsHelp } from '@/api/use-fetch-clients-help.js'
import { useStore } from 'vuex'

export default {
  name: 'SwdInfoBtn',
  components: {
    InfoFilled,
  },

  setup() {
    const route = useRoute()
    const store = useStore()
    const dialogVisible = ref(false)

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

    return {
      showInfo,
      dialogVisible,
      route,
      isLoading,
      data,
      refetch,
      isFetching,
    }
  },
}
</script>
