<template>
  <div class="border border-color-grey rounded-md p-5 mb-4">
    <div class="flex justify-between mb-5">
      <div class="flex items-center">
        <InlineSvg :src="IconDoneStep" />
        <div class="text-main text-xl font-semibold ml-2">Investment Package</div>
      </div>
      <el-button type="primary" size="small" plain class="w-[160px]" @click="addPackage">
        Add Investment Package
      </el-button>
    </div>

    <el-row :gutter="20">
      <el-col :span="12">
        <InvestmentPackageItem />
      </el-col>
      <el-col :span="12">
        <InvestmentPackageItem />
      </el-col>
      <el-col :span="12">
        <InvestmentPackageItem />
      </el-col>
    </el-row>

    <ModalAddInvestmentPackage />
  </div>
</template>

<script>
import InvestmentPackageItem from '@/components/AnnuityIndex/InvestmentPackageItem.vue'
import ModalAddInvestmentPackage from '@/components/AnnuityIndex/ModalAddInvestmentPackage.vue'
import IconDoneStep from '@/assets/svg/icon-done-step.svg'
import { useStore } from 'vuex'

export default {
  name: 'InvestmentPackageList',
  components: {
    InvestmentPackageItem,
    ModalAddInvestmentPackage,
  },
  setup() {
    const store = useStore()

    const addPackage = () => {
      console.log('addPackage')
      store.commit('globalComponents/setShowModal', {
        destination: 'modalInvestmentPackage',
        value: true,
      })
    }

    return {
      IconDoneStep,
      addPackage,
    }
  },
}
</script>
