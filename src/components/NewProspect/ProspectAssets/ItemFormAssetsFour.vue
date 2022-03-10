<template>
  <div class="flex items-center mb-5">
    <div class="w-2/12 text-main font-semibold text-xss">{{ title }}</div>
    <el-form-item class="w-5/24 pr-2.5 mb-0" :prop="propMember">
      <SwdInputNumber
        :model-value="member"
        :disabled="disabled"
        :options="optionsCurrencyInput"
        @input="handleChangeMember"
        @change="blurHandler(propMember)"
      />
    </el-form-item>
    <el-form-item v-if="isMarried" class="w-5/24 pr-2.5 mb-0" :prop="propSpouse">
      <SwdInputNumber
        :model-value="spouse"
        :disabled="disabled"
        :options="optionsCurrencyInput"
        @input="handleChangeSpouse"
        @change="blurHandler(propSpouse)"
      />
    </el-form-item>
    <el-form-item class="w-5/24 mb-0" :prop="propOnq" :class="{ 'pr-2.5': !isMarried, 'pl-2.5': isMarried }">
      <SwdInputNumber
        :model-value="onq"
        :disabled="disabled"
        :options="optionsCurrencyInput"
        @input="handleChangeOnq"
        @change="blurHandler(propOnq)"
      />
    </el-form-item>
    <el-form-item class="w-5/24 pl-2.5 mb-0" :prop="propBalance">
      <SwdInputNumber
        :model-value="balance"
        :disabled="disabled"
        :options="optionsCurrencyInput"
        @input="handleChangeBalance"
        @change="blurHandler(propBalance)"
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
  setup(_, { emit }) {
    const optionsCurrencyInput = {
      currency: 'USD',
      locale: 'en-US',
      currencyDisplay: 'hidden',
      precision: 2,
    }

    const handleChangeMember = (e) => {
      emit('update:member', e.target.value)
    }

    const handleChangeSpouse = (e) => {
      emit('update:spouse', e.target.value)
    }

    const handleChangeOnq = (e) => {
      emit('update:onq', e.target.value)
    }

    const handleChangeBalance = (e) => {
      emit('update:balance', e.target.value)
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
      optionsCurrencyInput,
    }
  },
}
</script>
