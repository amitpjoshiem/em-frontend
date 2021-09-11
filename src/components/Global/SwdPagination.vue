<template>
  <el-pagination
    :current-page="options.currentPage"
    :page-size="options.perPage"
    :pager-count="5"
    layout="prev, pager, next"
    :total="options.total"
    @current-change="handleCurrentChange"
  >
  </el-pagination>
</template>
<script>
export default {
  name: 'SwdPagination',
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
