<template>
  <el-table :data="tableData" :row-class-name="'warning-row'">
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="holdings" label="% of Holdings" />
    <el-table-column prop="amount" label="amount" />
    <el-table-column prop="management" label="Management expence" />
    <el-table-column prop="turnover" label="Turnover%" />
    <el-table-column prop="trading" label="Trading costs" />
    <el-table-column prop="wrapFee" label="Wrap Fee" />
    <el-table-column prop="totaCostProcent" label="Total cost in %" />
    <el-table-column prop="totaCostMoney" label="Total cost in $" />
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: '',
          holdings: '',
          amount: '',
          management: '',
          turnover: '',
          trading: '',
          wrapFee: '',
          totaCostProcent: '',
          totaCostMoney: '',
        },
        {
          name: '',
          holdings: '',
          amount: '',
          management: '',
          turnover: '',
          trading: '',
          wrapFee: '',
          totaCostProcent: '',
          totaCostMoney: '',
        },
        {
          name: '',
          holdings: '',
          amount: '',
          management: '',
          turnover: '',
          trading: '',
          wrapFee: '',
          totaCostProcent: '',
          totaCostMoney: '',
        },
        {
          name: '',
          holdings: '',
          amount: '',
          management: '',
          turnover: '',
          trading: '',
          wrapFee: '',
          totaCostProcent: '',
          totaCostMoney: '',
        },
      ],
    }
  },
  methods: {
    tableRowClassName({ rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
  },
}
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-table {
  font-size: 10px;
}
</style>
