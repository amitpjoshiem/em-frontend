<template>
  <div class="flex items-center">
    <el-autocomplete
      v-model="state"
      clearable
      :fetch-suggestions="querySearchAsync"
      placeholder="Search advisor"
      :trigger-on-focus="false"
      minlength="3"
      @select="handleSelect"
      @clear="handleClear"
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
    <el-form ref="ruleFormRef" :model="ruleForm" label-position="top">
      <el-form-item prop="only_my" class="">
        <el-switch
          v-model="ruleForm.owner"
          active-text="Only my"
          inactive-text="All"
          class="ml-4"
          style="--el-switch-on-color: #f58833; --el-switch-off-color: #83ccf0"
          @change="changeOwner"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useSearchUsers } from '@/api/use-search-users.js'
import { useStore } from 'vuex'

export default {
  name: 'ListOfHouseholdsFilter',
  components: {
    Search,
  },
  setup() {
    const store = useStore()
    const state = ref('')

    const ruleForm = reactive({
      owner: false,
    })

    const { isLoading, isError, data, refetch } = useSearchUsers(
      {
        search: state,
      },
      { enabled: false }
    )

    onMounted(async () => {
      if (store.state.globalComponents.onlyMyMember === 'my') {
        ruleForm.owner = true
      }

      if (store.state.globalComponents.ownerMember?.name) {
        state.value = store.state.globalComponents.ownerMember.name
      }
    })

    const querySearchAsync = async (_, callback) => {
      if (state.value.length > 2) {
        refetch
          .value()
          .then((res) => {
            const data = res.data
            if (data.length) return data.map((item) => ({ id: item.id, name: item.first_name + ' ' + item.last_name }))
            return [{ name: 'not found' }]
          })
          .then((res) => {
            callback(res)
          })
      }
      callback([])
    }

    const changeOwner = () => {
      if (ruleForm.owner) {
        state.value = ''
        store.commit('globalComponents/setOnlyMyMember', 'my')
        store.commit('globalComponents/setOwnerMember', null)
      }

      if (!ruleForm.owner) {
        store.commit('globalComponents/setOnlyMyMember', '')
      }
    }

    const handleSelect = (item) => {
      state.value = item.name
      ruleForm.owner = false
      store.commit('globalComponents/setOwnerMember', item)
      store.commit('globalComponents/setOnlyMyMember', 'selected')
    }

    const handleClear = () => {
      store.commit('globalComponents/setOwnerMember', null)
      store.commit('globalComponents/setOnlyMyMember', '')
    }

    return {
      ruleForm,
      changeOwner,
      state,
      querySearchAsync,
      isLoading,
      isError,
      data,
      refetch,
      handleSelect,
      handleClear,
    }
  },
}
</script>
