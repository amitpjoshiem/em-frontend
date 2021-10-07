<template>
  <div class="flex flex-col items-center">
    <InlineSvg :src="IconSuccesChanged" />
    <span class="my-5">{{ text }}</span>
    <Button default-blue-btn text-btn="Close" @click="close" />
  </div>
</template>
<script>
import IconSuccesChanged from '@/assets/svg/icon-succes-changed.svg'

export default {
  name: 'SwdDialogSucces',
  props: {
    text: {
      type: String,
      require: true,
      default: '',
    },
  },
  emits: ['closeDialog'],
  setup(_, { emit }) {
    const close = () => {
      emit('closeDialog')
    }
    return {
      close,
      IconSuccesChanged,
    }
  },
}
</script>
