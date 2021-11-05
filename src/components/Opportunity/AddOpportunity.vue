<template>
  <div class="p-5">
    <SwdSubHeader title="New opportunity" />
    <div
      v-if="!isLoadingInitOpportunity && !isLoadingProspectDetails && !isLoadingUserProfile"
      class="border-color-grey px-10 pb-7"
    >
      <el-form ref="form" :model="ruleForm" status-icon :rules="rules" label-position="top">
        <div class="flex">
          <el-form-item label="Opportunity owner" prop="opportunity_owner" class="w-6/12 pr-5">
            <el-input v-model="ruleForm.opportunity_owner" placeholder="Enter prospect’s name" :disabled="true" />
          </el-form-item>
          <el-form-item label="Stage" prop="stage" class="w-6/12 pr-3">
            <el-select v-model="ruleForm.stage" placeholder="Stage" class="w-full">
              <el-option v-for="item in initOpportunity.data.init.stage_list" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="close_date" label="Close date" class="w-3/12">
            <el-date-picker
              v-model="ruleForm.close_date"
              type="date"
              :placeholder="getPlaceholder"
              format="MM/DD/YYYY"
              value-format="MM/DD/YYYY"
            />
          </el-form-item>
        </div>
        <div class="flex">
          <el-form-item label="Opportunity name" prop="opportunity_name" class="w-6/12 pr-5">
            <el-input v-model="ruleForm.opportunity_name" placeholder="Enter opportunity name" />
          </el-form-item>
          <el-form-item label="Account name" prop="account_name" class="w-6/12 pr-5">
            <el-input v-model="ruleForm.account_name" placeholder="Enter account name" :disabled="true" />
          </el-form-item>
        </div>

        <div class="flex">
          <el-form-item label="Type" prop="type" class="w-6/12 pr-3">
            <el-select v-model="ruleForm.type" placeholder="Type" class="w-full">
              <el-option v-for="item in initOpportunity.data.init.type_list" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Amount" prop="amount" class="w-6/12 pr-5">
            <el-input v-model="ruleForm.amount" placeholder="Enter amount" />
          </el-form-item>
        </div>
      </el-form>

      <div class="flex justify-end my-10">
        <el-button type="primary" @click="submitForm('ruleForm')"> Save </el-button>
      </div>
    </div>
    <el-skeleton v-else :rows="11" animated class="p-5" />
  </div>
</template>

<script>
import { reactive, watch, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOpportunityInit } from '@/api/use-opportunity-init.js'
import { useProspectDetails } from '@/api/use-prospect-details.js'
import { useUserProfile } from '@/api/use-user-profile.js'
import { createOpportunity } from '@/api/vueQuery/create-opportunity'
import { useMutation } from 'vue-query'
import { useAlert } from '@/utils/use-alert'
import { rules } from '@/validationRules/opportunity.js'
import dayjs from 'dayjs'

export default {
  name: 'AddOpportunity',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const form = ref(null)
    const id = route.params.id

    const ruleForm = reactive({
      member_id: '',
      stage: '',
      close_date: '',
      type: '',
      amount: '',
    })

    const { mutateAsync: addOpportunity, isError, error } = useMutation(createOpportunity)

    const {
      isLoading: isLoadingProspectDetails,
      isError: isErrorProspectDetails,
      data: prospectDetails,
    } = useProspectDetails(id)

    const { isLoading: isLoadingInitOpportunity, isErrorLoadingInit, data: initOpportunity } = useOpportunityInit()

    const { isLoading: isLoadingUserProfile, isError: isErrorUserProfile, data: userProfile } = useUserProfile()

    watch(
      prospectDetails,
      (newV) => {
        if (newV) {
          ruleForm.opportunity_owner = newV.name
        }
      },
      { immediate: true }
    )

    watch(
      userProfile,
      (newV) => {
        if (newV) {
          ruleForm.account_name = newV.firstName + ' ' + newV.lastName
        }
      },
      { immediate: true }
    )

    const submitForm = async () => {
      form.value.validate(async (valid) => {
        if (valid) {
          const res = await addOpportunity({ ...ruleForm, member_id: id })
          if (!('error' in res)) {
            useAlert({
              title: 'Success',
              type: 'success',
              message: 'Opportunity created successfully',
            })
            router.push({ name: 'member-details', params: { id } })
          }
        } else {
          return false
        }
      })
    }

    const getPlaceholder = computed(() => {
      return dayjs(new Date()).format('MM/DD/YYYY')
    })

    return {
      isError,
      isErrorProspectDetails,
      prospectDetails,
      isLoadingProspectDetails,
      isLoadingUserProfile,
      isErrorUserProfile,
      userProfile,
      error,
      isLoadingInitOpportunity,
      isErrorLoadingInit,
      initOpportunity,
      ruleForm,
      submitForm,
      form,
      rules,
      getPlaceholder,
    }
  },
}
</script>
