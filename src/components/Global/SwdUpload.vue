<template>
  <el-upload
    ref="innerRef"
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
  >
    <slot name="main" />
    <template v-if="showFileBlock" #file="{ file }">
      <img class="el-upload-list__item-thumbnail" src="../../assets/img/icon-pdf.png" alt="" />
      <div class="flex justify-between items-center mt-[10px] ml-3">
        <div class="flex flex-col">
          <div>
            <span class="text-gray03">File name: </span>
            <span class="font-semibold text-main">{{ file.name }}</span>
          </div>
          <div>
            <span class="text-gray03">Created at: </span>
            <span class="font-semibold text-main">{{ file.created_at ? file.created_at : 'a few minutes ago' }}</span>
          </div>
        </div>
        <div>
          <el-button
            v-if="isPrewiev"
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
            @confirm="handleRemove(file.id)"
          >
            <template #reference>
              <el-button type="danger" size="small" plain>Remove</el-button>
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
    isPrewiev: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  emits: ['upload-success', 'upload-before', 'upload-change', 'upload-mounted', 'open-prewiev', 'remove-media'],
  setup(props, { emit }) {
    const innerRef = ref(null)
    const uploadRefFn = () => props.uploadRef
    const headers = computed(() => {
      const token = tokenStorage.getByKey('access_token')
      return { Authorization: `Bearer ${token}` }
    })

    const getUrlMedia = computed(() => {
      // eslint-disable-next-line no-undef
      return process.env.VUE_APP_API_MEDIA_URL
    })

    onMounted(() => {
      nextTick(() => {
        emit('upload-mounted', innerRef)
      })
    })

    const handlePictureCardPreview = (file) => {
      emit('open-prewiev', file.url)
    }

    const handleRemove = (id) => {
      emit('remove-media', id)
    }

    return {
      headers,
      uploadRefFn,
      innerRef,
      getUrlMedia,
      handlePictureCardPreview,
      handleRemove,
    }
  },
}
</script>
