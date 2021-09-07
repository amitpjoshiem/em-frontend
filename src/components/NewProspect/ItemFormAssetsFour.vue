<template>
  <div class="flex items-center pb-2">
    <div class="w-2/12 text-main font-semibold text-xss">{{ title }}</div>
    <el-form-item class="w-5/24 pr-2.5" :prop="propMember">
      <el-input :model-value="member" @input="handleChangeMember" />
    </el-form-item>
    <el-form-item v-if="isMarried" class="w-5/24 pr-2.5" :prop="propSpouse">
      <el-input :model-value="spouse" @input="handleChangeSpouse" />
    </el-form-item>
    <el-form-item class="w-5/24" :prop="propOnq" :class="{ 'pr-2.5': !isMarried, 'pl-2.5': isMarried }">
      <el-input :model-value="onq" @input="handleChangeOnq" />
    </el-form-item>
    <el-form-item class="w-5/24 pl-2.5" :prop="propBalance">
      <el-input :model-value="balance" @input="handleChangeBalance" />
    </el-form-item>
  </div>
</template>
<script>
export default {
  name: 'ItemFormAssetsFour',
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
    onq: {
      type: String,
      required: false,
      default: '',
    },
    balance: {
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
    propOnq: {
      type: String,
      required: true,
      default: '',
    },
    propBalance: {
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
  emits: ['update:member', 'update:spouse', 'update:onq', 'update:balance'],
  setup(props, { emit }) {
    const handleChangeMember = (e) => {
      emit('update:member', e)
    }

    const handleChangeSpouse = (e) => {
      emit('update:spouse', e)
    }

    const handleChangeOnq = (e) => {
      emit('update:onq', e)
    }

    const handleChangeBalance = (e) => {
      emit('update:balance', e)
    }

    return {
      handleChangeMember,
      handleChangeSpouse,
      handleChangeOnq,
      handleChangeBalance,
    }
  },
}
</script>
