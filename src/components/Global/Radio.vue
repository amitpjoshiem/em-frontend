<template>
  <div>
    <span class="text-xss font-medium text text-main">{{ label }}</span>
    <div>
      <el-radio v-model="radio" label="1">{{ optionOne }}</el-radio>
      <el-radio v-model="radio" label="2">{{ optionTwo }}</el-radio>
      <el-radio v-if="optionThree" v-model="radio" label="3">{{
        optionThree
      }}</el-radio>
      <el-radio v-if="optionFour" v-model="radio" label="4">{{
        optionFour
      }}</el-radio>
      <el-radio v-if="optionFive" v-model="radio" label="5">{{
        optionFive
      }}</el-radio>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Radio',
  props: {
    optionOne: {
      type: String,
      required: true,
    },
    optionTwo: {
      type: String,
      required: true,
    },
    optionThree: {
      type: String,
      required: false,
      default: '',
    },
    optionFour: {
      type: String,
      required: false,
      default: '',
    },
    optionFive: {
      type: String,
      required: false,
      default: '',
    },
    label: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup() {
    const radio = ref('1')
    return { radio }
  },
}
</script>
