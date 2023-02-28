<template>
  <el-upload
    ref="innerRef"
    v-model:file-list="fileList"
    :limit="limit"
    :action="getUrlMedia"
    :show-file-list="showFileList"
    :on-success="($event) => $emit('upload-success', $event)"
    :before-upload="hookBeforeUploadFile"
    :headers="headers"
    :data="uploadData"
    :on-change="($event) => $emit('upload-change', $event)"
    :on-exceed="handleExceed"
    :on-progress="handleProgress"
    :auto-upload="autoUpload"
    :disabled="disabled"
    with-credentials
    list-type="picture"
  >
    <SwdButton v-if="showUploadBtn" primary small :disabled="disabled">Click to upload</SwdButton>
    <template v-if="showTip" #tip>
      <p v-if="!isLoadingMediaRules" class="text-xxs">
        <span v-if="getRulesFormat.length"> {{ getRulesFormat.join(', ') }} files only </span>
        (max file size {{ mediaRules.data.size }}Mb)
      </p>
      <SwdSpinner v-else />
    </template>

    <template v-if="showFileBlock" #file="{ file }">
      <div
        v-if="file.status !== 'uploading' && file.status !== 'ready'"
        class="sm:flex items-center justify-between w-full"
      >
        <div class="flex items-center">
          <SwdThumbnail :extension="getExtension(file)" />
          <div class="flex flex-col ml-3">
            <div>
              <span class="text-main">File name: </span>
              <span class="font-semibold text-main">{{ file.name }}</span>
            </div>
            <div>
              <span class="text-main">Created at: </span>
              <span class="font-semibold text-main">{{ file.created_at ? file.created_at : 'a few minutes ago' }}</span>
            </div>
          </div>
        </div>

        <div class="flex justify-end pt-4 sm:pt-0 sm:block">
          <el-button
            v-if="file.extension && configExtensionPreview.includes(file.extension.toLowerCase())"
            type="primary"
            size="small"
            plain
            class="mr-5"
            @click="handlePictureCardPreview(file)"
          >
            Preview
          </el-button>
          <el-popconfirm
            v-if="withRemoveBtn"
            confirm-button-text="Yes"
            cancel-button-text="No"
            icon="el-icon-info"
            icon-color="red"
            title="Are you sure to delete this?"
            @confirm="handleRemove(file)"
          >
            <template #reference>
              <el-button type="danger" size="small" plain :loading="idFileRemove === file.id">Remove</el-button>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </template>
  </el-upload>
  <slot name="noDocuments" />
</template>

<script>
import { tokenStorage } from '@/api/api-client/TokenStorage'
import { computed, ref, onMounted, nextTick } from 'vue'
import { useStore } from 'vuex'
import { useFetchMediaRules } from '@/api/use-fetch-media-rules.js'
import { useBeforeUploadFile } from '@/hooks/use-before-upload-file'
import { ElMessage } from 'element-plus'
import SwdThumbnail from '@/components/Global/SwdThumbnail.vue'

export default {
  name: 'SwdUpload',
  components: {
    SwdThumbnail,
  },
  props: {
    uploadData: {
      type: Object,
      required: false,
      default: () => {},
    },
    uploadBeforeHook: {
      type: Function,
      required: false,
      default: (file) => Promise.resolve(file),
    },
    showFileList: {
      type: Boolean,
      required: false,
      default: false,
    },
    autoUpload: {
      type: Boolean,
      required: false,
      default: false,
    },
    showFileBlock: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    withRemoveBtn: {
      type: Boolean,
      required: false,
      default: true,
    },
    docList: {
      type: Array,
      required: false,
      default: () => [],
    },
    limit: {
      type: Number,
      required: false,
      default: 10,
    },
    showTip: {
      type: Boolean,
      required: false,
      default: true,
    },
    showUploadBtn: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  emits: [
    'upload-success',
    'upload-change',
    'upload-before',
    'upload-change',
    'upload-mounted',
    'upload-progress',
    'open-prewiev',
    'remove-media',
  ],
  setup(props, { emit }) {
    const store = useStore()
    const innerRef = ref(null)
    const idFileRemove = ref(null)
    const fileList = ref([])
    const configExtensionPreview = ['jpeg', 'jpg', 'png', 'pdf', 'doc', 'docx', 'xls', 'xlsx']

    const { isLoading: isLoadingMediaRules, data: mediaRules } = useFetchMediaRules({
      collection: props.uploadData.collection,
    })

    const { beforeUploadFile } = useBeforeUploadFile()
    const uploadRefFn = () => props.uploadRef

    const headers = computed(() => {
      const customHeader = {}

      const type = store.state.globalComponents.currentTypeUser
      const companyId = store.state.globalComponents.currentCompanyId

      if (companyId) customHeader['x-company'] = companyId

      if (type === 'advisor') {
        customHeader['x-user'] = store.state.globalComponents.advisorId
      }

      if (type === 'ceo') {
        customHeader['x-user'] = store.state.globalComponents.ceoId
      }

      if (type === 'admin') {
        customHeader['x-user'] = store.state.globalComponents.adminId
      }

      if (type === 'client') {
        customHeader['x-user'] = store.state.globalComponents.clientId
      }

      if (type === 'lead') {
        customHeader['x-user'] = store.state.globalComponents.leadId
      }

      const token = tokenStorage.getByKey('access_token')

      return { Authorization: `Bearer ${token}`, ...customHeader }
    })

    const getUrlMedia = computed(() => {
      // eslint-disable-next-line no-undef
      return process.env.VUE_APP_API_MEDIA_URL
    })

    onMounted(() => {
      fileList.value = props.docList
      nextTick(() => {
        emit('upload-mounted', innerRef)
      })
    })

    const handlePictureCardPreview = (file) => {
      emit('open-prewiev', file)
    }

    const handleRemove = (media) => {
      if (media.uid) {
        const index = fileList.value.findIndex((elem) => {
          return elem.uid === media.uid
        })
        fileList.value.splice(index, 1)
      }
      if (media.id) {
        idFileRemove.value = media.id
        emit('remove-media', media.id)
      } else {
        idFileRemove.value = media
        emit('remove-media', media)
      }
    }

    const getRulesFormat = computed(() => {
      if (mediaRules.value.data.allowed_types) {
        return mediaRules.value.data.allowed_types.map((element) => {
          return element.extension
        })
      }
      return []
    })

    const hookBeforeUploadFile = (rawFile) => {
      return beforeUploadFile({ rawFile, rules: mediaRules.value.data })
    }

    const handleExceed = () => {
      ElMessage.warning(
        `In one time, only ${props.limit} ${props.limit === 1 ? 'file' : 'files'} uploading is allowed.`
      )
    }

    const handleProgress = (e) => {
      emit('upload-progress', e)
    }

    const getExtension = (file) => {
      return file.name.match(/\.([^.]+)$|$/)[1]
    }

    return {
      headers,
      uploadRefFn,
      innerRef,
      getUrlMedia,
      handlePictureCardPreview,
      handleRemove,
      idFileRemove,
      fileList,
      hookBeforeUploadFile,
      isLoadingMediaRules,
      mediaRules,
      getRulesFormat,
      handleExceed,
      getExtension,
      configExtensionPreview,
      handleProgress,
    }
  },
}
</script>
