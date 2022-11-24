<template>
  <el-dialog
    v-model="state.dialogVisible"
    title="Owner member details"
    width="80%"
    class="dialog-style pdf-viewer"
    :before-close="closeDialog"
  >
    <div>
      <div class="border-main-gray border rounded-md p-2 w-full">
        <p class="text-main mb-[2px]">Owner name:</p>
        <p class="font-semibold">{{ owner.value.last_name + ' ' + owner.value.first_name }}</p>
      </div>
      <div class="border-main-gray border rounded-md p-2 w-full mt-2">
        <p class="text-main mb-[2px]">Status:</p>
        <p class="font-semibold">{{ owner.value.status }}</p>
      </div>
      <div class="border-main-gray border rounded-md p-2 w-full mt-2">
        <p class="text-main mb-[2px]">Owner email:</p>
        <p class="font-semibold">{{ owner.value.email }}</p>
      </div>
      <div class="border-main-gray border rounded-md p-2 w-full mt-2">
        <p class="text-main mb-[2px]">Owner phone:</p>
        <SwdStubForText :text="owner.value.phone" plug="&mdash;" class="text-sm text-main" />
      </div>
    </div>
    <template #footer>
      <div class="flex justify-end">
        <span class="dialog-footer">
          <SwdButton info class="mr-2 w-[60px]" @click="closeDialog">Close</SwdButton>
        </span>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, watchEffect } from 'vue'
export default {
  name: 'ModalMemberDetailsOther',
  props: {
    owner: {
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
      state.dialogVisible = store.state.globalComponents.dialog.showDialog.moreOwnerInfo
    })

    const closeDialog = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'moreOwnerInfo',
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
