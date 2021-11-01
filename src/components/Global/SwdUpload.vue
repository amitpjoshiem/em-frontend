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
  >
    <slot name="main" />
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
  },
  emits: ['upload-success', 'upload-before', 'upload-change', 'upload-mounted'],
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

    return {
      headers,
      uploadRefFn,
      innerRef,
      getUrlMedia,
    }
  },
}
</script>
