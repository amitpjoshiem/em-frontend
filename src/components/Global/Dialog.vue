<template>
  <div type="text" class="cursor-pointer" @click="dialogVisible = true">
    <slot name="buttonDialog" />
  </div>

  <el-dialog v-model="dialogVisible" :title="title" width="47%">
    <slot name="contentDialog" />
    <template #footer>
      <span class="dialog-footer">
        <Button default-blue-btn text-btn="Save" @click="confirm" />
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Dialog',
  props: {
    title: {
      type: String,
      require: true,
      default: 'Dialog',
    },
    confirmAction: {
      type: String,
      require: true,
      default: 'Dialog',
    },
  },
  emits: ['confirmDialog'],

  setup(props, { emit }) {
    const dialogVisible = ref(false)

    const confirm = () => {
      dialogVisible.value = false
      emit('confirmDialog', props.confirmAction)
    }
    return {
      dialogVisible,
      confirm,
    }
  },
})
</script>
