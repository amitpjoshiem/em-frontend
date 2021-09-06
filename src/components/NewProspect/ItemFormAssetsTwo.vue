<template>
  <div class="flex items-center pb-2">
    <div class="w-2/12 text-main font-semibold text-xss">{{ title }}</div>
    <el-form-item class="w-5/12 pr-2.5" :prop="propMember">
      <el-input :model-value="member" @input="handleChangeMember" />
    </el-form-item>
    <el-form-item v-if="isMarried" class="w-5/12 pl-2.5" :prop="propSpouse">
      <el-input :model-value="spouse" @input="handleChangeSpouse" />
    </el-form-item>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  name: 'ItemFormAssets',
  props: {
    title: {
      type: String,
      required: true,
      default: 'Title',
    },
    spouse: {
      type: String,
      required: false,
      default: '',
    },
    member: {
      type: String,
      required: false,
      default: '',
    },
    propMember: {
      type: String,
      required: true,
      default: '',
    },
    propSpouse: {
      type: String,
      required: true,
      default: '',
    },
    isMarried: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  emits: ['update:member', 'update:spouse'],
  setup(props, { emit }) {
    const memberValue = ref(props.member)

    const handleChangeMember = (e) => {
      emit('update:member', e)
    }

    const handleChangeSpouse = (e) => {
      emit('update:spouse', e)
    }
    return {
      handleChangeMember,
      handleChangeSpouse,
      memberValue,
    }
  },
}
</script>
