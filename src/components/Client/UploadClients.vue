<template>
  <el-upload
    ref="innerRef"
    :action="getUrlMedia"
    :show-file-list="true"
    :on-success="handleSuccess"
    with-credentials
    :headers="headers"
    :data="uploadData"
    :auto-upload="true"
    list-type="picture"
    :disabled="disabled"
    :on-remove="handleRemove"
  >
    <slot name="main" />
    <template #file="{ file }">
      <div v-if="file.status !== 'uploading' && file.status !== 'ready'">
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
            <el-button type="primary" size="small" plain class="mr-5" @click="handlePictureCardPreview(file)">
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
      </div>
    </template>
  </el-upload>
</template>

<script>
import { tokenStorage } from '@/api/api-client/TokenStorage'
import { computed, ref, onMounted, nextTick } from 'vue'

import { useMutation, useQueryClient } from 'vue-query'

import { uploadClientsDocs } from '@/api/vueQuery/clients/fetch-upload-clients-docs'
import { deleteMedia } from '@/api/vueQuery/delete-media'

export default {
  name: 'UploadClients',

  props: {
    uploadData: {
      type: Object,
      required: false,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    collection: {
      type: String,
      required: true,
      default: 'true',
    },
  },
  emits: ['upload-mounted', 'open-prewiev', 'remove-media', 'handle-refetch'],
  setup(props, { emit }) {
    const { mutateAsync: uploadDoc, isLoading: isLoadingUpload, error } = useMutation(uploadClientsDocs)
    const { mutateAsync: deleteDocument } = useMutation(deleteMedia)

    const queryClient = useQueryClient()

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

    const handleSuccess = async (res) => {
      const data = { uuids: [res.data.uuid] }
      const response = await uploadDoc({ collection: props.collection, data })
      if (!('error' in response)) {
        emit('handle-refetch')
        queryClient.invalidateQueries(['clientsDocuments', props.collection])
      }
    }

    const handleRemove = async (media) => {
      const res = await deleteDocument(media)
      if (!('error' in res)) {
        emit('handle-refetch')
        queryClient.invalidateQueries(['clientsDocuments', props.collection])
      }
    }

    return {
      headers,
      uploadRefFn,
      innerRef,
      getUrlMedia,
      handlePictureCardPreview,
      handleRemove,
      handleSuccess,
      isLoadingUpload,
      error,
    }
  },
}
</script>
