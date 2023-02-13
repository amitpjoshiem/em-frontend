<template>
  <div class="md:p-5 lg:max-w-5xl lg:my-0 lg:mx-auto">
    <div v-if="!isMemberAssetsLoading && !isLoadingInfo && !isMemberAssetsSchemaLoading && !isLoadingMember">
      <el-form ref="form" :model="ruleForm" :disabled="isReadOnlyLead" :rules="customRules">
        <div
          v-for="(block, indexGroup) in schema"
          :key="indexGroup"
          :ref="
            (el) => {
              if (el) blocks[indexGroup] = el
            }
          "
          class="border border-main-gray p-2 md:p-5 rounded-md mb-10"
        >
          <div v-if="block.name === 'current_income'" class="flex items-center mb-5">
            <InlineSvg v-show="isFocusCurrentIncome && !isDoneCurrentStep" :src="IconActive" />
            <InlineSvg v-show="!isFocusCurrentIncome && !isDoneCurrentStep" :src="IconNotActive" />
            <InlineSvg v-show="isDoneCurrentStep" :src="IconDoneStep" />
            <span class="text-primary text-xl font-semibold ml-2">{{ block.title }}</span>
          </div>
          <div v-if="block.name === 'liquid_assets'" class="flex items-center mb-5">
            <InlineSvg v-show="isFocusLiquidAssets && !isDoneCurrentStep" :src="IconActive" />
            <InlineSvg v-show="!isFocusLiquidAssets && !isDoneCurrentStep" :src="IconNotActive" />
            <InlineSvg v-show="isDoneCurrentStep" :src="IconDoneStep" />
            <span class="text-primary text-xl font-semibold ml-2">{{ block.title }}</span>
          </div>
          <div v-if="block.name === 'other_assets_investments'" class="flex items-center mb-5">
            <InlineSvg v-show="isFocusNonLiquidAssets && !isDoneCurrentStep" :src="IconActive" />
            <InlineSvg v-show="!isFocusNonLiquidAssets && !isDoneCurrentStep" :src="IconNotActive" />
            <InlineSvg v-show="isDoneCurrentStep" :src="IconDoneStep" />
            <span class="text-primary text-xl font-semibold ml-2">{{ block.title }}</span>
          </div>

          <el-form label-position="top">
            <div
              v-for="(row, indexRows) in block.rows"
              :key="indexRows"
              class="border rounded px-3 pt-2 md:pb-4 mb-2 md:mb-8"
            >
              <div class="text-primary font-semibold text-xss mb-2">{{ row.label }}</div>
              <div class="md:flex">
                <el-form-item label="Joint" class="mb-4 md:mb-0 md:pr-2">
                  <el-checkbox
                    v-model="row.joined"
                    class="top-[5px] text-main"
                    :label="getLabelJoint"
                    size="small"
                    :disabled="isLoadingUpdate || !row.can_join"
                    @change="handleChange({ item, status: row.joined })"
                  />
                </el-form-item>
                <template v-for="(itemRow, indexRow) in row.elements" :key="indexRow">
                  <el-form-item v-if="itemRow.type === 'number'" :label="itemRow.label" class="mb-4 md:mb-0 md:px-2">
                    <SwdCurrencyInput
                      v-model="ruleForm[itemRow.model.group][itemRow.model.model][itemRow.model.item]"
                      :options="optionsCurrencyInput"
                      :disabled="itemRow.disabled || isLoadingUpdate || isLoadingDeleteRow"
                      :placeholder="itemRow.placeholder"
                      prepend
                      @blur="changeInput(itemRow)"
                      @focus="focus(itemRow.model.group)"
                    />
                  </el-form-item>

                  <el-form-item v-if="itemRow.type === 'string'" :label="itemRow.label" class="mb-4 md:mb-0 md:px-2">
                    <el-input
                      v-model="ruleForm[itemRow.model.group][itemRow.model.model][itemRow.model.item]"
                      :placeholder="itemRow.placeholder"
                      :disabled="itemRow.disabled || isLoadingUpdate || isLoadingDeleteRow"
                      @blur="changeInput(itemRow)"
                      @focus="focus(itemRow.model.group)"
                    />
                  </el-form-item>

                  <el-form-item v-if="itemRow.type === 'dropdown'" class="mb-4 md:mb-0">
                    <el-dropdown trigger="click" :disabled="isReadOnlyLead">
                      <el-button>
                        Add field
                        <el-icon class="el-icon--right">
                          <arrow-down />
                        </el-icon>
                      </el-button>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item
                            v-for="option in itemRow.options"
                            :key="option"
                            :disabled="isDisabled({ option, indexGroup })"
                            @click="
                              addLine({
                                model: item.model,
                                variable: option.name,
                                indexGroup,
                                canJoin: row.can_join,
                              })
                            "
                          >
                            {{ option.label }}
                          </el-dropdown-item>
                          <el-dropdown-item @click="showDialog({ item: itemRow, indexGroup, indexRow })">
                            Custom
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </el-form-item>
                </template>
                <el-form-item v-if="row.custom" label="Action" class="">
                  <div class="flex justify-between">
                    <el-icon
                      class="top-[5px] cursor-pointer mr-2"
                      :size="20"
                      color="red"
                      @click="remove({ block, row, indexRow, indexGroup })"
                    >
                      <Delete />
                    </el-icon>
                    <el-icon
                      class="top-[5px] cursor-pointer ml-2"
                      :size="20"
                      color="green"
                      @click="
                        addLine({
                          model: item.model,
                          variable: item.model.model,
                          indexGroup,
                          canJoin: row.can_join,
                          copyLine: true,
                        })
                      "
                    >
                      <Plus />
                    </el-icon>
                  </div>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>

        <div class="flex justify-end my-10">
          <SwdButton info main class="mr-4" @click="backStep">Back</SwdButton>
          <router-link
            v-if="isReadOnlyLead"
            :to="{ name: `lead-expense-information`, params: { id: leadId } }"
            class="w-3/12"
          >
            <SwdButton primary main>Go to the monthly expense</SwdButton>
          </router-link>
          <SwdButton v-else primary main @click="nextPage">Save</SwdButton>
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
  </div>
