<template>
  <el-popconfirm title="Are you sure to delete this?" @confirm="confirmDelete">
    <template #reference>
      <el-icon :size="15" color="red" class="cursor-pointer"><Delete /></el-icon>
    </template>
  </el-popconfirm>
</template>

<script>
import { deleteChildOpportunity } from '@/api/vueQuery/delete-child-opportunity'
import { useMutation } from 'vue-query'
import { useQueryClient } from 'vue-query'
import { useRoute } from 'vue-router'
import { Delete } from '@element-plus/icons-vue'

export default {
  name: 'SwdOpportunityItemActions',
  components: {
    Delete,
  },
  props: {
    user: {
      type: Object,
      require: true,
      default: () => {},
    },
  },

  setup(props) {
    const queryClient = useQueryClient()
    const route = useRoute()
    const memberId = route.params.id

    const { mutateAsync: deleteChild } = useMutation(deleteChildOpportunity)

    const confirmDelete = async () => {
      const res = await deleteChild(props.user.id)
      if (!('error' in res)) {
        queryClient.invalidateQueries(['opportunityList', memberId])
      }
    }

    return {
      confirmDelete,
    }
  },
}
</script>
