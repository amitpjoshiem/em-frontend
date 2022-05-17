<template>
  <el-button type="success" plain size="small" class="w-[100px]" :loading="isLoading" @click="dialogVisible = true">
    {{ getText(company) }}
  </el-button>

  <el-dialog v-model="dialogVisible" title="Select Company" width="55%">
    <div class="flex flex-wrap">
      <div
        v-for="item in data.data"
        :key="item.id"
        class="border border-input-border p-2 m-2 rounded-lg hover:border-border-blue"
        :class="{ 'border-border-blue': item.id === currentCompany.id }"
      >
        <div
          class="py-2 text-center hover:text-border-blue text-main"
          :class="{ 'text-border-blue': item.id === currentCompany.id }"
        >
          {{ item.name }}
        </div>
        <div class="flex flex-col">
          <div class="text-center mb-2">
            <el-button type="primary" plain size="small" :icon="Finished" class="w-28" @click="newTabCompany(item)">
              Open new tab
            </el-button>
          </div>
          <div class="text-center">
            <el-button type="success" plain size="small" :icon="Link" class="w-28" @click="chooseCompany(item)">
              Choose
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useFetchCompanies } from '@/api/use-fetch-companies'
import { useQueryClient } from 'vue-query'
import { Edit, Finished, Link } from '@element-plus/icons-vue'

export default {
  name: 'SelectCompany',
  setup() {
    const store = useStore()
    const router = useRouter()
    const queryClient = useQueryClient()

    const company = ref()
    const options = ref([])

    const dialogVisible = ref(false)

    const { isLoading, isError, data } = useFetchCompanies()

    watchEffect(() => {
      if (!isLoading.value) {
        options.value = data.value.data.map((item) => {
          return {
            value: item.id,
            label: item.name,
          }
        })
        company.value = data.value.data.find((item) => item.id === store.state.globalComponents.currentCompanyId).name
      }
    })

    const currentCompany = computed(() => {
      return data.value.data.find((item) => item.id === store.state.globalComponents.currentCompanyId)
    })

    const newTabCompany = (item) => {
      dialogVisible.value = false
      let routeData = router.resolve({ name: 'ceo-dashboard', query: { id: item.id } })
      window.open(routeData.href, '_blank')
    }

    const chooseCompany = (item) => {
      store.commit('globalComponents/setCurrentCompanyId', item.id)
      company.value = item.name
      dialogVisible.value = false
      queryClient.refetchQueries()
    }

    const getText = (text) => {
      if (text && text.length > 10) return text.slice(0, 10) + '...'
      return text
    }

    return {
      company,
      options,

      isLoading,
      isError,
      data,

      Edit,
      dialogVisible,
      Finished,
      Link,

      newTabCompany,
      chooseCompany,

      getText,
      currentCompany,
    }
  },
}
</script>
