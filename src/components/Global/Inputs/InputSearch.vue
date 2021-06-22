<template>
  <InputText v-bind="{ ...$attrs, ...$props }" type="search">
    <template #icon="iconProps">
      <Icon v-bind="iconProps" />
    </template>
  </InputText>
</template>

<script>
import InputVue from '../Input/Input.vue'
import SearchInputIcon from './Icons/SearchIcon.vue'

export default {
  name: 'InputSearch',
  components: {
    Icon: SearchInputIcon,
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
