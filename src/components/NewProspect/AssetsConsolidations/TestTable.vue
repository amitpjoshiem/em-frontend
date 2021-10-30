<template>
  <el-table
    :data="ruleForm.tableData"
    border
    style="width: 100%"
    row-class-name="row-class-assets"
    header-cell-class-name="header-class-assets"
    header-row-class-name="header-row-class-assets"
    label-class-name="label-class-name-assets"
  >
    <el-table-column prop="name" label="Name" width="240">
      <template #default="scope">
        <el-input v-model="scope.row.name" size="mini" />
      </template>
    </el-table-column>

    <el-table-column prop="holdings" label="Holdings % of" min-width="80" />
    <el-table-column prop="amount" label="amount" min-width="90">
      <el-input v-model="ruleForm.current_member" type="number" size="mini" @change="change()" />
    </el-table-column>
    <el-table-column prop="management_expense" label="Management expence" min-width="95" />
    <el-table-column prop="turnover" label="Turnover%" min-width="85" />
    <el-table-column prop="trading_cost" label="Trading costs" min-width="70" />
    <el-table-column prop="wrap_fee" label="Wrap Fee" width="55" />
    <el-table-column prop="total_cost_procent" label="Total cost in %" min-width="85" />
    <el-table-column prop="total_cost" label="Total cost in $" min-width="88" />
    <el-table-column width="35">
      <el-button type="text" size="small">...</el-button>
    </el-table-column>
  </el-table>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'TableAssetsConsolidation',
  setup() {
    const ruleForm = reactive({
      tableData: [
        {
          name: 'Tom',
          holdings: '',
          amount: '$99',
          management_expense: '$99,999,999',
          turnover: '',
          trading_cost: '100%',
          wrap_fee: '100%',
          total_cost_procent: '',
          total_cost: '$99,999,999',
        },
      ],
    })
    return {
      ruleForm,
    }
  },
  // data() {
  //   return {
  //     tableData: [
  //       {
  //         name: 'Tom',
  //         holdings: '',
  //         amount: '$99',
  //         management_expense: '$99,999,999',
  //         turnover: '',
  //         trading_cost: '100%',
  //         wrap_fee: '100%',
  //         total_cost_procent: '',
  //         total_cost: '$99,999,999',
  //       },
  //     ],
  //   }
  // },
}
</script>

<style>
.header-class-assets {
  font-size: 10px;
  color: #aab5cf;
  text-transform: uppercase;
  text-align: center !important;
}
.el-table__row {
  font-size: 11px;
  color: #383838;
}

.row-class-assets td:not(:first-child) {
  text-align: center !important;
}

.el-table td.el-table__cell div {
  padding-left: 2px;
  padding-right: 2px;
}

.el-table__row .el-input .el-input__inner {
  border-style: none;
}
.hover-row .el-input .el-input__inner {
  border-style: solid;
}
</style>
