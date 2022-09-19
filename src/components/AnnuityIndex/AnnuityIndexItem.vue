<template>
  <el-card class="mb-4">
    <div class="flex items-center justify-center">
      <div class="w-3/12 mr-3">
        <el-icon color="#042D52" :size="100"><Document /></el-icon>
      </div>
      <div class="w-9/12 text-xss">
        <div class="text-main flex">
          <span class="w-6/12 text-main font-semibold">Document name:</span>
          <span class="w-6/12">{{ item.name }}</span>
        </div>
        <div class="text-main flex pt-2">
          <span class="w-6/12 text-main font-semibold">Insurance provider:</span>
          <span class="w-6/12">{{ item.insurance_provider }}</span>
        </div>
        <div class="text-main flex pt-2">
          <span class="w-6/12 text-main font-semibold">Date signed advisor:</span>
          <SwdStubForText :text="item.advisor_signed" plug="&mdash;" class="text-sm text-main" />
        </div>
        <div class="text-main flex pt-2">
          <span class="w-6/12 text-main font-semibold">Date signed client:</span>
          <SwdStubForText :text="item.client_signed" plug="&mdash;" class="text-sm text-main" />
        </div>
        <div class="text-main flex pt-2">
          <span class="w-6/12 text-main font-semibold">Tax Qualification:</span>
          <div class="w-6/12 flex items-center cursor-pointer" @click="open">
            <span class="pr-1">{{ item.tax_qualification }}</span>
            <el-icon color="#66B6FF" :size="15"><Link /></el-icon>
          </div>
        </div>
        <div class="text-main flex pt-2">
          <span class="w-6/12 text-main font-semibold">Agent Rep Code:</span>
          <span class="w-6/12">{{ item.agent_rep_code }}</span>
        </div>
        <div class="text-main flex pt-2">
          <span class="w-6/12 text-main font-semibold">License Number :</span>
          <span class="w-6/12">{{ item.license_number }}</span>
        </div>
        <div class="flex justify-end text-main pt-4">
          <SwdButton primary small @click="getDetails">Details</SwdButton>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script>
import { Document, Link } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

export default {
  name: 'AnnuityIndexItem',
  components: {
    Document,
    Link,
  },
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  setup(props) {
    const router = useRouter()

    const open = () => {
      ElMessageBox.alert('This is a message', 'Title', {
        confirmButtonText: 'OK',
      })
    }

    const getDetails = () => {
      router.push({ name: 'annuity-index-details', params: { annuityId: props.item.id } })
    }

    return {
      open,
      getDetails,
    }
  },
}
</script>
