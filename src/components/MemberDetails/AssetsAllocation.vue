<template>
  <div class="border border-color-grey box-border flex w-16/24 rounded-md">
    <div class="border-r border-color-grey p-5 w-8/12">
      <router-link
        :to="{ name: 'asset-allocation-details', params: { id: memberId } }"
        class="text-main text-smm font-semibold cursor-pointer"
      >
        <span class="text-main text-smm font-semibold">Asset Allocation</span>
      </router-link>
      <div class="flex pt-3">
        <AssetsChart :values="ruleForm" />
        <div class="flex ml-4">
          <div class="flex flex-col justify-center mr-3">
            <div class="bg-dark-blue-charts w-2 h-2 rounded-full" />
            <div class="bg-activity w-2 h-2 rounded-full my-9" />
            <div class="bg-color-error w-2 h-2 rounded-full" />
          </div>
          <div class="flex flex-col justify-center text-main text-xs mr-3">
            <div>Liquidity</div>
            <div class="my-7">Growth</div>
            <div>Income</div>
          </div>
          <div class="flex flex-col justify-center text-main text-xs font-medium">
            <el-form ref="form" :model="ruleForm" status-icon :rules="rules" size="mini">
              <el-form-item prop="assetsData.liquidity" class="">
                <el-input v-model="ruleForm.assetsData.liquidity" placeholder="$12345" @change="changeAssets()" />
              </el-form-item>
              <el-form-item prop="assetsData.growth" class="mt-4">
                <el-input v-model="ruleForm.assetsData.growth" placeholder="$12345" @change="changeAssets()" />
              </el-form-item>
              <el-form-item prop="assetsData.income" class="mt-4">
                <el-input v-model="ruleForm.assetsData.income" placeholder="$12345" @change="changeAssets()" />
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <div class="w-4/12 flex flex-col">
      <SwdDropDown class="flex justify-end pt-3 pr-3" :options="actionsOptions">
        <template #titleDropDown>
          <span
            class="cursor-pointer bg-white rounded flex justify-center items-center py-2 px-3 border border-color-grey"
          >
            <InlineSvg :src="IconAction" />
          </span>
        </template>
      </SwdDropDown>
      <div class="flex justify-center items-center flex-col">
        <RiskLevelChart />
        <div class="mt-7 text-sm font-semibold">
          <span class="text-main">Risk level: </span>
          <span class="text-activity">Moderate</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AssetsChart from '@/components/MemberDetails/Chart/AssetsChart.vue'
import RiskLevelChart from '@/components/MemberDetails/Chart/RiskLevelChart.vue'
import IconAction from '@/assets/svg/icon-action.svg'
import { currencyFormat } from '@/utils/currencyFormat'
import { useRoute } from 'vue-router'
import { computed, reactive } from 'vue'
import { rules } from '@/validationRules/memberDetailsAssetsRules.js'
export default {
  name: 'AssetsAllocation',
  components: {
    AssetsChart,
    RiskLevelChart,
  },
  setup() {
    const route = useRoute()

    const ruleForm = reactive({
      assetsData: {
        income: '',
        growth: '',
        liquidity: '',
      },
      total: 0,
    })

    const changeAssets = () => {
      ruleForm.total = 0
      for (const key in ruleForm.assetsData) {
        if (Object.hasOwnProperty.call(ruleForm.assetsData, key)) {
          if (!isNaN(ruleForm.assetsData[key])) ruleForm.total += Number(ruleForm.assetsData[key])
        }
      }
    }

    const actionsOptions = [
      {
        title: 'Item 1',
        command: 'item-1',
      },
      {
        title: 'Item 2',
        command: 'item2',
      },
      {
        title: 'Item 3',
        command: 'item3',
      },
    ]

    const memberId = computed(() => {
      if (route.params.id) return route.params.id
      return ''
    })

    return {
      actionsOptions,
      currencyFormat,
      IconAction,
      memberId,
      ruleForm,
      changeAssets,
      rules,
    }
  },
}
</script>
