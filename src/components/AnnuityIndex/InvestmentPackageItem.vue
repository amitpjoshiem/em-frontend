<template>
  <el-card v-loading="isLoading" class="mb-4">
    <div class="flex justify-between">
      <div class="mb-4 text-main font-semibold">Certificate: {{ item.name }}</div>
      <div>
        <el-button
          v-if="item.is_client_signed && item.is_advisor_signed"
          type="success"
          :icon="Key"
          circle
          class="mr-4"
          plain
          size="small"
          @click="handlePreview(item.certificate.url)"
        />
        <el-tag :type="item.client_signed ? 'success' : 'danger'" class="mr-4">
          <el-icon><EditPen /></el-icon>
          Client
        </el-tag>
        <el-tag :type="item.advisor_signed ? 'success' : 'danger'">
          <el-icon><EditPen /></el-icon>
          Advisor
        </el-tag>
      </div>
    </div>
    <div class="flex items-center">
      <div class="w-[35px] mr-2">
        <img class="el-upload-list__item-thumbnail" src="../../assets/img/icon-pdf.png" alt="" />
      </div>
      <div class="texy-main text-xss">{{ item.media.file_name }}</div>
    </div>

    <div v-if="!$can('client', 'all')" class="flex justify-end">
      <el-popconfirm title="Are you sure to delete this?" @confirm="confirmDelete()">
        <template #reference>
          <el-button type="danger" size="small" plain :loading="loadingDelete">Delete</el-button>
        </template>
      </el-popconfirm>

      <SwdButton primary small class="ml-2">Send</SwdButton>
      <SwdButton v-if="!item.advisor_signed" class="ml-2" primary small @click="handleSign">Sign</SwdButton>
    </div>
  </el-card>
</template>

<script>
import { ref } from 'vue'
import { EditPen, Key } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useQueryClient, useMutation } from 'vue-query'
import { useAlert } from '@/utils/use-alert'
import { fetchSignInvestmentPackage } from '@/api/vueQuery/fetch-sign-investment-package'
import { fetchDeleteInvestmentPackage } from '@/api/vueQuery/fetch-delete-investment-package'

export default {
  name: 'InvestmentPackageItem',
  components: {
    EditPen,
  },
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  setup(props) {
    const store = useStore()
    const route = useRoute()
    const queryClient = useQueryClient()
    const fileList = ref([])

    const { mutateAsync: sign, isLoading } = useMutation(fetchSignInvestmentPackage)
    const { mutateAsync: deleteInvestmentPackage, isLoading: loadingDelete } = useMutation(fetchDeleteInvestmentPackage)

    const handleSign = async () => {
      const res = await sign(props.item.id)
      if (!('error' in res)) {
        window.open(res.data.url, '_blank')
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'A signing link has been sent to your email.',
        })
      }
    }

    const confirmDelete = async () => {
      const res = await deleteInvestmentPackage(props.item.id)
      if (!('error' in res)) {
        queryClient.invalidateQueries(['investment-package-all', route.params.annuityId])
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Delete successfully',
        })
      }
    }

    const handlePreview = (url) => {
      store.commit('globalComponents/setShowModal', {
        destination: 'prewievPdf',
        value: true,
      })
      store.commit('globalComponents/setPreviewUrlPdf', url)
    }

    return {
      fileList,
      handleSign,
      confirmDelete,
      isLoading,
      loadingDelete,
      handlePreview,
      Key,
    }
  },
}
</script>
