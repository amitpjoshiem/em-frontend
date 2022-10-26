<template>
  <div v-if="!isMemberAssetsLoading && !isMemberAssetsSchemaLoading">
    <el-form ref="form" :model="ruleForm">
      <div v-for="(block, indexGroup) in schema" :key="indexGroup" class="p-5 mb-10">
        <span class="text-main text-xl font-semibold">{{ block.title }}</span>

        <div class="flex pb-2 mt-8">
          <div class="w-4/12" />
          <div v-for="header in getHeaders" :key="header + indexGroup" class="w-2/12 px-2 text-main text-xs">
            {{ header }}
          </div>
          <!-- <div v-for="header in block.headers" :key="header + indexGroup" class="w-2/12 px-2 text-main text-xs">
            {{ header.toUpperCase() }}
          </div> -->
        </div>
        <div v-for="(row, indexRow) in block.rows" :key="row" class="flex">
          <div class="w-4/12 flex items-center">
            <div v-if="row.label" class="text-main font-semibold text-xss">
              {{ row.label }}
            </div>
            <div v-if="row.custom" class="flex items-center ml-2 cursor-pointer">
              <el-popconfirm title="Are you sure to delete this?" @confirm="confirmEvent({ block, row })">
                <template #reference>
                  <el-icon color="red" class="cursor-pointer"><Delete /></el-icon>
                </template>
              </el-popconfirm>
            </div>
          </div>

          <div v-for="item in row.elements" :key="item" class="w-2/12 px-2 mb-0">
            <el-form-item class="mb-4">
              <SwdCurrencyInput
                v-if="item.type === 'number'"
                v-model="ruleForm[item.model.group][item.model.model][item.model.item]"
                :options="optionsCurrencyInput"
                :disabled="item.disabled || isLoadingUpdate || isLoadingDeleteRow"
                :placeholder="item.placeholder"
                @blur="changeInput(item)"
              />
              <el-input
                v-if="item.type === 'string'"
                v-model="ruleForm[item.model.group][item.model.model][item.model.item]"
                :placeholder="item.placeholder"
                :disabled="item.disabled || isLoadingUpdate || isLoadingDeleteRow"
                @blur="changeInput(item)"
              />
              <el-radio-group
                v-if="item.type === 'radio'"
                v-model="ruleForm[item.model.group][item.model.model][item.model.item]"
                @change="changeInput(item)"
              >
                <el-radio :label="true">Yes</el-radio>
                <el-radio :label="false">No</el-radio>
              </el-radio-group>
              <el-dropdown v-if="item.type === 'dropdown'" trigger="click">
                <el-button>
                  Add field
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-for="option in item.options"
                      :key="option"
                      :disabled="isDisabled({ option, indexGroup })"
                      @click="
                        addLine({ model: item.model, variable: option.name, indexGroup, indexRow, label: option.label })
                      "
                    >
                      {{ option.label }}
                    </el-dropdown-item>
                    <el-dropdown-item @click="showDialog({ item, indexGroup, indexRow })"> Custom </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-form-item>
          </div>
        </div>
      </div>

      <div class="flex justify-end my-10">
        <div class="pr-3">
          <Button default-gray-btn text-btn="Back" @click="backStep" />
        </div>
        <SwdButton primary main @click="nextPage()"> Go to the monthly expense </SwdButton>
      </div>
    </el-form>
  </div>
  <el-skeleton v-else :rows="15" animated />
  <el-dialog v-model="dialogVisible" title="Other" width="40%" lock-scroll :before-close="closeDialog">
    <span>Field name</span>
    <el-input v-model="fieldName" placeholder="Please input field name" :autofocus="true" />
    <template #footer>
      <span class="dialog-footer">
        <div class="flex justify-end">
          <SwdButton info main @click="closeDialog">Cancel</SwdButton>
          <SwdButton class="ml-2" primary main :disabled="isLoadingCheck" @click="confirmCreateField">
            <SwdSpinner v-show="isLoadingCheck" class="mr-2" />
            Create
          </SwdButton>
        </div>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { watchEffect, ref, computed, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useMutation, useQueryClient } from 'vue-query'
import { createAssetsIncome } from '@/api/vueQuery/create-assets-income'
import { checkCreateAssetsIncomeField } from '@/api/vueQuery/check-create-assets-income-field'
import { useFetchMemberAssets } from '@/api/use-fetch-member-assets'
import { useFetchMemberAssetsSchema } from '@/api/use-fetch-member-assets-schema'
import { updateMembersAssets } from '@/api/vueQuery/update-members-assets'
import { deleteAssetsIncomeRow } from '@/api/vueQuery/fetch-remove-assets-income-row'
import { fetchAssetsIncomeConfirm } from '@/api/vueQuery/fetch-assets-income-confirm'
import { scrollTop } from '@/utils/scrollTop'
import { useAlert } from '@/utils/use-alert'
import { useAssetsInfoHooks } from '@/hooks/use-assets-info-hooks'
import { ArrowDown } from '@element-plus/icons-vue'
import { Delete } from '@element-plus/icons-vue'

