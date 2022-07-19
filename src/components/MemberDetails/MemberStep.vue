<template>
  <div>
    <el-steps :active="active" simple>
      <el-step title="1st Appointment" class="cursor-pointer" @click="setActive(1)" />
      <el-step title="2nd Appointment" class="cursor-pointer" @click="setActive(2)" />
      <el-step title="3rd Appointment" class="cursor-pointer" @click="setActive(3)" />
      <el-step title="Place Holder Acct" class="cursor-pointer" @click="setActive(4)" />
      <el-step title="Paperwork Signed" class="cursor-pointer" @click="setActive(5)" />
      <el-step title="Commission Paid" class="cursor-pointer" @click="setActive(6)" />
      <el-step title="Contract delivery/Free look period" class="cursor-pointer" @click="setActive(7)" />
      <el-step title="Closed" class="cursor-pointer" @click="setActive(8)" />
    </el-steps>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAlert } from '@/utils/use-alert'

export default {
  name: 'MemberStep',
  setup() {
    const active = ref(0)

    const setActive = (item) => {
      active.value = item
      useAlert({
        title: 'Success',
        type: 'success',
        message: 'Information update successfully',
      })
    }

    return {
      active,
      setActive,
    }
  },
}
</script>

<style>
.el-steps--simple {
  padding: 10px;
}
.el-step.is-simple .el-step__head {
  display: none;
}
.el-step.is-simple .el-step__title {
  font-size: 11px;
}
.el-step.is-simple:not(:last-of-type) .el-step__title {
  max-width: 80%;
}
</style>
