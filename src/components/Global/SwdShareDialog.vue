<template>
  <el-dialog v-model="dialogVisible" title="Share Data To" :before-close="handleClose">
    <div class="my-2 font-semibold text-main">E-mail</div>
    <div>
      <el-tag v-for="tag in state.dynamicTags" :key="tag" closable :disable-transitions="false" @close="removeTag(tag)">
        {{ tag }}
      </el-tag>
      <el-form v-if="state.inputVisible" @submit.prevent="handleInputConfirm">
        <el-form-item
          class="inline-block"
          :error="state.emailIsNotValid ? 'Email is not valid' : ''"
          :show-message="state.emailIsNotValid"
        >
          <el-input
            ref="saveTagInput"
            v-model="state.inputValue"
            class="input-new-tag w-32"
            size="mini"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
          />
        </el-form-item>
      </el-form>

      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ Add e-mail</el-button>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" :disabled="loadingSendReport || isLoading" @click="confirm">
          <el-icon v-if="loadingSendReport || isLoading" class="is-loading">
            <loading />
          </el-icon>
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, watchEffect, ref, computed, nextTick } from 'vue'
import { useStore } from 'vuex'
import { ElMessageBox } from 'element-plus'
import Schema from 'async-validator'
import { uploadMedia } from '@/api/vueQuery/upload-media'
import { sendReport } from '@/api/vueQuery/send-report'
import { useMutation } from 'vue-query'
import { useAlert } from '@/utils/use-alert'
import { pdfConfig } from '@/config/pdf-config'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

import { Loading } from '@element-plus/icons'

export default defineComponent({
  name: 'SwdShareDialog',

  components: {
    Loading,
  },

  props: {
    showDialog: {
      type: Boolean,
      require: true,
      default: false,
    },
    pdfRegion: {
      type: String,
      require: true,
      default: '',
    },
  },

  setup(props) {
    const dialogVisible = ref(false)
    const store = useStore()
    const saveTagInput = ref(null)
    const doc = new jsPDF()

    const { mutateAsync: upload, isLoading, isError, isFetching, data, error } = useMutation(uploadMedia)
    const {
      mutateAsync: sendReportEmail,
      error: sendReportError,
      isLoading: loadingSendReport,
    } = useMutation(sendReport)

    const state = reactive({
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      emailIsNotValid: false,
      file: '',
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

    const confirm = async () => {
      await createPdf()

      const formData = new FormData()

      formData.append('file', state.file, state.file.name)
      formData.append('collection', 'member_report')
      const res = await upload(formData)

      if (!('error' in res)) {
        const uuid = res.data.uuid
        await confirmSendReport(uuid)
      } else {
        useAlert({
          title: 'Error',
          type: 'error',
          message: res.error.message,
        })
      }
    }

    const confirmSendReport = async (uuid) => {
      const data = {
        uuids: [uuid],
        emails: state.dynamicTags,
      }
      const resSendReport = await sendReportEmail(data)
      if (!('error' in resSendReport)) {
        store.commit('globalComponents/setShowModal', {
          destination: 'shareFileEmailDialog',
          value: false,
        })
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'E-mail has been sent successfully',
        })
      } else {
        useAlert({
          title: 'Error',
          type: 'error',
          message: resSendReport.error.message,
        })
      }
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
    const descriptor = {
      email: {
        type: 'email',
        required: true,
      },
    }

    const validator = new Schema(descriptor)

    const handleInputConfirm = () => {
      if (!state.inputValue) {
        state.inputVisible = false
        state.inputValue = ''
        return
      }
      let inputValue = state.inputValue
      const emailObj = { email: inputValue }

      validator
        .validate(emailObj)
        .then(() => {
          state.dynamicTags.push(inputValue)
          state.inputVisible = false
          state.inputValue = ''
          state.emailIsNotValid = false
        })
        .catch(() => {
          state.emailIsNotValid = true
        })
    }

    const createPdf = async () => {
      const elemRef = document.querySelector(`[data-pdf-region="${pdfConfig[props.pdfRegion].dataAttribute}"]`)
      return html2canvas(elemRef).then((canvas) => {
        doc.text(pdfConfig[props.pdfRegion].titleText, 90, 25)
        doc.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', ...pdfConfig[props.pdfRegion].jsDocOptions)
        const pdfReport = doc.output('blob', 'report-email.pdf')
        state.file = new File([pdfReport], 'report-email.pdf')
      })
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
      upload,
      isLoading,
      isError,
      isFetching,
      data,
      error,
      sendReportError,
      sendReport,
      loadingSendReport,
    }
  },
})
</script>
