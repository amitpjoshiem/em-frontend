<template>
  <SwdDropDown :options="getActionsOptions" @select="handleSelect">
    <template #titleDropDown>
      <span class="cursor-pointer bg-white rounded flex justify-center items-center py-2 px-3 border border-color-grey">
        <InlineSvg :src="IconActionGray" />
      </span>
    </template>
  </SwdDropDown>

  <!-- CONVERT LEAD -->
  <el-dialog v-model="dialogVisibleConvertLead" title="Info" width="40%" lock-scroll>
    <p class="mb-5">Are you sure to convert lead?</p>
    <p class="font-semibold">Lead: {{ user.name }}</p>
    <p class="font-semibold">E-mail: {{ user.email }}</p>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisibleConvertLead = false">Cancel</el-button>
        <el-button
          type="primary"
          plain
          :disabled="isLoadingConvertLead"
          :loading="isLoadingConvertLead"
          class="w-20"
          @click="confirmConvertLead"
        >
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- DEACTIVATED LINK -->
  <el-dialog v-model="dialogVisibleDeactivatedLink" title="Info" width="40%" lock-scroll>
    <div class="text-center">
      <el-icon :size="80">
        <info-filled color="#E6A23C" />
      </el-icon>
    </div>
    <div class="pt-4">
      <p>Are you sure to deactivate link?</p>
      <p class="font-semibold">Lead: {{ user.name }}</p>
      <p class="font-semibold">E-mail: {{ user.email }}</p>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisibleDeactivatedLink = false">Cancel</el-button>
        <el-button
          type="primary"
          plain
          :disabled="isLoadingDeactivatedAcc"
          :loading="isLoadingDeactivatedAcc"
          class="w-20"
          @click="confirmDeactivatedLink"
        >
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- DEACTIVATED ACC -->
  <el-dialog v-model="dialogVisibleDeactivatedAcc" width="40%" lock-scroll title="Info">
    <div class="text-center">
      <el-icon :size="80">
        <info-filled color="#E6A23C" />
      </el-icon>
    </div>
    <div class="pt-4">
      <p>Are you sure to deactivate account?</p>
      <p class="font-semibold">Lead: {{ user.name }}</p>
      <p class="font-semibold">E-mail: {{ user.email }}</p>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisibleDeactivatedAcc = false">Cancel</el-button>
        <el-button
          type="primary"
          plain
          :disabled="isLoadingDeactivatedAcc"
          :loading="isLoadingDeactivatedAcc"
          class="w-20"
          @click="confirmDeactivatedAcc"
        >
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- RESTORE ACC -->
  <el-dialog v-model="dialogVisibleRestoreAcc" title="Info" width="40%" lock-scroll>
    <div class="text-center">
      <el-icon :size="80">
        <info-filled color="#E6A23C" />
      </el-icon>
    </div>
    <div class="pt-4">
      <p>Are you sure to activate account</p>
      <p class="font-semibold">Lead: {{ user.name }}</p>
      <p class="font-semibold">E-mail: {{ user.email }}</p>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisibleRestoreAcc = false">Cancel</el-button>
        <el-button
          type="primary"
          plain
          :disabled="isLoadingRestoreAcc"
          :loading="isLoadingRestoreAcc"
          class="w-20"
          @click="confirmRestoredAcc"
        >
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import IconActionGray from '@/assets/svg/icon-action-gray.svg'
import { useMutation } from 'vue-query'
import { ref, computed } from 'vue'
import { useQueryClient } from 'vue-query'
import { useRouter } from 'vue-router'

import { convertLeadToOpportunity } from '@/api/vueQuery/fetch-convert-lead-to-opportunity'
import { deactivatedAccLead } from '@/api/vueQuery/fetch-deactivated-acc-lead'
import { restoreAccLead } from '@/api/vueQuery/fetch-restore-acc-lead'
import { deactivatedLinkLead } from '@/api/vueQuery/fetch-deactivated-link-lead'

import { useAlert } from '@/utils/use-alert'

import IconSuccesChanged from '@/assets/svg/icon-succes-changed.svg'
import { InfoFilled } from '@element-plus/icons-vue'

