<template>
  <el-pagination
    :current-page="options.current_page"
    :page-size="options.count"
    :pager-count="5"
    layout="prev, pager, next"
    :total="options.total"
    @current-change="handleCurrentChange"
  >
  </el-pagination>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    options: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  emits: ['selectPage'],
  setup(_, { emit }) {
    const handleCurrentChange = (val) => {
      emit('selectPage', val)
    }

    return {
      handleCurrentChange,
    }
  },
}
</script>
