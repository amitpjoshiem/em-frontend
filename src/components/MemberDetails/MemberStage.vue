<template>
  <div class="flex justify-between">
    <div
      v-for="(item, index) in steps"
      :key="index"
      v-loading="isLoadingUpdateStage && newStage === item.value"
      class="signpost"
      :class="{
        'step-complet': active > index + 1,
        'step-no-complet': active < index + 1,
        'step-current': active === index + 1,
      }"
      @click="setActive(item.value)"
    >
      <p>{{ item.label }}</p>
    </div>
  </div>

  <el-dialog v-model="dialogVisible" title="Stage" width="45%" :before-close="closeDialog">
    <div v-if="isLoadingSchema" class="flex items-center justify-center">
      <SwdSpinner large />
    </div>
    <el-form
      v-if="!isLoadingSchema && salesforceSchema"
      ref="form"
      :model="ruleForm"
      label-position="top"
      :rules="salesforceSchema.data.rules"
    >
      <div v-for="(elem, index) in salesforceSchema.data.schema" :key="index">
        <!-- STRING -->
        <el-form-item v-if="elem.type === 'string'" :label="elem.label" class="w-full mb-4" :prop="elem.name">
          <el-input v-model="ruleForm[elem.name]" placeholder="Enter first name" />
        </el-form-item>
        <!-- SELECT -->
        <el-form-item v-if="elem.type === 'select'" :label="elem.label" class="mb-4" :prop="elem.name">
          <el-select v-model="ruleForm[elem.name]" placeholder="Select" class="w-full">
            <el-option v-for="item in elem.options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <!-- DATE PICKER -->
        <el-form-item v-if="elem.type === 'date'" :label="elem.label" class="w-full mb-4" :prop="elem.name">
          <el-date-picker
            v-model="ruleForm[elem.name]"
            type="date"
            placeholder="Enter date"
            format="MM/DD/YYYY"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
      </div>

      <div class="pt-5 flex justify-end">
        <SwdButton info small class="mr-2 w-[60px]" @click="closeDialog">Close</SwdButton>
        <SwdButton primary small class="w-[60px]" :disabled="isLoadingUpdateStage" @click="saveStage">
          <SwdSpinner v-show="isLoadingUpdateStage" class="mr-2" />
          Save
        </SwdButton>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import { ref, watchEffect, reactive, computed } from 'vue'
import { useFetchSalesforceOpportunityStages } from '@/api/use-fetch-salesforce-opportunity-stages.js'
import { useFetchSalesforceOpportunitySchema } from '@/api/use-fetch-salesforce-opportunity-schema.js'
import { updateSalesforceOpportunityStages } from '@/api/vueQuery/update-salesforce-opportunity-stages'
import { useMutation, useQueryClient } from 'vue-query'
import { useRoute } from 'vue-router'
import { useAlert } from '@/utils/use-alert'

export default {
  name: 'MemberStage',
  props: {
    currentStage: {
      type: String,
      required: true,
      default: 'prospect',
    },
  },
  setup(props) {
    const queryClient = useQueryClient()
    const route = useRoute()

    const active = ref(0)
    const steps = ref([])
    const newStage = ref('')
    const dialogVisible = ref(false)
    const form = ref(null)

    const ruleForm = reactive({})

    const { isLoading, data: salesforceStage } = useFetchSalesforceOpportunityStages()

    const {
      isLoading: isLoadingSchema,
      data: salesforceSchema,
      refetch: refetchSchema,
    } = useFetchSalesforceOpportunitySchema(newStage, { enabled: false })

    const { mutateAsync: updateStage, isLoading: isLoadingUpdateStage } = useMutation(updateSalesforceOpportunityStages)

    const setActive = async (step) => {
      await setNewStage(step)
      const res = await refetchSchema.value()
      if (res.data.data.schema.length) {
        dialogVisible.value = true
        initState()
        res.data.data.schema.forEach((item) => {
          ruleForm[item.name] = ''
        })
      } else {
        handleUpdate()
      }
    }

    const getLabel = (label) => {
      if (label.indexOf('/') !== -1) {
        return label.split('/')[0] + '/ ' + label.split('/')[1]
      } else {
        return label
      }
    }

    const getActiveStage = computed(() => {
      switch (true) {
        case props.currentStage === '1st Appointment':
          return 1
        case props.currentStage === '2nd Appointment':
          return 2
        case props.currentStage === '3rd Appointment':
          return 3
        case props.currentStage === 'Place Holder Acct':
          return 4
        case props.currentStage === 'Paperwork Signed':
          return 5
        case props.currentStage === 'Commission Paid':
          return 6
        case props.currentStage === 'Contract delivery/Free look period':
          return 7
        case props.currentStage.trim() === 'Closed Won' || props.currentStage.trim() === 'Closed Win':
          return 8
        default:
          return 0
      }
    })

    const setNewStage = (step) => {
      newStage.value = step
    }

    const closeDialog = () => {
      dialogVisible.value = false
    }

    const initState = () => {
      for (var prop in ruleForm) {
        // eslint-disable-next-line no-prototype-builtins
        if (ruleForm.hasOwnProperty(prop)) {
          delete ruleForm[prop]
        }
      }
    }

    const saveStage = async (e) => {
      e.preventDefault()
      form.value.validate(async (valid) => {
        if (valid) {
          handleUpdate()
        } else {
          return false
        }
      })
    }

    const handleUpdate = async () => {
      const form = { stage: newStage.value, ...ruleForm }
      const res = await updateStage({ id: route.params.id, form })
      if (!('error' in res)) {
        queryClient.invalidateQueries(['prospect'])
        dialogVisible.value = false
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Update successfully',
        })
      }
    }

    watchEffect(() => {
      if (!isLoading.value) {
        active.value = getActiveStage?.value
        steps.value = []
        for (var key in salesforceStage.value.data) {
          steps.value.push({
            label: getLabel(salesforceStage.value.data[key]),
            value: key,
          })
        }
      }
    })

    return {
      active,
      setActive,
      isLoading,
      salesforceStage,
      isLoadingSchema,
      salesforceSchema,
      newStage,
      steps,
      dialogVisible,
      closeDialog,
      ruleForm,
      saveStage,
      form,
      isLoadingUpdateStage,
    }
  },
}
</script>

<style scoped>
.signpost {
  cursor: pointer;
  width: 12.5%;
  height: 40px;
  clip-path: polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%, 6% 50%);
  shape-outside: polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%, 6% 50%);
  display: flex;
  align-items: center;
  justify-content: center;
  word-break: break-word;
}
.signpost p {
  font-size: 11px;
  text-align: center;
}

.step-no-complet {
  background-color: #e9e9e9;
}

.step-no-complet p {
  color: #282828;
}

.step-complet {
  background-color: #83ccf0;
}

.step-complet p {
  color: #fff;
}

.step-current {
  background-color: #073763;
}
.step-current p {
  color: #fff;
}
</style>
