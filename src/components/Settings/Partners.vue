<template>
  <div class="pl-24 pt-14 text-main w-10/12">
    <div class="text-xl pb-8">Partners</div>
    <el-collapse v-if="!isLoading" accordion>
      <el-collapse-item title="SalesForce">
        <div class="flex">
          <div class="w-10/12 text-xss text-main font-medium">Connection Status</div>
          <div class="w-2/12 flex justify-between">
            <el-icon v-if="data.data.salesforce" color="green">
              <success-filled style="width: 25px; height: 25px" />
            </el-icon>
            <el-icon v-else color="red">
              <circle-close-filled style="width: 25px; height: 25px" />
            </el-icon>
          </div>
        </div>
        <SalesForceSettings />
      </el-collapse-item>
      <el-collapse-item title="HiddenLevers">
        <div class="flex">
          <div class="w-10/12 text-xss text-main font-medium">Connection Status</div>
          <div class="w-2/12 flex justify-between">
            <el-icon v-if="data.data.hiddenlevers" color="green">
              <success-filled style="width: 25px; height: 25px" />
            </el-icon>
            <el-icon v-else color="red">
              <circle-close-filled style="width: 25px; height: 25px" />
            </el-icon>
          </div>
        </div>
        <HiddenLeversSettings />
      </el-collapse-item>
      <el-collapse-item title="Yodlee">
        <div class="flex">
          <div class="w-10/12 text-xss text-main font-medium">Connection Status</div>
          <div class="w-2/12 flex justify-between">
            <el-icon v-if="data.data.yodlee" color="green">
              <success-filled style="width: 25px; height: 25px" />
            </el-icon>
            <el-icon v-else color="red">
              <circle-close-filled style="width: 25px; height: 25px" />
            </el-icon>
          </div>
        </div>
        <YodleeSettings />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import SalesForceSettings from '@/components/Settings//SalesForceSettings.vue'
import HiddenLeversSettings from '@/components/Settings/HiddenLeversSettings.vue'
import YodleeSettings from '@/components/Settings/YodleeSettings.vue'
import { useHealthcheck } from '@/api/use-healthcheck.js'
import { SuccessFilled, CircleCloseFilled } from '@element-plus/icons'

export default {
  name: 'Partners',
  components: {
    SalesForceSettings,
    HiddenLeversSettings,
    YodleeSettings,
    SuccessFilled,
    CircleCloseFilled,
  },
  setup() {
    const { isLoading, error, data } = useHealthcheck()

    return {
      isLoading,
      error,
      data,
    }
  },
}
</script>
