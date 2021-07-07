<template>
  <div class="pl-24 pt-14 text-main w-10/12">
    <div class="flex py-5">
      <div class="w-10/12 text-xss text-main font-medium">
        Authenticator App
      </div>
      <div class="w-2/12 flex justify-between">
        <el-switch v-model="authApp" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TwoFA',
  data() {
    return {
      authApp: false,
    }
  },
}
</script>
