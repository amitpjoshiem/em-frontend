<template>
  <div class="flex justify-between">
    <div class="text-main w-7/12">
      <div class="flex">
        <div>Contract:</div>
        <div class="ml-2">
          {{ getContracts }}
        </div>
      </div>
    </div>
    <div class="flex w-5/12 justify-end">
      <el-button v-if="status === 'process'" type="primary" size="small" plain disabled>
        <div class="flex items-center">
          <SwdSpinner />
          <span class="pl-2">processing</span>
        </div>
      </el-button>

      <el-button v-if="status === 'success'" type="success" plain>Share</el-button>

      <a
        v-if="status === 'success'"
        :href="link"
        download
        class="el-button el-button--primary el-button--mini is-plain"
      >
        Download
      </a>

      <el-button v-if="status === 'error'" type="danger" size="small" plain disabled>error</el-button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'ItemDocuments',
  props: {
    contracts: {
      type: Object,
      require: true,
      default: () => {},
    },
    status: {
      type: String,
      require: true,
      default: '',
    },
    link: {
      type: String,
      require: true,
      default: '',
    },
  },
  setup(props) {
    const getContracts = computed(() => {
      return props.contracts.map((item) => item.contract_number)
    })

    return {
      getContracts,
    }
  },
}
</script>
