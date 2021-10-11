<template>
  <el-dialog
    v-model="dialogVisible"
    title="Change avatar"
    :before-close="handleClose"
    width="40%"
    custom-class="dialog-style"
  >
    <vue-cropper ref="cropper" :src="state.imgSrc" :container-style="{ 'max-width': '450px', 'max-height': '700px' }" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="cropImage">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, watchEffect, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import VueCropper from 'vue-cropperjs'

export default defineComponent({
  name: 'SwdCropper',

  components: {
    VueCropper,
  },

  props: {
    showCropper: {
      type: Boolean,
      require: true,
      default: false,
    },
    file: {
      type: Object,
      require: false,
      default: () => {},
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const dialogVisible = ref(false)
    const cropper = ref(null)
    const state = reactive({
      imgSrc: '',
    })

    const handleClose = (done) => {
      ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
          done()
        })
        .catch(() => {})
    }

    watchEffect(() => {
      dialogVisible.value = props.showCropper
      if (props.showCropper) {
        setImage()
      }
    })

    const setImage = () => {
      if (typeof FileReader === 'function') {
        const reader = new FileReader()
        reader.onload = (event) => {
          state.imgSrc = event.target.result
          cropper.value.replace(event.target.result)
        }
        reader.readAsDataURL(props.file)
      } else {
        alert('Sorry, FileReader API not supported')
      }
    }

    const cropImage = () => {
      cropper.value.getCroppedCanvas().toBlob((blob) => {
        emit('change', new File([blob], 'avatar.png'))
      })
    }

    return {
      state,
      dialogVisible,
      handleClose,
      setImage,
      cropImage,
      cropper,
    }
  },
})
</script>

<style>
.dialog-style {
  margin-top: 10vh !important;
}

.dialog-style .el-dialog__body {
  display: flex;
  justify-content: center;
}
</style>
