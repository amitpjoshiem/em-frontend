<template>
  <div
    class="
      mb-5
      w-[49%]
      h-[235px]
      border border-color-grey
      rounded
      flex flex-col
      items-center
      justify-center
      bg-main-gray
      cursor-pointer
    "
    @click="showDialogAddContract"
  >
    <el-icon :size="60" color="#83ccf0">
      <Plus />
    </el-icon>
    <div class="text-main mt-2">Add new contract</div>
  </div>
  <ModalNewContract />
</template>
<script>
import { Plus } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import ModalNewContract from './ModalNewContract.vue'

export default {
  name: 'AddNewContract',
  components: {
    Plus,
    ModalNewContract,
  },
  setup() {
    const store = useStore()

    const showDialogAddContract = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'newContract',
        value: true,
      })
    }
    return {
      showDialogAddContract,
    }
  },
}
</script>
