<template>
  <el-upload
    ref="innerRef"
    :limit="limit"
    :file-list="fileList"
    :action="getUrlMedia"
    :show-file-list="showFileList"
    :on-success="($event) => $emit('upload-success', $event)"
    :before-upload="uploadBeforeHook"
    with-credentials
    :headers="headers"
    :data="uploadData"
    :on-change="($event) => $emit('upload-change', $event)"
    :auto-upload="autoUpload"
    list-type="picture"
    :disabled="disabled"
    @on-change="($event) => $emit('upload-change', $event)"
  >
    <slot name="main" />
    <template v-if="showFileBlock" #file="{ file }">
      <div v-if="file.status !== 'uploading' && file.status !== 'ready'" class="sm:flex items-center justify-between">
        <div class="flex items-center">
          <img class="el-upload-list__item-thumbnail" src="../../assets/img/icon-pdf.png" alt="" />
          <div class="flex flex-col ml-3">
            <div>
              <span class="text-gray03">File name: </span>
              <span class="font-semibold text-main">{{ file.name }}</span>
            </div>
            <div>
              <span class="text-gray03">Created at: </span>
              <span class="font-semibold text-main">{{ file.created_at ? file.created_at : 'a few minutes ago' }}</span>
            </div>
          </div>
        </div>

        <div class="flex justify-end pt-4 sm:pt-0 sm:block">
          <el-button
            v-if="file.extension === 'pdf'"
            type="primary"
            size="small"
            plain
            class="mr-5"
            @click="handlePictureCardPreview(file)"
          >
            Prewiev
          </el-button>
          <el-popconfirm
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
</template>

<script>
import { tokenStorage } from '@/api/api-client/TokenStorage'
import { computed, ref, onMounted, nextTick } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'SwdUpload',

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
  },
  emits: [
    'upload-success',
    'upload-change',
    'upload-before',
    'upload-change',
    'upload-mounted',
    'open-prewiev',
    'remove-media',
  ],
  setup(props, { emit }) {
    const store = useStore()
    const innerRef = ref(null)
    const idFileRemove = ref(null)

    const fileList = ref([])

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
      emit('open-prewiev', file.url)
    }

    const handleRemove = (media) => {
      if (media.id) {
        idFileRemove.value = media.id
        emit('remove-media', media.id)
      } else {
        idFileRemove.value = media
        emit('remove-media', media)
      }
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
    }
  },
}
</script>
