<template>
  <div type="text" class="cursor-pointer" @click="dialogVisible = true">
    <slot name="buttonDialog" />
  </div>

  <el-dialog v-model="dialogVisible" :title="title" :before-close="handleClose" width="47%">
    <slot name="contentDialog" />
  </el-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { computed, watch } from 'vue'
import { useStore } from 'vuex'

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
    destinationDialog: {
      type: String,
      require: true,
      default: 'default',
    },
  },
  emits: ['confirmDialog'],

  setup(props, { emit }) {
    const store = useStore()
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
        .catch((error) => {
          console.error(error)
        })
    }

    const hideModal = computed(() => store.state.globalComponents.dialog.showDialog[props.destinationDialog])

    watch(hideModal, (newValue, oldValue) => {
      if (newValue !== oldValue && newValue === true) dialogVisible.value = false
    })

    return {
      dialogVisible,
      handleClose,
      confirm,
    }
  },
})
</script>
