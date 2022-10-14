<template>
  <div class="flex flex-col items-center">
    <InlineSvg :src="IconSuccesChanged" />
    <span class="my-5">{{ text }}</span>
    <div class="flex justify-end w-full">
      <SwdButton info main class="mr-2 w-28" @click="close">Close</SwdButton>
    </div>
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
