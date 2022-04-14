<template>
  <div class="items-center mb-5 -md p-2">
    <div class="text-main font-semibold text-xss mb-2">{{ title }}</div>
    <div class="flex mb-2">
      <div class="w-6/12 text-gray03 text-xs text-center">OWNER</div>
      <div v-if="isMarried" class="w-6/12 text-gray03 text-xs text-center">SPOUSE</div>
    </div>
    <div class="flex">
      <el-form-item class="w-6/12 pr-2.5 mb-0" :prop="propMember">
        <SwdInputNumber
          :model-value="member"
          :options="optionsCurrencyInput"
          :disabled="disabled"
          @input="handleChangeMember"
          @change="changeHandler(propMember)"
          @focusEvent="handleFocus"
          @blurEvent="handleBlur"
        />
      </el-form-item>
      <el-form-item v-if="isMarried" class="w-6/12 pl-2.5 mb-0" :prop="propSpouse">
        <SwdInputNumber
          :model-value="spouse"
          :options="optionsCurrencyInput"
          :disabled="disabled"
          @input="handleChangeSpouse"
          @change="changeHandler(propSpouse)"
          @focusEvent="handleFocus"
          @blurEvent="handleBlur"
        />
      </el-form-item>
    </div>
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
  emits: ['update:member', 'update:spouse', 'blur', 'focus', 'change'],
  setup(_, { emit }) {
    const optionsCurrencyInput = {
      currency: 'USD',
      locale: 'en-US',
      currencyDisplay: 'hidden',
      precision: 2,
    }

    const changeHandler = (e) => {
      emit('change', e)
    }

    const handleChangeMember = (e) => {
      emit('update:member', e.target.value)
    }

    const handleChangeSpouse = (e) => {
      emit('update:spouse', e.target.value)
    }

    const handleFocus = () => {
      emit('focus')
    }

    const handleBlur = () => {
      emit('blur')
    }

    return {
      handleChangeMember,
      handleChangeSpouse,
      changeHandler,
      optionsCurrencyInput,

      handleFocus,
      handleBlur,
    }
  },
}
</script>