export default {
  name: 'AddProspectAssetsIncome',
  components: {
    ArrowDown,
    Delete,
  },
  setup() {
    const queryClient = useQueryClient()
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const form = ref()
    const dialogVisible = ref(false)
    const newField = ref([])
    const fieldName = ref()
    const step = computed(() => store.state.newProspect.step)

    const memberId = route.params.id

    const { data: memberAssets, isLoading: isMemberAssetsLoading } = useFetchMemberAssets(memberId)
    const { data: memberAssetsSchema, isLoading: isMemberAssetsSchemaLoading } = useFetchMemberAssetsSchema(memberId)

    const { mutateAsync: create, data } = useMutation(createAssetsIncome)

    const { isLoading: isLoadingUpdate, mutateAsync: updateMemberAssets } = useMutation(updateMembersAssets)
    const { isLoading: isLoadingCheck, mutateAsync: checkCreateField } = useMutation(checkCreateAssetsIncomeField)

    const { mutateAsync: deleteRow, isLoading: isLoadingDeleteRow } = useMutation(deleteAssetsIncomeRow)
    const { mutateAsync: assetsIncomeConfirm } = useMutation(fetchAssetsIncomeConfirm)

    const { setInitValue } = useAssetsInfoHooks()

    const ruleForm = reactive({})
    const schema = reactive({})

    onMounted(async () => {
      store.commit('newProspect/setStep', 2)
      scrollTop()
    })

    watchEffect(() => {
      if (!isMemberAssetsLoading.value) {
        setInitValue({ ruleForm, memberAssets: memberAssets.value, id: memberId })
      }
      if (!isMemberAssetsSchemaLoading.value) {
        Object.assign(schema, JSON.parse(JSON.stringify(memberAssetsSchema.value.data)))
      }
    })

    const backStep = () => {
      store.commit('newProspect/setStep', step.value - 1)
      router.push({ name: 'basic-information', params: { id: memberId } })
    }

    const nextPage = async () => {
      const res = await assetsIncomeConfirm(memberId)
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Opportunity update successfully',
        })
        store.commit('newProspect/setStep', step.value + 1)
        router.push({
          name: 'monthly-expense',
          params: { id: memberId },
        })
      }
    }

    const addLine = ({ model, variable, indexGroup, indexRow, label }) => {
      ruleForm[model.group][variable] = {}
      schema[indexGroup].headers.forEach((element) => {
        ruleForm[model.group][variable][element] = null
      })

      const elements = schema[indexGroup].headers.map((item) => {
        return {
          type: 'string',
          name: item,
          label: item,
          disabled: false,
          model: {
            group: model.group,
            model: variable,
            item: item,
          },
        }
      })
      const dataSchema = {
        label: label,
        name: variable,
        custom: 'true',
        elements,
      }
      schema[indexGroup].rows.splice(indexRow + 1, 0, dataSchema)
    }

    const changeInput = async (item) => {
      if (ruleForm[item.model.group][item.model.model][item.model.item] !== null) {
        const data = {
          group: item.model.group,
          row: item.model.model,
          element: item.model.item,
          type: 'string',
          value: ruleForm[item.model.group][item.model.model][item.model.item],
        }
        await updateMemberAssets({ data, id: memberId })
        queryClient.invalidateQueries(['memberAssetsSchema', memberId])
        queryClient.invalidateQueries(['memberAssets', memberId])
      }
    }

    const optionsCurrencyInput = {
      currency: 'USD',
      locale: 'en-US',
      currencyDisplay: 'hidden',
      precision: 2,
    }

    const isDisabled = ({ option, indexGroup }) => {
      const elem = schema[indexGroup].rows.find((item) => {
        return item.name === option.name
      })
      return !!elem
    }

    const confirmEvent = async ({ block, row }) => {
      const data = {
        row: row.name,
        group: block.name,
      }
      const res = await deleteRow({ id: memberId, data })
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Remove success',
        })
        queryClient.invalidateQueries(['memberAssetsSchema', memberId])
      }
    }

    const confirmCreateField = async () => {
      const { item, indexGroup, indexRow } = newField.value
      const data = {
        row: fieldName.value,
        group: item.model.group,
      }

      const res = await checkCreateField({ memberId, data })

      if (res.succes) {
        const model = item.model
        const variable = fieldName.value.toLowerCase().replace(/ /g, '_')
        const label = fieldName.value
        addLine({ model, variable, label, indexGroup, indexRow })
        dialogVisible.value = false
        fieldName.value = ''
      }
    }

    const showDialog = ({ item, indexGroup, indexRow }) => {
      newField.value = { item, indexGroup, indexRow }
      dialogVisible.value = true
    }

    const closeDialog = () => {
      dialogVisible.value = false
      fieldName.value = ''
    }

    const cancelDialog = () => {
      dialogVisible.value = false
      fieldName.value = ''
    }

    const headers = {
      owner: 'Trevion Casper',
      spouse: 'Esther Wisozk',
      institution: 'Institution',
      balance: 'Balance',
    }

    const getHeaders = computed(() => {
      return Object.values(headers)
    })

    return {
      ruleForm,
      schema,
      backStep,
      create,
      data,
      nextPage,
      isMemberAssetsLoading,
      form,
      isLoadingUpdate,
      isMemberAssetsSchemaLoading,
      addLine,
      changeInput,
      showDialog,
      optionsCurrencyInput,
      isDisabled,
      confirmEvent,
      isLoadingDeleteRow,
      closeDialog,
      cancelDialog,
      confirmCreateField,
      isLoadingCheck,
      dialogVisible,
      fieldName,

      getHeaders,
    }
  },
}
</script>
