<template>
  <div class="border border-color-grey rounded-lg mr-5 mt-5 p-5">
    <span class="text-main text-smm font-semibold">Concerns</span>
    <div class="flex">
      <div class="flex flex-col">
        <el-checkbox v-model="checked1" label="High Fees" />
        <el-checkbox v-model="checked2" label="Extremely high market exposure" />
        <el-checkbox v-model="checked6" label="Design, implement and monitoring income strategy" />
      </div>
      <div class="flex flex-col ml-2">
        <el-checkbox v-model="checked4" label="Keep the money safe" />
        <el-checkbox v-model="checked5" label="Massive Overlap" />
        <el-checkbox v-model="checked3" label="Simple" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from 'vue'
import { useAlert } from '@/utils/use-alert'

export default {
  name: 'Concerns',
  setup() {
    const state = reactive({
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: false,
      checked6: false,
    })

    watch(
      () => state,
      () => {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Update successfully',
        })
      },
      { deep: true }
    )

    return toRefs(state)
  },
}
</script>

<style>
.el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #76e1bb;
  border-color: #76e1bb;
  border-radius: 10px;
}

.el-checkbox__inner {
  border-radius: 10px;
}
.el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #76e1bb;
}

.el-checkbox__label {
  font-size: 12px;
  color: #aab5cf;
}

.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #76e1bb;
}
</style>
