<template>
  <div class="flex items-center">
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
    <el-form ref="ruleFormRef" :model="ruleForm" label-position="top">
      <el-form-item label="Only my" prop="only_my" class="mt-[-20px] ml-2">
        <el-switch v-model="ruleForm.owner" @change="changeOwner" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useSearchMembers } from '@/api/use-search-members.js'

export default {
  name: 'ListOfHouseholdsFilter',
  components: {
    Search,
  },
  setup() {
    const state = ref('')

    const ruleForm = reactive({
      owner: false,
    })

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

    const changeOwner = () => {
      console.log('======', ruleForm.owner)
      if (ruleForm.owner) console.log('MY')
      if (!ruleForm.owner) console.log('SELECTED')
    }

    const handleSelect = (item) => {
      console.log('handleSelect - ', item)
      state.value = item.name
      // state.id = item.id
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
    }
  },
}
</script>
