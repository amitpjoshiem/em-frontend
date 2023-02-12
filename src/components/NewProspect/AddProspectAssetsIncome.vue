<template>
  <div v-if="!isMemberAssetsLoading && !isMemberAssetsSchemaLoading && !isLoadingMember">
    <el-form ref="form" :model="ruleForm" :rules="customRules">
      <div v-for="(block, indexGroup) in schema" :key="indexGroup" class="p-5 mb-10">
        <span class="text-main text-xl font-semibold">{{ block.title }}</span>

        <div class="flex pb-2 mt-8">
          <div :class="member.married ? 'w-[30%]' : 'w-[25%]'" />
          <template v-for="(header, indexHeader) in block.headers" :key="header + indexGroup">
            <div v-if="indexHeader === 'owner' && member.married" />
            <div class="w-[15%] px-2 text-main text-xs font-semibold">
              {{ header.label }}
            </div>
          </template>
        </div>
        <div v-for="(row, indexRow) in block.rows" :key="row" class="flex mb-3">
          <div class="w-[25%] flex items-center">
            <div v-if="row.label" class="text-main font-semibold text-xss">
              {{ row.label }}
            </div>
          </div>

          <template v-for="(item, itemIndex) in row.elements" :key="item">
            <div v-if="itemIndex === 0 && member.married" class="w-[5%] text-center">
              <template v-if="row.name !== 'total' && item.type === 'number' && row.can_join">
                <el-checkbox
                  v-model="row.joined"
                  label="Joint"
                  size="small"
                  :disabled="isLoadingUpdate"
                  class="top-[6px] left-[-3px]"
                  @change="handleChange({ item, status: row.joined })"
                />
              </template>
            </div>
            <div
              v-if="!(row.joined && item.name === 'spouse')"
              class="px-2 mb-0 item-assets"
              :class="row.joined && item.name === 'owner' ? 'w-[30%]' : 'w-[15%]'"
            >
              <el-form-item class="mb-4" :prop="item.model.group + '.' + item.model.model + '.' + item.model.item">
                <template v-if="item.calculated">
                  <div v-if="isFetching" class="h-[32px] flex justify-center items-center">
                    <SwdSpinner />
                  </div>
                  <div v-else-if="item.name !== 'institution'" class="w-full font-semibold pl-2">
                    {{ currencyFormat(ruleForm[item.model.group][item.model.model][item.model.item]) }}
                  </div>
                </template>

                <template v-else>
                  <SwdCurrencyInput
                    v-if="item.type === 'number'"
                    v-model="ruleForm[item.model.group][item.model.model][item.model.item]"
                    :options="optionsCurrencyInput"
                    :disabled="item.disabled || isLoadingUpdate || isLoadingDeleteRow"
                    :placeholder="item.placeholder"
                    prepend
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
                            addLine({
                              model: item.model,
                              variable: option.name,
                              name: option.label,
                              indexGroup,
                              canJoin: row.can_join,
                            })
                          "
                        >
                          {{ option.label }}
                        </el-dropdown-item>
                        <el-dropdown-item @click="showDialog({ item, indexGroup, indexRow })">
                          Custom
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </template>
              </el-form-item>
            </div>
            <div v-if="row.custom && row.elements.length - 1 === itemIndex" class="w-[10%] flex justify-between px-4">
              <el-icon
                class="top-[5px] cursor-pointer"
                :size="20"
                color="red"
                @click="remove({ block, row, indexRow, indexGroup })"
              >
                <Delete />
              </el-icon>

              <el-icon
                class="top-[5px] cursor-pointer"
                :size="20"
                color="green"
                @click="
                  copyLine({
                    model: item.model,
                    variable: item.model.model,
                    name: row.label,
                    indexGroup,
                    canJoin: row.can_join,
                    row,
                    item,
                  })
                "
              >
                <Plus />
              </el-icon>
            </div>
          </template>
        </div>
      </div>

      <div class="flex justify-end my-10">
        <div class="pr-3">
          <Button default-gray-btn text-btn="Back" @click="backStep" />
        </div>
        <SwdButton primary main @click="nextPage">Go to the monthly expense</SwdButton>
      </div>
    </el-form>
  </div>
  <el-skeleton v-else :rows="15" animated />
  <el-dialog v-model="dialogVisible" title="Other" width="40%" lock-scroll :before-close="closeDialog">
    <el-form-item class="mb-2">
      <span>Field name</span>
      <el-input v-model="fieldName" placeholder="Please input field name" />
    </el-form-item>
    <el-form-item v-if="member.married">
      <el-checkbox v-model="isCanJoin" label="Can be Joint?" size="small" />
    </el-form-item>

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
import { watchEffect, ref, computed, reactive, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useMutation, useQueryClient } from 'vue-query'
import { createAssetsIncome } from '@/api/vueQuery/create-assets-income'
import { checkCreateAssetsIncomeField } from '@/api/vueQuery/check-create-assets-income-field'
import { useFetchMemberAssets } from '@/api/use-fetch-member-assets'
import { useFetchMember } from '@/api/use-fetch-member.js'
import { useFetchMemberAssetsSchema } from '@/api/use-fetch-member-assets-schema'
import { updateMembersAssets } from '@/api/vueQuery/update-members-assets'
import { deleteAssetsIncomeRow } from '@/api/vueQuery/fetch-remove-assets-income-row'
import { updateStepAssetsIncome } from '@/api/vueQuery/update-step-assets-income'
import { scrollTop } from '@/utils/scrollTop'
import { useAlert } from '@/utils/use-alert'
import { useAssetsInfoHooks } from '@/hooks/use-assets-info-hooks'
import { useHookCustomValidate } from '@/hooks/use-hook-custom-validate'
import { ArrowDown, Delete, Plus } from '@element-plus/icons-vue'
import { currencyFormat } from '@/utils/currencyFormat'
import { ElMessageBox } from 'element-plus'

