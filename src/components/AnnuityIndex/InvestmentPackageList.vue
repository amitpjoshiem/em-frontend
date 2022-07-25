<template>
  <div class="border border-color-grey rounded-md p-5 mb-4 min-h-[300px]">
    <div class="flex justify-between mb-5">
      <div class="flex items-center">
        <InlineSvg :src="IconDoneStep" />
        <div class="text-main text-xl font-semibold ml-2">Investment Package</div>
      </div>
      <el-button type="primary" size="small" plain class="w-[160px]" @click="addPackage">
        Add Investment Package
      </el-button>
    </div>

    <el-skeleton v-if="isLoading" :rows="3" animated />
    <el-row v-else-if="investmentPpackage.data.length" :gutter="20">
      <el-col v-for="(item, index) in investmentPpackage.data" :key="index" :span="12">
        <InvestmentPackageItem :item="item" />
      </el-col>
    </el-row>
    <div v-else class="flex flex-col justify-center items-center">
      <div class="w-14 h-14 bg-color-grey rounded-full flex items-center justify-center mt-5">
        <InlineSvg :src="IconLastActivityEmpty" />
      </div>
      <span class="text-gray03 font-semibold text-xss mt-5">No recently Investment Package</span>
    </div>

    <ModalAddInvestmentPackage />
  </div>
</template>

<script>
import InvestmentPackageItem from '@/components/AnnuityIndex/InvestmentPackageItem.vue'
import ModalAddInvestmentPackage from '@/components/AnnuityIndex/ModalAddInvestmentPackage.vue'
import IconDoneStep from '@/assets/svg/icon-done-step.svg'
import IconLastActivityEmpty from '@/assets/svg/icon-last-activity-empty.svg'
import { useStore } from 'vuex'
import { useInvestmentPackageAll } from '@/api/use-fetch-investment-package-all.js'
import { useRoute } from 'vue-router'

export default {
  name: 'InvestmentPackageList',
  components: {
    InvestmentPackageItem,
    ModalAddInvestmentPackage,
  },
  setup() {
    const store = useStore()
    const route = useRoute()

    const { isLoading: isLoading, data: investmentPpackage } = useInvestmentPackageAll(route.params.annuityId)

    const addPackage = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'modalInvestmentPackage',
        value: true,
      })
    }

    return {
      IconDoneStep,
      IconLastActivityEmpty,
      addPackage,
      isLoading,
      investmentPpackage,
    }
  },
}
</script>
