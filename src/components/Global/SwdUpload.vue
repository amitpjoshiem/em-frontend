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
    <template v-if="showFileBlock" #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" src="../../assets/img/icon-pdf.png" alt="" />
      </div>
      <div class="flex justify-center flex-col mt-[10px] ml-3 cursor-pointer" @click="handlePictureCardPreview(file)">
        <div>{{ file.name }}</div>
        <div>{{ file.created_at }}</div>
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
  },
  emits: ['upload-success', 'upload-before', 'upload-change', 'upload-mounted', 'open-prewiev'],
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

    return {
      headers,
      uploadRefFn,
      innerRef,
      getUrlMedia,
      handlePictureCardPreview,
    }
  },
}
</script>
