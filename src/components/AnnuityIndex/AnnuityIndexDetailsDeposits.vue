<template>
  <div class="border border-color-grey rounded-md p-5 mb-4">
    <div class="flex justify-between items-center mb-5">
      <div class="flex">
        <InlineSvg :src="IconDoneStep" />
        <div class="text-main text-xl font-semibold ml-2">Withdrawals/Deposits</div>
      </div>
    </div>

    <div class="flex mb-4">
      <p
        class="text-main text-smm cursor-pointer mr-4"
        :class="{ active: activeTab === 'withdrawals' }"
        @click="setActiveTab('withdrawals')"
      >
        Withdrawals
      </p>
      <p
        class="text-main text-smm cursor-pointer"
        :class="{ active: activeTab === 'deposits' }"
        @click="setActiveTab('deposits')"
      >
        Deposits
      </p>
    </div>

    <WithdrawalsTab v-if="activeTab === 'withdrawals'" />
    <DepositsTab v-if="activeTab === 'deposits'" />
  </div>
</template>
<script>
import IconDoneStep from '@/assets/svg/icon-done-step.svg'
import DepositsTab from '@/components/AnnuityIndex/DepositsTab.vue'
import WithdrawalsTab from '@/components/AnnuityIndex/WithdrawalsTab.vue'
import { ref } from 'vue'

export default {
  name: 'AnnuityIndexDetailsDeposits',
  components: {
    DepositsTab,
    WithdrawalsTab,
  },

  setup() {
    const activeTab = ref('withdrawals')

    const setActiveTab = (tab) => {
      activeTab.value = tab
    }

    return {
      IconDoneStep,
      activeTab,
      setActiveTab,
    }
  },
}
</script>

<style scoped>
.active {
  color: #83ccf0;
  border-bottom: 2px solid #83ccf0;
}
</style>
