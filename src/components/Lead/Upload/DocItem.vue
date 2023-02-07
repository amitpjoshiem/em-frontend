<template>
  <div class="md:flex items-center justify-between w-full border rounded my-4 p-4">
    <div class="flex items-center text-xs sm:text-sm">
      <SwdThumbnail :extension="doc.extension" class="w-[70px]" />
      <div class="flex flex-col ml-3">
        <div>
          <span class="text-main">File name: </span>
          <span class="font-semibold text-main">{{ doc.name }}</span>
        </div>
        <div>
          <span class="text-main">Created at: </span>
          <span class="font-semibold text-main">{{ doc.created_at ? doc.created_at : 'a few minutes ago' }}</span>
        </div>
      </div>
    </div>

    <div class="flex justify-end pt-4 md:pt-0 md:block">
      <el-popconfirm
        v-if="withRemoveBtn"
        confirm-button-text="Yes"
        cancel-button-text="No"
        title="Are you sure to delete this?"
        @confirm="handleRemove"
      >
        <template #reference>
          <el-button type="danger" size="small" plain :loading="isLoadingRemove">Remove</el-button>
        </template>
      </el-popconfirm>
      <el-button
        v-if="configExtensionPreview.includes(doc.extension.toLowerCase())"
        type="primary"
        size="small"
        plain
        @click="handlePrewiev"
      >
        Preview
      </el-button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useMutation, useQueryClient } from 'vue-query'
import { deleteMedia } from '@/api/vueQuery/delete-media'
import SwdThumbnail from '@/components/Global/SwdThumbnail.vue'

export default {
  name: 'DocItem',
  components: {
    SwdThumbnail,
  },
  props: {
    doc: {
      type: Object,
      required: true,
      default: () => {},
    },
    withRemoveBtn: {
      type: Boolean,
      required: false,
      default: false,
    },
    collection: {
      type: String,
      required: true,
      default: '',
    },
  },
  setup(props) {
    const store = useStore()
    const queryClient = useQueryClient()
    const configExtensionPreview = ['jpeg', 'jpg', 'png', 'pdf', 'doc', 'docx', 'xls', 'xlsx']

    const { isLoading: isLoadingRemove, mutateAsync: deleteDocument } = useMutation(deleteMedia)

    const handlePrewiev = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'previewModal',
        value: true,
      })
      store.commit('globalComponents/setPreviewFile', props.doc)
    }

    const handleRemove = async () => {
      const res = await deleteDocument(props.doc.id)
      if (!('error' in res)) {
        await queryClient.invalidateQueries(['clientsDocuments', props.collection])
      }
    }

    return {
      handlePrewiev,
      handleRemove,
      isLoadingRemove,
      configExtensionPreview,
    }
  },
}
</script>
