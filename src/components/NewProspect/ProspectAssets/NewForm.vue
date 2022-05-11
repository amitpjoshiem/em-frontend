<template>
  <div class="p-5">
    <el-form ref="form" :model="ruleForm">
      <div v-for="(block, index) in mySchema" :key="index" class="border border-input-border p-5 rounded-md mb-10">
        <div>{{ block.title }}</div>
        <div v-for="row in block.rows" :key="row + index" class="flex">
          <div v-if="row.label" class="w-4/12 flex items-center text-main font-semibold text-xss">
            {{ row.label }}
          </div>

          <div v-for="item in row.elements" :key="item + index" class="w-full px-2 mb-0">
            <div class="flex pb-2 mt-8">
              <div class="w-2/12"></div>
              <div v-for="desc in block.description" :key="desc + index" class="w-5/12 text-gray03 text-xs">
                {{ desc }}
              </div>
            </div>
            <el-form-item>
              <el-input
                v-if="item.type === 'string'"
                v-model="ruleForm[item.model.group][item.model.item][item.model.model]"
                placeholder="Enter address"
              />
            </el-form-item>
            <el-form-item>
              <el-radio-group v-if="item.type === 'radio'" v-model="ruleForm[item.model.group][item.model.model]">
                <el-radio :label="true">Yes</el-radio>
                <el-radio :label="false">No</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
// import { ArrowDown } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import IconDelete from '@/assets/svg/icon-delete.svg'

export default {
  name: 'NewForm',
  components: {
    // ArrowDown,
  },
  setup() {
    const form = ref()

    const mySchema = reactive([
      {
        title: 'Current Income',
        name: 'current_income',
        description: ['owner', 'spouse'],
        rows: [
          {
            label: 'Income Plan',
            name: 'income_plan',
            elements: [
              {
                type: 'radio',
                name: 'income_plan',
                label: 'Income Plan',
                model: {
                  group: 'income',
                  model: 'income_plan',
                  item: 'income_plan',
                },
              },
            ],
          },
          {
            label: 'Salary',
            name: 'salary',
            elements: [
              {
                type: 'string',
                name: 'owner',
                label: 'Owner',
                model: {
                  group: 'income',
                  model: 'salary',
                  item: 'owner',
                },
              },
              {
                type: 'string',
                name: 'spouse',
                label: 'Spouse',
                model: {
                  group: 'income',
                  model: 'salary',
                  item: 'spouse',
                },
              },
            ],
          },
          {
            label: 'Social Security',
            name: 'social_security',
            elements: [
              {
                type: 'string',
                name: 'owner',
                label: 'Owner',
                model: {
                  group: 'income',
                  model: 'social_security',
                  item: 'owner',
                },
              },
              {
                type: 'string',
                name: 'spouse',
                label: 'Spouse',
                model: {
                  group: 'income',
                  model: 'social_security',
                  item: 'spouse',
                },
              },
            ],
          },
        ],
      },
      {
        title: 'Liquid Assets',
        name: 'liquid_assets',
        description: ['owner', 'institution', 'balance'],
        rows: [
          {
            label: 'Inheritance',
            name: 'inheritance',
            elements: [
              {
                type: 'string',
                name: 'owner',
                label: 'Owner',
                model: {
                  group: 'liquid_assets',
                  model: 'inheritance',
                  item: 'owner',
                },
              },
              {
                type: 'string',
                name: 'institution',
                label: 'Institution',
                model: {
                  group: 'liquid_assets',
                  model: 'inheritance',
                  item: 'institution',
                },
              },
              {
                type: 'string',
                name: 'balance',
                label: 'Balance',
                model: {
                  group: 'liquid_assets',
                  model: 'inheritance',
                  item: 'balance',
                },
              },
            ],
          },
          {
            label: 'Other Liquid Assets',
            name: 'other_liquid_assets',
            elements: [
              {
                type: 'string',
                name: 'owner',
                label: 'Owner',
                model: {
                  group: 'liquid_assets',
                  model: 'other_liquid_assets',
                  item: 'owner',
                },
              },
              {
                type: 'string',
                name: 'institution',
                label: 'Institution',
                model: {
                  group: 'liquid_assets',
                  model: 'other_liquid_assets',
                  item: 'institution',
                },
              },
              {
                type: 'string',
                name: 'balance',
                label: 'Balance',
                model: {
                  group: 'liquid_assets',
                  model: 'other_liquid_assets',
                  item: 'balance',
                },
              },
            ],
          },
          {
            label: 'Lump Sum Pension',
            name: 'lump_sum_pension',
            elements: [
              {
                type: 'string',
                name: 'owner',
                label: 'Owner',
                model: {
                  group: 'liquid_assets',
                  model: 'lump_sum_pension',
                  item: 'owner',
                },
              },
              {
                type: 'string',
                name: 'institution',
                label: 'Institution',
                model: {
                  group: 'liquid_assets',
                  model: 'lump_sum_pension',
                  item: 'institution',
                },
              },
              {
                type: 'string',
                name: 'balance',
                label: 'Balance',
                model: {
                  group: 'liquid_assets',
                  model: 'lump_sum_pension',
                  item: 'balance',
                },
              },
            ],
          },
        ],
      },
    ])

    const ruleForm = reactive({
      income: {
        owner: {},
        spouse: {},
      },
      liquid_assets: {
        owner: {},
        spouse: {},
        institution: {},
        balance: {},
      },
    })

    const handleCommand = (command) => {
      if (command.type === 'custom') {
        open(command)
        return
      }

      addedItemsSchema(command)
    }

    const addedItemsSchema = (command) => {
      const index = mySchema.findIndex((item) => {
        return item.group === command.group
      })

      mySchema[index].description[command.variable] = {
        label: command.label,
        children: [...command.children],
      }

      mySchema[index].description[command.variable].children.push({
        type: 'button',
        name: 'Remove',
        model: { group: command.group, model: command.variable },
      })
    }

    const open = (command) => {
      console.log('command - ', command)
      ElMessageBox.prompt('Please input your e-mail', 'Tip', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
      })
        .then(({ value }) => {
          const data = {
            group: command.group,
            label: value,
            children: [...command.children],
          }
          data.children.forEach((element) => {
            element.model.model = value
          })

          addedItemsSchema(data)

          ElMessage({
            type: 'success',
            message: `Your email is:${value}`,
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Input canceled',
          })
        })
    }

    const remove = ({ model, index }) => {
      delete mySchema[index].description[model.model]
    }

    return {
      mySchema,
      ruleForm,
      form,
      handleCommand,
      remove,
      IconDelete,
    }
  },
}
</script>
