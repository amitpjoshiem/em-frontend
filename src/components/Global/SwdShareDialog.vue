<template>
  <el-dialog v-model="dialogVisible" title="Share Data To" :before-close="handleClose">
    <el-tabs v-if="state.isShowForm" v-model="tabsValue" type="border-card" class="share-tabs">
      <el-tab-pane label="Sales Force" name="SF">
        Share file
        <span class="font-semibold">{{ docShare.filename }}</span>
        to Sales Force
      </el-tab-pane>
      <el-tab-pane label="E-mail" name="email">
        <div>
          <el-tag
            v-for="tag in state.dynamicTags"
            :key="tag"
            closable
            :disable-transitions="false"
            class="mr-2"
            @close="removeTag(tag)"
          >
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
                size="small"
                @keyup.enter="handleInputConfirm"
                @blur="handleInputConfirm"
              />
            </el-form-item>
          </el-form>
          <el-button v-else size="small" @click="showInput">+ Add e-mail</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
    <SwdDialogSucces v-else :text="getDialogSuccesText" @closeDialog="closeDialog" />
    <template #footer>
      <span v-if="state.isShowForm" class="dialog-footer">
        <div class="flex justify-end">
          <SwdButton info main @click="closeDialog">Cancel</SwdButton>
          <SwdButton class="ml-2" primary main :disabled="confirmBtnDisabled" @click="confirm">
            <SwdSpinner v-show="confirmBtnLoading" class="mr-2" />
            Share
          </SwdButton>
        </div>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, watchEffect, ref, computed, nextTick } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import Schema from 'async-validator'
import { sendReport } from '@/api/vueQuery/send-report'
import { sendBlueprintReport } from '@/api/vueQuery/send-blueprint-report'
import { sendReportToSf } from '@/api/vueQuery/send-report-to-sf'
import { sendClientReport } from '@/api/vueQuery/send-client-report'
import { useMutation } from 'vue-query'
import { useAlert } from '@/utils/use-alert'
import SwdDialogSucces from '@/components/Global/SwdDialogSucces.vue'

export default defineComponent({
  name: 'SwdShareDialog',

  components: {
    SwdDialogSucces,
  },

  props: {
    showDialog: {
      type: Boolean,
      require: true,
      default: false,
    },
  },

  setup() {
    const route = useRoute()
    const dialogVisible = ref(false)
    const store = useStore()
    const saveTagInput = ref(null)

    const tabsValue = ref('SF')

    const { mutateAsync: sendBlueprintReportEmail, isLoading: loadingSendlueprintReport } =
      useMutation(sendBlueprintReport)

    const { mutateAsync: sendClientReportEmail, isLoading: loadingSendlClientReport } = useMutation(sendClientReport)

    const { mutateAsync: sendReportSalesForce, isLoading: loadingSendlReportSalesForce } = useMutation(sendReportToSf)

    const statusModal = computed(() => store.state.globalComponents.dialog.showDialog.shareFileEmailDialog)
    const pdfRegion = computed(() => store.state.globalComponents.pdfRegion)
    const docShare = computed(() => store.state.globalComponents.docShare)

    const state = reactive({
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      emailIsNotValid: false,
      file: '',
      isShowForm: true,
    })

    const handleClose = (done) => {
      if (state.dynamicTags.length) {
        ElMessageBox.confirm('Are you sure to close this dialog?')
          .then(() => {
            done(closeDialog())
          })
          .catch(() => {})
      } else {
        done(closeDialog())
      }
    }

    const confirmBtnDisabled = computed(() => {
      if (tabsValue.value === 'email' && !state.dynamicTags.length) return true
      return loadingSendlueprintReport.value || loadingSendlClientReport.value || loadingSendlReportSalesForce.value
    })

    const confirmBtnLoading = computed(() => {
      return loadingSendlueprintReport.value || loadingSendlClientReport.value || loadingSendlReportSalesForce.value
    })

    watchEffect(() => {
      dialogVisible.value = statusModal.value
    })

    const confirm = async () => {
      if (tabsValue.value === 'email') {
        let resSendReport
        const data = {
          emails: state.dynamicTags,
        }
        if (pdfRegion.value === 'blue-report') {
          resSendReport = await sendBlueprintReportEmail({ data, member_id: route.params.id })
        }

        if (pdfRegion.value === 'client-report') {
          resSendReport = await sendClientReportEmail({ data, doc_id: docShare.value.id })
        }

        if (!('error' in resSendReport)) {
          state.isShowForm = false
        } else {
          useAlert({
            title: 'Error',
            type: 'error',
            message: resSendReport.error.message,
          })
        }
      }
      if (tabsValue.value === 'SF') {
        const data = {
          media_id: docShare.value.id,
        }
        const res = await sendReportSalesForce({ data, id: route.params.id })
        if (!('error' in res)) {
          state.isShowForm = false

          useAlert({
            title: 'Success',
            type: 'success',
            message: 'Success',
          })
        }
      }
    }

    const closeDialog = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'shareFileEmailDialog',
        value: false,
      })
      state.isShowForm = true
      state.dynamicTags = []
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

    const getDialogSuccesText = computed(() => {
      if (tabsValue.value === 'email') return 'E-mail has been sent successfully'
      return 'SF has been sent successfully'
    })

    return {
      state,
      dialogVisible,
      handleClose,
      confirm,
      showInput,
      handleInputConfirm,
      saveTagInput,
      removeTag,
      sendReport,
      closeDialog,
      confirmBtnDisabled,
      sendBlueprintReportEmail,
      loadingSendlueprintReport,
      sendClientReportEmail,
      loadingSendlClientReport,
      tabsValue,
      getDialogSuccesText,
      sendReportSalesForce,
      loadingSendlReportSalesForce,
      docShare,
      confirmBtnLoading,
    }
  },
})
</script>

<style>
.share-tabs > .el-tabs__content {
  min-height: 150px;
}
</style>
