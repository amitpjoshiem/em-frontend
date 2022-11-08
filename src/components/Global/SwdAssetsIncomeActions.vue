<template>
  <SwdDropDown :options="actionsOptions" @select="handleSelect">
    <template #titleDropDown>
      <span
        class="
          border border-main-blue
          cursor-pointer
          bg-white
          rounded
          flex
          justify-center
          items-center
          w-[28px]
          h-[28px]
        "
      >
        <el-icon color="#83ccf0" class="rotate-90">
          <MoreFilled />
        </el-icon>
      </span>
    </template>
  </SwdDropDown>
</template>

<script>
import { MoreFilled } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { onMounted, reactive } from 'vue'

export default {
  name: 'SwdAssetsIncomeActions',
  components: {
    MoreFilled,
  },
  props: {
    block: {
      type: Object,
      require: true,
      default: () => {},
    },
    row: {
      type: Object,
      require: true,
      default: () => {},
    },
    model: {
      type: Object,
      require: true,
      default: () => {},
    },
    indexRow: {
      type: Number,
      require: true,
      default: 0,
    },
    indexGroup: {
      type: String,
      require: true,
      default: '',
    },
    custom: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  emits: ['confirm-delete', 'add-element'],
  setup(props, { emit }) {
    const actionsOptions = reactive([
      {
        title: 'Add New',
        command: 'addNew',
      },
    ])

    const handleSelect = (command) => {
      const actionHandler = actionsMap[command]
      actionHandler()
    }

    onMounted(() => {
      if (props.custom) {
        actionsOptions.push({
          title: 'Remove',
          command: 'remove',
        })
      }
    })

    const actionsMap = {
      remove: () => remove(),
      addNew: () => addNew(),
    }

    const remove = () => {
      ElMessageBox.confirm('Are you sure to delete this?', 'Info', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(() => {
        emit('confirm-delete', {
          block: props.block,
          row: props.row,
          indexRow: props.indexRow,
          indexGroup: props.indexGroup,
        })
      })
    }

    const addNew = () => {
      emit('add-element', {
        model: props.model,
        variable: props.model.model.split('_')[0],
        indexGroup: props.indexGroup,
        indexRow: props.indexRow,
        label: props.model.model.split('_')[0],
      })
    }

    return {
      actionsOptions,
      handleSelect,
    }
  },
}
</script>
