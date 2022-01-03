<template>
  <div class="flex items-center mb-5">
    <div class="w-2/12 text-main font-semibold text-xss">{{ title }}</div>
    <el-form-item class="w-5/12 pr-2.5 mb-0" :prop="propMember">
      <el-input type="number" :model-value="member" @input="handleChangeMember" @blur="blurHandler(propMember)" />
    </el-form-item>
    <el-form-item v-if="isMarried" class="w-5/12 pl-2.5 mb-0" :prop="propSpouse">
      <el-input type="number" :model-value="spouse" @input="handleChangeSpouse" @blur="blurHandler(propSpouse)" />
    </el-form-item>
  </div>
</template>
<script>
export default {
  name: 'ItemFormAssetsTwo',
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
  emits: ['update:member', 'update:spouse', 'blur'],
  setup(props, { emit }) {
    const blurHandler = (e) => {
      emit('blur', e)
    }

    const handleChangeMember = (e) => {
      emit('update:member', e)
    }

    const handleChangeSpouse = (e) => {
      emit('update:spouse', e)
    }
    return {
      handleChangeMember,
      handleChangeSpouse,
      blurHandler,
    }
  },
}
</script>
