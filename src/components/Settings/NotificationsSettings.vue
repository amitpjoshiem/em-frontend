<template>
  <div class="pl-24 pt-14 text-main w-10/12">
    <div class="text-xl pb-8">Notifications</div>
    <div class="flex">
      <div class="w-10/12"></div>
      <div class="w-2/12 flex justify-between text-gray03 text-xss">
        <div>App</div>
        <div>Email</div>
      </div>
    </div>
    <div class="flex border-b border-color-grey py-5">
      <div class="w-10/12 text-xss text-main font-semibold">
        I have been given access to the member
      </div>
      <div class="w-2/12 flex justify-between">
        <el-switch v-model="value1" />
        <el-switch v-model="value2" />
      </div>
    </div>
    <div class="flex border-b border-color-grey py-5">
      <div class="w-10/12 text-xss text-main font-semibold">
        I have been given access to the member
      </div>
      <div class="w-2/12 flex justify-between">
        <el-switch v-model="value3" />
        <el-switch v-model="value4" />
      </div>
    </div>
    <div class="flex border-b border-color-grey py-5">
      <div class="w-10/12 text-xss text-main font-semibold">
        Member information was updated by another user
      </div>
      <div class="w-2/12 flex justify-between">
        <el-switch v-model="value5" />
        <el-switch v-model="value6" />
      </div>
    </div>
    <div class="flex border-b border-color-grey py-5">
      <div class="w-10/12 text-xss text-main font-semibold">
        Member has reached retirement age
      </div>
      <div class="w-2/12 flex justify-between">
        <el-switch v-model="value7" />
        <el-switch v-model="value8" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: true,
      value2: true,
      value3: false,
      value4: false,
      value5: true,
      value6: true,
      value7: false,
      value8: true,
    }
  },
}
</script>

<style>
.el-switch.is-checked .el-switch__core {
  background-color: #66b6ff;
  border-color: #66b6ff;
}

.el-switch__core {
  background-color: #d4ddeb;
  border-color: #d4ddeb;
}
</style>
