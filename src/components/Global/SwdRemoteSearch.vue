<template>
  <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    placeholder="Search member"
    :trigger-on-focus="false"
    minlength="3"
    @select="handleSelect"
  >
    <template #prefix>
      <div class="flex items-center">
        <el-icon>
          <search />
        </el-icon>
      </div>
    </template>
    <template #default="{ item }">
      <div class="value">{{ item.name }}</div>
    </template>
  </el-autocomplete>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useSearchMembers } from '@/api/use-search-members.js'
import { useRouter, useRoute } from 'vue-router'
import { Search } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'SwdRemoteSearch',
  components: {
    Search,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const links = ref([])
    const state = ref('')

    const { isLoading, isError, data, refetch } = useSearchMembers(
      {
        search: state,
      },
      { enabled: false }
    )

    const querySearchAsync = async (_, callback) => {
      if (state.value.length > 2) {
        refetch
          .value()
          .then((res) => {
            const data = res.data
            if (data.length) return data.map((item) => ({ id: item.id, name: item.name }))
            return [{ name: 'not found' }]
          })
          .then((res) => {
            callback(res)
          })
      }
      callback([])
    }

    const handleSelect = (item) => {
      if (item.id) router.push({ name: `${route.meta.type}/member-details`, params: { id: item.id } })
    }

    return {
      links,
      state,
      querySearchAsync,
      handleSelect,
      isLoading,
      isError,
      data,
    }
  },
})
</script>
