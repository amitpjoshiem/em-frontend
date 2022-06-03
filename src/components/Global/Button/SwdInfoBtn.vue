<template>
  <el-icon>
    <div
      class="
        cursor-pointer
        bg-white
        rounded
        flex
        justify-center
        items-center
        border border-color-grey
        pr-[7px]
        pl-[6px]
        py-[6px]
      "
      @click="showInfo"
    >
      <InfoFilled color="#66B6FF" />
    </div>
  </el-icon>

  <el-dialog v-model="dialogVisible" title="Info" width="70%">
    <el-scrollbar height="400px" class="pr-4">
      <InfoMemberDetails v-if="destination === 'MemberDetails'" />
      <InfoAssetAllocationDetails v-if="destination === 'AssetAllocationDetails'" />
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Close</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { InfoFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'
import InfoMemberDetails from '@/components/Info/InfoMemberDetails.vue'
import InfoAssetAllocationDetails from '@/components/Info/InfoAssetAllocationDetails.vue'

export default {
  name: 'SwdInfoBtn',
  components: {
    InfoFilled,
    InfoMemberDetails,
    InfoAssetAllocationDetails,
  },
  props: {
    destination: {
      type: String,
      require: false,
      default: '',
    },
  },

  setup(props) {
    const dialogVisible = ref(false)

    const showInfo = () => {
      dialogVisible.value = true
      console.log('showInfo', props.destination)
    }
    return {
      showInfo,
      dialogVisible,
    }
  },
}
</script>
