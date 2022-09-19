<template>
  <div>
    <div class="flex">
      <div class="w-10/12"></div>
      <div class="w-2/12 flex justify-between text-main text-xss">
        <div>App</div>
        <div>Email</div>
      </div>
    </div>
    <div class="flex border-b border-color-grey py-5">
      <div class="w-10/12 text-xss text-main font-medium">I have been given access to the member</div>
      <div class="w-2/12 flex justify-between">
        <el-switch v-model="value1" disabled />
        <el-switch v-model="value2" disabled />
      </div>
    </div>
    <div class="flex border-b border-color-grey py-5">
      <div class="w-10/12 text-xss text-main font-medium">I have been given access to the member</div>
      <div class="w-2/12 flex justify-between">
        <el-switch v-model="value3" disabled />
        <el-switch v-model="value4" disabled />
      </div>
    </div>
    <div class="flex border-b border-color-grey py-5">
      <div class="w-10/12 text-xss text-main font-medium">Member information was updated by another user</div>
      <div class="w-2/12 flex justify-between">
        <el-switch v-model="value5" disabled />
        <el-switch v-model="value6" disabled />
      </div>
    </div>
    <div class="flex border-b border-color-grey py-5">
      <div class="w-10/12 text-xss text-main font-medium">Member has reached retirement age</div>
      <div class="w-2/12 flex justify-between">
        <el-switch v-model="value7" disabled />
        <el-switch v-model="value8" disabled />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationsSettngs',
  data() {
    return {
      value1: true,
      value2: false,
      value3: true,
      value4: false,
      value5: true,
      value6: false,
      value7: true,
      value8: false,
    }
  },
}
</script>

<style>
.el-switch.is-checked .el-switch__core {
  background-color: #83ccf0;
  border-color: #83ccf0;
}

.el-switch__core {
  background-color: #d4ddeb;
  border-color: #d4ddeb;
}
</style>
