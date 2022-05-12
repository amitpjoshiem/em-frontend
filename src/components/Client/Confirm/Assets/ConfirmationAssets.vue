<template>
  <div>
    <div v-if="$can('client', 'all')" class="flex justify-end mb-4">
      <el-button type="primary" plain class="mr-10" size="small" @click="edit">Edit</el-button>
    </div>
    <div v-if="!isAssetsLoading && !isAssetsSchemaLoading">
      <el-card v-for="(block, indexGroup) in assetsSchema.data" :key="indexGroup" class="rounded-md mb-10">
        <div class="flex pb-2 mt-8">
          <div class="w-4/12"></div>
          <div v-for="header in block.headers" :key="header + indexGroup" class="w-2/12 px-2 text-gray03 text-xs">
            {{ header.toUpperCase() }}
          </div>
        </div>
        <div v-for="row in block.rows" :key="row" class="flex">
          <div class="w-4/12 flex items-center">
            <div v-if="row.label" class="text-main font-semibold text-xss">
              {{ row.label }}
            </div>
          </div>

          <div v-for="item in row.elements" :key="item" class="w-2/12 px-2 mb-0">
            <div v-if="item.type === 'string'" class="mb-2">
              {{ currencyFormat(assets.data[item.model.group][item.model.model][item.model.item]) }}
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div v-else class="flex justify-center items-center">
      <SwdSpinner large />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFetchMemberAssets } from '@/api/use-fetch-member-assets'
import { useFetchMemberAssetsSchema } from '@/api/use-fetch-member-assets-schema'
import { currencyFormat } from '@/utils/currencyFormat'

export default {
  name: 'AddAssets',
  components: {},
  setup() {
    const route = useRoute()
    const router = useRouter()
    const form = ref()

    const { data: assets, isLoading: isAssetsLoading } = useFetchMemberAssets(route.params.id)
    const { data: assetsSchema, isLoading: isAssetsSchemaLoading } = useFetchMemberAssetsSchema(route.params.id)

    const edit = () => {
      router.push({ name: 'client-assets-information', params: { id: route.params.id } })
    }

    return {
      assets,
      isAssetsLoading,
      form,
      edit,
      assetsSchema,
      isAssetsSchemaLoading,
      currencyFormat,
    }
  },
}
</script>
