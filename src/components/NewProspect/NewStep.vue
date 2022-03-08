<template>
  <div class="flex pb-2 mt-8">
    <div class="w-8/12" />
    <div class="w-2/12 text-gray03 text-xs">ESSENTIAL</div>
    <div class="w-2/12 text-gray03 text-xs pl-2.5">DISCRETIONARY</div>
  </div>
  <!-- HOUSING -->
  <el-card shadow="never" class="mb-5">
    <div class="flex mb-4">
      <div class="w-3/12 flex items-center text-sm font-semibold">Housing</div>
      <div class="w-5/12 text-main text-xss flex items-center">Mortgage/Rent/Fees</div>
      <SwdCurrencyInput class="w-2/12 mr-2" />
      <SwdCurrencyInput class="w-2/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-3/12" />
      <div class="w-5/12 text-main text-xss flex items-center">Property Taxes & Insurance</div>
      <SwdCurrencyInput class="w-2/12 mr-2" />
      <SwdCurrencyInput class="w-2/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-3/12" />
      <div class="w-5/12 text-main text-xss flex items-center">Utilities</div>
      <SwdCurrencyInput class="w-2/12 mr-2" />
      <SwdCurrencyInput class="w-2/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-3/12" />
      <div class="w-5/12 text-main text-xss flex items-center">Household Improvement</div>
      <SwdCurrencyInput class="w-2/12 mr-2" />
      <SwdCurrencyInput class="w-2/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-3/12" />
      <div class="w-5/12 text-main text-xss flex items-center">Household Maintenance</div>
      <SwdCurrencyInput class="w-2/12 mr-2" />
      <SwdCurrencyInput class="w-2/12 ml-2" />
    </div>
  </el-card>

  <!-- FOOD TRANSPORTATION -->
  <el-card shadow="never" class="mb-5">
    <div class="flex mb-4">
      <div class="w-2/12 flex items-center text-sm font-semibold">Food</div>
      <div class="w-4/12 text-main text-xss flex items-center">At Home</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-2/12" />
      <div class="w-4/12 text-main text-xss flex items-center">Dining Out</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-2/12 flex items-center text-sm font-semibold">Transportation</div>
      <div class="w-4/12 text-main text-xss flex items-center">Vehicle Purchases/Payments</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-2/12" />
      <div class="w-4/12 text-main text-xss flex items-center">Auto Insurance and Taxes</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-2/12" />
      <div class="w-4/12 text-main text-xss flex items-center">Fuel & Maintenance</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-2/12" />
      <div class="w-4/12 text-main text-xss flex items-center">Public Transportation</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
  </el-card>

  <!-- HEALTHCARE -->
  <el-card shadow="never" class="mb-5">
    <div class="flex mb-4">
      <div class="w-2/12 flex items-center text-sm font-semibold">Healthcare</div>
      <div class="w-4/12 text-main text-xss flex items-center">Health Insurance</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-2/12" />
      <div class="w-4/12 text-main text-xss flex items-center">Medicare/Medigap</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-2/12" />
      <div class="w-4/12 text-main text-xss flex items-center">Copays/Uncovered Medical Services</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-2/12" />
      <div class="w-4/12 text-main text-xss flex items-center">Drugs & Medical Supplies</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
  </el-card>

  <!-- PERSONAL -->
  <el-card shadow="never" class="mb-5">
    <div class="flex mb-4">
      <div class="w-2/12 flex items-center text-sm font-semibold">Personal Insurance</div>
      <div class="w-4/12 text-main text-xss flex items-center">Life/Other</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-2/12" />
      <div class="w-4/12 text-main text-xss flex items-center">Long-Term Care</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-2/12 flex items-center text-sm font-semibold">Personal Care</div>
      <div class="w-4/12 text-main text-xss flex items-center">Clothing</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-2/12" />
      <div class="w-4/12 text-main text-xss flex items-center">Products & Services</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
  </el-card>

  <!-- OTHER -->
  <el-card shadow="never" class="mb-5">
    <div class="flex mb-4">
      <div class="w-2/12" />
      <div class="w-4/12 text-main text-xss flex items-center">Entertainment</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-2/12" />
      <div class="w-4/12 text-main text-xss flex items-center">Travel</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-2/12" />
      <div class="w-4/12 text-main text-xss flex items-center">Hobbies</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-2/12" />
      <div class="w-4/12 text-main text-xss flex items-center">Family Care/Education</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-2/12" />
      <div class="w-4/12 text-main text-xss flex items-center">Income Taxes</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-2/12" />
      <div class="w-4/12 text-main text-xss flex items-center">Charitable Contributions</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-2/12" />
      <div class="w-4/12 text-main text-xss flex items-center">Other</div>
      <SwdCurrencyInput class="w-3/12 mr-2" />
      <SwdCurrencyInput class="w-3/12 ml-2" />
    </div>
    <div class="flex mb-4">
      <div class="w-2/12" />
      <div class="w-4/12 text-main text-xss flex items-center">SUBTOTAL</div>
      <SwdCurrencyInput class="w-3/12 mr-2" disabled />
      <SwdCurrencyInput class="w-3/12 ml-2" disabled />
    </div>
  </el-card>
  <div class="flex justify-end text-sm font-semibold mb-5">
    <div class="w-3/12">TOTAL MONTHLY EXPENSES</div>
    <div class="w-3/12">$123456789</div>
  </div>
</template>
<script>
import { onMounted } from 'vue'
import { scrollTop } from '@/utils/scrollTop'
import { useStore } from 'vuex'

export default {
  name: 'NewStep',
  setup() {
    const store = useStore()

    onMounted(() => {
      store.commit('newProspect/setStep', 3)
      scrollTop()
    })
  },
}
</script>