export default {
  name: 'AddProspectAssetsIncome',
  components: {
    ArrowDown,
    Delete,
    Plus,
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
    const isCanJoin = ref()
    const customRules = ref({})

    const step = computed(() => store.state.newProspect.step)

    const ruleForm = reactive({})
    const schema = reactive({})

    const memberId = route.params.id

    // FETCH
    const { isLoading: isLoadingMember, data: member } = useFetchMember({ id: memberId })
    const { data: memberAssets, isLoading: isMemberAssetsLoading, isFetching } = useFetchMemberAssets(memberId)
    const { data: memberAssetsSchema, isLoading: isMemberAssetsSchemaLoading } = useFetchMemberAssetsSchema(memberId)

    // MUTATION
    const { mutateAsync: create, data } = useMutation(createAssetsIncome)
    const { isLoading: isLoadingUpdate, mutateAsync: updateMemberAssets } = useMutation(updateMembersAssets)
    const { isLoading: isLoadingCheck, mutateAsync: checkCreateField } = useMutation(checkCreateAssetsIncomeField)
    const { mutateAsync: deleteRow, isLoading: isLoadingDeleteRow } = useMutation(deleteAssetsIncomeRow)
    const { mutateAsync: updateStep } = useMutation(updateStepAssetsIncome)

    const { setInitValue } = useAssetsInfoHooks()
    const { setCustomValidate } = useHookCustomValidate()

    onMounted(async () => {
      store.commit('newProspect/setStep', 2)
      scrollTop()
    })

    watchEffect(async () => {
      if (!isMemberAssetsLoading.value) {
        await setInitValue({ ruleForm, memberAssets: memberAssets.value, id: memberId })
        await setCustomValidate({ ruleForm, customRules })
      }
    })

    watch(isMemberAssetsSchemaLoading, (newValue, oldValue) => {
      if (oldValue && !newValue) {
        updateSchema()
      }
    })

    const backStep = () => {
      store.commit('newProspect/setStep', step.value - 1)
      router.push({ name: 'basic-information', params: { id: memberId } })
    }

    const nextPage = async () => {
      const res = await updateStep(memberId)
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Opportunity update successfully.',
        })
        store.commit('newProspect/setStep', step.value + 1)
        router.push({
          name: 'monthly-expense',
          params: { id: memberId },
        })
      }
    }

    const copyLine = ({ model, name, canJoin, indexGroup, row, item }) => {
      console.log('name  - ', name)
      console.log('row  - ', row)
      console.log('item  - ', item)
      let newItemIndex = 0
      let newRow = name.toLowerCase().replace(/ /gi, '_').split('_')
      console.log('newRow - ,', newRow)
      // eslint-disable-next-line no-constant-condition
      labelAddItem: while (true) {
        const elem = schema[indexGroup].rows.find((item) => {
          return item.name === newRow
        })

        if (!elem) {
          break labelAddItem
        }
        newItemIndex += 1
        newRow = name.split('_')[0] + '_' + '(copy' + newItemIndex + ')'
      }
      // variable = newVariable

      const data = {
        group: model.group,
        row: newRow,
        element: 'owner',
        type: 'string',
        can_join: canJoin,
      }

      console.log('data - ', data)
    }

    const addLine = async ({ model, name, canJoin }) => {
      // console.log('name - ', name)
      // if (copyLine) {
      //   let newItemIndex = 0
      //   let newVariable = name.split('_')[0]
      //   // eslint-disable-next-line no-constant-condition
      //   labelAddItem: while (true) {
      //     const elem = schema[indexGroup].rows.find((item) => {
      //       return item.name === newVariable
      //     })

      //     if (!elem) {
      //       break labelAddItem
      //     }
      //     newItemIndex += 1
      //     newVariable = name.split('_')[0] + '_' + '(copy' + newItemIndex + ')'
      //   }
      //   variable = newVariable
      // }
      // Object.keys(schema[indexGroup].headers).forEach((element) => {
      //   ruleForm[model.group][variable] = { [element]: null }
      // })

      // console.log('====', name.toLowerCase().replace(/ /gi, '_'))

      const nameLine = name.toLowerCase().replace(/ /gi, '_')

      //  Object.keys(schema[indexGroup].headers).forEach((element) => {
      //   ruleForm[model.group][variable] = { [element]: null }
      // })

      const data = {
        group: model.group,
        row: nameLine,
        element: 'owner',
        type: 'string',
        can_join: canJoin,
      }

      console.log('data - ', data)

      // const data = {
      //   group: model.group,
      //   row: 'simple_ira_1',
      //   element: 'owner',
      //   type: 'string',
      //   can_join: canJoin,
      // }

      await updateMemberAssets({ data, id: memberId })
      await queryClient.invalidateQueries(['memberAssets', memberId])
      await queryClient.invalidateQueries(['memberAssetsSchema', memberId])
      updateSchema()
      // setCustomValidate(ruleForm, customRules)
    }

    const changeInput = async (item) => {
      form.value.validate(async (valid) => {
        if (valid) {
          const data = {
            group: item.model.group,
            row: item.model.model,
            element: item.model.item,
            type: item.type,
            value: ruleForm[item.model.group][item.model.model][item.model.item],
          }
          await updateMemberAssets({ data, id: memberId })
          queryClient.invalidateQueries(['memberAssets', memberId])
        } else {
          return false
        }
      })
    }

    const optionsCurrencyInput = {
      currency: 'USD',
      locale: 'en-US',
      currencyDisplay: 'hidden',
      precision: 2,
    }

    const isDisabled = ({ option, indexGroup }) => {
      // console.log('option - ', option)
      // console.log('indexGroup - ', indexGroup)
      const elem = schema[indexGroup].rows.find((item) => {
        return item.name === option.name
      })
      return !!elem
    }

    const remove = ({ block, row, indexRow, indexGroup }) => {
      ElMessageBox.confirm('Are you sure to delete this?', 'Info', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(() => {
        confirmDelete({ block, row, indexRow, indexGroup })
      })
    }

    const confirmDelete = async ({ block, row, indexRow, indexGroup }) => {
      const data = {
        row: row.name,
        group: block.name,
      }

      const res = await deleteRow({ id: memberId, data })
      if (!('error' in res)) {
        schema[indexGroup].rows.splice(indexRow, 1)
        await queryClient.invalidateQueries(['memberAssets', memberId])
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Remove success.',
        })
      }
    }

    const confirmCreateField = async () => {
      const { item, indexGroup, indexRow } = newField.value
      const data = {
        row: fieldName.value.trim(),
        group: item.model.group,
        can_join: isCanJoin.value,
      }

      const res = await checkCreateField({ id: memberId, data })

      if (res.succes) {
        const model = item.model
        const variable = fieldName.value.trim().toLowerCase().replace(/ /g, '_')
        const label = fieldName.value
        addLine({ model, variable, label, indexGroup, indexRow: indexRow + 1, canJoin: isCanJoin.value })
        dialogVisible.value = false
        fieldName.value = ''
        isCanJoin.value = ''
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

    const joinMember = async (item) => {
      const data = {
        group: item.model.group,
        row: item.model.model,
        element: item.model.item,
        type: 'number',
        joined: true,
      }

      const res = await updateMemberAssets({ data, id: memberId })
      if (!('error' in res)) {
        await queryClient.invalidateQueries(['memberAssets', memberId])
        await queryClient.invalidateQueries(['memberAssetsSchema', memberId])
        updateSchema()
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Joint success.',
        })
      }
    }

    const disjoinMember = async (item) => {
      const data = {
        group: item.model.group,
        row: item.model.model,
        element: item.model.item,
        type: 'number',
        joined: false,
      }

      const res = await updateMemberAssets({ data, id: memberId })
      if (!('error' in res)) {
        await queryClient.invalidateQueries(['memberAssets', memberId])
        await queryClient.invalidateQueries(['memberAssetsSchema', memberId])
        updateSchema()
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Unjoint success.',
        })
      }
    }

    const updateSchema = () => {
      Object.assign(schema, JSON.parse(JSON.stringify(memberAssetsSchema.value)))
    }

    const handleChange = ({ item, status }) => {
      if (status) {
        joinMember(item)
      } else {
        disjoinMember(item)
      }
    }

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
      confirmDelete,
      isLoadingDeleteRow,
      closeDialog,
      confirmCreateField,
      isLoadingCheck,
      dialogVisible,
      fieldName,
      currencyFormat,
      isFetching,
      isLoadingMember,
      member,
      joinMember,
      disjoinMember,
      handleChange,
      isCanJoin,
      remove,
      customRules,

      copyLine,
    }
  },
}
</script>

<style>
.item-assets .el-dropdown {
  width: 100% !important;
}
.item-assets .el-button.el-tooltip__trigger {
  width: 100%;
}

.item-assets .el-form-item {
  width: 100%;
}
</style>
