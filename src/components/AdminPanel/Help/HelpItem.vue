<template>
  <SwdWrapper class="text-main">
    <SwdSubHeader title="Help" :with-back-btn="false" />
    <div class="mt-4 el-form-item__label -mb-3">Text</div>
    <el-form ref="form" :model="ruleForm" class="p-5 border rounded-md">
      <el-form-item class="mb-4">
        <el-input v-model="ruleForm.text" autocomplete="off" placeholder="Add help text" />
      </el-form-item>

      <div class="flex justify-end mt-4">
        <SwdButton primary main @click="saveText">Save</SwdButton>
      </div>
    </el-form>

    <div class="mt-4 el-form-item__label -mb-3">Video</div>
    <div v-if="!isLoading" class="p-5 border rounded-md">
      <template v-if="itemHelp.url">
        <video controls style="width: 100%; height: 100%">
          <source :src="itemHelp.url" type="video/mp4" />
        </video>
        <div class="flex justify-end mt-4">
          <el-button type="danger" plain @click="removeVideo">Remove</el-button>
        </div>
      </template>
      <div v-else>
        <SwdUpload
          :upload-data="{ collection: 'client_help' }"
          :show-file-list="true"
          :auto-upload="true"
          :show-file-block="true"
          :limit="1"
          @upload-success="handleSuccess"
          @upload-mounted="bindRef"
          @upload-change="handleChange"
        >
          <template #noDocuments>
            <div v-if="!inChangeFile" class="text-main text-center pt-3 pb-7">No recently added video</div>
          </template>
        </SwdUpload>
      </div>
    </div>
  </SwdWrapper>
</template>

<script>
import SwdUpload from '@/components/Global/SwdUpload.vue'
import { useFetchApClientsHelpFind } from '@/api/admin-panel/use-fetch-ap-clients-help-find.js'
import { updateAdminPanelHelp } from '@/api/vueQuery/admin-panel/update-admin-panel-help'
import { useRoute } from 'vue-router'
import { ref, reactive, watch } from 'vue'
import { useMutation, useQueryClient } from 'vue-query'
import { useAlert } from '@/utils/use-alert'
import { ElMessageBox } from 'element-plus'

export default {
  name: 'HelpItem',
  components: {
    SwdUpload,
  },
  setup() {
    const route = useRoute()
    const id = route.params.id
    const form = ref(null)
    const inChangeFile = ref(false)
    const upload = ref(null)
    const queryClient = useQueryClient()

    const ruleForm = reactive({
      text: '',
    })

    const { isLoading, isError, data: itemHelp } = useFetchApClientsHelpFind(id)
    const { mutateAsync: updateHelp } = useMutation(updateAdminPanelHelp)

    const bindRef = (ref) => {
      upload.value = ref.value
    }

    watch(isLoading, (newValue, oldValue) => {
      if (oldValue && !newValue) {
        ruleForm.text = itemHelp.value.text
      }
    })

    const handleSuccess = async (media) => {
      const res = await updateHelp({ type: itemHelp.value.type, data: { uuids: [media.data.uuid] } })
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Video uploaded successfully',
        })
        queryClient.invalidateQueries(['admin-panel-clients-help-find'])
      }
    }

    const handleChange = () => {
      inChangeFile.value = true
    }

    const saveText = async () => {
      const res = await updateHelp({ type: itemHelp.value.type, data: { text: ruleForm.text } })
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Help text updated',
        })
        queryClient.invalidateQueries(['admin-panel-clients-help-find'])
      }
    }

    const removeVideo = () => {
      ElMessageBox.confirm('Permanently delete the file. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(async () => {
          const res = await updateHelp({ type: itemHelp.value.type, data: { url: '' } })
          if (!('error' in res)) {
            useAlert({
              title: 'Success',
              type: 'success',
              message: 'Delete completed',
            })
            queryClient.invalidateQueries(['admin-panel-clients-help-find'])
          }
        })
        .catch(() => {})
    }

    return {
      isLoading,
      isError,
      itemHelp,
      ruleForm,
      form,
      inChangeFile,
      bindRef,
      handleSuccess,
      handleChange,
      saveText,
      removeVideo,
    }
  },
}
</script>
