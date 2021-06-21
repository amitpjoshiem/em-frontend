<template>
  <Input v-bind="{ ...$attrs, ...$props }" type="password">
    <template #icon="iconProps">
      <Icon v-bind="iconProps" />
    </template>
  </Input>
</template>

<script>
import InputVue from '../Input/Input.vue'
import PasswordInputIcon from './Icons/PasswordIcon.vue'
import InputTextForm from './InputTextForm.js'

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
      default: 'text',
    },
  },
}
</script>
