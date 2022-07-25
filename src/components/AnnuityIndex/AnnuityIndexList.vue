<template>
  <div class="p-5">
    <SwdSubHeader title="Fixed Index Annuity" />
    <div class="flex justify-end pt-2 pb-5">
      <el-button plain type="primary" size="small" @click="addIndexAnnuity">Add Index Annuity</el-button>
    </div>

    <el-skeleton v-if="isLoading" :rows="7" animated />
    <div v-else-if="!data.data.length" class="text-gray03 flex items-center flex-col mt-5">
      <div class="bg-widget-bg rounded-full w-16 h-16 flex flex-col items-center justify-center mb-3">
        <InlineSvg :src="IconEmptyUsers" />
      </div>
      <p>No recently added Index Annuity</p>
    </div>

    <el-row v-else-if="data.data" :gutter="20">
      <el-col v-for="(item, index) in data.data" :key="index" :span="12">
        <AnnuityIndexItem :item="item" />
      </el-col>
    </el-row>

    <ModalAddAnnuityIndex />
  </div>
</template>
<script>
import AnnuityIndexItem from '@/components/AnnuityIndex/AnnuityIndexItem.vue'
import ModalAddAnnuityIndex from '@/components/AnnuityIndex/ModalAddAnnuityIndex.vue'
import { useAnnuityIndex } from '@/api/use-fetch-annuity-index.js'
import { useRoute } from 'vue-router'
import IconEmptyUsers from '@/assets/svg/icon-empty-users.svg'
import { useStore } from 'vuex'

export default {
  name: 'AnnuityIndexList',
  components: {
    AnnuityIndexItem,
    ModalAddAnnuityIndex,
  },
  setup() {
    const route = useRoute()
    const store = useStore()

    const { isLoading, isError, data } = useAnnuityIndex(route.params.id)

    const addIndexAnnuity = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'modalAddAnnuityIndex',
        value: true,
      })
    }

    return {
      IconEmptyUsers,
      isLoading,
      isError,
      data,
      addIndexAnnuity,
    }
  },
}
</script>
