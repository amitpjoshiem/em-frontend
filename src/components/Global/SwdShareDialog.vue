<template>
  <el-dialog v-model="dialogVisible" title="Share" :before-close="handleClose">
    <div>
      <el-tag v-for="tag in state.dynamicTags" :key="tag" closable :disable-transitions="false" @close="removeTag(tag)">
        {{ tag }}
      </el-tag>
      <el-input
        v-if="state.inputVisible"
        ref="saveTagInput"
        v-model="state.inputValue"
        class="input-new-tag"
        size="mini"
        @keyup.enter="handleInputConfirm"
        @blur="handleInputConfirm"
      />
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ Add e-mail</el-button>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirm">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, watchEffect, ref, computed, nextTick } from 'vue'
import { useStore } from 'vuex'
import { ElMessageBox } from 'element-plus'

export default defineComponent({
  name: 'SwdShareDialog',

  props: {
    showDialog: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  setup() {
    const dialogVisible = ref(false)
    const store = useStore()
    const saveTagInput = ref(null)

    const state = reactive({
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
    })

    const handleClose = (done) => {
      ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
          done()
        })
        .catch(() => {})
    }

    const statusModal = computed(() => store.state.globalComponents.dialog.showDialog.shareFileEmailDialog)

    watchEffect(() => {
      dialogVisible.value = statusModal.value
    })

    const confirm = () => {
      console.log('confirm')
    }

    const removeTag = (tag) => {
      state.dynamicTags.splice(state.dynamicTags.indexOf(tag), 1)
    }

    const showInput = () => {
      state.inputVisible = true
      nextTick(() => {
        saveTagInput.value.focus()
      })
    }

    const handleInputConfirm = () => {
      let inputValue = state.inputValue
      if (inputValue) {
        state.dynamicTags.push(inputValue)
      }
      state.inputVisible = false
      state.inputValue = ''
    }

    return {
      state,
      dialogVisible,
      handleClose,
      confirm,
      showInput,
      handleInputConfirm,
      saveTagInput,
      removeTag,
    }
  },
})
</script>
