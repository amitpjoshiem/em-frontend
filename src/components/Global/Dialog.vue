<template>
  <div type="text" class="cursor-pointer" @click="dialogVisible = true">
    <slot name="buttonDialog" />
  </div>

  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="47%"
    destroy-on-close
    :before-close="handleClose"
  >
    <slot name="contentDialog" />
  </el-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { ElMessageBox } from 'element-plus'

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
    hideDialog: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  emits: ['confirmDialog'],

  setup(props, { emit }) {
    const dialogVisible = ref(false)

    const confirm = () => {
      dialogVisible.value = false
      emit('confirmDialog', props.confirmAction)
    }

    const handleClose = (done) => {
      ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
          done()
        })
        .catch(() => {})
    }
    return {
      dialogVisible,
      handleClose,
      confirm,
    }
  },
})
</script>
