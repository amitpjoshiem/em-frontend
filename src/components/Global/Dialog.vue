<template>
  <div type="text" class="cursor-pointer" @click="dialogVisible = true">
    <slot name="buttonDialog" />
  </div>

  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="47%"
    :before-close="handleClose"
  >
    <slot name="contentDialog" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirm"> Confirm </el-button>
      </span>
    </template>
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
    options: {
      type: String,
      require: true,
      default: 'Dialog',
    },
  },
  emits: ['confirmDialog'],

  setup(props, { emit }) {
    const dialogVisible = ref(false)

    const handleClose = (done) => {
      ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
          done()
        })
        .catch(() => {})
    }

    const confirm = () => {
      dialogVisible.value = false
      emit('confirmDialog', props.options)
    }
    return {
      dialogVisible,
      handleClose,
      confirm,
    }
  },
})
</script>