</template>

<script>
import { watchEffect, ref, computed, reactive, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useMutation, useQueryClient } from 'vue-query'
import { useFetchMemberAssets } from '@/api/use-fetch-member-assets'
import { updateMembersAssets } from '@/api/vueQuery/update-members-assets'
import { useFetchMember } from '@/api/use-fetch-member.js'
import { checkCreateAssetsIncomeField } from '@/api/vueQuery/check-create-assets-income-field'
import { useFetchMemberAssetsSchema } from '@/api/use-fetch-member-assets-schema'
import { useFetchClietsInfo } from '@/api/clients/use-fetch-clients-info'
import { updateStepAssetsIncome } from '@/api/vueQuery/update-step-assets-income'
import { deleteAssetsIncomeRow } from '@/api/vueQuery/fetch-remove-assets-income-row'
import { scrollTop } from '@/utils/scrollTop'
import { useAlert } from '@/utils/use-alert'
import { currencyFormat } from '@/utils/currencyFormat'
import { useAssetsInfoHooks } from '@/hooks/use-assets-info-hooks'
import { ArrowDown, Delete, Plus } from '@element-plus/icons-vue'
import { useHookCustomValidate } from '@/hooks/use-hook-custom-validate'
import { ElMessageBox } from 'element-plus'
import { useBreakpoints } from '@/hooks/use-breakpoints'
import IconActive from '@/assets/svg/icon-active.svg'
import IconNotActive from '@/assets/svg/icon-not-active.svg'
import IconDoneStep from '@/assets/svg/icon-done-step.svg'

