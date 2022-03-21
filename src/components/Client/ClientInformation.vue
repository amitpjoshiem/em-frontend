<template>
  <div class="p-5 mb-20">
    <div class="flex flex-col items-center">
      <img src="../../assets/img/swd-logo-blue.png" alt="excel" class="w-[150px]" />
      <div class="flex flex-col items-center text-center text-main">
        <span class="text-lg">
          In order to conducta proper analysis and make your visit productive, we ask that you providethe items listed
          below
        </span>
        <span class="text-base my-10">
          These items are essential for performing our fiduciary duty and providing the most appropiate financial advice
        </span>
      </div>
    </div>

    <router-link
      :to="{ name: 'client-basic-information' }"
      class="flex items-center border border-input-border rounded-md p-5 mb-10"
    >
      <el-icon :size="25" class="mr-5">
        <circle-check-filled color="green" />
      </el-icon>
      <span>Completed Financial Fact Finder</span>
    </router-link>

    <router-link
      :to="{ name: 'investment-retirement' }"
      class="flex items-center border border-input-border rounded-md p-5 mb-10"
    >
      <el-icon :size="25" class="mr-5">
        <circle-check-filled color="gray" />
      </el-icon>
      <span>Investment and Retirement Accounts (most recent statements)</span>
    </router-link>

    <router-link
      :to="{ name: 'life-insurance' }"
      class="flex items-center border border-input-border rounded-md p-5 mb-10"
    >
      <el-icon :size="25" class="mr-5">
        <circle-check-filled color="gray" />
      </el-icon>
      <span>Life Insurance, Annuity, and Long Term Care Policies (most recent statements)</span>
    </router-link>

    <router-link
      :to="{ name: 'social-security' }"
      class="flex items-center border border-input-border rounded-md p-5 mb-10"
    >
      <el-icon :size="25" class="mr-5">
        <circle-check-filled color="gray" />
      </el-icon>
      <span>Social Security Information/Statement(s)</span>
    </router-link>

    <router-link :to="{ name: 'list-stock' }" class="flex items-center border border-input-border rounded-md p-5 mb-10">
      <el-icon :size="25" class="mr-5">
        <circle-check-filled color="gray" />
      </el-icon>
      <span>List of Stock Certificates or Bonds</span>
    </router-link>

    <div class="flex justify-end">
      <el-button type="primary" plain disabled>Send information</el-button>
    </div>
  </div>
</template>

<script>
import { CircleCheckFilled } from '@element-plus/icons-vue'

export default {
  name: 'ClientInformation',
  components: {
    CircleCheckFilled,
  },
  setup() {
    return {}
  },
}
</script>