export default {
  name: 'SwdLeadActions',
  components: {
    InfoFilled,
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
    const router = useRouter()

    const { mutateAsync: convertLead, isLoading: isLoadingConvertLead } = useMutation(convertLeadToOpportunity)
    const { mutateAsync: fetchDeactivatedAcc, isLoading: isLoadingDeactivatedAcc } = useMutation(deactivatedAccLead)
    const { mutateAsync: fetchRestoreAcc, isLoading: isLoadingRestoreAcc } = useMutation(restoreAccLead)
    const { mutateAsync: fetchDeactivatedLink, isLoading: isLoadingDeactivatedLink } = useMutation(deactivatedLinkLead)

    const dialogVisibleDeactivatedLink = ref(false)
    const dialogVisibleDeactivatedAcc = ref(false)
    const dialogVisibleRestoreAcc = ref(false)
    const dialogVisibleConvertLead = ref(false)

    const getActionsOptions = computed(() => {
      const options = []

      if (props.user.can_delete) {
        options.push({
          title: 'Deactivate account',
          command: 'deactivated-account',
        })
      }

      if (props.user.can_restore) {
        options.push({
          title: 'Activate account',
          command: 'restore-account',
        })
      }

      if (!props.user.is_activated) {
        options.push({
          title: 'Deactivate link',
          command: 'deactivated-link',
        })
      }

      if (props.user.is_activated) {
        options.push({
          title: 'Convert to opportunity',
          command: 'convert-opportunity',
        })
      }

      return options
    })

    const actionsMap = {
      'convert-opportunity': () => convert(),
      'deactivated-link': () => deactivatedLink(),
      'deactivated-account': () => deactivatedAcc(),
      'restore-account': () => restoreAcc(),
    }

    const handleSelect = (command) => {
      const actionHandler = actionsMap[command]
      actionHandler()
    }

    const getNameUserModal = computed(() => {
      return props.user.name
    })

    const convert = () => {
      dialogVisibleConvertLead.value = true
    }

    const deactivatedLink = () => {
      dialogVisibleDeactivatedLink.value = true
    }

    const deactivatedAcc = () => {
      dialogVisibleDeactivatedAcc.value = true
    }

    const restoreAcc = () => {
      dialogVisibleRestoreAcc.value = true
    }

    const confirmDeactivatedLink = async () => {
      const res = await fetchDeactivatedLink(props.user.id)
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Lead link deactivated successfully',
        })
        queryClient.invalidateQueries(['householders-list'])
        dialogVisibleDeactivatedLink.value = false
      }
    }

    const confirmDeactivatedAcc = async () => {
      const res = await fetchDeactivatedAcc(props.user.id)
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Lead deactivated successfully',
        })
        queryClient.invalidateQueries(['householders-list'])
        queryClient.invalidateQueries(['stats-members'])
        dialogVisibleDeactivatedAcc.value = false
      }
    }

    const confirmRestoredAcc = async () => {
      const res = await fetchRestoreAcc(props.user.id)
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Lead restored successfully',
        })
        queryClient.invalidateQueries(['householders-list'])
        queryClient.invalidateQueries(['stats-members'])
        dialogVisibleRestoreAcc.value = false
      }
    }

    const confirmConvertLead = async () => {
      const res = await convertLead(props.user.id)
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Convert to opportunity successfully',
        })
        router.push({ name: 'member-details', params: { id: props.user.id } })
        dialogVisibleConvertLead.value = false
      }
    }

    return {
      handleSelect,
      IconActionGray,
      getNameUserModal,
      getActionsOptions,

      confirmDeactivatedLink,
      confirmDeactivatedAcc,
      confirmRestoredAcc,
      confirmConvertLead,

      dialogVisibleDeactivatedLink,
      dialogVisibleDeactivatedAcc,
      dialogVisibleRestoreAcc,
      dialogVisibleConvertLead,

      isLoadingDeactivatedAcc,
      isLoadingRestoreAcc,
      isLoadingDeactivatedLink,
      isLoadingConvertLead,

      IconSuccesChanged,
    }
  },
}
</script>
