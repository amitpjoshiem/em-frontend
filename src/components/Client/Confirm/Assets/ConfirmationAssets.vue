<template>
  <div>
    <div v-if="$can('client', 'all')" class="flex justify-end mb-4">
      <el-button type="primary" plain class="mr-10" size="small" @click="edit">Edit</el-button>
    </div>
    <div v-if="!isAssetsLoading && !isAssetsSchemaLoading">
      <el-card v-for="(block, indexGroup) in assetsSchema.data" :key="indexGroup" class="rounded-md mb-10">
        <span class="text-main text-xl font-semibold ml-2">{{ block.title }}</span>
        <div class="flex pb-2 mt-8">
          <div class="w-4/12"></div>
          <div v-for="header in block.headers" :key="header + indexGroup" class="w-2/12 px-2 text-gray03 text-xs">
            {{ header.toUpperCase() }}
          </div>
        </div>
        <div v-for="row in block.rows" :key="row" class="flex">
          <template v-if="isShowRow(assets.data[block.name][row.name])">
            <div class="w-4/12 flex items-center">
              <div v-if="row.label" class="text-main font-semibold text-xss">
                {{ row.label }}
              </div>
            </div>

            <div v-for="item in row.elements" :key="item" class="w-2/12 px-2 mb-0">
              <div
                v-if="typeof assets.data[item.model.group][item.model.model][item.model.item] === 'number'"
                class="mb-2 text-xss"
              >
                {{ currencyFormat(assets.data[item.model.group][item.model.model][item.model.item]) }}
              </div>
              <div
                v-if="typeof assets.data[item.model.group][item.model.model][item.model.item] === 'string'"
                class="mb-2 text-xss"
              >
                {{ assets.data[item.model.group][item.model.model][item.model.item] }}
              </div>
              <div
                v-if="typeof assets.data[item.model.group][item.model.model][item.model.item] === 'boolean'"
                class="flex"
              >
                <el-tag v-if="assets.data[item.model.group][item.model.model][item.model.item]" type="success">
                  Yes
                </el-tag>
                <el-tag v-else type="danger">No</el-tag>
              </div>
            </div>
          </template>
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
  name: 'ConfirmationAssets',
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

    const isShowRow = (row) => {
      if (row !== undefined) {
        return Object.values(row).some((item) => {
          return item !== null
        })
      }
      return false
    }

    return {
      assets,
      isAssetsLoading,
      form,
      edit,
      assetsSchema,
      isAssetsSchemaLoading,
      currencyFormat,
      isShowRow,
    }
  },
}
</script>
