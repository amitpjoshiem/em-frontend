<template>
  <div class="flex items-center mb-5">
    <div class="w-2/12 text-main font-semibold text-xss">{{ title }}</div>
    <el-form-item class="w-5/24 pr-2.5 mb-0" :prop="propMember">
      <el-input
        :disabled="disabled"
        :model-value="member"
        inputmode="numeric"
        @input="handleChangeMember"
        @blur="blurHandler(propMember)"
      />
    </el-form-item>
    <el-form-item v-if="isMarried" class="w-5/24 pr-2.5 mb-0" :prop="propSpouse">
      <el-input
        :disabled="disabled"
        :model-value="spouse"
        inputmode="numeric"
        @input="handleChangeSpouse"
        @blur="blurHandler(propSpouse)"
      />
    </el-form-item>
    <el-form-item class="w-5/24 mb-0" :prop="propOnq" :class="{ 'pr-2.5': !isMarried, 'pl-2.5': isMarried }">
      <el-input
        :disabled="disabled"
        :model-value="onq"
        inputmode="numeric"
        @input="handleChangeOnq"
        @blur="blurHandler(propOnq)"
      />
    </el-form-item>
    <el-form-item class="w-5/24 pl-2.5 mb-0" :prop="propBalance">
      <el-input
        :disabled="disabled"
        :model-value="balance"
        inputmode="numeric"
        @input="handleChangeBalance"
        @blur="blurHandler(propBalance)"
      />
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
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['update:member', 'update:spouse', 'update:onq', 'update:balance', 'blur'],
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
    const blurHandler = (e) => {
      emit('blur', e)
    }

    return {
      handleChangeMember,
      handleChangeSpouse,
      handleChangeOnq,
      handleChangeBalance,
      blurHandler,
    }
  },
}
</script>
