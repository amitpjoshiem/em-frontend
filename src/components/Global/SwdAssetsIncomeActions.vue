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
// import { ElMessage, ElMessageBox } from 'element-plus'

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
  },
  emits: ['confirm-delete'],
  setup(props, { emit }) {
    const handleSelect = (command) => {
      const actionHandler = actionsMap[command]
      actionHandler()
    }

    const actionsOptions = [
      {
        title: 'Remove',
        command: 'remove',
      },
      {
        title: 'Copy',
        command: 'copy',
      },
    ]

    const actionsMap = {
      remove: () => remove(),
      copy: () => copy(),
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

    const copy = () => {
      console.log('copy', props)
      const elem = props.block.rows.find((item) => {
        return item.name === props.row.name
      })
      console.log('elem - ', elem)
    }

    return {
      actionsOptions,
      handleSelect,
    }
  },
}
</script>
