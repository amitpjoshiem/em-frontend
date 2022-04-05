<template>
  <div class="p-2 sm:p-5 lg:max-w-5xl lg:my-0 lg:mx-auto">
    <SwdSubHeader title="Confirmation Information" class="mt-2" />
    <el-collapse v-model="activeNames" accordion>
      <el-collapse-item title="Basic" name="basic">
        <ConfirmationInformation />
      </el-collapse-item>

      <el-collapse-item title="Assets &amp; Income" name="assets">
        <ConfirmationAssets v-if="activeNames === 'assets'" />
      </el-collapse-item>

      <el-collapse-item title="Expense" name="expense">
        <ConfirmationExpense v-if="activeNames === 'expense'" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { ref } from 'vue'

import ConfirmationInformation from './Basic/ConfirmationBasic.vue'
import ConfirmationExpense from './Expense/ConfirmationExpense.vue'
import ConfirmationAssets from './Assets/ConfirmationAssets.vue'

export default {
  name: 'ConfirmationPage',
  components: {
    ConfirmationInformation,
    ConfirmationExpense,
    ConfirmationAssets,
  },
  setup() {
    const activeNames = ref(['basic'])

    return {
      activeNames,
    }
  },
}
</script>
