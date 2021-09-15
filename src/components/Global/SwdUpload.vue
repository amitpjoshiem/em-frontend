<template>
  <el-upload
    ref="innerRef"
    action="https://wealtheze.com/api/v1/media"
    :show-file-list="false"
    :on-success="($event) => $emit('upload-success', $event)"
    :before-upload="uploadBeforeHook"
    with-credentials
    :headers="headers"
    :data="uploadData"
    :on-change="($event) => $emit('upload-change', $event)"
    :auto-upload="false"
  >
    <slot name="main" />
  </el-upload>
</template>

<script>
import { tokenStorage } from '@/api/api-client/TokenStorage'
import { computed, ref, onMounted } from 'vue'

export default {
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
  },
  emits: ['upload-success', 'upload-before', 'upload-change', 'upload-mounted'],
  setup(props, { emit }) {
    const innerRef = ref(null)
    const uploadRefFn = () => props.uploadRef
    const headers = computed(() => {
      const token = tokenStorage.getByKey('access_token')
      return { Authorization: `Bearer ${token}` }
    })

    onMounted(() => {
      setTimeout(() => {
        emit('upload-mounted', innerRef)
      })
    })

    return { headers, uploadRefFn, innerRef }
  },
}
</script>
