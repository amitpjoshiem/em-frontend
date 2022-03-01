<template>
  <div class="flex items-center mb-5">
    <div class="w-2/12 text-main font-semibold text-xss">{{ title }}</div>
    <el-form-item class="w-5/12 pr-2.5 mb-0" :prop="propMember">
      <SwdCurrencyInput
        :model-value="member"
        :options="optionsCurrencyInput"
        :disabled="disabled"
        @input="handleChangeMember"
        @change="blurHandler(propMember)"
      />
    </el-form-item>
    <el-form-item v-if="isMarried" class="w-5/12 pl-2.5 mb-0" :prop="propSpouse">
      <SwdCurrencyInput
        :model-value="spouse"
        :options="optionsCurrencyInput"
        :disabled="disabled"
        @input="handleChangeSpouse"
        @change="blurHandler(propSpouse)"
      />
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
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['update:member', 'update:spouse', 'blur'],
  setup(_, { emit }) {
    const optionsCurrencyInput = {
      currency: 'USD',
      locale: 'en-US',
      currencyDisplay: 'hidden',
      precision: 2,
    }

    const blurHandler = (e) => {
      emit('blur', e)
    }

    const handleChangeMember = (e) => {
      emit('update:member', e.target.value)
    }

    const handleChangeSpouse = (e) => {
      emit('update:spouse', e.target.value)
    }
    return {
      handleChangeMember,
      handleChangeSpouse,
      blurHandler,
      optionsCurrencyInput,
    }
  },
}
</script>
