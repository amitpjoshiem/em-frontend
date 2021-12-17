<template>
  <SwdDropDown :options="actionsOptions" @select="handleSelect">
    <template #titleDropDown>
      <span class="cursor-pointer bg-white rounded flex justify-center items-center py-2 px-3 border border-color-grey">
        <InlineSvg :src="IconActionGray" />
      </span>
    </template>
  </SwdDropDown>
  <el-dialog v-model="dialogVisible" title="Info" width="40%">
    <p class="mb-5">Are you sure to delete</p>
    <p class="font-semibold">"{{ getNameUserModal }}"</p>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmDelete">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import IconActionGray from '@/assets/svg/icon-action-gray.svg'
import { deleteChildOpportunity } from '@/api/vueQuery/delete-child-opportunity'
import { useMutation } from 'vue-query'
import { ref, computed } from 'vue'
import { useQueryClient } from 'vue-query'
import { useRoute } from 'vue-router'

export default {
  name: 'SwdOpportunityItemActions',
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
    const { mutateAsync: deleteChild } = useMutation(deleteChildOpportunity)
    const dialogVisible = ref(false)
    const memberId = route.params.id

    const actionsOptions = [
      {
        title: 'Delete',
        command: 'delete',
      },
    ]

    const actionsMap = {
      delete: () => deleteItem(),
    }

    const handleSelect = (command) => {
      const actionHandler = actionsMap[command]
      actionHandler()
    }

    const getNameUserModal = computed(() => {
      return props.user.name
    })

    const deleteItem = () => {
      dialogVisible.value = true
    }

    const confirmDelete = async () => {
      console.log('props.user - ', props.user)
      const res = deleteChild(props.user.id)
      if (!('error' in res)) {
        queryClient.invalidateQueries(['opportunityList', memberId])
      }

      dialogVisible.value = false
    }

    return {
      handleSelect,
      actionsOptions,
      IconActionGray,
      dialogVisible,
      getNameUserModal,
      confirmDelete,
    }
  },
}
</script>
