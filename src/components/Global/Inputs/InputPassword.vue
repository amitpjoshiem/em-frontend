<template>
  <InputBasic v-bind="{ ...$attrs, ...$props }" type="password">
    <template #icon="iconProps">
      <Icon v-bind="iconProps" />
    </template>
  </InputBasic>
</template>

<script>
import InputVue from '../Input/Input.vue'
import PasswordInputIcon from '../Inputs/PasswordIcon.vue'

export default {
  name: 'InputPassword',
  components: {
    Icon: PasswordInputIcon,
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
