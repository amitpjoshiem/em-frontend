<template>
  <div class="p-5 lg:max-w-5xl lg:my-0 lg:mx-auto">
    <div v-if="!isMemberAssetsLoading && !isLoadingInfo && !isMemberAssetsSchemaLoading">
      <el-form ref="form" :model="ruleForm">
        <div
          v-for="(block, indexGroup) in schema"
          :key="indexGroup"
          :ref="
            (el) => {
              if (el) blocks[indexGroup] = el
            }
          "
          class="border border-input-border p-5 rounded-md mb-10"
        >
          <div v-if="block.name === 'current_income'" class="flex items-center mb-5">
            <InlineSvg v-show="isFocusCurrentIncome && !isDoneCurrentStep" :src="IconActive" />
            <InlineSvg v-show="!isFocusCurrentIncome && !isDoneCurrentStep" :src="IconNotActive" />
            <InlineSvg v-show="isDoneCurrentStep" :src="IconDoneStep" />
            <span class="text-main text-xl font-semibold ml-2">{{ block.title }}</span>
          </div>
          <div v-if="block.name === 'liquid_assets'" class="flex items-center mb-5">
            <InlineSvg v-show="isFocusLiquidAssets && !isDoneCurrentStep" :src="IconActive" />
            <InlineSvg v-show="!isFocusLiquidAssets && !isDoneCurrentStep" :src="IconNotActive" />
            <InlineSvg v-show="isDoneCurrentStep" :src="IconDoneStep" />
            <span class="text-main text-xl font-semibold ml-2">{{ block.title }}</span>
          </div>
          <div v-if="block.name === 'other_assets_investments'" class="flex items-center mb-5">
            <InlineSvg v-show="isFocusNonLiquidAssets && !isDoneCurrentStep" :src="IconActive" />
            <InlineSvg v-show="!isFocusNonLiquidAssets && !isDoneCurrentStep" :src="IconNotActive" />
            <InlineSvg v-show="isDoneCurrentStep" :src="IconDoneStep" />
            <span class="text-main text-xl font-semibold ml-2">{{ block.title }}</span>
          </div>

          <div class="flex pb-2 mt-8">
            <div class="w-4/12"></div>
            <div v-for="header in block.headers" :key="header + indexGroup" class="w-2/12 px-2 text-gray03 text-xs">
              {{ header.toUpperCase() }}
            </div>
          </div>
          <div v-for="(row, indexRow) in block.rows" :key="row" class="flex">
            <div class="w-4/12 flex items-center">
              <div v-if="row.label" class="text-main font-semibold text-xss">
                {{ row.label }}
              </div>
              <div v-if="row.custom" class="flex items-center ml-2 cursor-pointer">
                <el-popconfirm title="Are you sure to delete this?" @confirm="confirmEvent({ block, row })">
                  <template #reference>
                    <el-icon color="red">
                      <remove />
                    </el-icon>
                  </template>
                </el-popconfirm>
              </div>
            </div>

            <div v-for="item in row.elements" :key="item" class="w-2/12 px-2 mb-0">
              <el-form-item class="mb-4">
                <SwdCurrencyInput
                  v-if="item.type === 'string'"
                  v-model="ruleForm[item.model.group][item.model.model][item.model.item]"
                  :options="optionsCurrencyInput"
                  :disabled="item.disabled || isLoadingUpdate || isLoadingDeleteRow"
                  placeholder="$12345"
                  @change="changeInput(item)"
                  @focus="focus(item.model.group)"
                  @blur="blur(item.model.group)"
                />
                <el-radio-group
                  v-if="item.type === 'radio'"
                  v-model="ruleForm[item.model.group][item.model.model][item.model.item]"
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
                            indexGroup,
                            indexRow,
                            label: option.label,
                          })
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
          <el-button type="primary" @click="submitForm('ruleForm')">Go to the monthly expense</el-button>
        </div>
      </el-form>
    </div>
    <el-skeleton v-else :rows="15" animated />
  </div>
</template>

<script>
import { watchEffect, ref, computed, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useMutation, useQueryClient } from 'vue-query'
import { useFetchMemberAssets } from '@/api/use-fetch-member-assets'
import { updateMembersAssets } from '@/api/vueQuery/update-members-assets'
import { useFetchMemberAssetsSchema } from '@/api/use-fetch-member-assets-schema'
import { useFetchClietsInfo } from '@/api/clients/use-fetch-clients-info'
import { scrollTop } from '@/utils/scrollTop'
import { useAlert } from '@/utils/use-alert'
import { useAssetsInfoHooks } from '@/hooks/use-assets-info-hooks'
import IconActive from '@/assets/svg/icon-active.svg'
import IconNotActive from '@/assets/svg/icon-not-active.svg'
import IconDoneStep from '@/assets/svg/icon-done-step.svg'
import { ArrowDown } from '@element-plus/icons-vue'
import { Remove } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { deleteAssetsIncomeRow } from '@/api/vueQuery/fetch-remove-assets-income-row'

export default {
  name: 'AddAssets',
  components: {
    ArrowDown,
    Remove,
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
    const step = computed(() => store.state.newClient.step)

    const ruleForm = reactive({})
    const schema = reactive([])

    const memberId = route.params.id

    const { data: memberAssets, isLoading: isMemberAssetsLoading } = useFetchMemberAssets(memberId)
    const { data: memberAssetsSchema, isLoading: isMemberAssetsSchemaLoading } = useFetchMemberAssetsSchema(memberId)

    const { isLoading: isLoadingUpdate, mutateAsync: updateMemberAssets } = useMutation(updateMembersAssets)

    const { isLoading: isLoadingInfo, data: clientsInfo } = useFetchClietsInfo()

    const { mutateAsync: deleteRow, isLoading: isLoadingDeleteRow } = useMutation(deleteAssetsIncomeRow)

    const { setInitValue } = useAssetsInfoHooks()

    onMounted(async () => {
      store.commit('newClient/setStep', 2)
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
      store.commit('newClient/setStep', step.value - 1)
      router.push({ name: 'client-basic-information', params: { id: memberId } })
    }

    const submitForm = async () => {
      useAlert({
        title: 'Success',
        type: 'success',
        message: 'Information update successfully',
      })
      store.commit('newClient/setStep', step.value + 1)
      router.push({
        name: 'client-expense-information',
        params: { id: memberId },
      })
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

    const showDialog = ({ item, indexGroup, indexRow }) => {
      ElMessageBox.prompt('Please input name', 'Custom name', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
      }).then(({ value }) => {
        const model = item.model
        const variable = value.toLowerCase().replace(/ /g, '_')
        const label = value
        addLine({ model, variable, label, indexGroup, indexRow })
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

    return {
      ruleForm,
      backStep,
      submitForm,
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
      confirmEvent,
      deleteRow,
      isLoadingDeleteRow,
    }
  },
}
</script>
