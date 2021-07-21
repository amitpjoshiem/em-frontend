<template>
  <div>
    <span class="text-xss font-medium text text-main">{{ labelGroup }}</span>
    <el-radio-group v-model="radio" @change="changeHandler">
      <el-radio :label="optionOne">{{ optionOne }}</el-radio>
      <el-radio :label="optionTwo">{{ optionTwo }}</el-radio>
      <el-radio v-if="optionThree" :label="9">{{ optionThree }}</el-radio>
      <el-radio v-if="optionFour" :label="12">{{ optionFour }}</el-radio>
      <el-radio v-if="optionFive" :label="15">{{ optionFive }}</el-radio>
    </el-radio-group>
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
    labelGroup: {
      type: String,
      required: false,
      default: '',
    },
    modelValue: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  emits: ['update:value', 'update:modelValue'],
  setup(props, { emit }) {
    const radio = ref('1')

    const emitValue = (e) => {
      emit('update:value', e)
      emit('update:modelValue', e)
    }

    const changeHandler = (e) => {
      emitValue(e)
    }
    return { radio, changeHandler }
  },
}
</script>