export default {
  name: 'AddLeadAssets',
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
    const isFocusCurrentIncome = ref(false)
    const isFocusLiquidAssets = ref(false)
    const isFocusNonLiquidAssets = ref(false)
    const blocks = ref([])
    const dialogVisible = ref(false)
    const newField = ref([])
    const fieldName = ref()
    const isCanJoin = ref()
    const customRules = ref({})

    const step = computed(() => store.state.newClient.step)

    const ruleForm = reactive({})
    const schema = reactive([])

    const leadId = route.params.id

    // FETCH
    const { data: memberAssets, isLoading: isMemberAssetsLoading, isFetching } = useFetchMemberAssets(leadId)
    const { data: memberAssetsSchema, isLoading: isMemberAssetsSchemaLoading } = useFetchMemberAssetsSchema(leadId)
    const { isLoading: isLoadingMember, data: member } = useFetchMember({ id: leadId })
    const { isLoading: isLoadingInfo, data: clientsInfo } = useFetchClietsInfo()

    // MUTATION
    const { isLoading: isLoadingUpdate, mutateAsync: updateMemberAssets } = useMutation(updateMembersAssets)
    const { isLoading: isLoadingCheck, mutateAsync: checkCreateField } = useMutation(checkCreateAssetsIncomeField)
    const { mutateAsync: deleteRow, isLoading: isLoadingDeleteRow } = useMutation(deleteAssetsIncomeRow)
    const { mutateAsync: updateStep } = useMutation(updateStepAssetsIncome)

    const { setInitValue } = useAssetsInfoHooks()
    const { setCustomValidate } = useHookCustomValidate()
    const { screenType } = useBreakpoints()

    onMounted(async () => {
      store.commit('newClient/setStep', 2)
      scrollTop()
    })

    watchEffect(async () => {
      if (!isMemberAssetsLoading.value) {
        await setInitValue({ ruleForm, memberAssets: memberAssets.value, id: leadId })
      }
      if (!isMemberAssetsLoading.value && !isLoadingMember.value) {
        await setCustomValidate({ ruleForm, customRules })
      }
    })

    watch(isMemberAssetsSchemaLoading, (newValue, oldValue) => {
      if (oldValue && !newValue) {
        updateSchema()
      }
    })

    const backStep = () => {
      store.commit('newClient/setStep', step.value - 1)
      router.push({ name: 'lead-basic-information', params: { id: leadId } })
    }

    const nextPage = async () => {
      const res = await updateStep(leadId)
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Information updated successfully.',
        })
        store.commit('newClient/setStep', step.value + 1)
        router.push({
          name: 'lead-expense-information',
          params: { id: leadId },
        })
      }
    }

    const isDoneCurrentStep = computed(() => {
      return clientsInfo.value.steps.completed_financial_fact_finder
    })

    const focus = (type) => {
      blocks.value[indexBlock(type)].classList.add('border-border-blue')
      if (type === 'liquid_assets') isFocusLiquidAssets.value = true
      if (type === 'other_assets_investments') isFocusNonLiquidAssets.value = true
      if (type === 'current_income') isFocusCurrentIncome.value = true
    }

    const blur = (type) => {
      blocks.value[indexBlock(type)].classList.remove('border-border-blue')
      if (type === 'liquid_assets') isFocusLiquidAssets.value = false
      if (type === 'other_assets_investments') isFocusNonLiquidAssets.value = false
      if (type === 'current_income') isFocusCurrentIncome.value = false
    }

    const indexBlock = (type) => {
      return schema.findIndex((elem) => {
        return elem.name === type
      })
    }

    const addLine = async ({ model, variable, indexGroup, canJoin, copyLine = false }) => {
      if (copyLine) {
        let newItemIndex = 0
        let newVariable = variable.split('_')[0]

        // eslint-disable-next-line no-constant-condition
        labelAddItem: while (true) {
          const elem = schema[indexGroup].rows.find((item) => {
            return item.name === newVariable
          })

          if (!elem) {
            break labelAddItem
          }
          newItemIndex += 1
          newVariable = variable.split('_')[0] + '_' + newItemIndex
        }
        variable = newVariable
      }
      Object.keys(schema[indexGroup].headers).forEach((element) => {
        ruleForm[model.group][variable] = { [element]: null }
      })

      const data = {
        group: model.group,
        row: variable,
        element: 'owner',
        type: 'string',
        can_join: canJoin,
      }
      await updateMemberAssets({ data, id: leadId })
      await queryClient.invalidateQueries(['memberAssets', leadId])
      await queryClient.invalidateQueries(['memberAssetsSchema', leadId])
      updateSchema()
      setCustomValidate(ruleForm, customRules)
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
          await updateMemberAssets({ data, id: leadId })
          queryClient.invalidateQueries(['memberAssets', leadId])
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

      const res = await deleteRow({ id: leadId, data })
      if (!('error' in res)) {
        schema[indexGroup].rows.splice(indexRow, 1)
        await queryClient.invalidateQueries(['memberAssets', leadId])
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

      const res = await checkCreateField({ id: leadId, data })

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

      const res = await updateMemberAssets({ data, id: leadId })
      if (!('error' in res)) {
        await queryClient.invalidateQueries(['memberAssets', leadId])
        await queryClient.invalidateQueries(['memberAssetsSchema', leadId])
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

      const res = await updateMemberAssets({ data, id: leadId })
      if (!('error' in res)) {
        await queryClient.invalidateQueries(['memberAssets', leadId])
        await queryClient.invalidateQueries(['memberAssetsSchema', leadId])
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

    const isReadOnlyLead = computed(() => {
      return clientsInfo.value.readonly
    })

    const getLabelJoint = computed(() => {
      console.log('----', screenType.value)
      if (screenType.value === 'md' || screenType.value === 'sm') return 'Joint(Owner join Spouse)'
      return 'Joint'
    })

    return {
      ruleForm,
      backStep,
      nextPage,
      isMemberAssetsLoading,
      form,
      isLoadingUpdate,
      IconActive,
      IconNotActive,
      IconDoneStep,
      focus,
      blur,
      isFocusCurrentIncome,
      isFocusLiquidAssets,
      isFocusNonLiquidAssets,
      isLoadingInfo,
      isDoneCurrentStep,
      schema,
      addLine,
      optionsCurrencyInput,
      showDialog,
      changeInput,
      isMemberAssetsSchemaLoading,
      blocks,
      isDisabled,
      confirmDelete,
      isLoadingDeleteRow,
      isLoadingCheck,
      checkCreateField,
      dialogVisible,
      confirmCreateField,
      fieldName,
      closeDialog,
      isLoadingMember,
      member,
      joinMember,
      disjoinMember,
      isFetching,
      currencyFormat,
      handleChange,
      isReadOnlyLead,
      leadId,
      isCanJoin,
      remove,
      customRules,
      getLabelJoint,
    }
  },
}
</script>
