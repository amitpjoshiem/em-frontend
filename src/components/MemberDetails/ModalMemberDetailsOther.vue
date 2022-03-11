<template>
  <el-dialog
    v-model="state.dialogVisible"
    title="Member details other"
    width="80%"
    custom-class="dialog-style pdf-viewer"
    :before-close="closeDialog"
  >
    <div>
      <div class="border-input-border border rounded-md p-2 w-full">
        <p class="text-gray03 mb-[2px]">Risk level:</p>
        <p class="font-semibold">{{ other.value.risk }}</p>
      </div>
      <div class="border-input-border border rounded-md p-2 w-full my-4 flex flex-col">
        <span class="text-gray03 mb-[2px]">Goal for retirement:</span>
        <span class="font-semibold">{{ other.value.retirement }}</span>
      </div>
      <div class="border-input-border border rounded-md p-2 w-full">
        <p class="text-gray03 mb-[2px]">Goal for retirement money:</p>
        <p class="font-semibold">
          {{ other.value.retirementMoney }}
        </p>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">Close</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, watchEffect } from 'vue'
export default {
  name: 'ModalMemberDetailsOther',
  props: {
    other: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  setup() {
    const store = useStore()

    const state = reactive({
      dialogVisible: false,
    })

    watchEffect(() => {
      state.dialogVisible = store.state.globalComponents.dialog.showDialog.moreOtherInfo
    })

    const closeDialog = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'moreOtherInfo',
        value: false,
      })
    }

    return {
      state,
      closeDialog,
    }
  },
}
</script>
