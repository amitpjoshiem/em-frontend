<template>
  <Input v-bind="{ ...$attrs, ...$props }" :type="getType">
    <template #icon="iconProps">
      <Icon v-bind="iconProps" @click="showPassword" />
    </template>
  </Input>
</template>

<script>
import InputVue from '../Input/Input.vue'
import PasswordInputIcon from './Icons/PasswordIcon.vue'
import InputTextForm from './InputTextForm.js'
import { reactive, computed } from 'vue'

export default {
  name: 'InputPassword',
  components: {
    Icon: PasswordInputIcon,
    Input: InputTextForm,
  },
  inheritAttrs: false,
  props: {
    ...InputVue.props,
    type: {
      type: String,
      required: false,
      default: 'password',
    },
  },
  setup() {
    const data = reactive({
      showPass: false,
    })

    const showPassword = () => {
      data.showPass = !data.showPass
    }

    const getType = computed(() => {
      return data.showPass ? 'text' : 'password'
    })
    return {
      showPassword,
      getType,
    }
  },
}
</script>
