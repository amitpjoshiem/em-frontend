<template>
  <div>
    <span v-if="props.text">{{ props.text }}</span>
    <span v-else>{{ props.plug }}</span>
  </div>
</template>

<script>
export default {
  name: 'SwdStubForText',
  props: {
    text: {
      type: [String, Number],
      require: true,
      default: '',
    },
    plug: {
      type: String,
      require: true,
      default: '&mdash;',
    },
  },
  setup(props) {
    return {
      props,
    }
  },
}
</script>
