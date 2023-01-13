<template>
  <div class="sm:flex items-center justify-between w-full border rounded my-4 p-4">
    <div class="flex items-center">
      <img class="w-[70px]" src="../../../assets/img/icon-pdf.png" alt="" />
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

    <div class="flex justify-end pt-4 sm:pt-0 sm:block">
      <el-popconfirm
        v-if="withRemoveBtn"
        confirm-button-text="Yes"
        cancel-button-text="No"
        icon="el-icon-info"
        icon-color="red"
        title="Are you sure to delete this?"
        @confirm="handleRemove"
      >
        <template #reference>
          <el-button type="danger" size="small" plain :loading="isLoadingRemove">Remove</el-button>
        </template>
      </el-popconfirm>
      <el-button v-if="doc.extension === 'pdf'" type="primary" size="small" plain @click="handlePrewiev">
        Preview
      </el-button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useMutation, useQueryClient } from 'vue-query'
import { deleteMedia } from '@/api/vueQuery/delete-media'

export default {
  name: 'DocItem',
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

    const { isLoading: isLoadingRemove, mutateAsync: deleteDocument } = useMutation(deleteMedia)

    const handlePrewiev = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'prewievPdf',
        value: true,
      })
      store.commit('globalComponents/setPreviewUrlPdf', props.doc.url)
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
    }
  },
}
</script>
